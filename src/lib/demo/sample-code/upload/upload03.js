export default `<script>
	import { Upload } from 'sveltekit-fire';
</script>

<Upload
	path="path/to/your/folder/file.png"
	let:url
	let:error>
    <p>The file has been uploaded!</p>
    <a href={url}>Download it here</a>
	<div slot="fallback">
		Error uploading file: {error}
	</div>
</Upload>
`;
