import * as pulumi from '@pulumi/pulumi';

export type DeploymentStrategy =
    | 'Recreate'
    | 'Rolling';

export type ServiceType =
    | 'ClusterIP'
    | 'LoadBalancer';

export interface ImageArgs {
    registry?: pulumi.Input<string>;
    repository?: pulumi.Input<string>;
    tag?: pulumi.Input<string>;
}

export interface CommonArgs {
    name?: pulumi.Input<string>;
    namespace?: pulumi.Input<string>;
    image?: pulumi.Input<string | ImageArgs>;
    deployment?: pulumi.Input<{
        strategy?: pulumi.Input<{
            type: pulumi.Input<DeploymentStrategy>;
        }>;
    }>;
    service?: pulumi.Input<{
        name?: pulumi.Input<string>;
        type: pulumi.Input<ServiceType>;
    }>;
}

export interface PersistentVolumeClaimArgs {
    existingClaim?: pulumi.Input<string>;
    storageClass?: pulumi.Input<string>;
    subPath?: pulumi.Input<string>;
    accessMode?: pulumi.Input<string>;
    size?: pulumi.Input<string>;
}

export type PersistentVolumeClaimMap<T extends string> = {
    [P in T]?: pulumi.Input<PersistentVolumeClaimArgs>;
}
