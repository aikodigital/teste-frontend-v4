"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VuetifyPlugin = void 0;
const url_1 = require("url");
const promises_1 = require("fs/promises");
const path = require("upath");
const mkdirp = require("mkdirp");
const loader_shared_1 = require("@vuetify/loader-shared");
function isSubdir(root, test) {
    const relative = path.relative(root, test);
    return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
}
class VuetifyPlugin {
    constructor(options) {
        this.options = {
            autoImport: true,
            styles: true,
            stylesTimeout: 10000,
            ...options,
        };
    }
    apply(compiler) {
        var _a;
        if (this.options.autoImport) {
            compiler.options.module.rules.unshift({
                resourceQuery: query => {
                    if (!query)
                        return false;
                    const qs = new url_1.URLSearchParams(query);
                    return qs.has('vue') && (qs.get('type') === 'template' ||
                        (qs.get('type') === 'script' && qs.has('setup')));
                },
                use: { loader: require.resolve('./scriptLoader') },
            });
        }
        const vueLoader = compiler.options.module.rules.find(rule => {
            return typeof rule !== 'string' && rule.loader && path.toUnix(rule.loader).endsWith('vue-loader/dist/templateLoader.js');
        });
        const vueOptions = typeof vueLoader === 'object' && (vueLoader === null || vueLoader === void 0 ? void 0 : vueLoader.options);
        if (vueOptions && typeof vueOptions === 'object') {
            (_a = vueOptions.transformAssetUrls) !== null && _a !== void 0 ? _a : (vueOptions.transformAssetUrls = loader_shared_1.transformAssetUrls);
        }
        const vuetifyBase = (0, loader_shared_1.resolveVuetifyBase)();
        function hookResolve(transform) {
            compiler.resolverFactory.hooks.resolver.for('normal').tap('vuetify-loader', resolver => {
                resolver.getHook('beforeResult').tapAsync('vuetify-loader', async (request, context, callback) => {
                    if (request.path &&
                        request.path.endsWith('.css') &&
                        isSubdir(vuetifyBase, request.path)) {
                        request.path = await transform(request.path);
                    }
                    callback(null, request);
                });
            });
        }
        if ((0, loader_shared_1.includes)(['none', 'expose'], this.options.styles)) {
            compiler.options.module.rules.push({
                enforce: 'pre',
                test: /\.css$/,
                include: /node_modules[/\\]vuetify[/\\]/,
                issuer: /node_modules[/\\]vuetify[/\\]/,
                loader: 'null-loader',
            });
        }
        else if (this.options.styles === 'sass') {
            hookResolve(file => file.replace(/\.css$/, '.sass'));
        }
        if (this.options.styles === 'expose') {
            const files = new Set();
            let resolve;
            let promise;
            let timeout;
            const blockingModules = new Set();
            const pendingModules = new Map();
            compiler.hooks.compilation.tap('vuetify-loader', (compilation) => {
                compilation.hooks.buildModule.tap('vuetify-loader', (module) => {
                    pendingModules.set(module.request, module);
                });
                compilation.hooks.succeedModule.tap('vuetify-loader', (module) => {
                    pendingModules.delete(module.request);
                    if (resolve &&
                        !Array.from(pendingModules.keys()).filter(k => !blockingModules.has(k)).length) {
                        resolve(false);
                    }
                });
            });
            const logger = compiler.getInfrastructureLogger('vuetify-loader');
            const awaitResolve = async (id) => {
                if (id) {
                    blockingModules.add(id);
                }
                if (!promise) {
                    promise = new Promise((_resolve) => resolve = _resolve);
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        logger.error('styles fallback timeout hit', {
                            blockingModules: Array.from(blockingModules.values()),
                            pendingModules: Array.from(pendingModules.values(), module => module.resource),
                        });
                        resolve(false);
                    }, this.options.stylesTimeout);
                    if (!Array.from(pendingModules.keys()).filter(k => !blockingModules.has(k)).length) {
                        resolve(false);
                    }
                    const start = files.size;
                    await promise;
                    clearTimeout(timeout);
                    blockingModules.clear();
                    if (files.size > start) {
                        await (0, loader_shared_1.writeStyles)(files);
                    }
                    promise = null;
                }
                return promise;
            };
            compiler.options.module.rules.push({
                enforce: 'pre',
                test: /\.s[ac]ss$/,
                loader: require.resolve('./styleLoader'),
                options: { awaitResolve },
            });
            compiler.options.resolve.plugins = compiler.options.resolve.plugins || [];
            compiler.options.resolve.plugins.push({
                apply(resolver) {
                    resolver
                        .getHook('resolve')
                        .tapAsync('vuetify-loader', async (request, context, callback) => {
                        var _a;
                        if (!(request.path &&
                            ((_a = request.request) === null || _a === void 0 ? void 0 : _a.endsWith('.css')) &&
                            isSubdir(vuetifyBase, request.path))) {
                            return callback();
                        }
                        resolver.resolve({}, request.path, request.request.replace(/\.css$/, '.sass'), context, (err, resolution) => {
                            if (resolution && !files.has(resolution)) {
                                awaitResolve();
                                files.add(resolution);
                            }
                            return callback();
                        });
                    });
                }
            });
        }
        else if ((0, loader_shared_1.isObject)(this.options.styles)) {
            const configFile = path.isAbsolute(this.options.styles.configFile)
                ? this.options.styles.configFile
                : path.join(compiler.options.context || process.cwd(), this.options.styles.configFile);
            hookResolve(async (request) => {
                const target = request.replace(/\.css$/, '.sass');
                const file = path.relative(vuetifyBase, target);
                const cacheFile = (0, loader_shared_1.cacheDir)(file);
                await mkdirp(path.dirname(cacheFile));
                await (0, promises_1.writeFile)(cacheFile, `@use "${(0, loader_shared_1.normalizePath)(configFile)}"\n@use "${(0, loader_shared_1.normalizePath)(target)}"`);
                return cacheFile;
            });
        }
    }
}
exports.VuetifyPlugin = VuetifyPlugin;
//# sourceMappingURL=plugin.js.map