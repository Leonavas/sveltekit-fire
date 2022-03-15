<script lang="ts">
	import { userStore } from 'sveltekit-fire';

	const store = userStore();
</script>

<slot name="before" />

{#if $store}
	{#if $store.loading}
		<slot name="loading" />
	{:else}
		<slot user={$store} />
	{/if}
{:else}
	<slot name="signed-out" />
{/if}

<slot name="after" />
