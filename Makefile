SHELL           := /bin/bash

VERSION         ?= $(shell pulumictl get version)

PACK            := homelab
PROJECT         := github.com/unmango/pulumi-${PACK}

PROVIDER        := pulumi-resource-${PACK}
CODEGEN         := pulumi-gen-${PACK}
VERSION_PATH    := provider/pkg/version.Version

WORKING_DIR     := $(shell pwd)
SCHEMA_PATH     := ${WORKING_DIR}/schema.yaml

TESTPARALLELISM := 4

override target := "14.15.3"

generate:: gen_go_sdk gen_dotnet_sdk gen_nodejs_sdk gen_python_sdk

build:: build_provider build_dotnet_sdk build_nodejs_sdk build_python_sdk

install:: install_provider install_dotnet_sdk install_nodejs_sdk

# Ensure all dependencies are installed
ensure::
	yarn install

# Provider

build_provider:: ensure
	rm -rf work && cp -r provider/cmd/${PROVIDER} work && \
	pushd work/ && \
		yarn install && \
		mv tsconfig.pack.json tsconfig.json && \
	popd && \
	rm -rf build && npx --package @vercel/ncc ncc build work/index.ts -o build && \
	sed -i.bak -e "s/\$${VERSION}/$(VERSION)/g" ./build/index.js && \
	rm ./build/index.js.bak && \
	rm -rf ./bin && mkdir bin && \
	npx nexe build/index.js -r build/schema.yaml -t $(target) -o bin/${PROVIDER}

install_provider:: build_provider

test_provider::
	cd provider/cmd/${PROVIDER}/ && \
		yarn install && \
		yarn test

# builds all providers required for publishing
dist:: ensure
	rm -rf work && cp -r provider/cmd/${PROVIDER} work && \
	pushd work/ && \
		yarn install && \
		mv tsconfig.pack.json tsconfig.json && \
	popd && \
	rm -rf build && npx --package @vercel/ncc ncc build work/index.ts -o build && \
	sed -i.bak -e "s/\$${VERSION}/$(VERSION)/g" ./build/index.js && \
	rm ./build/index.js.bak && \
	rm -rf dist  && mkdir dist && \
	for TARGET in "darwin-amd64" "windows-amd64" "linux-amd64"; do \
		rm -rf ./bin && mkdir bin && \
		npx nexe build/index.js -r build/schema.yaml -t "$${TARGET}-14.15.3" -o bin/${PROVIDER} && \
		tar -czvf "dist/$(PROVIDER)-v$(VERSION)-$${TARGET}.tar.gz" -C bin .; \
	done

# Go SDK

gen_go_sdk::
	rm -rf sdk/go
	cd provider/cmd/${CODEGEN} && go run . go ../../../sdk/go ${SCHEMA_PATH}

build_go_sdk:: gen_go_sdk
	#noop for CI

install_go_sdk::
	#noop for CI

# .NET SDK

gen_dotnet_sdk::
	rm -rf sdk/dotnet
	cd provider/cmd/${CODEGEN} && go run . dotnet ../../../sdk/dotnet ${SCHEMA_PATH}

build_dotnet_sdk:: DOTNET_VERSION := $(shell pulumictl get version --language dotnet)
build_dotnet_sdk:: gen_dotnet_sdk
	cd sdk/dotnet/ && \
		echo "${DOTNET_VERSION}" >version.txt && \
		dotnet build /p:Version=${DOTNET_VERSION}

install_dotnet_sdk::
	rm -rf ${WORKING_DIR}/nuget
	mkdir -p ${WORKING_DIR}/nuget
	find . -name '*.nupkg' -print -exec cp -p {} ${WORKING_DIR}/nuget \;


# Node.js SDK

gen_nodejs_sdk::
	rm -rf sdk/nodejs
	cd provider/cmd/${CODEGEN} && go run . nodejs ../../../sdk/nodejs ${SCHEMA_PATH}

build_nodejs_sdk:: VERSION := $(shell pulumictl get version --language javascript)
build_nodejs_sdk:: gen_nodejs_sdk
	cd sdk/nodejs/ && \
		yarn install && \
		yarn run tsc --version && \
		yarn run tsc && \
		cp ../../README.md ../../LICENSE package.json yarn.lock ./bin/ && \
		sed -i.bak -e "s/\$${VERSION}/$(VERSION)/g" ./bin/package.json && \
		rm ./bin/package.json.bak

install_nodejs_sdk::
	-yarn unlink --cwd ${WORKING_DIR}/sdk/nodejs/bin
	yarn link --cwd ${WORKING_DIR}/sdk/nodejs/bin


# Python SDK

gen_python_sdk::
	rm -rf sdk/python
	cd provider/cmd/${CODEGEN} && go run . python ../../../sdk/python ${SCHEMA_PATH}
	cp ${WORKING_DIR}/README.md sdk/python

build_python_sdk:: PYPI_VERSION := $(shell pulumictl get version --language python)
build_python_sdk:: gen_python_sdk
	cd sdk/python/ && \
		python3 setup.py clean --all 2>/dev/null && \
		rm -rf ./bin/ ../python.bin/ && cp -R . ../python.bin && mv ../python.bin ./bin && \
		sed -i.bak -e "s/\$${VERSION}/${PYPI_VERSION}/g" -e "s/\$${PLUGIN_VERSION}/${VERSION}/g" ./bin/setup.py && \
		rm ./bin/setup.py.bak && \
		cd ./bin && python3 setup.py build sdist

install_python_sdk::
	#noop for CI

GO_TEST_FAST := go test -short -v -count=1 -cover -timeout 2h -parallel ${TESTPARALLELISM}
GO_TEST 	 := go test -v -count=1 -cover -timeout 2h -parallel ${TESTPARALLELISM}

test_fast::
	cd examples && $(GO_TEST_FAST) ./...
