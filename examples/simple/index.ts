import * as homelab from "@unmango/pulumi-homelab";

const heimdall = new homelab.docker.linuxserver.Heimdall("heimdall");

export const container = heimdall.container;
