package test

import (
	"os"
	"path"
	"testing"

	"github.com/pulumi/pulumi/pkg/v3/testing/integration"
)

func TestExamples(t *testing.T) {
	cwd, _ := os.Getwd()
	integration.ProgramTest(
		t, &integration.ProgramTestOptions{
			Quick:       true,
			SkipRefresh: true,
			Dir:         path.Join(cwd, "..", "examples", "simple"),
		},
	)
}
