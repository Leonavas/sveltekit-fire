export default `
<script>
	import { Col } from 'sveltekit-fire';
</script>

<Col
	path={'posts'}
	let:data={posts}
	let:error>
	<!-- yay, the collection has loaded -->
	{#each posts as post}
		<p>{post.title}</p>
	{/each}
</Col>
`;
