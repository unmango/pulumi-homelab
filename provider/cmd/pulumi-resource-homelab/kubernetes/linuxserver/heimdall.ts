import * as pulumi from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';
import * as types from 'types';

const configVolumeName = 'config';

export class Heimdall extends pulumi.ComponentResource {
    public readonly service: k8s.core.v1.Service;
    public readonly statefulSet: k8s.apps.v1.StatefulSet;

    constructor(name: string, args: HeimdallArgs, opts?: pulumi.ComponentResourceOptions) {
        super('homelab:kubernetes/linuxserver:Heimdall', name, args, opts);

        const service = new k8s.core.v1.Service(name, {
            metadata: {
                namespace: args.namespace,
            },
            spec: pulumi.output(args.service)
                .apply<k8s.types.input.core.v1.ServiceSpec>(serviceArgs => ({
                    type: serviceArgs?.type,
                    ports: createServicePorts(serviceArgs?.ports),
                })),
        }, {
            parent: this,
        });

        const appLabels: Record<string, pulumi.Input<string>> = { app: name };

        const statefulSet = new k8s.apps.v1.StatefulSet(name, {
            metadata: {
                namespace: args.namespace,
            },
            spec: {
                serviceName: service.metadata.name,
                selector: {
                    matchLabels: appLabels,
                },
                volumeClaimTemplates: pulumi.output(args.persistence)
                    .apply(createVolumeClaimTemplates),
                template: {
                    metadata: {
                        labels: appLabels,
                    },
                    spec: {
                        containers: [{
                            name: 'heimdall',
                            image: 'lscr.io/linuxserver/heimdall',
                            env: [
                                { name: 'PGID', value: args.pgid },
                                { name: 'PUID', value: args.puid },
                                { name: 'TZ', value: args.tz },
                            ],
                            ports: [
                                { name: 'http', containerPort: 80 },
                                { name: 'https', containerPort: 443 },
                            ],
                            volumeMounts: [{
                                name: configVolumeName,
                                mountPath: '/config',
                            }],
                        }],
                        volumes: pulumi.output(args.persistence)
                            .apply(createPodVolumes),
                        dnsConfig: {
                            // LinuxServer uses an alpine base image
                            // https://stackoverflow.com/a/65593511/7341217
                            options: [{
                                name: 'ndots',
                                value: '2',
                            }],
                        },
                    },
                },
            },
        }, {
            parent: this,
        });

        this.service = service;
        this.statefulSet = statefulSet;

        this.registerOutputs({
            service,
            statefulSet,
        });
    }
}

function createPodVolumes(args?: HeimdallPersistenceArgs): k8s.types.input.core.v1.Volume[] {
    return args?.enabled ? [] : [{ name: configVolumeName, emptyDir: {} }];
}

function createServicePorts(
    args?: types.linuxserver.HeimdallPortsArgs
): k8s.types.input.core.v1.ServicePort[] | undefined {
    if (!args) return undefined;

    const servicePorts: k8s.types.input.core.v1.ServicePort[] = [];
    if (args.http) {
        servicePorts.push({ name: 'http', targetPort: 80, port: args.http });
    }
    if (args.https) {
        servicePorts.push({ name: 'https', targetPort: 443, port: args.https });
    }

    return servicePorts.length > 0 ? servicePorts : undefined;
}

function createVolumeClaimTemplates(args?: HeimdallPersistenceArgs): k8s.types.input.core.v1.PersistentVolumeClaim[] {
    if (!args?.enabled) return [];

    return [{
        metadata: {
            name: configVolumeName,
        },
        spec: {
            accessModes: args.accessModes,
            storageClassName: args.storageClass,
            resources: {
                requests: args.size ? {
                    storage: args.size
                } : undefined,
            },
        },
    }];
}

export interface HeimdallPersistenceArgs {
    accessModes?: pulumi.Input<pulumi.Input<string>[]>;
    enabled?: pulumi.Input<boolean>;
    size?: pulumi.Input<string>;
    storageClass?: pulumi.Input<string>;
}

export interface HeimdallServiceArgs {
    type?: k8s.types.enums.core.v1.ServiceSpecType;
    ports?: pulumi.Input<types.linuxserver.HeimdallPortsArgs>;
}

export interface HeimdallArgs extends types.linuxserver.CommonArgs {
    namespace?: pulumi.Input<string>;
    persistence?: pulumi.Input<HeimdallPersistenceArgs>;
    service?: pulumi.Input<HeimdallServiceArgs>;
}
