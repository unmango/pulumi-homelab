import * as pulumi from '@pulumi/pulumi';
import * as docker from '@pulumi/docker';
import * as lsio from 'types/linuxserver';
import * as d4r from 'types/docker';

export class Heimdall extends pulumi.ComponentResource {
    public readonly container: docker.Container;

    constructor(name: string, args: HeimdallArgs, opts?: pulumi.ComponentResourceOptions) {
        super('homelab:k8s/linuxserver:heimdall', name, args, opts);

        args = applyDefaults(args);

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
            ports: args.ports,
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

export interface HeimdallArgs extends lsio.CommonArgs {
    configPath?: string;
    ports?: docker.types.input.ContainerPort[];
    restart?: d4r.Restart;
}

function applyDefaults(args: HeimdallArgs): HeimdallArgs {
    if (!args.ports) {
        args.ports = [
            {
                internal: 80,
                external: 80,
            },
            {
                internal: 443,
                external: 443,
            }
        ]
    }

    if (!args.restart) {
        args.restart = 'unless-stopped';
    }

    return args;
}
