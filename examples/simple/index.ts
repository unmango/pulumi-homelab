import * as homelab from "@unmango/pulumi-homelab";

const dockerHeimdall = new homelab.docker.linuxserver.Heimdall("heimdall");
const k8sHeimdall = new homelab.kubernetes.linuxserver.Heimdall("heimdall");

export const container = dockerHeimdall.container;
export const statefulSet = k8sHeimdall.statefulSet;
