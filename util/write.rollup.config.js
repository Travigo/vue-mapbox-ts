"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var rollup_plugin_vue_1 = __importDefault(require("rollup-plugin-vue"));
var plugin_alias_1 = __importDefault(require("@rollup/plugin-alias"));
var plugin_commonjs_1 = __importDefault(require("@rollup/plugin-commonjs"));
var plugin_node_resolve_1 = __importDefault(require("@rollup/plugin-node-resolve"));
var plugin_replace_1 = __importDefault(require("@rollup/plugin-replace"));
var rollup_plugin_postcss_1 = __importDefault(require("rollup-plugin-postcss"));
var postcss_simple_vars_1 = __importDefault(require("postcss-simple-vars"));
var postcss_import_1 = __importDefault(require("postcss-import"));
var minimist_1 = __importDefault(require("minimist"));
var postcss_url_1 = __importDefault(require("postcss-url"));
var plugin_url_1 = __importDefault(require("@rollup/plugin-url"));
var postcss_nested_1 = __importDefault(require("postcss-nested"));
var rollup_plugin_terser_1 = require("rollup-plugin-terser");
var autoprefixer_1 = __importDefault(require("autoprefixer"));
var rollup_plugin_typescript2_1 = __importDefault(require("rollup-plugin-typescript2"));
var rollup_plugin_css_only_1 = __importDefault(require("rollup-plugin-css-only"));
// import pug from 'rollup-plugin-pug';
var postcssConfigList = [
    postcss_import_1["default"]({
        resolve: function (id, basedir) {
            // resolve alias @css, @import '@css/style.css'
            // because @css/ has 5 chars
            if (id.startsWith('@css')) {
                return path_1["default"].resolve('./src/assets/styles/css', id.slice(5));
            }
            // resolve node_modules, @import '~normalize.css/normalize.css'
            // similar to how css-loader's handling of node_modules
            if (id.startsWith('~')) {
                return path_1["default"].resolve('./node_modules', id.slice(1));
            }
            // resolve relative path, @import './components/style.css'
            return path_1["default"].resolve(basedir, id);
        }
    }),
    postcss_simple_vars_1["default"],
    postcss_nested_1["default"],
    postcss_url_1["default"]({ url: 'inline' }),
    autoprefixer_1["default"]({
        overrideBrowserslist: '> 1%, IE 6, Explorer >= 10, Safari >= 7'
    })
];
var argv = minimist_1["default"](process.argv.slice(2));
var projectRoot = path_1["default"].dirname;
var postVueConfig = [
    // Process only `<style module>` blocks.
    rollup_plugin_postcss_1["default"]({
        modules: {
            generateScopedName: '[local]___[hash:base64:5]'
        },
        include: /&module=.*\.css$/
    }),
    // Process all `<style>` blocks except `<style module>`.
    rollup_plugin_postcss_1["default"]({ include: /(?<!&module=.*)\.css$/, plugins: __spreadArrays(postcssConfigList)
    }),
    plugin_url_1["default"]({
        include: [
            '**/*.svg',
            '**/*.png',
            '**/*.gif',
            '**/*.jpg',
            '**/*.jpeg'
        ]
    }),
];
if (process.env.SEP_CSS) {
    postVueConfig = __spreadArrays([rollup_plugin_css_only_1["default"]({ output: './lib/bundle.css' })], postVueConfig);
}
var baseConfig = {
    plugins: {
        preVue: [
            plugin_alias_1["default"]({
                entries: [
                    {
                        find: '@',
                        replacement: "" + path_1["default"].resolve(projectRoot, 'src')
                    }
                ],
                customResolver: plugin_node_resolve_1["default"]({
                    extensions: ['.js', '.jsx', '.vue']
                })
            }),
        ],
        replace: {
            'process.env.NODE_ENV': JSON.stringify('production'),
            __VUE_OPTIONS_API__: JSON.stringify(true),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
        },
        vue: {
            target: 'browser',
            preprocessStyles: process.env.SEP_CSS ? false : true,
            postcssPlugins: __spreadArrays(postcssConfigList)
        },
        postVue: __spreadArrays(postVueConfig)
    }
};
// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
var external = [
    // list external dependencies, exactly the way it is written in the import statement.
    // eg. 'jquery'
    'vue'
];
// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
var globals = {
    // Provide global variable names to replace your external imports
    // eg. jquery: '$'
    vue: 'Vue'
};
var baseFolder = './src/';
var componentsFolder = 'components/';
var components = fs_1["default"]
    .readdirSync(baseFolder + componentsFolder)
    .filter(function (f) {
    return fs_1["default"].statSync(path_1["default"].join(baseFolder + componentsFolder, f)).isDirectory();
});
var entriespath = __assign({ index: './src/index.ts' }, components.reduce(function (obj, name) {
    obj[name] = baseFolder + componentsFolder + name + '/index.ts';
    return obj;
}, {}));
var capitalize = function (s) {
    if (typeof s !== 'string')
        return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};
