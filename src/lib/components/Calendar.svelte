<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		dates: string[];
	};

	let { dates = $bindable() }: Props = $props();

	function callyEvent(node) {
		const handler = (e) => {
			const value = e.target.value;
			dates = value ? value.split(' ').sort() : [];
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
