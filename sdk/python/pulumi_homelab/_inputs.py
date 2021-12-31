# coding=utf-8
# *** WARNING: this file was generated by Pulumi SDK Generator. ***
# *** Do not edit by hand unless you're certain you know what you are doing! ***

import warnings
import pulumi
import pulumi.runtime
from typing import Any, Mapping, Optional, Sequence, Union, overload
from . import _utilities
from ._enums import *

__all__ = [
    'DeploymentArgs',
    'DeploymentStrategyArgs',
    'ImageArgsArgs',
    'ServiceArgs',
]

@pulumi.input_type
class DeploymentArgs:
    def __init__(__self__, *,
                 strategy: Optional[pulumi.Input['DeploymentStrategyArgs']] = None):
        if strategy is not None:
            pulumi.set(__self__, "strategy", strategy)

    @property
    @pulumi.getter
    def strategy(self) -> Optional[pulumi.Input['DeploymentStrategyArgs']]:
        return pulumi.get(self, "strategy")

    @strategy.setter
    def strategy(self, value: Optional[pulumi.Input['DeploymentStrategyArgs']]):
        pulumi.set(self, "strategy", value)


@pulumi.input_type
class DeploymentStrategyArgs:
    def __init__(__self__, *,
                 type: Optional[pulumi.Input['DeploymentStrategyType']] = None):
        if type is None:
            type = 'Recreate'
        if type is not None:
            pulumi.set(__self__, "type", type)

    @property
    @pulumi.getter
    def type(self) -> Optional[pulumi.Input['DeploymentStrategyType']]:
        return pulumi.get(self, "type")

    @type.setter
    def type(self, value: Optional[pulumi.Input['DeploymentStrategyType']]):
        pulumi.set(self, "type", value)


@pulumi.input_type
class ImageArgsArgs:
    def __init__(__self__, *,
                 registry: Optional[pulumi.Input[str]] = None,
                 repository: Optional[pulumi.Input[str]] = None,
                 tag: Optional[pulumi.Input[str]] = None):
        if registry is not None:
            pulumi.set(__self__, "registry", registry)
        if repository is not None:
            pulumi.set(__self__, "repository", repository)
        if tag is not None:
            pulumi.set(__self__, "tag", tag)

    @property
    @pulumi.getter
    def registry(self) -> Optional[pulumi.Input[str]]:
        return pulumi.get(self, "registry")

    @registry.setter
    def registry(self, value: Optional[pulumi.Input[str]]):
        pulumi.set(self, "registry", value)

    @property
    @pulumi.getter
    def repository(self) -> Optional[pulumi.Input[str]]:
        return pulumi.get(self, "repository")

    @repository.setter
    def repository(self, value: Optional[pulumi.Input[str]]):
        pulumi.set(self, "repository", value)

    @property
    @pulumi.getter
    def tag(self) -> Optional[pulumi.Input[str]]:
        return pulumi.get(self, "tag")

    @tag.setter
    def tag(self, value: Optional[pulumi.Input[str]]):
        pulumi.set(self, "tag", value)


@pulumi.input_type
class ServiceArgs:
    def __init__(__self__, *,
                 type: pulumi.Input['ServiceType'],
                 name: Optional[pulumi.Input[str]] = None):
        pulumi.set(__self__, "type", type)
        if name is not None:
            pulumi.set(__self__, "name", name)

    @property
    @pulumi.getter
    def type(self) -> pulumi.Input['ServiceType']:
        return pulumi.get(self, "type")

    @type.setter
    def type(self, value: pulumi.Input['ServiceType']):
        pulumi.set(self, "type", value)

    @property
    @pulumi.getter
    def name(self) -> Optional[pulumi.Input[str]]:
        return pulumi.get(self, "name")

    @name.setter
    def name(self, value: Optional[pulumi.Input[str]]):
        pulumi.set(self, "name", value)

