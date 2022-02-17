import * as pulumi from '@pulumi/pulumi';
import { Heimdall } from './heimdall';
import 'mocha';

describe('Heimdall', function () {
    describe('when created with defaults', function () {
        const expectedName = 'test';
        let heimdall: Heimdall;

        before(function () {
            heimdall = new Heimdall(expectedName, {});
        });

        ['PGID', 'PUID', 'TZ'].forEach(variable => {
            it(`sets ${variable} to undefined`, function (done) {
                pulumi.all([heimdall.container.envs]).apply(([envs]) => {
                    if (envs.includes(`${variable}=`)) {
                        done();
                    } else {
                        done(new Error('Environment variable not set'));
                    }
                });
            });
        });

        it('does not create config volume', function (done) {
            if (!heimdall.container.volumes) {
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

        it('defines internal port 80', function(done){
            pulumi.all([heimdall.container.ports]).apply(([ports]) => {
                if (!ports || ports.length <= 0) {
                    done(new Error('No ports defined'));
                }

                const httpPorts = ports!.filter(port => port.internal === 80);

                if (!httpPorts || httpPorts.length !== 1) {
                    done(new Error('No http port defined'));
                }

                const httpPort = httpPorts[0];

                if (httpPort.internal !== 80) {
                    done(new Error('Internal http port not mapped to 80'));
                }

                if (httpPort.external !== undefined) {
                    done(new Error('Unexpected external port definition'));
                } else {
                    done();
                }
            });
        });
    });

    describe('when `configPath` is provided', function () {
        const expectedPath = 'test';

        const heimdall = new Heimdall('test', {
            configPath: expectedPath,
        });

        it('creates config volume', function (done) {
            if (!heimdall.container.volumes) {
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
