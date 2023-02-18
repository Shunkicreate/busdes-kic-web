import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  busdesKicAPI: {
    from: {
      relativePath: "./openapi.yaml",
      source: "file",
    },
    outputDir: "./src/reactQuery",
    to: async (context) => {
      const filenamePrefix = "busdesKicAPI";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});