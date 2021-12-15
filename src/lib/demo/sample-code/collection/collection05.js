export default `<script>
	import { Col } from 'sveltekit-fire';
	import { orderBy, limit } from 'firebase/firestore/lite';
	// remember to import from firestore/lite!

	let query = [orderBy("title", "desc"), limit(10)];
</script>

<Col path={'posts'} log {query} let:data={posts} let:error>
	<!-- yay, the collection has loaded -->
	{#each posts as post}
		<p>{post.title}</p>
	{/each}
	<div slot="loading">Loading</div>
	<div slot="fallback">Encontered an error: {error}</div>
</Col>
`;
