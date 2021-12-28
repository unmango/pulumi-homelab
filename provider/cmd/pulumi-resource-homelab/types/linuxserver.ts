import * as pulumi from '@pulumi/pulumi';

export interface BaseArgs {
    puid?: pulumi.Input<string>;
    pgid?: pulumi.Input<string>;
    tz?: pulumi.Input<string>;
}

export interface MetaArgs {
    imageName: string;
    port: number;
}
