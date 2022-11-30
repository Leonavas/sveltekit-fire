<script lang="ts">
	import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
	import { createEventDispatcher } from 'svelte';
	import { initFirebase } from './firebase';

	export let path;
	export let accept = null;
	export let contentType = null;
	export let keepFileName = false;
	export let hidden = false;
	export let log = false;
	let inputFile;
	initFirebase();

	let url;
	let progress = 0;

	const storage = getStorage();
	let uploadingFile = false;
	let uploadEnded = false;
	let file;
	let progressMb = 0;
	let error = null;
	const dispatch = createEventDispatcher();

	function upload() {
		const storageRef = ref(storage, keepFileName ? path + '/' + file.name : path);

		let metadata = null;
		if (!!contentType) {
			metadata = {
				contentType: contentType
			};
		}

		const uploadTask = uploadBytesResumable(storageRef, file, metadata);

		uploadingFile = true;

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
				progressMb = Math.round(snapshot.bytesTransferred / 1000000);
				if (log) {
					console.log('state changed:', snapshot);
				}
				dispatch('progressChange', {
					progress: progress
				});
			},
			(err) => {
				console.error(err);
				uploadingFile = false;
				error = err;
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					if (log) {
						console.log('uploadComplete. Url:', downloadURL);
					}
					dispatch('uploadComplete', {
						file: file,
						dlUrl: downloadURL
					});
					url = downloadURL;
					uploadEnded = true;
					uploadingFile = false;
					progressMb = 0;
					progress = 0;
				});
			}
		);
	}

	export function click() {
		inputFile.click();
	}
</script>

<input
	bind:this={inputFile}
	type="file"
	{accept}
	on:change={(event) => {
		file = event.target.files[0];
		upload();
	}}
	class={`${$$props.class}`}
	{hidden} />
{#if uploadingFile}
	<slot name="uploading" />
{:else if !!error}
	<slot name="fallback" />
{:else if uploadEnded}
	<slot {url} {error} {progress} />
{/if}
