// *** WARNING: this file was generated by Pulumi SDK Generator. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

package k8s

import (
	"context"
	"reflect"

	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

// Kubernetes deployment strategies.
type DeploymentStrategyType string

const (
	DeploymentStrategyTypeRecreate = DeploymentStrategyType("Recreate")
	DeploymentStrategyTypeRolling  = DeploymentStrategyType("Rolling")
)

func (DeploymentStrategyType) ElementType() reflect.Type {
	return reflect.TypeOf((*DeploymentStrategyType)(nil)).Elem()
}

func (e DeploymentStrategyType) ToDeploymentStrategyTypeOutput() DeploymentStrategyTypeOutput {
	return pulumi.ToOutput(e).(DeploymentStrategyTypeOutput)
}

func (e DeploymentStrategyType) ToDeploymentStrategyTypeOutputWithContext(ctx context.Context) DeploymentStrategyTypeOutput {
	return pulumi.ToOutputWithContext(ctx, e).(DeploymentStrategyTypeOutput)
}

func (e DeploymentStrategyType) ToDeploymentStrategyTypePtrOutput() DeploymentStrategyTypePtrOutput {
	return e.ToDeploymentStrategyTypePtrOutputWithContext(context.Background())
}

func (e DeploymentStrategyType) ToDeploymentStrategyTypePtrOutputWithContext(ctx context.Context) DeploymentStrategyTypePtrOutput {
	return DeploymentStrategyType(e).ToDeploymentStrategyTypeOutputWithContext(ctx).ToDeploymentStrategyTypePtrOutputWithContext(ctx)
}

func (e DeploymentStrategyType) ToStringOutput() pulumi.StringOutput {
	return pulumi.ToOutput(pulumi.String(e)).(pulumi.StringOutput)
}

func (e DeploymentStrategyType) ToStringOutputWithContext(ctx context.Context) pulumi.StringOutput {
	return pulumi.ToOutputWithContext(ctx, pulumi.String(e)).(pulumi.StringOutput)
}

func (e DeploymentStrategyType) ToStringPtrOutput() pulumi.StringPtrOutput {
	return pulumi.String(e).ToStringPtrOutputWithContext(context.Background())
}

func (e DeploymentStrategyType) ToStringPtrOutputWithContext(ctx context.Context) pulumi.StringPtrOutput {
	return pulumi.String(e).ToStringOutputWithContext(ctx).ToStringPtrOutputWithContext(ctx)
}

type DeploymentStrategyTypeOutput struct{ *pulumi.OutputState }

func (DeploymentStrategyTypeOutput) ElementType() reflect.Type {
	return reflect.TypeOf((*DeploymentStrategyType)(nil)).Elem()
}

func (o DeploymentStrategyTypeOutput) ToDeploymentStrategyTypeOutput() DeploymentStrategyTypeOutput {
	return o
}

func (o DeploymentStrategyTypeOutput) ToDeploymentStrategyTypeOutputWithContext(ctx context.Context) DeploymentStrategyTypeOutput {
	return o
}

func (o DeploymentStrategyTypeOutput) ToDeploymentStrategyTypePtrOutput() DeploymentStrategyTypePtrOutput {
	return o.ToDeploymentStrategyTypePtrOutputWithContext(context.Background())
}

func (o DeploymentStrategyTypeOutput) ToDeploymentStrategyTypePtrOutputWithContext(ctx context.Context) DeploymentStrategyTypePtrOutput {
	return o.ApplyTWithContext(ctx, func(_ context.Context, v DeploymentStrategyType) *DeploymentStrategyType {
		return &v
	}).(DeploymentStrategyTypePtrOutput)
}

func (o DeploymentStrategyTypeOutput) ToStringOutput() pulumi.StringOutput {
	return o.ToStringOutputWithContext(context.Background())
}

func (o DeploymentStrategyTypeOutput) ToStringOutputWithContext(ctx context.Context) pulumi.StringOutput {
	return o.ApplyTWithContext(ctx, func(_ context.Context, e DeploymentStrategyType) string {
		return string(e)
	}).(pulumi.StringOutput)
}

func (o DeploymentStrategyTypeOutput) ToStringPtrOutput() pulumi.StringPtrOutput {
	return o.ToStringPtrOutputWithContext(context.Background())
}

func (o DeploymentStrategyTypeOutput) ToStringPtrOutputWithContext(ctx context.Context) pulumi.StringPtrOutput {
	return o.ApplyTWithContext(ctx, func(_ context.Context, e DeploymentStrategyType) *string {
		v := string(e)
		return &v
	}).(pulumi.StringPtrOutput)
}

type DeploymentStrategyTypePtrOutput struct{ *pulumi.OutputState }

func (DeploymentStrategyTypePtrOutput) ElementType() reflect.Type {
	return reflect.TypeOf((**DeploymentStrategyType)(nil)).Elem()
}

func (o DeploymentStrategyTypePtrOutput) ToDeploymentStrategyTypePtrOutput() DeploymentStrategyTypePtrOutput {
	return o
}

func (o DeploymentStrategyTypePtrOutput) ToDeploymentStrategyTypePtrOutputWithContext(ctx context.Context) DeploymentStrategyTypePtrOutput {
	return o
}

func (o DeploymentStrategyTypePtrOutput) Elem() DeploymentStrategyTypeOutput {
	return o.ApplyT(func(v *DeploymentStrategyType) DeploymentStrategyType {
		if v != nil {
			return *v
		}
		var ret DeploymentStrategyType
		return ret
	}).(DeploymentStrategyTypeOutput)
}

func (o DeploymentStrategyTypePtrOutput) ToStringPtrOutput() pulumi.StringPtrOutput {
	return o.ToStringPtrOutputWithContext(context.Background())
}

func (o DeploymentStrategyTypePtrOutput) ToStringPtrOutputWithContext(ctx context.Context) pulumi.StringPtrOutput {
	return o.ApplyTWithContext(ctx, func(_ context.Context, e *DeploymentStrategyType) *string {
		if e == nil {
			return nil
		}
		v := string(*e)
		return &v
	}).(pulumi.StringPtrOutput)
}

// DeploymentStrategyTypeInput is an input type that accepts DeploymentStrategyTypeArgs and DeploymentStrategyTypeOutput values.
// You can construct a concrete instance of `DeploymentStrategyTypeInput` via:
//
//          DeploymentStrategyTypeArgs{...}
type DeploymentStrategyTypeInput interface {
	pulumi.Input

	ToDeploymentStrategyTypeOutput() DeploymentStrategyTypeOutput
	ToDeploymentStrategyTypeOutputWithContext(context.Context) DeploymentStrategyTypeOutput
}

var deploymentStrategyTypePtrType = reflect.TypeOf((**DeploymentStrategyType)(nil)).Elem()

type DeploymentStrategyTypePtrInput interface {
	pulumi.Input

	ToDeploymentStrategyTypePtrOutput() DeploymentStrategyTypePtrOutput
	ToDeploymentStrategyTypePtrOutputWithContext(context.Context) DeploymentStrategyTypePtrOutput
}

type deploymentStrategyTypePtr string

func DeploymentStrategyTypePtr(v string) DeploymentStrategyTypePtrInput {
	return (*deploymentStrategyTypePtr)(&v)
}

func (*deploymentStrategyTypePtr) ElementType() reflect.Type {
	return deploymentStrategyTypePtrType
}

func (in *deploymentStrategyTypePtr) ToDeploymentStrategyTypePtrOutput() DeploymentStrategyTypePtrOutput {
	return pulumi.ToOutput(in).(DeploymentStrategyTypePtrOutput)
}

func (in *deploymentStrategyTypePtr) ToDeploymentStrategyTypePtrOutputWithContext(ctx context.Context) DeploymentStrategyTypePtrOutput {
	return pulumi.ToOutputWithContext(ctx, in).(DeploymentStrategyTypePtrOutput)
}

// Kubernetes service types.
type ServiceType string

const (
	ServiceTypeClusterIP    = ServiceType("ClusterIP")
	ServiceTypeLoadBalancer = ServiceType("LoadBalancer")
)

func (ServiceType) ElementType() reflect.Type {
	return reflect.TypeOf((*ServiceType)(nil)).Elem()
}

func (e ServiceType) ToServiceTypeOutput() ServiceTypeOutput {
	return pulumi.ToOutput(e).(ServiceTypeOutput)
}

func (e ServiceType) ToServiceTypeOutputWithContext(ctx context.Context) ServiceTypeOutput {
	return pulumi.ToOutputWithContext(ctx, e).(ServiceTypeOutput)
}

func (e ServiceType) ToServiceTypePtrOutput() ServiceTypePtrOutput {
	return e.ToServiceTypePtrOutputWithContext(context.Background())
}

func (e ServiceType) ToServiceTypePtrOutputWithContext(ctx context.Context) ServiceTypePtrOutput {
	return ServiceType(e).ToServiceTypeOutputWithContext(ctx).ToServiceTypePtrOutputWithContext(ctx)
}

func (e ServiceType) ToStringOutput() pulumi.StringOutput {
	return pulumi.ToOutput(pulumi.String(e)).(pulumi.StringOutput)
}

func (e ServiceType) ToStringOutputWithContext(ctx context.Context) pulumi.StringOutput {
	return pulumi.ToOutputWithContext(ctx, pulumi.String(e)).(pulumi.StringOutput)
}

func (e ServiceType) ToStringPtrOutput() pulumi.StringPtrOutput {
	return pulumi.String(e).ToStringPtrOutputWithContext(context.Background())
}

func (e ServiceType) ToStringPtrOutputWithContext(ctx context.Context) pulumi.StringPtrOutput {
	return pulumi.String(e).ToStringOutputWithContext(ctx).ToStringPtrOutputWithContext(ctx)
}

type ServiceTypeOutput struct{ *pulumi.OutputState }

func (ServiceTypeOutput) ElementType() reflect.Type {
	return reflect.TypeOf((*ServiceType)(nil)).Elem()
}

func (o ServiceTypeOutput) ToServiceTypeOutput() ServiceTypeOutput {
	return o
}

func (o ServiceTypeOutput) ToServiceTypeOutputWithContext(ctx context.Context) ServiceTypeOutput {
	return o
}

func (o ServiceTypeOutput) ToServiceTypePtrOutput() ServiceTypePtrOutput {
	return o.ToServiceTypePtrOutputWithContext(context.Background())
}

func (o ServiceTypeOutput) ToServiceTypePtrOutputWithContext(ctx context.Context) ServiceTypePtrOutput {
	return o.ApplyTWithContext(ctx, func(_ context.Context, v ServiceType) *ServiceType {
		return &v
	}).(ServiceTypePtrOutput)
}

func (o ServiceTypeOutput) ToStringOutput() pulumi.StringOutput {
	return o.ToStringOutputWithContext(context.Background())
}

func (o ServiceTypeOutput) ToStringOutputWithContext(ctx context.Context) pulumi.StringOutput {
	return o.ApplyTWithContext(ctx, func(_ context.Context, e ServiceType) string {
		return string(e)
	}).(pulumi.StringOutput)
}

func (o ServiceTypeOutput) ToStringPtrOutput() pulumi.StringPtrOutput {
	return o.ToStringPtrOutputWithContext(context.Background())
}

func (o ServiceTypeOutput) ToStringPtrOutputWithContext(ctx context.Context) pulumi.StringPtrOutput {
	return o.ApplyTWithContext(ctx, func(_ context.Context, e ServiceType) *string {
		v := string(e)
		return &v
	}).(pulumi.StringPtrOutput)
}

type ServiceTypePtrOutput struct{ *pulumi.OutputState }

func (ServiceTypePtrOutput) ElementType() reflect.Type {
	return reflect.TypeOf((**ServiceType)(nil)).Elem()
}

func (o ServiceTypePtrOutput) ToServiceTypePtrOutput() ServiceTypePtrOutput {
	return o
}

func (o ServiceTypePtrOutput) ToServiceTypePtrOutputWithContext(ctx context.Context) ServiceTypePtrOutput {
	return o
}

func (o ServiceTypePtrOutput) Elem() ServiceTypeOutput {
	return o.ApplyT(func(v *ServiceType) ServiceType {
		if v != nil {
			return *v
		}
		var ret ServiceType
		return ret
	}).(ServiceTypeOutput)
}

func (o ServiceTypePtrOutput) ToStringPtrOutput() pulumi.StringPtrOutput {
	return o.ToStringPtrOutputWithContext(context.Background())
}

func (o ServiceTypePtrOutput) ToStringPtrOutputWithContext(ctx context.Context) pulumi.StringPtrOutput {
	return o.ApplyTWithContext(ctx, func(_ context.Context, e *ServiceType) *string {
		if e == nil {
			return nil
		}
		v := string(*e)
		return &v
	}).(pulumi.StringPtrOutput)
}

// ServiceTypeInput is an input type that accepts ServiceTypeArgs and ServiceTypeOutput values.
// You can construct a concrete instance of `ServiceTypeInput` via:
//
//          ServiceTypeArgs{...}
type ServiceTypeInput interface {
	pulumi.Input

	ToServiceTypeOutput() ServiceTypeOutput
	ToServiceTypeOutputWithContext(context.Context) ServiceTypeOutput
}

var serviceTypePtrType = reflect.TypeOf((**ServiceType)(nil)).Elem()

type ServiceTypePtrInput interface {
	pulumi.Input

	ToServiceTypePtrOutput() ServiceTypePtrOutput
	ToServiceTypePtrOutputWithContext(context.Context) ServiceTypePtrOutput
}

type serviceTypePtr string

func ServiceTypePtr(v string) ServiceTypePtrInput {
	return (*serviceTypePtr)(&v)
}

func (*serviceTypePtr) ElementType() reflect.Type {
	return serviceTypePtrType
}

func (in *serviceTypePtr) ToServiceTypePtrOutput() ServiceTypePtrOutput {
	return pulumi.ToOutput(in).(ServiceTypePtrOutput)
}

func (in *serviceTypePtr) ToServiceTypePtrOutputWithContext(ctx context.Context) ServiceTypePtrOutput {
	return pulumi.ToOutputWithContext(ctx, in).(ServiceTypePtrOutput)
}

func init() {
	pulumi.RegisterInputType(reflect.TypeOf((*DeploymentStrategyTypeInput)(nil)).Elem(), DeploymentStrategyType("Recreate"))
	pulumi.RegisterInputType(reflect.TypeOf((*DeploymentStrategyTypePtrInput)(nil)).Elem(), DeploymentStrategyType("Recreate"))
	pulumi.RegisterInputType(reflect.TypeOf((*ServiceTypeInput)(nil)).Elem(), ServiceType("ClusterIP"))
	pulumi.RegisterInputType(reflect.TypeOf((*ServiceTypePtrInput)(nil)).Elem(), ServiceType("ClusterIP"))
	pulumi.RegisterOutputType(DeploymentStrategyTypeOutput{})
	pulumi.RegisterOutputType(DeploymentStrategyTypePtrOutput{})
	pulumi.RegisterOutputType(ServiceTypeOutput{})
	pulumi.RegisterOutputType(ServiceTypePtrOutput{})
}