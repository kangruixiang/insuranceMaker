<script lang="ts">
	import { onMount } from 'svelte';
	import { type CPT, type DateObject } from './modifiers';

	type Props = {
		datesObject: DateObject[];
		cptCodes: CPT[];
	};

	let { datesObject = $bindable(), cptCodes }: Props = $props();

	function callyEvent(node) {
		const handler = (e) => {
			const value = e.target.value;

			// gets selected dates first
			const selectedDates = value ? value.split(' ').sort() : [];

			const defaultLabels = cptCodes.filter((cpt) => cpt.checked).map((cpt) => cpt.label);

			datesObject = selectedDates.map((date: string) => {
				// this will preserve existing labels on select
				const existingDatesObject = datesObject.find((d) => d.date === date);

				return existingDatesObject ?? { date, labels: [...defaultLabels] };
			});
		};
		node.addEventListener('change', handler);
		return () => node.removeEventListener('change', handler);
	}

	onMount(async () => {
		await import('cally');
	});
</script>

<calendar-multi {@attach callyEvent} class="cally rounded-md text-lg">
	<calendar-month></calendar-month>
</calendar-multi>
