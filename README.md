# Homelab Pulumi Component Provider

This repo is a collection of Pulumi resources for commonly deployed homelab applications implemented as a [component provider](https://www.pulumi.com/docs/intro/concepts/resources/#components).
Deployment options exist for both kubernetes and docker, with (hopefully) further customization from there.

An example of using the `StaticPage` component in TypeScript is in `examples/simple`.

Note that the provider plugin (`pulumi-resource-homelab`) must be on your `PATH` to be used by Pulumi deployments. In this case, `pulumi-resource-homelab` is a platform-specific binary that includes its Node.js dependency along with the provider code, created using [nexe](https://github.com/nexe/nexe). By default, running `make install` will create the binary specific to your host environment, but you can override the binary target by passing in `make install target=<targe-string>` where `target-string` is a [valid nexe target](https://github.com/nexe/nexe#target-string--object).

After running `make install`, `pulumi-resource-homelab` will be available in the `./bin` directory. You can add this to your path in bash with `export PATH=$PATH:$PWD/bin`.

If creating a provider for distribution to other users, they will need `pulumi-resource-homelab` directory on their `PATH`. See the Packaging section below for more on distributing the provider to users.

## Prerequisites

- Pulumi CLI
- Node.js
- Yarn
- Go 1.15 (to regenerate the SDKs)
- Python 3.6+ (to build the Python SDK)
- .NET Core SDK (to build the .NET SDK)

## Build and Test

```bash
# Build and install the provider
make install_provider

# Regenerate SDKs
make generate

# Ensure the pulumi-provider-homelab script is on PATH
$ export PATH=$PATH:$PWD/bin

# Test Node.js SDK
$ make install_nodejs_sdk
$ cd examples/simple
$ yarn install
$ yarn link @unmango/pulumi-homelab
$ pulumi stack init test
$ pulumi config set aws:region us-east-1
$ pulumi up
```

## Naming

The `homelab` provider's plugin must be named `pulumi-resource-homelab` (in the format `pulumi-resource-<provider>`).

While the provider plugin must follow this naming convention, the SDK package naming can be customized.

## Packaging

The provider plugin can be packaged into a tarball and hosted at a custom server URL to make it easier to distribute to users.

Currently, three tarball files are necessary for Linux, macOS, and Windows (`pulumi-resource-homelab-v0.0.1-linux-amd64.tar.gz`, `pulumi-resource-homelab-v0.0.1-darwin-amd64.tar.gz`, `pulumi-resource-homelab-v0.0.1-windows-amd64.tar.gz`) each containing the same file: the platform-specific binary `pulumi-resource-homelab` created in the `./bin` directory after running `make install_provider`. These artifacts can be generated automatically in the `dist` directory using `make dist`.

## Example component

Let's look at the example `StaticPage` component resource in more detail.

### Schema

The example `StaticPage` component resource is defined in `schema.yaml`:

```yaml
resources:
  homelab:index:StaticPage:
    isComponent: true
    inputProperties:
      indexContent:
        type: string
        description: The HTML content for index.html.
    requiredInputs:
      - indexContent
    properties:
      bucket:
        "$ref": "/aws/v3.30.0/schema.json#/resources/aws:s3%2Fbucket:Bucket",
        description: The bucket resource.
      websiteUrl:
        type: string
        description: The website URL.
    required:
      - bucket
      - websiteUrl
```

The component resource's type token is `homelab:index:StaticPage` in the format of `<package>:<module>:<type>`. In this case, it's in the `homelab` package and `index` module. This is the same type token passed inside the implementation of `StaticPage` in `provider/cmd/pulumi-resource-homelab/staticPage.ts`, and also the same token referenced in `construct` in `provider/cmd/pulumi-resource-homelab/provider.ts`.

This component has a required `indexContent` input property typed as `string`, and two required output properties: `bucket` and `websiteUrl`. Note that `bucket` is typed as the `aws:s3/bucket:Bucket` resource from the `aws` provider (in the schema the `/` is escaped as `%2F`).

Since this component returns a type from the `aws` provider, each SDK must reference the associated Pulumi `aws` SDK for the language. For the .NET, Node.js, and Python SDKs, dependencies are specified in the `language` section of the schema:

```yaml
language:
  csharp:
    packageReferences:
      Pulumi: 2.*
      Pulumi.Aws: 3.*
  nodejs:
    dependencies:
      "@pulumi/aws": "^3.30.0"
    devDependencies:
      typescript: "^3.7.0"
  python:
    requires:
      pulumi: ">=2.21.2,<3.0.0",
      pulumi-aws: ">=3.30.0,<4.0.0"
```

For the Go SDK, dependencies are specified in the `sdk/go.mod` file.

### Implementation

The implementation of this component is in `provider/cmd/pulumi-resource-homelab/staticPage.ts` and the structure of the component's inputs and outputs aligns with what is defined in `schema.yaml`:

```typescript
export interface StaticPageArgs {
    indexContent: pulumi.Input<string>;
}

export class StaticPage extends pulumi.ComponentResource {
    public readonly bucket: aws.s3.Bucket;
    public readonly websiteUrl: pulumi.Output<string>;

    constructor(name: string, args: StaticPageArgs, opts?: pulumi.ComponentResourceOptions) {
        super("homelab:index:StaticPage", name, args, opts);

        ...
    }
}
```

The provider makes this component resource available in the `construct` method in `provider/cmd/pulumi-resource-homelab/provider.ts`. When `construct` is called and the `type` argument is `homelab:index:StaticPage`, we create an instance of the `StaticPage` component resource and return its `URN` and outputs as its state.

```typescript
async function constructStaticPage(name: string, inputs: pulumi.Inputs,
    options: pulumi.ComponentResourceOptions): Promise<provider.ConstructResult> {

    // Create the component resource.
    const staticPage = new StaticPage(name, inputs as StaticPageArgs, options);

    // Return the component resource's URN and outputs as its state.
    return {
        urn: staticPage.urn,
        state: {
            bucket: staticPage.bucket,
            websiteUrl: staticPage.websiteUrl,
        },
    };
}
```
