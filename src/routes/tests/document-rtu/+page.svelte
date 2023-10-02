<script>
	import { DocRealtime } from 'sveltekit-fire';
</script>

<DocRealtime path={'posts/postId'} log let:data={post} let:error>
	<!-- the document loaded and it will automatically rerender if the document is changed -->
	{post.title}
	<div slot="loading">Loading</div>
	<div slot="fallback">Encountered an error: {error}</div>
</DocRealtime>
