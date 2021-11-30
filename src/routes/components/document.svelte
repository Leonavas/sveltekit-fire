<script>
	import Doc from '$lib/Doc.svelte';
</script>

<h1>Document</h1>
<p>
	The
	<code>Doc</code>
	component fetches data from a Firestore document. If Firebase is not initialized it is
	automatically initialized before fetching the document.
</p>
<p>
	<code>Doc</code>
	relies on
	<a href="https://firebase.google.com/docs/firestore/solutions/firestore-lite">
		Cloud Firestore Lite SDK
	</a>
	to provide a light and fast access to Firestore documents.
</p>
<h1>With Realtime Updates</h1>
<p>If you need realtime updates use</p>

<Doc path={'posts/how-can-i-get-involved'} log={true} let:data={post} let:error>
	{post.title}
	<div slot="loading">Loading...</div>
	<div slot="fallback">{error}</div>
</Doc>
