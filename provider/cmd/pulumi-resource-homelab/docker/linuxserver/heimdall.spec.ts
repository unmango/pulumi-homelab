import * as pulumi from '@pulumi/pulumi';
import { Heimdall } from './heimdall';
import 'mocha';

describe('Heimdall', function() {
    describe('when created with defaults', function() {
        const expectedName = 'test';
        let heimdall: Heimdall;

        before(function() {
            heimdall = new Heimdall(expectedName, {});
        });

        // TODO
        // it('sets container name', function(done) {
        //     pulumi.all([heimdall.container.name]).apply(([name]) => {
        //         if(expectedName !== name) {
        //             done(new Error('Names did not match'));
        //         }
        //         else {
        //             done();
        //         }
        //     });
        // });

        

        it('does not create config volume', function(done) {
            if (!heimdall.container?.volumes) {
                done(new Error('Container volumes not defined'));
            }

            pulumi.all([heimdall.container.volumes]).apply(([volumes]) => {
                if (volumes!.length > 0) {
                    done(new Error('Volume created when not expected'));
                }
                else {
                    done();
                }
            });
        });
    });

    describe('when `configPath` is provided', function() {
        const expectedPath = 'test';

        const heimdall = new Heimdall('test', {
            configPath: expectedPath,
        });

        it('creates config volume', function(done) {
            if (!heimdall.container?.volumes) {
                done(new Error('Container volumes not defined'));
            }

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
});
