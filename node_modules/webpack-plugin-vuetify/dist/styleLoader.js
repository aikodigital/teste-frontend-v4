"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styleImportRegexp = /(@use |meta\.load-css\()['"](vuetify(?:\/lib)?(?:\/styles(?:\/main(?:\.sass)?)?)?)['"]/;
exports.default = (function VuetifyLoader(content, sourceMap) {
    if (!styleImportRegexp.test(content)) {
        this.callback(null, content, sourceMap);
    }
    this.async();
    const options = this.getOptions();
    options.awaitResolve(this.request).then(() => {
        this.callback(null, content.replace(styleImportRegexp, '@use ".cache/vuetify/styles.scss"'), sourceMap);
    });
});
//# sourceMappingURL=styleLoader.js.map