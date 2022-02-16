import * as pulumi from '@pulumi/pulumi';
import * as assert from 'assert';
import { Heimdall } from './heimdall';
import 'mocha';

describe('Heimdall', () => {
    describe('when `configPath` is provided', () => {
        const expectedPath = 'test';

        const heimdall = new Heimdall('test', {
            configPath: expectedPath,
        });

        it('creates config volume', (done) => {
            assert.notEqual(heimdall.container, undefined);
            assert.notEqual(heimdall.container.volumes, undefined);
            pulumi.all([heimdall.container.volumes]).apply(([volumes]) => {
                if (!volumes || volumes.length <= 0) {
                    done(new Error('No volumes created'));
                }

                if (volumes![0].hostPath !== expectedPath) {
                    done(new Error('Host path did not match expected path'));
                }
                else {
                    done();
                }
            });
        });
    });

    describe('when `configPath` is NOT provided', () => {
        const heimdall = new Heimdall('test', {});

        it('does not create config volume', (done) => {
            assert.notEqual(heimdall.container, undefined);
            assert.notEqual(heimdall.container.volumes, undefined);
            pulumi.all([heimdall.container.volumes]).apply(([volumes]) => {
                if (volumes!.length > 0) {
                    done(new Error('Volume create when not expected'));
                }
                else {
                    done();
                }
            });
        })
    })
});
