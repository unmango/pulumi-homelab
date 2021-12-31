// *** WARNING: this file was generated by Pulumi SDK Generator. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Threading.Tasks;
using Pulumi.Serialization;

namespace Pulumi.Homelab
{
    [HomelabResourceType("homelab:index/kubernetes/linuxserver:Radarr")]
    public partial class Radarr : Pulumi.ComponentResource
    {
        /// <summary>
        /// Create a Radarr resource with the given unique name, arguments, and options.
        /// </summary>
        ///
        /// <param name="name">The unique name of the resource</param>
        /// <param name="args">The arguments used to populate this resource's properties</param>
        /// <param name="options">A bag of options that control this resource's behavior</param>
        public Radarr(string name, RadarrArgs? args = null, ComponentResourceOptions? options = null)
            : base("homelab:index/kubernetes/linuxserver:Radarr", name, args ?? new RadarrArgs(), MakeResourceOptions(options, ""), remote: true)
        {
        }

        private static ComponentResourceOptions MakeResourceOptions(ComponentResourceOptions? options, Input<string>? id)
        {
            var defaultOptions = new ComponentResourceOptions
            {
                Version = Utilities.Version,
            };
            var merged = ComponentResourceOptions.Merge(defaultOptions, options);
            // Override the ID if one was specified for consistency with other language SDKs.
            merged.Id = id ?? merged.Id;
            return merged;
        }
    }

    public sealed class RadarrArgs : Pulumi.ResourceArgs
    {
        [Input("deployment")]
        public Input<Inputs.DeploymentArgs>? Deployment { get; set; }

        [Input("image")]
        public InputUnion<string, Inputs.ImageArgsArgs>? Image { get; set; }

        /// <summary>
        /// Optional name override.
        /// </summary>
        [Input("name")]
        public Input<string>? Name { get; set; }

        /// <summary>
        /// Namespace to provision resources in.
        /// </summary>
        [Input("namespace")]
        public Input<string>? Namespace { get; set; }

        [Input("service")]
        public Input<Inputs.ServiceArgs>? Service { get; set; }

        public RadarrArgs()
        {
        }
    }
}