# coding=utf-8
# *** WARNING: this file was generated by Pulumi SDK Generator. ***
# *** Do not edit by hand unless you're certain you know what you are doing! ***

import warnings
import pulumi
import pulumi.runtime
from typing import Any, Mapping, Optional, Sequence, Union, overload
from ... import _utilities
from ... import docker
from ._inputs import *
import pulumi_docker

__all__ = ['HeimdallArgs', 'Heimdall']

@pulumi.input_type
class HeimdallArgs:
    def __init__(__self__, *,
                 config_path: Optional[pulumi.Input[str]] = None,
                 ports: Optional[pulumi.Input['HeimdallPortsArgs']] = None,
                 restart: Optional[pulumi.Input['_docker.RestartPolicy']] = None):
        """
        The set of arguments for constructing a Heimdall resource.
        :param pulumi.Input[str] config_path: Host path to mount to /config in the container.
        :param pulumi.Input['HeimdallPortsArgs'] ports: Port arguments for the container.
        :param pulumi.Input['_docker.RestartPolicy'] restart: Container restart policy.
        """
        if config_path is not None:
            pulumi.set(__self__, "config_path", config_path)
        if ports is not None:
            pulumi.set(__self__, "ports", ports)
        if restart is not None:
            pulumi.set(__self__, "restart", restart)

    @property
    @pulumi.getter(name="configPath")
    def config_path(self) -> Optional[pulumi.Input[str]]:
        """
        Host path to mount to /config in the container.
        """
        return pulumi.get(self, "config_path")

    @config_path.setter
    def config_path(self, value: Optional[pulumi.Input[str]]):
        pulumi.set(self, "config_path", value)

    @property
    @pulumi.getter
    def ports(self) -> Optional[pulumi.Input['HeimdallPortsArgs']]:
        """
        Port arguments for the container.
        """
        return pulumi.get(self, "ports")

    @ports.setter
    def ports(self, value: Optional[pulumi.Input['HeimdallPortsArgs']]):
        pulumi.set(self, "ports", value)

    @property
    @pulumi.getter
    def restart(self) -> Optional[pulumi.Input['_docker.RestartPolicy']]:
        """
        Container restart policy.
        """
        return pulumi.get(self, "restart")

    @restart.setter
    def restart(self, value: Optional[pulumi.Input['_docker.RestartPolicy']]):
        pulumi.set(self, "restart", value)


class Heimdall(pulumi.ComponentResource):
    @overload
    def __init__(__self__,
                 resource_name: str,
                 opts: Optional[pulumi.ResourceOptions] = None,
                 config_path: Optional[pulumi.Input[str]] = None,
                 ports: Optional[pulumi.Input[pulumi.InputType['HeimdallPortsArgs']]] = None,
                 restart: Optional[pulumi.Input['_docker.RestartPolicy']] = None,
                 __props__=None):
        """
        Create a Heimdall resource with the given unique name, props, and options.
        :param str resource_name: The name of the resource.
        :param pulumi.ResourceOptions opts: Options for the resource.
        :param pulumi.Input[str] config_path: Host path to mount to /config in the container.
        :param pulumi.Input[pulumi.InputType['HeimdallPortsArgs']] ports: Port arguments for the container.
        :param pulumi.Input['_docker.RestartPolicy'] restart: Container restart policy.
        """
        ...
    @overload
    def __init__(__self__,
                 resource_name: str,
                 args: Optional[HeimdallArgs] = None,
                 opts: Optional[pulumi.ResourceOptions] = None):
        """
        Create a Heimdall resource with the given unique name, props, and options.
        :param str resource_name: The name of the resource.
        :param HeimdallArgs args: The arguments to use to populate this resource's properties.
        :param pulumi.ResourceOptions opts: Options for the resource.
        """
        ...
    def __init__(__self__, resource_name: str, *args, **kwargs):
        resource_args, opts = _utilities.get_resource_args_opts(HeimdallArgs, pulumi.ResourceOptions, *args, **kwargs)
        if resource_args is not None:
            __self__._internal_init(resource_name, opts, **resource_args.__dict__)
        else:
            __self__._internal_init(resource_name, *args, **kwargs)

    def _internal_init(__self__,
                 resource_name: str,
                 opts: Optional[pulumi.ResourceOptions] = None,
                 config_path: Optional[pulumi.Input[str]] = None,
                 ports: Optional[pulumi.Input[pulumi.InputType['HeimdallPortsArgs']]] = None,
                 restart: Optional[pulumi.Input['_docker.RestartPolicy']] = None,
                 __props__=None):
        if opts is None:
            opts = pulumi.ResourceOptions()
        if not isinstance(opts, pulumi.ResourceOptions):
            raise TypeError('Expected resource options to be a ResourceOptions instance')
        if opts.version is None:
            opts.version = _utilities.get_version()
        if opts.plugin_download_url is None:
            opts.plugin_download_url = _utilities.get_plugin_download_url()
        if opts.id is not None:
            raise ValueError('ComponentResource classes do not support opts.id')
        else:
            if __props__ is not None:
                raise TypeError('__props__ is only valid when passed in combination with a valid opts.id to get an existing resource')
            __props__ = HeimdallArgs.__new__(HeimdallArgs)

            __props__.__dict__["config_path"] = config_path
            __props__.__dict__["ports"] = ports
            __props__.__dict__["restart"] = restart
            __props__.__dict__["container"] = None
        super(Heimdall, __self__).__init__(
            'homelab:docker/linuxserver:Heimdall',
            resource_name,
            __props__,
            opts,
            remote=True)

    @property
    @pulumi.getter
    def container(self) -> pulumi.Output[Optional['pulumi_docker.Container']]:
        return pulumi.get(self, "container")

