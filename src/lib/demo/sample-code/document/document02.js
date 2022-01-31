export default `<script>
	import { Doc } from 'sveltekit-fire';
</script>

<Doc path={'posts/postId'} let:data={post} log>
    <!-- yay, the document loaded with console logs -->
	{post.title}
</Doc>
`;
