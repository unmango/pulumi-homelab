import * as pulumi from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';
import * as kx from '@pulumi/kubernetesx';
import { PersistentVolumeClaimMap } from 'types/kubernetes';
import { metadataFactory, PvcBuilder } from '../util';
import {
    createImageFormatter,
    getType,
    KubernetesArgs,
} from './linuxserver';

export const defaultPort = 7878;

const imageFormatter = createImageFormatter('radarr');
const configBuilder = new PvcBuilder('config', '/config');
const downloadsBuilder = new PvcBuilder('downloads', '/downloads');
const moviesBuilder = new PvcBuilder('movies', '/movies');

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

        const getMetadata = metadataFactory(args.name, args.namespace);

        const explicitVolumes: k8s.types.input.core.v1.Volume[] = [];
        const explicitMounts: k8s.types.input.core.v1.VolumeMount[] = [];
        const persistence = args.persistence;

        const configVolume = configBuilder.createVolume(name, persistence?.config);
        const configClaim = configBuilder.createClaim(
            name,
            getMetadata('config'),
            persistence?.config,
            this,
        );
        if (configVolume) {
            explicitVolumes.push(configVolume);

            if (configClaim) {
                explicitMounts.push(configBuilder.createMount(name));
            }
        }

        const downloadsVolume = downloadsBuilder.createVolume(name, persistence?.downloads);
        const downloadsClaim = downloadsBuilder.createClaim(
            name,
            getMetadata('downloads'),
            persistence?.config,
            this,
        );
        if (downloadsVolume) {
            explicitVolumes.push(downloadsVolume);

            if (downloadsClaim) {
                explicitMounts.push(downloadsBuilder.createMount(name));
            }
        }

        const moviesVolume = moviesBuilder.createVolume(name);
        const moviesClaim = moviesBuilder.createClaim(
            name,
            getMetadata('movies'),
            persistence?.movies,
            this,
        );
        if (moviesVolume) {
            explicitVolumes.push(moviesVolume);

            if (moviesClaim) {
                explicitMounts.push(moviesBuilder.createMount(name));
            }
        }

        const podBuilder = new kx.PodBuilder({
            volumes: explicitVolumes,
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
                volumeMounts: explicitMounts,
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
                    return service?.name ?? explicitName ?? undefined;
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

        this.configVolumeClaim = configClaim;
        this.deployment = deployment;
        this.downloadsVolumeClaim = downloadsClaim;
        this.moveiesVolumeClaim = moviesClaim;
        this.port = pulumi.Output.create(defaultPort);
        this.service = service;
        this.serviceName = service.metadata.name;

        this.registerOutputs({
            configVolumeClaim: configClaim,
            deployment,
            downloadsVolumeClaim: downloadsClaim,
            moviesVolumeClaim: moviesClaim,
            port: defaultPort,
            service,
            serviceName: service.metadata.name,
        });
    }

}
