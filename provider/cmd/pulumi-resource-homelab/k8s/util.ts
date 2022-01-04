import * as pulumi from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';
import * as kx from '@pulumi/kubernetesx';
import {
    PersistentVolumeClaimStorageClassArgs,
    PersistentVolumeClaimArgs
} from 'types/kubernetes';

export function createPersistentVolumeClaim(
    name: string,
    metadata: k8s.types.input.meta.v1.ObjectMeta,
    mountPath: string,
    args: PersistentVolumeClaimStorageClassArgs,
    parent: pulumi.Resource,
): [
    pulumi.Output<kx.types.VolumeMount>,
    k8s.core.v1.PersistentVolumeClaim,
] {
    const claim = new kx.PersistentVolumeClaim(name, {
        metadata,
        spec: {
            accessModes: [args.accessMode ?? 'ReadWriteOnce'],
            storageClassName: args.storageClass,
            resources: args.size ? {
                requests: {
                    storage: args.size,
                },
            } : undefined,
        }
    }, {
        parent,
    });

    const mount = claim.mount(mountPath, args.subPath);

    return [
        mount,
        claim,
    ];
}

export function createClaimOrMount(
    name: string,
    metadata: k8s.types.input.meta.v1.ObjectMeta,
    mountPath: string,
    args: PersistentVolumeClaimArgs,
    parent: pulumi.Resource,
): [
    pulumi.Output<kx.types.VolumeMount>,
    k8s.core.v1.PersistentVolumeClaim,
] | [
    k8s.types.input.core.v1.Volume,
] {
    if (args.type === 'storageClass') {
        return createPersistentVolumeClaim(name, metadata, mountPath, args, parent);
    } else if (args.type === 'existingClaim') {
        const mount: k8s.types.input.core.v1.Volume = {
            name,
            persistentVolumeClaim: {
                claimName: args.existingClaim,
            }
        }

        return [mount];
    }

    throw new Error('Unknown argument type.');
}
