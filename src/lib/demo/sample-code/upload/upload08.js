export default `<script>
	import { Upload } from 'sveltekit-fire';
    import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

    const animatedProgress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	animatedProgress.set(0);
</script>

<Upload
	path="path/to/your/folder/file.png"
	contentType="image/png"
	let:url
	let:error
	let:progress
    on:progressChange={(event) => {
		animatedProgress.set(event.detail.progress);
	}}>
	<p>The file has been uploaded!</p>
    <a href={url}>Download is here</a>
	<div slot="fallback">
		Error uploading file: {error}
	</div>
	<div slot="uploading">
		{progress}%
		<br />
		<div
			class="h-6 w-0 rounded z-20 bg-gradient-to-r from-svelte via-amber-600 to-firebase"
			style={\`width: \${$animatedProgress}%\`} />
	</div>
</Upload>
`;

