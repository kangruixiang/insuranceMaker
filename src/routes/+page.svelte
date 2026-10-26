<script lang="ts">
	import { Computer, Mail } from '@lucide/svelte';

	import myvaccn from '#lib/scripts/myvaccn.js?raw';

	import Website from '#lib/components/Website.svelte';
	import Calendar from '#lib/components/Calendar.svelte';
	import Modifiers from '#lib/components/Modifiers.svelte';

	import { cpts, type CPT } from '#lib/components/modifiers.ts';

	let selectedWebsite = $state<string>('Pick a Location');
	let dates = $state<string[]>([]);
	let cptCodes = $state<CPT[]>(cpts);
	let selectedDiagnosisCode = $state<string>('Pick Diagnosis Codes');

	let config = $derived({
		website: selectedWebsite,
		dates: dates,
		diagnosisCode: selectedDiagnosisCode,
		cpt: cptCodes
	});

	let bookmarklet = $derived.by(() => {
		const script = `
            (function() {
                const BOOKMARK = ${JSON.stringify(config)};
                ${myvaccn}
            })();
        `;

		return `javascript:${encodeURIComponent(script)}`;
	});
</script>

<h1 class="pb-3 text-primary font-semibold">Insurance Bookmarklet Maker</h1>
<p class="prose max-w-none pb-4">
	Use this page to maker insurance bookmarklet for filling insurance forms.
</p>

<div class="grid grid-cols-12 gap-golden-md">
	<div class="col-span-5 mx-golden-md">
		<h2 class="">Select Website</h2>

		<Website bind:selectedWebsite />

		<hr class="text-gray-300 dark:text-gray-600 mx-auto mt-golden-lg" />

		<h2>Select Dates</h2>

		<Calendar bind:dates />
	</div>

	<div class="border-l border-gray-300 dark:border-gray-600 pl-golden-lg col-span-7">
		<h2>Select Modifiers</h2>

		<Modifiers bind:cptCodes />
	</div>
</div>

{#if dates.length > 0}
	<div class="my-golden-2xl text-right">
		<a class="btn btn-primary" href={bookmarklet}>VA Bookmarklet</a>
	</div>
{/if}

<div
	class="mt-golden-xl pt-golden-md border-t border-gray-300 dark:border-gray-600 justify-end text-sm text-right flex gap-x-2"
>
	Made by Kang.
	<a href="mailto:kxiang.wakehealth.edu"><Mail /></a>
	<a href="https://github.com/kangruixiang/bronchmeds"><Computer /></a>
</div>
