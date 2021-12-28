import * as pulumi from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';
import * as kx from '@pulumi/kubernetesx';
import { BaseArgs, MetaArgs } from '../../types/linuxserver';

export interface LinuxServerKubernetesArgs extends BaseArgs {
    name?: pulumi.Input<string>;
    namespace: pulumi.Input<string>;
    image?: pulumi.Input<string>;
    version?: pulumi.Input<string>;
    deployment?: kx.types.PodBuilderDeploymentSpec;
    service: kx.types.ServiceSpec;
}

export class LinuxServerBase extends pulumi.ComponentResource {
    public readonly deployment: k8s.apps.v1.Deployment;
    public readonly ingress?: k8s.networking.v1.Ingress;
    public readonly service: k8s.core.v1.Service;

    constructor(
        subType: string,
        name: string,
        args: LinuxServerKubernetesArgs,
        metaArgs: MetaArgs,
        opts?: pulumi.ComponentResourceOptions
    ) {
        super(`homelab:index:k8s:linuxserver:${subType}`, name, args, opts);

        const podBuidler = new kx.PodBuilder({
            containers: [{
                image: args.image ?? `lcsr.io/linuxserver/${metaArgs.imageName}`,
            }],
        });

        const deployment = new kx.Deployment(name, {
            metadata: {
                name: args.name,
                namespace: args.namespace,
            },
            spec: podBuidler.asDeploymentSpec(args.deployment),
        });

        const service = deployment.createService(args.service);

        this.deployment = deployment;
        this.service = service;

        this.registerOutputs({
            deployment,
            service,
        });
    }
}
