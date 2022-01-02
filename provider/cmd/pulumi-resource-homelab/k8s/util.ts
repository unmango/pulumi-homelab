import * as pulumi from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';
import {
    PersistentVolumeClaimArgs
} from 'types/kubernetes';

export function asPersistentVolumeClaimSpec(
    args?: pulumi.Input<PersistentVolumeClaimArgs>
): pulumi.Output<k8s.types.input.core.v1.PersistentVolumeClaimSpec> | undefined {
    if (!args) return;

    const asSpec = (
        a: pulumi.UnwrappedObject<PersistentVolumeClaimArgs>,
    ): k8s.types.input.core.v1.PersistentVolumeClaimSpec => {
        const spec: k8s.types.input.core.v1.PersistentVolumeClaimSpec = {};

        spec['accessModes'] = [a.accessMode ?? 'ReadWriteOnce'];
        spec['storageClassName'] = a.storageClass;
        spec['resources'] = a.size ? {
            requests: { storage: a.size },
        } : undefined;

        return spec;
    }

    return pulumi.output(args).apply(asSpec);
}
