// *** WARNING: this file was generated by Pulumi SDK Generator. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Threading.Tasks;
using Pulumi.Serialization;

namespace Pulumi.Homelab.Inputs
{

    public sealed class DeploymentArgs : Pulumi.ResourceArgs
    {
        [Input("strategy")]
        public Input<Inputs.DeploymentStrategyArgs>? Strategy { get; set; }

        public DeploymentArgs()
        {
        }
    }
}