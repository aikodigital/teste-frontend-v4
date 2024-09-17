"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function VuetifyLoader() {
    const callback = this.async();
    this.cacheable();
    const options = this.getOptions();
    const original = this.resource.slice(options.VIRTUAL_MODULE_PREFIX.length);
    console.log(original);
    callback(null, `@use "${options.configFile}"\n@use "${this.resource}"`);
});
//# sourceMappingURL=styleConfigLoader.js.map