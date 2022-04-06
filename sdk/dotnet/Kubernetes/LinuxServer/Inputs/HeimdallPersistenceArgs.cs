// *** WARNING: this file was generated by Pulumi SDK Generator. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Threading.Tasks;
using Pulumi.Serialization;

namespace Pulumi.Homelab.Kubernetes.LinuxServer.Inputs
{

    /// <summary>
    /// Heimdall persistence options.
    /// </summary>
    public sealed class HeimdallPersistenceArgs : Pulumi.ResourceArgs
    {
        [Input("accessModes")]
        private InputList<string>? _accessModes;

        /// <summary>
        /// Access modes for the persistent volume claim template.
        /// </summary>
        public InputList<string> AccessModes
        {
            get => _accessModes ?? (_accessModes = new InputList<string>());
            set => _accessModes = value;
        }

        /// <summary>
        /// Whether to enable persistence or not.
        /// </summary>
        [Input("enabled")]
        public Input<bool>? Enabled { get; set; }

        /// <summary>
        /// Size of the volume to request from the storage class.
        /// </summary>
        [Input("size")]
        public Input<string>? Size { get; set; }

        /// <summary>
        /// Name of the storage class to use in the persistent volume claim template.
        /// </summary>
        [Input("storageClass")]
        public Input<string>? StorageClass { get; set; }

        public HeimdallPersistenceArgs()
        {
            Enabled = false;
            Size = "1Gi";
        }
    }
}