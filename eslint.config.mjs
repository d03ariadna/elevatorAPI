import globals from "globals";
import pluginJs from "@eslint/js";
import node from "eslint-plugin-node";
import prettier from "eslint-plugin-prettier";



export default {
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "commonjs",
    globals: {
      ...globals.node,  // Includes Node.js globals like `process`
      ...globals.browser
    }
  },
  files: [
    {
      includes: ["**/*.js"],
      plugins: [
        node, // Add the node plugin
        prettier // Add prettier if you're using it
      ],
      extends: [
        pluginJs.configs.recommended, // Standard JS recommended rules
        node.configs.recommended, // Node.js specific rules
        "plugin:prettier/recommended" // Integrates Prettier with ESLint
      ],
      rules: {
        // Additional custom rules or overrides here
      }
    }
  ]
};
