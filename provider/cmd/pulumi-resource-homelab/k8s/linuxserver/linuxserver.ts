import * as pulumi from '@pulumi/pulumi';
import { CommonArgs } from '../../types/linuxserver';
import { CommonArgs as K8sCommonArgs, ImageArgs } from '../../types/kubernetes';

export const defaultRegistry = 'lscr.io';

export type ImageFormatter = {
    (image?: pulumi.Input<string | ImageArgs>): pulumi.Output<string>;
}

export type KubernetesArgs = CommonArgs & K8sCommonArgs;

export function createImageFormatter(imageName: string): ImageFormatter {
    const resolveImage = (image?: string | pulumi.UnwrappedObject<ImageArgs>): string => {
        if (!image)  {
            return `${defaultRegistry}/linuxserver/${imageName}`;
        }

        if (typeof image === 'string') {
            return image;
        }

        const registry = image.registry ?? defaultRegistry;
        const repository = image.repository ?? imageName;
        const version = image.tag ? `:${image.tag}` : '';

        return `${registry}/linuxserver/${repository}${version}`;
    };

    return (image) => pulumi.output(image).apply(resolveImage);
}

export function getType(subType: string) {
    return `homelab:index/k8s/linuxserver:${subType}`;
}
