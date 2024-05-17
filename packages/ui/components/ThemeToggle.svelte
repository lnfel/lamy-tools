<script lang="ts">
    import { createSwitch, melt } from '@melt-ui/svelte'
    import { createEventDispatcher } from 'svelte'
    import type { Theme } from '../types'

    const delayClass = 'delay-500'
    export let defaultChecked: boolean = false

    interface $$Events {
        toggle: CustomEvent<Theme>
    }

    const dispatch = createEventDispatcher<{
        toggle: Theme
    }>()

    let theme: Theme = 'light'

    const {
        elements: { root, input },
        states: { checked }
    } = createSwitch({
        defaultChecked
    })

    $: theme = $checked ? 'dark' : 'light'

    function toggle() {
        setTimeout(() => {
            localStorage.setItem('lamy:theme', theme)

            localStorage.getItem('lamy:theme') === 'dark'
                ? document.documentElement.classList.add('dark')
                : document.documentElement.classList.remove('dark')
        }, Number(delayClass.replace('delay-', '')))

        dispatch('toggle', theme)
    }
</script>

<svelte:head>
    <title>EmulatorJS | Lamy tools</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/theme-toggles@4.10.1/css/within.min.css">
</svelte:head>

<div class="flex items-center">
    <button use:melt={$root} on:click={toggle} id="theme-toggle" aria-label="Toggle theme" title="Toggle theme"
        class="theme-toggle text-slate-900 data-[state=checked]:text-amber-300 transition-colors delay-500" class:theme-toggle--toggled={$checked}>
        <!-- relative h-6 cursor-default rounded-full bg-white transition-colors data-[state=checked]:bg-slate-900 border border-slate-500 -->
        <!-- <span class="thumb block rounded-full transition"></span> -->
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            class="theme-toggle__within w-10 h-10"
            viewBox="0 0 32 32"
            fill="currentColor">
        <clipPath id="theme-toggle__within__clip">
            <path d="M0 0h32v32h-32ZM6 16A1 1 0 0026 16 1 1 0 006 16" />
        </clipPath>
        <g clip-path="url(#theme-toggle__within__clip)">
            <path d="M30.7 21.3 27.1 16l3.7-5.3c.4-.5.1-1.3-.6-1.4l-6.3-1.1-1.1-6.3c-.1-.6-.8-.9-1.4-.6L16 5l-5.4-3.7c-.5-.4-1.3-.1-1.4.6l-1 6.3-6.4 1.1c-.6.1-.9.9-.6 1.3L4.9 16l-3.7 5.3c-.4.5-.1 1.3.6 1.4l6.3 1.1 1.1 6.3c.1.6.8.9 1.4.6l5.3-3.7 5.3 3.7c.5.4 1.3.1 1.4-.6l1.1-6.3 6.3-1.1c.8-.1 1.1-.8.7-1.4zM16 25.1c-5.1 0-9.1-4.1-9.1-9.1 0-5.1 4.1-9.1 9.1-9.1s9.1 4.1 9.1 9.1c0 5.1-4 9.1-9.1 9.1z" />
        </g>
        <path class="theme-toggle__within__circle" d="M16 7.7c-4.6 0-8.2 3.7-8.2 8.2s3.6 8.4 8.2 8.4 8.2-3.7 8.2-8.2-3.6-8.4-8.2-8.4zm0 14.4c-3.4 0-6.1-2.9-6.1-6.2s2.7-6.1 6.1-6.1c3.4 0 6.1 2.9 6.1 6.2s-2.7 6.1-6.1 6.1z" />
        <path class="theme-toggle__within__inner" d="M16 9.5c-3.6 0-6.4 2.9-6.4 6.4s2.8 6.5 6.4 6.5 6.4-2.9 6.4-6.4-2.8-6.5-6.4-6.5z" />
        </svg>
    </button>
    <input use:melt={$input}>
</div>

<style lang="postcss">
    /* button {
        --w: 2.75rem;
        --padding: 0.125rem;
        width: var(--w);
    } */

    /* .thumb {
        --size: 1.25rem;
        width: var(--size);
        height: var(--size);
        transform: translateX(var(--padding));
        background-color: theme(colors.slate.800);
    } */

    /* :global([data-state='checked']) .thumb {
        background-color: theme(colors.white);
        transform: translateX(calc(var(--w) - var(--size) - var(--padding)));
    } */
</style>
