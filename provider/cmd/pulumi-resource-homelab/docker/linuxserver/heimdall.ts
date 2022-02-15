import * as pulumi from '@pulumi/pulumi';
import * as docker from '@pulumi/docker';
import * as types from 'types';

export class Heimdall extends pulumi.ComponentResource {
    public readonly container: docker.Container;

    constructor(name: string, args: HeimdallArgs, opts?: pulumi.ComponentResourceOptions) {
        super('homelab:k8s/linuxserver:heimdall', name, args, opts);

        const volumes: docker.types.input.ContainerVolume[] = [];
        if (args.configPath) {
            volumes.push({
                hostPath: args.configPath,
                containerPath: '/config',
            });
        }

        const container = new docker.Container(name, {
            image: 'lscr.io/linuxserver/heimdall',
            envs: [
                pulumi.interpolate`PGID=${args.pgid}`,
                pulumi.interpolate`PUID=${args.puid}`,
                pulumi.interpolate`TZ=${args.tz}`
            ],
            volumes,
            ports: pulumi.output(args.ports)
                .apply<docker.types.input.ContainerPort[]>((ports) => ([
                    {
                        internal: 80,
                        external: ports?.http,
                    },
                    {
                        internal: 443,
                        external: ports?.https,
                    }
                ])),
            restart: args.restart,
        }, {
            parent: this,
        });

        this.container = container;

        this.registerOutputs({
            container,
        });
    }
}

export interface HeimdallPortsArgs {
    http?: pulumi.Input<number>;
    https?: pulumi.Input<number>;
}

export interface HeimdallArgs extends types.linuxserver.CommonArgs {
    configPath?: pulumi.Input<string>;
    ports?: pulumi.Input<HeimdallPortsArgs>;
    restart?: pulumi.Input<types.docker.RestartPolicy>;
}
