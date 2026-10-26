<script lang="ts">
	type Props = {
		selectedWebsite: string;
	};

	let { selectedWebsite = $bindable() }: Props = $props();
</script>

<select bind:value={selectedWebsite} class="select">
	<option disabled selected>Pick a Location</option>
	<option value="MyVaCCN">MyVaCCN</option>
</select>
