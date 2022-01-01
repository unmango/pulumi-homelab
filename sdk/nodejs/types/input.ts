// *** WARNING: this file was generated by Pulumi SDK Generator. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import { input as inputs, output as outputs, enums } from "../types";

import * as utilities from "../utilities";

export namespace k8s {
    export interface DeploymentArgs {
        strategy?: pulumi.Input<inputs.k8s.DeploymentStrategyArgs>;
    }
    /**
     * deploymentArgsProvideDefaults sets the appropriate defaults for DeploymentArgs
     */
    export function deploymentArgsProvideDefaults(val: DeploymentArgs): DeploymentArgs {
        return {
            ...val,
            strategy: (val.strategy ? pulumi.output(val.strategy).apply(inputs.k8s.deploymentStrategyArgsProvideDefaults) : undefined),
        };
    }

    export interface DeploymentStrategyArgs {
        type?: pulumi.Input<enums.k8s.DeploymentStrategyType>;
    }
    /**
     * deploymentStrategyArgsProvideDefaults sets the appropriate defaults for DeploymentStrategyArgs
     */
    export function deploymentStrategyArgsProvideDefaults(val: DeploymentStrategyArgs): DeploymentStrategyArgs {
        return {
            ...val,
            type: (val.type) ?? "Recreate",
        };
    }

    export interface ImageArgsArgs {
        registry?: pulumi.Input<string>;
        repository?: pulumi.Input<string>;
        tag?: pulumi.Input<string>;
    }

    export interface ServiceArgs {
        name?: pulumi.Input<string>;
        type: pulumi.Input<enums.k8s.ServiceType>;
    }
}
