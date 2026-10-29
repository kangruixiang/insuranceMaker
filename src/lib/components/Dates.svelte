<script lang="ts">
	import type { CPT, DateObject } from './modifiers';

	type Props = {
		datesObject: DateObject[];
		cpts: CPT[];
	};

	let { datesObject, cpts }: Props = $props();

	// Add a label to a specific date
	function addLabel(date: string, label: string) {
		const entry = datesObject.find((d) => d.date === date);

		if (entry && !entry.labels.includes(label)) {
			entry.labels.push(label);
		}
	}

	// Remove a label from a specific date
	function removeLabel(date: string, label: string) {
		const entry = datesObject.find((d) => d.date === date);

		if (entry) {
			entry.labels = entry.labels.filter((l) => l !== label);
		}
	}
</script>

{#each datesObject as dateObject (dateObject)}
	<div>
		<h3>{dateObject.date}</h3>
		<div class="grid md:grid-cols-6 xl:grid-cols-8 grid-cols-3 gap-x-golden-md card card-body">
			{#each cpts as cpt (cpt.label)}
				{@const checkedDate = dateObject.labels.includes(cpt.label)}
				<button
					onclick={() => {
						if (checkedDate) {
							removeLabel(dateObject.date, cpt.label);
						} else {
							addLabel(dateObject.date, cpt.label);
						}
					}}
					class:badge-primary={checkedDate}
					class="badge">{cpt.label}</button
				>
			{/each}
		</div>
	</div>
{/each}