var buildFormats = [];
var mapComponent = function (name) {
    return [
        {
            input: baseFolder + componentsFolder + (name + "/index.ts"),
            external: external,
            output: {
                format: 'umd',
                name: capitalize(name),
                file: "lib/components/" + name + "/index.ts",
                exports: 'named',
                globals: globals
            },
            plugins: __spreadArrays([
                rollup_plugin_typescript2_1["default"]()
            ], baseConfig.plugins.preVue, [
                rollup_plugin_vue_1["default"]({})
            ], baseConfig.plugins.postVue, [
                // babel({
                //   ...baseConfig.plugins.babel,
                //   presets: [['@babel/preset-env', { modules: false }]]
                // }),
                plugin_commonjs_1["default"]()
            ])
        }
    ];
};
if (!argv.format || argv.format === 'es') {
    var esConfig = {
        input: entriespath,
        external: external,
        output: {
            format: 'esm',
            dir: 'lib/esm'
        },
        plugins: __spreadArrays([
            rollup_plugin_typescript2_1["default"](),
            plugin_replace_1["default"](baseConfig.plugins.replace)
        ], baseConfig.plugins.preVue, [
            rollup_plugin_vue_1["default"](baseConfig.plugins.vue)
        ], baseConfig.plugins.postVue, [
            // babel({
            //   ...baseConfig.plugins.babel,
            //   presets: [['@babel/preset-env', { modules: false }]]
            // }),
            plugin_commonjs_1["default"](),
        ])
    };
    var merged = {
        input: 'src/index.ts',
        external: external,
        output: {
            format: 'esm',
            file: 'lib/index.esm.js'
        },
        plugins: __spreadArrays([
            rollup_plugin_typescript2_1["default"](),
            plugin_replace_1["default"](baseConfig.plugins.replace)
        ], baseConfig.plugins.preVue, [
            rollup_plugin_vue_1["default"](baseConfig.plugins.vue)
        ], baseConfig.plugins.postVue, [
            // babel({
            //   ...baseConfig.plugins.babel,
            //   presets: [['@babel/preset-env', { modules: false }]]
            // }),
            plugin_commonjs_1["default"](),
        ])
    };
    var ind = __spreadArrays(components.map(function (f) { return mapComponent(f); }).reduce(function (r, a) { return r.concat(a); }, []));
    buildFormats.push(esConfig);
    buildFormats.push(merged);
    buildFormats = __spreadArrays(buildFormats, ind);
}
if (!argv.format || argv.format === 'iife') {
    var unpkgConfig = __assign(__assign({}, baseConfig), { input: './src/index.ts', external: external, output: {
            compact: true,
            file: 'lib/index.js',
            format: 'iife',
            name: 'index',
            exports: 'named',
            globals: globals
        }, plugins: __spreadArrays([
            rollup_plugin_typescript2_1["default"](),
            plugin_replace_1["default"](baseConfig.plugins.replace)
        ], baseConfig.plugins.preVue, [
            rollup_plugin_vue_1["default"](baseConfig.plugins.vue)
        ], baseConfig.plugins.postVue, [
            // babel(baseConfig.plugins.babel),
            plugin_commonjs_1["default"](),
            rollup_plugin_terser_1.terser({
                output: {
                    ecma: 5
                }
            })
        ]) });
    buildFormats.push(unpkgConfig);
}
if (!argv.format || argv.format === 'cjs') {
    var cjsConfig = __assign(__assign({}, baseConfig), { input: entriespath, external: external, output: {
            compact: true,
            format: 'cjs',
            dir: 'lib/cjs',
            exports: 'named',
            globals: globals
        }, plugins: __spreadArrays([
            rollup_plugin_typescript2_1["default"](),
            plugin_replace_1["default"](baseConfig.plugins.replace)
        ], baseConfig.plugins.preVue, [
            rollup_plugin_vue_1["default"](__assign(__assign({}, baseConfig.plugins.vue), { template: __assign(__assign({}, baseConfig.plugins.vue.template), { optimizeSSR: true }) }))
        ], baseConfig.plugins.postVue, [
            // babel(baseConfig.plugins.babel),
            plugin_commonjs_1["default"](),
        ]) });
    buildFormats.push(cjsConfig);
}
// Export config
fs_1["default"].writeFileSync(path_1["default"].dirname + "/../rollup.config.js", buildFormats.toString());
// export default buildFormats;
