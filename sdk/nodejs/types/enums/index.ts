// *** WARNING: this file was generated by Pulumi SDK Generator. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***


export const DeploymentStrategyType = {
    Recreate: "Recreate",
    Rolling: "Rolling",
} as const;

export type DeploymentStrategyType = (typeof DeploymentStrategyType)[keyof typeof DeploymentStrategyType];

export const ServiceType = {
    ClusterIP: "ClusterIP",
    LoadBalancer: "LoadBalancer",
} as const;

export type ServiceType = (typeof ServiceType)[keyof typeof ServiceType];