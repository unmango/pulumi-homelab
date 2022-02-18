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

        const portTests: [number, string][] = [[80, 'http'], [443, 'https']];
        portTests.forEach(([expectedPort, portName]) => {
            it(`defines internal port ${expectedPort}`, function (done) {
                pulumi.all([heimdall.container.ports]).apply(([ports]) => {
                    if (!ports || ports.length <= 0) {
                        done(new Error('No ports defined'));
                    }

                    const filteredPorts = ports!.filter(port => port.internal === expectedPort);

                    if (!filteredPorts || filteredPorts.length !== 1) {
                        done(new Error(`No ${portName} port defined`));
                    }

                    const actualPort = filteredPorts[0];

                    if (actualPort.external !== undefined) {
                        done(new Error('Unexpected external port definition'));
                    } else {
                        done();
                    }
                });
            });
        });

        it('does not set restart policy', function (done) {
            pulumi.all([heimdall.container.restart]).apply(([restart]) => {
                if (restart !== undefined) {
                    done(new Error('Restart policy should not be defined'));
                } else {
                    done();
                }
            });
        });
    });

    describe('when `configPath` is provided', function () {
        const expectedPath = 'test';
        let heimdall: Heimdall;

        before(function () {
            heimdall = new Heimdall('test', {
                configPath: expectedPath,
            });
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

    describe('when http port is provided', function () {
        const expectedPort = 69;
        let heimdall: Heimdall;

        before(function () {
            heimdall = new Heimdall('test', {
                ports: {
                    http: expectedPort,
                },
            });
        });

        it(`sets external container port`, function (done) {
            pulumi.all([heimdall.container.ports]).apply(([ports]) => {
                if (!ports || ports.length <= 0) {
                    done(new Error('No ports defined'));
                }

                const filteredPorts = ports!.filter(port => port.internal === 80);

                if (!filteredPorts || filteredPorts.length !== 1) {
                    done(new Error(`No http port defined`));
                }

                const actualPort = filteredPorts[0];

                if (actualPort.external !== expectedPort) {
                    done(new Error('External port not set'));
                } else {
                    done();
                }
            });
        });
    });

    describe('when https port is provided', function () {
        const expectedPort = 69;
        let heimdall: Heimdall;

        before(function () {
            heimdall = new Heimdall('test', {
                ports: {
                    https: expectedPort,
                },
            });
        });

        it(`sets external container port`, function (done) {
            pulumi.all([heimdall.container.ports]).apply(([ports]) => {
                if (!ports || ports.length <= 0) {
                    done(new Error('No ports defined'));
                }

                const filteredPorts = ports!.filter(port => port.internal === 443);

                if (!filteredPorts || filteredPorts.length !== 1) {
                    done(new Error(`No https port defined`));
                }

                const actualPort = filteredPorts[0];

                if (actualPort.external !== expectedPort) {
                    done(new Error('External port not set'));
                } else {
                    done();
                }
            });
        });
    });

    describe('when `restart` is provided', function () {
        const expectedRestart = 'always';
        let heimdall: Heimdall;

        before(function () {
            heimdall = new Heimdall('test', {
                restart: expectedRestart,
            });
        });

        it(`sets restart on container`, function (done) {
            pulumi.all([heimdall.container.restart]).apply(([restart]) => {
                if (restart !== expectedRestart) {
                    done(new Error('Restart not set'));
                } else {
                    done();
                }
            });
        });
    });

    describe('when `puid` is provided', function () {
        const expectedPuid = '1000';
        let heimdall: Heimdall;

        before(function () {
            heimdall = new Heimdall('test', {
                puid: expectedPuid,
            });
        });

        it(`sets PUID environment variable`, function (done) {
            pulumi.all([heimdall.container.envs]).apply(([envs]) => {
                if (envs.includes(`PUID=${expectedPuid}`)) {
                    done();
                } else {
                    done(new Error('Environment variable not set'));
                }
            });
        });
    });

    describe('when `pgid` is provided', function () {
        const expectedPgid = '1000';
        let heimdall: Heimdall;

        before(function () {
            heimdall = new Heimdall('test', {
                pgid: expectedPgid,
            });
        });

        it(`sets PGID environment variable`, function (done) {
            pulumi.all([heimdall.container.envs]).apply(([envs]) => {
                if (envs.includes(`PGID=${expectedPgid}`)) {
                    done();
                } else {
                    done(new Error('Environment variable not set'));
                }
            });
        });
    });

    describe('when `puid` is provided', function () {
        const expectedPuid = '1000';
        let heimdall: Heimdall;

        before(function () {
            heimdall = new Heimdall('test', {
                puid: expectedPuid,
            });
        });

        it(`sets PUID environment variable`, function (done) {
            pulumi.all([heimdall.container.envs]).apply(([envs]) => {
                if (envs.includes(`PUID=${expectedPuid}`)) {
                    done();
                } else {
                    done(new Error('Environment variable not set'));
                }
            });
        });
    });

    describe('when `tz` is provided', function () {
        const expectedTz = 'America/Chicago';
        let heimdall: Heimdall;

        before(function () {
            heimdall = new Heimdall('test', {
                tz: expectedTz,
            });
        });

        it(`sets TZ environment variable`, function (done) {
            pulumi.all([heimdall.container.envs]).apply(([envs]) => {
                if (envs.includes(`TZ=${expectedTz}`)) {
                    done();
                } else {
                    done(new Error('Environment variable not set'));
                }
            });
        });
    });
});
