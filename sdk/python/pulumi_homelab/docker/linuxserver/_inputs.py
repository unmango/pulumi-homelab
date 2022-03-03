# coding=utf-8
# *** WARNING: this file was generated by Pulumi SDK Generator. ***
# *** Do not edit by hand unless you're certain you know what you are doing! ***

import warnings
import pulumi
import pulumi.runtime
from typing import Any, Mapping, Optional, Sequence, Union, overload
from ... import _utilities

__all__ = [
    'HeimdallPortsArgs',
]

@pulumi.input_type
class HeimdallPortsArgs:
    def __init__(__self__, *,
                 http: Optional[pulumi.Input[float]] = None,
                 https: Optional[pulumi.Input[float]] = None):
        """
        Port arguments for the container.
        :param pulumi.Input[float] http: External port to expose container port 80.
        :param pulumi.Input[float] https: External port to expose container port 443.
        """
        if http is not None:
            pulumi.set(__self__, "http", http)
        if https is not None:
            pulumi.set(__self__, "https", https)

    @property
    @pulumi.getter
    def http(self) -> Optional[pulumi.Input[float]]:
        """
        External port to expose container port 80.
        """
        return pulumi.get(self, "http")

    @http.setter
    def http(self, value: Optional[pulumi.Input[float]]):
        pulumi.set(self, "http", value)

    @property
    @pulumi.getter
    def https(self) -> Optional[pulumi.Input[float]]:
        """
        External port to expose container port 443.
        """
        return pulumi.get(self, "https")

    @https.setter
    def https(self, value: Optional[pulumi.Input[float]]):
        pulumi.set(self, "https", value)


