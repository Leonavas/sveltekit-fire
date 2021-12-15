export default `<script>
	import { Upload } from 'sveltekit-fire';
</script>

<Upload
	path="path/to/your/folder/file.png"
	contentType="image/png"
	let:url
	let:error
	let:progress>
	<p>The file has been uploaded!</p>
    <a href={url}>Download is here</a>
	<div slot="fallback">
		Error uploading file: {error}
	</div>
	<div slot="uploading">
		{progress}%
	</div>
</Upload>
`;

