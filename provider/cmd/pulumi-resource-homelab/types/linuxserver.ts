import * as pulumi from '@pulumi/pulumi';

export interface CommonArgs {
    puid?: pulumi.Input<string>;
    pgid?: pulumi.Input<string>;
    tz?: pulumi.Input<string>;
}

export interface HeimdallPortsArgs {
    http?: pulumi.Input<number>;
    https?: pulumi.Input<number>;
}
