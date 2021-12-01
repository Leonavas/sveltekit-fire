<script>
	import Collection from '$lib/Collection.svelte';
	import CodeBlock from '$lib/demo/CodeBlock.svelte';
</script>

<Collection log={true} path={'posts'} let:data let:last let:error>

	{#each data as post}{post.title}{/each}
	<br />
	{last.title}
	<div slot="loading">Carregando...</div>
	<div slot="fallback">{error}</div>

</Collection>

<CodeBlock
	lang="svelte"
	code={`<Collection maxWait="10" log={true} path={'posts'} let:data let:last let:error>

	{#each data as post}{post.title}{/each}
	<br />
	{last.title}
	<div slot="loading">Carregando...</div>
	<div slot="fallback">{error}</div>

</Collection>
`} />
