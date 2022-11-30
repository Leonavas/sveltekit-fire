export default `
<script>
	import { Col } from 'sveltekit-fire';
</script>

<Col
	path={'posts'}
	log
	let:data={posts}
	let:error>
	<!-- yay, the collection has loaded -->
	{#each posts as post}
		<p>{post.title}</p>
	{/each}
	<div slot="loading">Loading</div>
	<div slot="fallback">Encontered an error: {error}</div>
</Col>
`;