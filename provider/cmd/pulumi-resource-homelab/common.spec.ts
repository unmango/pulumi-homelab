import * as pulumi from '@pulumi/pulumi';

pulumi.runtime.setMocks({
    newResource: (args: pulumi.runtime.MockResourceArgs): { id: string, state: any } => {
        return {
            id: args.inputs.name + '_id',
            state: args.inputs,
        }
    },
    call: (args: pulumi.runtime.MockCallArgs): any => {
        return args.inputs;
    },
});
