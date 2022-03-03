// *** WARNING: this file was generated by Pulumi SDK Generator. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Threading.Tasks;
using Pulumi.Serialization;

namespace Pulumi.Homelab.Docker/linuxserver
{
    [HomelabResourceType("homelab:docker/linuxserver:Heimdall")]
    public partial class Heimdall : Pulumi.ComponentResource
    {
        [Output("container")]
        public Output<Pulumi.Docker.Container?> Container { get; private set; } = null!;


        /// <summary>
        /// Create a Heimdall resource with the given unique name, arguments, and options.
        /// </summary>
        ///
        /// <param name="name">The unique name of the resource</param>
        /// <param name="args">The arguments used to populate this resource's properties</param>
        /// <param name="options">A bag of options that control this resource's behavior</param>
        public Heimdall(string name, HeimdallArgs? args = null, ComponentResourceOptions? options = null)
            : base("homelab:docker/linuxserver:Heimdall", name, args ?? new HeimdallArgs(), MakeResourceOptions(options, ""), remote: true)
        {
        }

        private static ComponentResourceOptions MakeResourceOptions(ComponentResourceOptions? options, Input<string>? id)
        {
            var defaultOptions = new ComponentResourceOptions
            {
                Version = Utilities.Version,
                PluginDownloadURL = "https://github.com/unmango/pulumi-homelab/releases/download/${VERSION}",
            };
            var merged = ComponentResourceOptions.Merge(defaultOptions, options);
            // Override the ID if one was specified for consistency with other language SDKs.
            merged.Id = id ?? merged.Id;
            return merged;
        }
    }

    public sealed class HeimdallArgs : Pulumi.ResourceArgs
    {
        /// <summary>
        /// Host path to mount to /config in the container.
        /// </summary>
        [Input("configPath")]
        public Input<string>? ConfigPath { get; set; }

        /// <summary>
        /// Port arguments for the container.
        /// </summary>
        [Input("ports")]
        public Input<Inputs.HeimdallPortsArgs>? Ports { get; set; }

        /// <summary>
        /// Container restart policy.
        /// </summary>
        [Input("restart")]
        public Input<Pulumi.Homelab.Docker.RestartPolicy>? Restart { get; set; }

        public HeimdallArgs()
        {
        }
    }
}
