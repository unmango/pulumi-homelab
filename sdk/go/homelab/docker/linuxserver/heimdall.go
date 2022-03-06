// *** WARNING: this file was generated by Pulumi SDK Generator. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

package linuxserver

import (
	"context"
	"reflect"

	"github.com/pulumi/pulumi-docker/sdk/v3/go/docker"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"github.com/unmango/pulumi-homelab/sdk/go/homelab/docker"
	"github.com/unmango/pulumi-homelab/sdk/go/homelab/linuxserver"
)

// Heimdall is a way to organise all those links to your most
// used web sites and web applications in a simple way.
// https://github.com/linuxserver/docker-heimdall
type Heimdall struct {
	pulumi.ResourceState

	// Heimdall container resource.
	Container docker.ContainerOutput `pulumi:"container"`
	// Linuxserver Heimdall image resource.
	Image docker.RemoteImageOutput `pulumi:"image"`
}

// NewHeimdall registers a new resource with the given unique name, arguments, and options.
func NewHeimdall(ctx *pulumi.Context,
	name string, args *HeimdallArgs, opts ...pulumi.ResourceOption) (*Heimdall, error) {
	if args == nil {
		args = &HeimdallArgs{}
	}

	opts = pkgResourceDefaultOpts(opts)
	var resource Heimdall
	err := ctx.RegisterRemoteComponentResource("homelab:docker/linuxserver:Heimdall", name, args, &resource, opts...)
	if err != nil {
		return nil, err
	}
	return &resource, nil
}

type heimdallArgs struct {
	// Host path to mount to /config in the container.
	ConfigPath *string `pulumi:"configPath"`
	// The user id to run the container as.
	// See https://github.com/linuxserver/docker-heimdall#user--group-identifiers
	Pgid *string `pulumi:"pgid"`
	// Port arguments for the container.
	Ports *linuxserver.HeimdallPorts `pulumi:"ports"`
	// The group id to run the container as.
	// See https://github.com/linuxserver/docker-heimdall#user--group-identifiers
	Puid *string `pulumi:"puid"`
	// Container restart policy.
	Restart *docker.RestartPolicy `pulumi:"restart"`
	// The timezone to use.
	Tz *string `pulumi:"tz"`
}

// The set of arguments for constructing a Heimdall resource.
type HeimdallArgs struct {
	// Host path to mount to /config in the container.
	ConfigPath pulumi.StringPtrInput
	// The user id to run the container as.
	// See https://github.com/linuxserver/docker-heimdall#user--group-identifiers
	Pgid pulumi.StringPtrInput
	// Port arguments for the container.
	Ports linuxserver.HeimdallPortsPtrInput
	// The group id to run the container as.
	// See https://github.com/linuxserver/docker-heimdall#user--group-identifiers
	Puid pulumi.StringPtrInput
	// Container restart policy.
	Restart docker.RestartPolicyPtrInput
	// The timezone to use.
	Tz pulumi.StringPtrInput
}

func (HeimdallArgs) ElementType() reflect.Type {
	return reflect.TypeOf((*heimdallArgs)(nil)).Elem()
}

type HeimdallInput interface {
	pulumi.Input

	ToHeimdallOutput() HeimdallOutput
	ToHeimdallOutputWithContext(ctx context.Context) HeimdallOutput
}

func (*Heimdall) ElementType() reflect.Type {
	return reflect.TypeOf((**Heimdall)(nil)).Elem()
}

func (i *Heimdall) ToHeimdallOutput() HeimdallOutput {
	return i.ToHeimdallOutputWithContext(context.Background())
}

func (i *Heimdall) ToHeimdallOutputWithContext(ctx context.Context) HeimdallOutput {
	return pulumi.ToOutputWithContext(ctx, i).(HeimdallOutput)
}

// HeimdallArrayInput is an input type that accepts HeimdallArray and HeimdallArrayOutput values.
// You can construct a concrete instance of `HeimdallArrayInput` via:
//
//          HeimdallArray{ HeimdallArgs{...} }
type HeimdallArrayInput interface {
	pulumi.Input

	ToHeimdallArrayOutput() HeimdallArrayOutput
	ToHeimdallArrayOutputWithContext(context.Context) HeimdallArrayOutput
}

