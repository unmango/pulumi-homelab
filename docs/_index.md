---
title: Homelab
meta_desc: A collection of typed Pulumi components for popular applications deployed in homelabs
layout: overview
---

The homelab provider for Pulumi contains a collection of components to deploy popular homelab applications on top of Kubernetes and Docker.
This includes [linuxserver.io images](https://fleet.linuxserver.io), [Bitnami images](https://bitnami.com/stacks), and other popular applications such as [traefik](https://traefik.io), [certmanager](https://cert-manager.io/), and more!

You'll need to have either the Kubernetes or Docker providers configured depending on which components you plan to use.
See instructions for [Kubernetes](https://www.pulumi.com/registry/packages/kubernetes/installation-configuration/) or [Docker](https://www.pulumi.com/registry/packages/docker/installation-configuration/).

{{< chooser language "typescript,python,csharp,go" >}}

{{% choosable language typescript %}}

```typescript
import * as lsioDocker from '@unmango/pulumi-homelab/docker/linuxserver'
import * as lsioK8s from '@unmango/pulumi-homelab/k8s/linuxserver'

const radarrDocker = new lsioDocker.Radarr('radarr-docker', {
    // ... your args
});

const radarrK8s = new lsioDocker.Radarr('radarr-k8s', {
    // ... your args
});
```

{{ /choosable }}

{{% choosable language python %}}

```python
import pulumi_homelab as homelab

radarr_docker = homelab.docker.linuxserver.Radarr("radarr-docker")
radarr_k8s = homelab.k8s.linuxserver.Radarr("radarr-k8s")
```

{{% /choosable %}}

{{% choosable language csharp %}}

```csharp
using Pulumi;
using Pulumi.Homelab;

class MyStack : Stack
{
    public MyStack()
    {
        var radarrDocker = new Docker.LinuxServer("radarr-docker");
        var radarrK8s = new K8s.LinuxServer("radarr-k8s");
    }
}

class Program
{
    static Task<int> Main(string[] args) => Deployment.RunAsync<MyStack>();
}
```

{{% /choosable %}}

{{% choosable language go %}}

```go
package main

import (
    "github.com/pulumi/pulumi-homelab/sdk/go/homelab/docker"
    "github.com/pulumi/pulumi-homelab/sdk/go/homelab/k8s"
    "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
    pulumi.Run(func(ctx *pulumi.Context) error {
        // TODO: I don't know go and have no idea if this is correct
        _, err := docker.linuxserver.NewRadarr(ctx, "radarr-docker", nil)
        _, err := k8s.linuxserver.NewRadarr(ctx, "radarr-k8s", nil)
        if err != nil {
            return err
        }
        return nil
    })
}
```

{{% /choosable %}}

{{< /chooser >}}
