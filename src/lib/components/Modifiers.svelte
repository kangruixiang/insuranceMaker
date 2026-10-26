<script lang="ts">
	import type { CPT } from './modifiers';

	type Props = {
		cptCodes: CPT[];
	};

	const diagnosisCode = ['A', 'B', 'C'];

	let { cptCodes = $bindable() }: Props = $props();
</script>

{#snippet makeCPTInput(inputType: string, name: string, obj: Record<string, any>, key: string)}
	<label class="input">
		<span class="label">{name}</span>
		<input type={inputType} bind:value={obj[key]} />
	</label>
{/snippet}

{#each cptCodes as cptCode (cptCode.label)}
	<div class="py-golden-md">
		<input
			type="checkbox"
			name={cptCode.label}
			class="checkbox"
			id={cptCode.label}
			bind:checked={cptCode.checked}
		/>
		<label class="label" for={cptCode.label}>{cptCode.label}</label>

		{#if cptCode.checked}
			<div class="flex gap-golden-sm mt-golden-sm justify-center items-center">
				{@render makeCPTInput('text', 'Modifier', cptCode, 'modifier')}
				{@render makeCPTInput('number', '$', cptCode, 'cost')}
				{@render makeCPTInput('number', 'Unit', cptCode, 'unit')}
				{#each diagnosisCode as code (code)}
					<input
						type="checkbox"
						name="Diagnosis Pointer"
						class="checkbox"
						id={`pointer-${code}`}
						value={code}
						bind:group={cptCode.pointers}
					/>
					<label class="label" for={`pointer-${code}`}>{code}</label>
				{/each}
			</div>
		{/if}
	</div>
{/each}
