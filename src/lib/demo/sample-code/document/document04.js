export default `<script>
	import { Doc } from 'sveltekit-fire';
</script>

<Doc path={'posts/postId'} log let:data={post} let:error>
	<!-- yay, the document loaded -->
	{post.title}
	<div slot="loading">Loading</div>
	<div slot="fallback">Encontered an error: {error}</div>
</Doc>
`;
