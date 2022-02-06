import * as homelab from "@unmango/pulumi-homelab";
import * as k8s from "@pulumi/kubernetes";

const namespace = new k8s.core.v1.Namespace("pulumi-homelab");

const radarr = new homelab.k8s.linuxserver.Radarr("radarr", {
    name: "pulumi-homelab-simple",
    namespace: namespace.metadata.name,
});
