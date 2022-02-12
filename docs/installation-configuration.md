---
title: Homelab Setup
meta_desc: How to configure homelab components
layout: installation
---

## Installation

The homelab provider is available as a package in all Pulumi languages:

* Javascript/TypeScript: [`@unmango/pulumi-homelab`](https://www.npmjs.com/package/@unmango/pulumi-homelab)
* Python: [`unmango-pulumi-homelab`](https://pypi.org/project/unmango-pulumi-homelab)
* Go: [`github.com/unmango/pulumi-homelab/sdk/go/homelab`](https://github.com/unmango/pulumi-homelab)
* .NET: [`Pulumi.Homelab`](https://www.nuget.org/packages/Pulumi.Homelab)

## Setup

You'll need to have either the Kubernetes or Docker providers configured depending on which components you plan to use.
See instructions for [Kubernetes](https://www.pulumi.com/registry/packages/kubernetes/installation-configuration/) or [Docker](https://www.pulumi.com/registry/packages/docker/installation-configuration/).
