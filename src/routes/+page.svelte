<script lang="ts">
	import { Computer, Mail } from '@lucide/svelte';

	import myvaccn from '#lib/scripts/myvaccn.js?raw';

	import Website from '#lib/components/Website.svelte';
	import Calendar from '#lib/components/Calendar.svelte';
	import Modifiers from '#lib/components/Modifiers.svelte';
	import Dates from '#lib/components/Dates.svelte';
	import { parseData } from '#lib/utils.ts';

	import { cpts, type CPT, type DateObject } from '#lib/components/modifiers.ts';

	let selectedWebsite = $state<string>('Pick a Location');
	let datesObject = $state<DateObject[]>([]);
	let cptCodes = $state<CPT[]>(cpts);
	let selectedDiagnosisCode = $state<string>('Pick Diagnosis Codes');
	let inputText = $state('');
	let totalLines = $derived(
		datesObject.reduce((total, dateObject) => total + dateObject.labels.length, 0)
	);

	let config = $derived({
		website: selectedWebsite,
		datesObject: datesObject,
		diagnosisCode: selectedDiagnosisCode,
		cpts: cptCodes
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

<div class="flex flex-col gap-golden-md">
	<div>
		<h2>Select Website</h2>

		<Website bind:selectedWebsite />

		<textarea
			bind:value={inputText}
			oninput={() => (datesObject = parseData(inputText))}
			class="textarea w-full textarea-primary mt-golden-lg my-golden-md"
			placeholder="Paste Grist data"></textarea>

		<hr class="text-gray-300 dark:text-gray-600 mx-auto mt-golden-lg" />

		<h2>Select Modifiers</h2>

		<Modifiers bind:cptCodes />
	</div>

	<div>
		<h2>Select Dates</h2>

		<Calendar bind:datesObject {cptCodes} />
	</div>

	{#if datesObject.length > 0}
		<div>
			<h2>Adjust Labels</h2>

			<Dates {datesObject} cpts={cptCodes} />
		</div>

		<h3 class="text-right">
			Total Lines: <span class:text-red-500={totalLines > 50}>{totalLines}</span> / 50
		</h3>
	{/if}
</div>

{#if datesObject.length > 0}
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
