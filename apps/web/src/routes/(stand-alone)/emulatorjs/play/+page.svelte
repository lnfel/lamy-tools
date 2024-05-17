<script lang="ts">
    import { onMount } from "svelte"
	import type { PageData } from "./$types"

    const gameMap: Record<string, { title: string, EJS_gameUrl: string, EJS_core: string }> = {
        'legend-of-zelda-a-link-to-the-past-snes': {
            title: 'Legend of Zelda: A link to the past - SNES',
            EJS_gameUrl: 'https://allancoding-files.netlify.app/snes-nes/LOZ.smc.zip',
            EJS_core: 'snes'
        },
        'legend-of-zelda-a-link-to-the-past-and-four-swords-gba': {
            title: 'Legend of Zelda: A link to the past and Four swords - GBA',
            EJS_gameUrl: 'https://static.playemulator.com/uploads/games/202001/the-legend-of-zelda-the-link-to-the-past-and-four-swords.zip?ver=104',
            EJS_core: 'gba'
        },
        'secret-of-mana-snes': {
            title: 'Secret of Mana - SNES',
            EJS_gameUrl: 'https://allancoding-files.netlify.app/snes-nes/SOM.smc.zip',
            EJS_core: 'snes'
        }
    }
    export let data: PageData

    onMount(() => {
        /**
         * @see {@link https://emulatorjs.org/docs/options#ejs_debug_xx | EJS_DEBUG_XX}
         */
        (window as EmulatorJS.GlobalWindow).EJS_DEBUG_XX = false;
        /**
         * System to be emulated
         * @see {@link https://emulatorjs.org/docs/options#ejs_core | EJS_core}
         */
        (window as EmulatorJS.GlobalWindow).EJS_core = gameMap[data.game].EJS_core;
        /**
         * URL to ROM file
         * @see {@link https://emulatorjs.org/docs/options#ejs_gameurl | EJS_gameUrl}
         */
        (window as EmulatorJS.GlobalWindow).EJS_gameUrl = gameMap[data.game].EJS_gameUrl;
        /**
         * HTMLElement selector, this element will be used to contain and display the emulator
         * @see {@link https://emulatorjs.org/docs/options#ejs_player | EJS_player}
         */
        (window as EmulatorJS.GlobalWindow).EJS_player = '#game';
        /**
         * Path to EmulatorJS files, these are loaded by loader.js
         * @see {@link https://emulatorjs.org/docs/options#ejs_pathtodata | EJS_pathtodata}
         */
        (window as EmulatorJS.GlobalWindow).EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data";

        const head = document.querySelector('head')
        const script = document.createElement('script')
        script.src = 'https://cdn.emulatorjs.org/stable/data/loader.js'
        head?.appendChild(script)
    })
</script>

<!-- <svelte:head>
    <script src="https://cdn.emulatorjs.org/stable/data/loader.js" defer></script>
</svelte:head> -->

<div class="fixed z-50 top-1 left-1 text-white pointer-events-none">{gameMap[data.game].title}</div>

<div class="h-[100dvh] flex items-stretch">
    <div id="game"></div>
</div>

<!-- <div class="h-[100dvh] flex items-stretch">
    <iframe id="emulatorjs" src="https://demo.emulatorjs.org" title="emulatorjs" frameborder="0" class="w-full h-full"></iframe>
</div> -->
