
/**
 * https://vuejs.org/v2/guide/typescript.html#Augmenting-Types-for-Use-with-Plugins
 *
 * Allow the use of `Vue.loadScript(url: string)` in .vue files.
 */

import Vue from 'vue'

declare module 'vue/types/vue' {
    interface VueConstructor {
        loadScript: (url: string) => void
    }
}
