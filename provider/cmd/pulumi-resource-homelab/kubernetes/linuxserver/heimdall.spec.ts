import * as pulumi from '@pulumi/pulumi';
import { Heimdall } from './heimdall';
import 'mocha';

describe('Kubernetes Heimdall', function () {
    describe('when created with defaults', function () {
        const expectedName = 'test';
        let heimdall: Heimdall;

        before(function () {
            heimdall = new Heimdall(expectedName, {});
        });

        ['PGID', 'PUID', 'TZ'].forEach(variable => {
            it(`sets ${variable} to undefined`, function (done) {
                pulumi.all([heimdall.statefulSet.spec.template.spec.containers]).apply(([containers]) => {
                    if (containers.length !== 1) {
                        done(new Error('Incorrect number of container templates'));
                    }

                    const envs = containers[0].env;

                    if (envs.some(x => x.name === variable && !x.value)) {
                        done();
                    } else {
                        done(new Error('Environment variable not set'));
                    }
                });
            });
        });

        it('creates an `emptydir` config volume', function (done) {
            pulumi.all([heimdall.statefulSet.spec.template.spec.volumes]).apply(([volumes]) => {
                if (volumes.length !== 1) {
                    done(new Error('Incorrect number of volumes'));
                }

                const volume = volumes[0];

                if (volume.name === 'config' && volume.emptyDir) {
                    done();
                } else {
                    done(new Error('Emptydir volume not created'));
                }
            });
        });

        const portTests: [number, string][] = [
            [80, 'http'],
            [443, 'https'],
        ];
        portTests.forEach(([expectedPort, portName]) => {
            it(`defines internal port ${expectedPort}`, function (done) {
                pulumi.all([heimdall.statefulSet.spec.template.spec.containers]).apply(([containers]) => {
                    if (containers.length !== 1) {
                        done(new Error('Incorrect number of container templates'));
                    }

                    const ports = containers[0].ports;

                    if (ports.length <= 0) {
                        done(new Error('No ports defined'));
                    }

                    if (ports.some(x => x.name === portName && x.containerPort === expectedPort)) {
                        done();
                    } else {
                        done(new Error(`No ${portName} port defined`));
                    }
                });
            });
        });
    });

    describe('when http port is provided', function () {
        const expectedPort = 69;
        let heimdall: Heimdall;

        before(function () {
            heimdall = new Heimdall('test', {
                service: {
                    ports: {
                        http: expectedPort,
                    },
                }
            });
        });

        it(`sets service port`, function (done) {
            pulumi.all([heimdall.service.spec.ports]).apply(([ports]) => {
                if (ports.length <= 0) {
                    done(new Error('No ports defined'));
                }

                if (ports.some(x => x.name === 'http' && x.targetPort === 80 && x.port === expectedPort)) {
                    done();
                } else {
                    done('No port defined');
                }
            });
        });
    });

    describe('when https port is provided', function () {
        const expectedPort = 69;
        let heimdall: Heimdall;

        before(function () {
            heimdall = new Heimdall('test', {
                service: {
                    ports: {
                        https: expectedPort,
                    },
                }
            });
        });

        it(`sets service port`, function (done) {
            pulumi.all([heimdall.service.spec.ports]).apply(([ports]) => {
                if (ports.length <= 0) {
                    done(new Error('No ports defined'));
                }

                if (ports.some(x => x.name === 'https' && x.targetPort === 443 && x.port === expectedPort)) {
                    done();
                } else {
                    done('No port defined');
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
            pulumi.all([heimdall.statefulSet.spec.template.spec.containers]).apply(([containers]) => {
                if (containers.length !== 1) {
                    done(new Error('Incorrect number of container templates'));
                }

                const envs = containers[0].env;

                if (envs.some(x => x.name === 'PGID' && x.value === expectedPgid)) {
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
            pulumi.all([heimdall.statefulSet.spec.template.spec.containers]).apply(([containers]) => {
                if (containers.length !== 1) {
                    done(new Error('Incorrect number of container templates'));
                }

                const envs = containers[0].env;

                if (envs.some(x => x.name === 'PUID' && x.value === expectedPuid)) {
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
            pulumi.all([heimdall.statefulSet.spec.template.spec.containers]).apply(([containers]) => {
                if (containers.length !== 1) {
                    done(new Error('Incorrect number of container templates'));
                }

                const envs = containers[0].env;

                if (envs.some(x => x.name === 'TZ' && x.value === expectedTz)) {
                    done();
                } else {
                    done(new Error('Environment variable not set'));
                }
            });
        });
    });
});
