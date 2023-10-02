<script>
	import { initFirebase } from 'sveltekit-fire';
	import { Doc } from 'sveltekit-fire';

	import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

	initFirebase();

	//const ref = doc(getFirestore(), '/posts/how-can-i-get-involved');
</script>

<!-- __layout.svelte -->
<Doc
	path={'posts/how-can-i-get-involved'}
	log
	let:data={post}
	let:error>
	<!-- yay, the document loaded -->
	{post.title}
	<div slot="loading">Loading</div>
	<div slot="fallback">Encountered an error: {error}</div>
</Doc>
Pretty Landing Page
