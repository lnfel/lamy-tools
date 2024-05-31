<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { createRangeCalendar, melt } from '@melt-ui/svelte'
    import { ChevronLeft, ChevronRight } from 'lucide-svelte'

    import type { DateValue } from '@internationalized/date'

    export let start: DateValue | undefined = undefined
    export let end: DateValue | undefined = undefined

    const dispatch = createEventDispatcher()
    const {
        elements: { calendar, heading, grid, cell, prevButton, nextButton },
        states: { months, headingValue, weekdays, value },
        helpers: { isDateDisabled, isDateUnavailable }
    } = createRangeCalendar({
        fixedWeeks: true
    })

    $: start = $value.start
    $: end = $value.end
    $: dispatch('change', $value)
</script>

<div use:melt={$calendar}>
    <header>
        <button use:melt={$prevButton}>
            <ChevronLeft />
        </button>
        <div use:melt={$heading}>
            {$headingValue}
        </div>
        <button use:melt={$nextButton}>
            <ChevronRight />
        </button>
    </header>

    {#each $months as month}
        <table use:melt={$grid}>
            <thead aria-hidden="true">
                <tr>
                    {#each $weekdays as day}
                        <th>{day}</th>
                    {/each}
                </tr>
            </thead>

            <tbody>
                {#each month.weeks as weekDates}
                    <tr>
                        {#each weekDates as date}
                            <td role="gridcell" aria-disabled={$isDateDisabled(date) || $isDateUnavailable(date)}>
                                <div use:melt={$cell(date, month.value)}>
                                    {date.day}
                                </div>
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    {/each}
</div>

<style lang="postcss">
    [data-melt-calendar] {
        @apply w-min rounded-lg bg-white p-3 text-slate-800 shadow-sm;
    }

    header {
        @apply flex items-center justify-between pb-2;
    }

    header > div {
        @apply flex items-center gap-8;
    }

    [data-melt-calendar-prevbutton] {
        @apply rounded-lg p-1 transition-all hover:bg-blue-100;
    }

    [data-melt-calendar-nextbutton] {
        @apply rounded-lg p-1 transition-all hover:bg-blue-100;
    }

    [data-melt-calendar-heading] {
        @apply font-semibold text-blue-800;
    }

    th {
        @apply text-sm font-semibold text-blue-800;

        & div {
            @apply flex h-6 w-6 items-center justify-center p-4;
        }
    }

    [data-melt-calendar-grid] {
        @apply w-full;
    }

    [data-melt-calendar-cell] {
        @apply flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded-lg p-4 hover:bg-blue-100 focus:ring focus:ring-blue-400 data-[outside-month]:pointer-events-none data-[outside-visible-months]:pointer-events-none data-[outside-month]:cursor-default data-[outside-visible-months]:cursor-default data-[highlighted]:bg-blue-200 data-[range-highlighted]:bg-blue-200 data-[selected]:bg-blue-300 data-[selected]:text-blue-900 data-[disabled]:opacity-40 data-[outside-month]:opacity-40 data-[outside-visible-months]:opacity-40 data-[outside-month]:hover:bg-transparent data-[outside-visible-months]:hover:bg-transparent;
    }

    [data-melt-calendar-cell][data-outside-month='true'][data-outside-visible-months='true'] {
        @apply opacity-0;
    }
</style>
