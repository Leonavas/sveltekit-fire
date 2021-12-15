export default `<script>
	import { Doc } from 'sveltekit-fire';
</script>

<Doc path={'posts/postId'} log let:data={post}>
	<!-- yay, the document loaded -->
	{post.title}
	<div slot="loading">Loading</div>
</Doc>
`;
