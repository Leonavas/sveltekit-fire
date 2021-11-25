<script lang="ts">
	// export let path;
	export let log = false;
	export let maxWait = 10000;

	let loading = true;
	let errored = false;
	let error = null;
	let data = {};

	import { doc, getDoc, getFirestore } from 'firebase/firestore/lite';
	import { onMount } from 'svelte';
	import { getApps } from 'firebase/app';
	import { initFirebase } from './firebase';

	if (getApps().length === 0) {
		initFirebase();
	}
	const ref = doc(getFirestore(), 'posts/how-can-i-get-involved');
	getDoc(ref)
		.then((snap) => {
			if (!!snap.data()) {
				data = snap.data();
				if (log) {
					console.groupCollapsed(`Doc ${snap.id}`);
					console.log(`Path: ${ref.path}`);
					console.log('Snapshot:', data);
					console.groupEnd();
				}
			} else {
				errored = true;
				error = `No such document '${ref.path}'`;
				console.error(error);
			}
			loading = false;
		})
		.catch((err) => {
			errored = true;
			loading = false;
			error = `Error getting document: ${err}`;
			console.error(err);
		});
</script>

<slot name="before" />
{#if loading}
	<slot name="loading" />
{:else if errored}
	<slot name="fallback" />
{:else}
	<slot {data} {error} {ref} />
{/if}
<slot name="after" />
