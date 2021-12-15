<script>
	import ColRealtime from '$lib/ColRealtime.svelte';
	import { orderBy, limit } from 'firebase/firestore';

	let query = [orderBy('title', 'asc'), limit(1)];
</script>

<ColRealtime path={'posts'} {query} log let:data={posts} let:error>
	<!-- 
	yay, the collection has loaded
	and will update automatically 
	-->
	{#each posts as post}
		<p>{post.title}</p>
	{/each}
	<div slot="loading">Loading</div>
	<div slot="fallback">Encontered an error: {error}</div>
</ColRealtime>
