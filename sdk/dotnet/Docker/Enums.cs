// *** WARNING: this file was generated by Pulumi SDK Generator. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

using System;
using System.ComponentModel;
using Pulumi;

namespace Pulumi.Homelab.Docker
{
    /// <summary>
    /// Container restart policy.
    /// </summary>
    [EnumType]
    public readonly struct RestartPolicy : IEquatable<RestartPolicy>
    {
        private readonly string _value;

        private RestartPolicy(string value)
        {
            _value = value ?? throw new ArgumentNullException(nameof(value));
        }

        public static RestartPolicy Always { get; } = new RestartPolicy("always");
        public static RestartPolicy No { get; } = new RestartPolicy("no");
        public static RestartPolicy OnFailure { get; } = new RestartPolicy("on-failure");
        public static RestartPolicy UnlessStopped { get; } = new RestartPolicy("unless-stopped");

        public static bool operator ==(RestartPolicy left, RestartPolicy right) => left.Equals(right);
        public static bool operator !=(RestartPolicy left, RestartPolicy right) => !left.Equals(right);

        public static explicit operator string(RestartPolicy value) => value._value;

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override bool Equals(object? obj) => obj is RestartPolicy other && Equals(other);
        public bool Equals(RestartPolicy other) => string.Equals(_value, other._value, StringComparison.Ordinal);

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override int GetHashCode() => _value?.GetHashCode() ?? 0;

        public override string ToString() => _value;
    }
}