type HeimdallArray []HeimdallInput

func (HeimdallArray) ElementType() reflect.Type {
	return reflect.TypeOf((*[]*Heimdall)(nil)).Elem()
}

func (i HeimdallArray) ToHeimdallArrayOutput() HeimdallArrayOutput {
	return i.ToHeimdallArrayOutputWithContext(context.Background())
}

func (i HeimdallArray) ToHeimdallArrayOutputWithContext(ctx context.Context) HeimdallArrayOutput {
	return pulumi.ToOutputWithContext(ctx, i).(HeimdallArrayOutput)
}

// HeimdallMapInput is an input type that accepts HeimdallMap and HeimdallMapOutput values.
// You can construct a concrete instance of `HeimdallMapInput` via:
//
//          HeimdallMap{ "key": HeimdallArgs{...} }
type HeimdallMapInput interface {
	pulumi.Input

	ToHeimdallMapOutput() HeimdallMapOutput
	ToHeimdallMapOutputWithContext(context.Context) HeimdallMapOutput
}

type HeimdallMap map[string]HeimdallInput

func (HeimdallMap) ElementType() reflect.Type {
	return reflect.TypeOf((*map[string]*Heimdall)(nil)).Elem()
}

func (i HeimdallMap) ToHeimdallMapOutput() HeimdallMapOutput {
	return i.ToHeimdallMapOutputWithContext(context.Background())
}

func (i HeimdallMap) ToHeimdallMapOutputWithContext(ctx context.Context) HeimdallMapOutput {
	return pulumi.ToOutputWithContext(ctx, i).(HeimdallMapOutput)
}

type HeimdallOutput struct{ *pulumi.OutputState }

func (HeimdallOutput) ElementType() reflect.Type {
	return reflect.TypeOf((**Heimdall)(nil)).Elem()
}

func (o HeimdallOutput) ToHeimdallOutput() HeimdallOutput {
	return o
}

func (o HeimdallOutput) ToHeimdallOutputWithContext(ctx context.Context) HeimdallOutput {
	return o
}

type HeimdallArrayOutput struct{ *pulumi.OutputState }

func (HeimdallArrayOutput) ElementType() reflect.Type {
	return reflect.TypeOf((*[]*Heimdall)(nil)).Elem()
}

func (o HeimdallArrayOutput) ToHeimdallArrayOutput() HeimdallArrayOutput {
	return o
}

func (o HeimdallArrayOutput) ToHeimdallArrayOutputWithContext(ctx context.Context) HeimdallArrayOutput {
	return o
}

func (o HeimdallArrayOutput) Index(i pulumi.IntInput) HeimdallOutput {
	return pulumi.All(o, i).ApplyT(func(vs []interface{}) *Heimdall {
		return vs[0].([]*Heimdall)[vs[1].(int)]
	}).(HeimdallOutput)
}

type HeimdallMapOutput struct{ *pulumi.OutputState }

func (HeimdallMapOutput) ElementType() reflect.Type {
	return reflect.TypeOf((*map[string]*Heimdall)(nil)).Elem()
}

func (o HeimdallMapOutput) ToHeimdallMapOutput() HeimdallMapOutput {
	return o
}

func (o HeimdallMapOutput) ToHeimdallMapOutputWithContext(ctx context.Context) HeimdallMapOutput {
	return o
}

func (o HeimdallMapOutput) MapIndex(k pulumi.StringInput) HeimdallOutput {
	return pulumi.All(o, k).ApplyT(func(vs []interface{}) *Heimdall {
		return vs[0].(map[string]*Heimdall)[vs[1].(string)]
	}).(HeimdallOutput)
}

func init() {
	pulumi.RegisterInputType(reflect.TypeOf((*HeimdallInput)(nil)).Elem(), &Heimdall{})
	pulumi.RegisterInputType(reflect.TypeOf((*HeimdallArrayInput)(nil)).Elem(), HeimdallArray{})
	pulumi.RegisterInputType(reflect.TypeOf((*HeimdallMapInput)(nil)).Elem(), HeimdallMap{})
	pulumi.RegisterOutputType(HeimdallOutput{})
	pulumi.RegisterOutputType(HeimdallArrayOutput{})
	pulumi.RegisterOutputType(HeimdallMapOutput{})
}
