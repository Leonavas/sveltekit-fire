<script lang="ts">
	import { userStore } from 'sveltekit-fire';
	let store = userStore();
</script>

<slot name="before" />
{#if $store}
	<slot user={$store} />
{:else}
	<slot name="signed-out" />
{/if}
<slot name="after" />
