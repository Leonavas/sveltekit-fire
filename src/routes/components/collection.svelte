<script>
	import Collection from '$lib/Collection.svelte';
</script>

<Collection maxWait="10" log={true} path={'posts'} let:data let:last let:error>

	{#each data as post}{post.title}{/each}
	<br />
	{last.title}
	<div slot="loading">Carregando...</div>
	<div slot="fallback">{error}</div>

</Collection>
