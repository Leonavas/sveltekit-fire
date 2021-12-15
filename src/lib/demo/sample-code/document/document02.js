export default `<script>
	import { Doc } from 'sveltekit-fire';
</script>

<Doc path={'posts/postId'} log>
    <!-- yay, the document loaded with console logs -->
	{post.title}
</Doc>
`;
