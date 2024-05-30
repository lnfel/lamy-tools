// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
    /**
     * https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript
     */
    namespace EmulatorJS {
        type GlobalWindow = Window & typeof globalThis & {
            EJS_pathtodata: string
            EJS_player: string
            EJS_gameUrl: string
            EJS_core: string
            EJS_DEBUG_XX: boolean
        }
    }
    namespace RGMTSI {
        type Quotation = {
            id: string
            company: string
            tags: string[]
            created_at: Date
        }
    }

    // not really sure where to put this
    // people recommend to put this in a global.d.ts without any export but it seems a hassle
    // also I don't want custom window to be applied on unrelated files not using emulatorjs
    // declare let window: EmulatorJS.GlobalWindow
}

export {};
