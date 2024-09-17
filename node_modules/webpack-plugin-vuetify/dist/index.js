"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformAssetUrls = exports.VuetifyPlugin = exports.VuetifyLoader = void 0;
var scriptLoader_1 = require("./scriptLoader");
Object.defineProperty(exports, "VuetifyLoader", { enumerable: true, get: function () { return scriptLoader_1.default; } });
var plugin_1 = require("./plugin");
Object.defineProperty(exports, "VuetifyPlugin", { enumerable: true, get: function () { return plugin_1.VuetifyPlugin; } });
// export { ProgressiveLoaderModule as VuetifyProgressiveModule } from './progressive-loader'
var loader_shared_1 = require("@vuetify/loader-shared");
Object.defineProperty(exports, "transformAssetUrls", { enumerable: true, get: function () { return loader_shared_1.transformAssetUrls; } });
//# sourceMappingURL=index.js.map