export default `<script>
	import { Doc } from 'sveltekit-fire';
</script>

<Doc path={'posts/postId'}>
	<!-- yay, the document loaded -->
	{post.title}
</Doc>
`;
