[
  {
    "input": {
      "index": "./src/index.ts"
    },
    "external": [
      "vue"
    ],
    "output": {
      "format": "esm",
      "dir": "lib/esm"
    },
    "plugins": [
      {
        "name": "rpt2"
      },
      {
        "name": "replace"
      },
      {
        "name": "alias"
      },
      {
        "name": "vue"
      },
      {
        "name": "postcss"
      },
      {
        "name": "postcss"
      },
      {
        "name": "url"
      },
      {
        "name": "commonjs"
      }
    ]
  },
  {
    "input": "src/index.ts",
    "external": [
      "vue"
    ],
    "output": {
      "format": "esm",
      "file": "lib/index.esm.js"
    },
    "plugins": [
      {
        "name": "rpt2"
      },
      {
        "name": "replace"
      },
      {
        "name": "alias"
      },
      {
        "name": "vue"
      },
      {
        "name": "postcss"
      },
      {
        "name": "postcss"
      },
      {
        "name": "url"
      },
      {
        "name": "commonjs"
      }
    ]
  },
  {
    "plugins": [
      {
        "name": "rpt2"
      },
      {
        "name": "replace"
      },
      {
        "name": "alias"
      },
      {
        "name": "vue"
      },
      {
        "name": "postcss"
      },
      {
        "name": "postcss"
      },
      {
        "name": "url"
      },
      {
        "name": "commonjs"
      },
      {
        "name": "terser"
      }
    ],
    "input": "./src/index.ts",
    "external": [
      "vue"
    ],
    "output": {
      "compact": true,
      "file": "lib/index.js",
      "format": "iife",
      "name": "index",
      "exports": "named",
      "globals": {
        "vue": "Vue"
      }
    }
  },
  {
    "plugins": [
      {
        "name": "rpt2"
      },
      {
        "name": "replace"
      },
      {
        "name": "alias"
      },
      {
        "name": "vue"
      },
      {
        "name": "postcss"
      },
      {
        "name": "postcss"
      },
      {
        "name": "url"
      },
      {
        "name": "commonjs"
      }
    ],
    "input": {
      "index": "./src/index.ts"
    },
    "external": [
      "vue"
    ],
    "output": {
      "compact": true,
      "format": "cjs",
      "dir": "lib/cjs",
      "exports": "named",
      "globals": {
        "vue": "Vue"
      }
    }
  }
]