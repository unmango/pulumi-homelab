import * as pulumi from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';
import * as kx from '@pulumi/kubernetesx';
import {
    createImageFormatter,
    getType,
    KubernetesArgs,
} from './linuxserver';
import {
    PersistentVolumeClaimArgs,
    PersistentVolumeClaimMap,
} from 'types/kubernetes';
import {
    asPersistentVolumeClaimSpec,
} from 'k8s/util';

export const defaultPort = 7878;

const imageFormatter = createImageFormatter('radarr');

type ExplicitVolumes =
    | 'config'
    | 'downloads'
    | 'movies';

export interface RadarrArgs extends KubernetesArgs {
    persistence?: PersistentVolumeClaimMap<ExplicitVolumes>;
}

export class Radarr extends pulumi.ComponentResource {
    public readonly configVolumeClaim?: k8s.core.v1.PersistentVolumeClaim;
    public readonly deployment: k8s.apps.v1.Deployment;
    public readonly downloadsVolumeClaim?: k8s.core.v1.PersistentVolumeClaim;
    public readonly moveiesVolumeClaim?: k8s.core.v1.PersistentVolumeClaim;
    public readonly port: pulumi.Output<number>;
    public readonly service: k8s.core.v1.Service;
    public readonly serviceName: pulumi.Output<string>;

    constructor(name: string, args: RadarrArgs, opts?: pulumi.ComponentResourceOptions) {
        super(getType('radarr'), name, args, opts);

        const createClaim = (
            claimName: ExplicitVolumes,
            claimArgs: pulumi.Input<PersistentVolumeClaimArgs>,
        ): kx.PersistentVolumeClaim => {
            return new kx.PersistentVolumeClaim(claimName, {
                metadata: {
                    name: args.name,
                    namespace: args.namespace,
                },
                spec: pulumi.output(claimArgs).apply(a => {
                    return asPersistentVolumeClaimSpec(a);
                }),
            }, {
                parent: this,
            });
        };

        const claims: Partial<Record<
            ExplicitVolumes,
            kx.PersistentVolumeClaim>
        > = {};

        const persistence = args.persistence;
        if (persistence?.config) {
            claims['config'] = createClaim('config', persistence.config);
        }

        if (persistence?.downloads) {
            claims['downloads'] = createClaim('downloads', persistence.downloads);
        }

        if (persistence?.movies) {
            claims['movies'] = createClaim('movies', persistence.movies);
        }

        const podBuilder = new kx.PodBuilder({
            containers: [{
                image: imageFormatter(args.image),
                env: {
                    PUID: args.puid ?? '1000',
                    PGID: args.pgid ?? '1000',
                    TZ: args.tz ?? 'Europe/London'
                },
                ports: {
                    http: defaultPort,
                },
                volumeMounts: []
            }],
        });

        const deployment = new kx.Deployment(name, {
            metadata: {
                name: args.name,
                namespace: args.namespace,
            },
            spec: podBuilder.asDeploymentSpec({
                strategy: {
                    type: pulumi.output(args.deployment).apply(deployment => {
                        return deployment?.strategy?.type ?? 'Recreate';
                    }),
                },
            }),
        }, {
            parent: this,
        });

        const service = new kx.Service(name, {
            metadata: {
                name: pulumi.all([args.service, args.name]).apply(([service, explicitName]) => {
                    return service.name ?? explicitName ?? undefined;
                }),
                namespace: args.namespace,
            },
            spec: {
                type: pulumi.output(args.service).apply(service => {
                    return service?.type ?? 'ClusterIP';
                }),
                ports: [{
                    port: defaultPort,
                }],
            },
        }, {
            parent: this,
        });

        this.configVolumeClaim = claims['config'];
        this.deployment = deployment;
        this.downloadsVolumeClaim = claims['downloads'];
        this.moveiesVolumeClaim = claims['movies'];
        this.port = pulumi.Output.create(defaultPort);
        this.service = service;
        this.serviceName = service.metadata.name;

        this.registerOutputs({
            configVolumeClaim : claims['config'],
            deployment,
            downloadsVolumeClaim: claims['downloads'],
            moviesVolumeClaim: claims['movies'],
            port: defaultPort,
            service,
            serviceName: service.metadata.name,
        });
    }

}
