import type { Compiler } from 'webpack';
import type { Options } from '@vuetify/loader-shared';
export declare class VuetifyPlugin {
    options: Required<Options>;
    constructor(options: Options);
    apply(compiler: Compiler): void;
}
