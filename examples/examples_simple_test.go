package examples

import (
	// "os"
	// "path"
	"testing"

	"github.com/pulumi/pulumi/pkg/v3/testing/integration"
)

func TestExamples(t *testing.T) {
	// cwd, _ := os.Getwd()
	// test := getJSBaseOptions(t).
	// 	With(integration.ProgramTestOptions{
	// 		Quick:       true,
	// 		SkipRefresh: true,
	// 		Dir:         path.Join(cwd, "simple"),
	// 	})
	// integration.ProgramTest(t, &test)
}

func getJSBaseOptions(t *testing.T) integration.ProgramTestOptions {
	base := getBaseOptions(t)
	baseJS := base.With(integration.ProgramTestOptions{
		Dependencies: []string{
			"@unmango/pulumi-homelab",
		},
	})

	return baseJS
}
