import * as pulumi from '@pulumi/pulumi';
import * as docker from '@pulumi/docker';
import * as types from 'types';

export class Heimdall extends pulumi.ComponentResource {
    public readonly container: docker.Container;
    public readonly image: docker.RemoteImage;

    constructor(name: string, args: HeimdallArgs, opts?: pulumi.ComponentResourceOptions) {
        super('homelab:docker/linuxserver:Heimdall', name, args, opts);

        const volumes: docker.types.input.ContainerVolume[] = [];
        if (args.configPath) {
            volumes.push({
                hostPath: args.configPath,
                containerPath: '/config',
            });
        }

        const image = new docker.RemoteImage(name, {
            name: 'lscr.io/linuxserver/heimdall',
        }, {
            parent: this,
        });

        const container = new docker.Container(name, {
            image: image.repoDigest,
            envs: [
                pulumi.interpolate`PGID=${args.pgid ?? ''}`,
                pulumi.interpolate`PUID=${args.puid ?? ''}`,
                pulumi.interpolate`TZ=${args.tz ?? ''}`
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
        this.image = image;

        this.registerOutputs({
            container,
            image,
        });
    }
}

export interface HeimdallArgs extends types.linuxserver.CommonArgs {
    configPath?: pulumi.Input<string>;
    ports?: pulumi.Input<types.linuxserver.HeimdallPortsArgs>;
    restart?: pulumi.Input<types.docker.RestartPolicy>;
}
