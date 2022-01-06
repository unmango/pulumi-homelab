import * as pulumi from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';
import * as kx from '@pulumi/kubernetesx';
import {
    PersistentVolumeClaimStorageClassArgs,
    PersistentVolumeClaimArgs
} from 'types/kubernetes';

type MetadataFactory = {
    (suffix?: string): k8s.types.input.meta.v1.ObjectMeta;
};

export function metadataFactory(
    name?: pulumi.Input<string>,
    namespace?: pulumi.Input<string>,
): MetadataFactory {
    return (suffix) => ({
        name: name && suffix ? pulumi.interpolate`${name}-${suffix}` : name,
        namespace
    });
}

export class PvcBuilder {
    constructor(private suffix: string, private mountPath: string) { }

    createClaim(
        name: string,
        metadata: k8s.types.input.meta.v1.ObjectMeta,
        args?: PersistentVolumeClaimArgs,
        parent?: pulumi.Resource,
    ): k8s.core.v1.PersistentVolumeClaim | undefined {
        if (args?.type !== 'storageClass') return;

        return new k8s.core.v1.PersistentVolumeClaim(`${name}-${this.suffix}`, {
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
            parent
        });
    }

    createMount(name: string): k8s.types.input.core.v1.VolumeMount {
        return {
            name: `${name}-${this.suffix}`,
            mountPath: this.mountPath,
        }
    }

    createVolume(
        name: string,
        args?: PersistentVolumeClaimArgs
    ): k8s.types.input.core.v1.Volume | undefined {
        if (!args) return;

        return {
            name: `${name}-${this.suffix}`,
            persistentVolumeClaim: {
                claimName: args.type === 'existingClaim'
                    ? args.existingClaim
                    : `${name}-${this.suffix}`,
            }
        }
    }
}
