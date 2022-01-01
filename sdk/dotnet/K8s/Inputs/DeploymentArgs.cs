// *** WARNING: this file was generated by Pulumi SDK Generator. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Threading.Tasks;
using Pulumi.Serialization;

namespace Pulumi.Homelab.K8s.Inputs
{

    public sealed class DeploymentArgs : Pulumi.ResourceArgs
    {
        /// <summary>
        /// Deployment strategy to use.
        /// </summary>
        [Input("strategy")]
        public Input<Inputs.DeploymentStrategyArgs>? Strategy { get; set; }

        public DeploymentArgs()
        {
        }
    }
}
