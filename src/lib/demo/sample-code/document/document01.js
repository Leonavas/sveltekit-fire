export default `<script>
	import { Doc } from 'sveltekit-fire';
</script>

<Doc path={'posts/postId'} let:data={post}>
	<!-- yay, the document loaded -->
	{post.title}
</Doc>
`;
