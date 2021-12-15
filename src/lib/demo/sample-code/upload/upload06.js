export default `<script>
	import { Upload } from 'sveltekit-fire';

	let inputFile;
</script>

<img on:click={()=>inputFile.click()} src="custom-upload.png" alt="Custom upload"  />
<Upload
	bind:this={inputFile}
	path="path/to/your/folder/file.png"
	contentType="image/png"
	let:url
	let:error
	hidden>
    <p>The file has been uploaded!</p>
    <a href={url}>Download it here</a>
	<div slot="fallback">
		Error uploading file: {error}
	</div>
</Upload>
`;
