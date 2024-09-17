"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pitch = void 0;
const loader_shared_1 = require("@vuetify/loader-shared");
exports.default = (function VuetifyLoader(content, sourceMap) {
    var _a;
    if ((_a = this.data) === null || _a === void 0 ? void 0 : _a.skip) {
        return content;
    }
    this.async();
    this.cacheable();
    const { code: imports, source } = (0, loader_shared_1.generateImports)(content);
    this.callback(null, source + imports, sourceMap);
});
exports.pitch = function VuetifyLoaderPitch(remainingRequest, precedingRequest, data) {
    if (this.loaders.some(loader => loader.path.endsWith('vue-loader/dist/pitcher.js'))) {
        data.skip = true;
    }
};
//# sourceMappingURL=scriptLoader.js.map