import * as pulumi from '@pulumi/pulumi';
import { Heimdall } from './heimdall';
import 'mocha';

// TODO: Test for setting `statefulSet.serviceName` to `service.metadata.name`

describe('Kubernetes Heimdall', function () {
    describe('when created with defaults', function () {
        let heimdall: Heimdall;

        before(function () {
            heimdall = new Heimdall('test', {});
        });
        
        const namespaceTests: [string, (x: Heimdall) => pulumi.Output<string>][] = [
            ['service', (x: Heimdall) => x.service.metadata.namespace],
            ['statefulSet', (x: Heimdall) => x.statefulSet.metadata.namespace],
        ];
        namespaceTests.forEach(([resourceType, getter]) => {
            it(`does not define ${resourceType} \`namespace\``, function(done) {
                pulumi.all([getter(heimdall)]).apply(([namespace]) => {
                    if (namespace) {
                        done(new Error('No namespace expected'));
                    } else {
                        done();
                    }
                })
            });
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
            it(`defines container port ${expectedPort}`, function (done) {
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

        it('does NOT define service ports', function(done) {
            pulumi.all([heimdall.service.spec.ports]).apply(([ports]) => {
                if (ports.length > 0) {
                    done(new Error('No ports expected to be defined'));
                } else {
                    done();
                }
            });
        });
    });

    describe('when `namespace` is provided', function () {
        const expectedNamespace = 'test-namespace';
        let heimdall: Heimdall;

        before(function () {
            heimdall = new Heimdall('test', {
                namespace: expectedNamespace,
            });
        });
        
        const namespaceTests: [string, (x: Heimdall) => pulumi.Output<string>][] = [
            ['service', (x: Heimdall) => x.service.metadata.namespace],
            ['statefulSet', (x: Heimdall) => x.statefulSet.metadata.namespace],
        ];
        namespaceTests.forEach(([resourceType, getter]) => {
            it(`sets ${resourceType} \`namespace\``, function(done) {
                pulumi.all([getter(heimdall)]).apply(([namespace]) => {
                    if (namespace === expectedNamespace) {
                        done();
                    } else {
                        done(new Error(`Namespace was not set to ${expectedNamespace}`));
                    }
                });
            });
        });
    });

    describe('when `service.type` is provided', function () {
        const expectedType = 'ClusterIP';
        let heimdall: Heimdall;

        before(function () {
            heimdall = new Heimdall('test', {
                service: {
                    type: expectedType,
                },
            });
        });

        it('sets service type', function(done) {
            pulumi.all([heimdall.service.spec.type]).apply(([type]) => {
                if (type === expectedType) {
                    done();
                } else {
                    done(new Error('Service type not set to expected type'));
                }
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
