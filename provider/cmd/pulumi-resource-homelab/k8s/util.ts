import * as k8s from '@pulumi/kubernetes';
import {
    PersistentVolumeClaimArgs
} from 'types/kubernetes';

export function asPersistentVolumeClaimSpec(
    args: PersistentVolumeClaimArgs
): k8s.types.input.core.v1.PersistentVolumeClaimSpec {
    const spec: k8s.types.input.core.v1.PersistentVolumeClaimSpec = {};

    spec['accessModes'] = [args.accessMode ?? 'ReadWriteOnce'];
    spec['storageClassName'] = args.storageClass;
    spec['resources'] = args.size ? {
        requests: { storage: args.size },
    } : undefined;

    return spec;
}
