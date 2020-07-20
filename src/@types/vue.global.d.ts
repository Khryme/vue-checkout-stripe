declare module "vue/types/vue" {
    interface Vue {
        $loadScript: (src: string) => Promise<void>;
        $unloadScript: (src: string) => Promise<void>;
    }
}

