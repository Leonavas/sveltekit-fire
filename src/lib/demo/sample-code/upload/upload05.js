export default `<script>
	import { Upload } from 'sveltekit-fire';
</script>

<Upload
	path="path/to/your/folder/file.png"
	contentType="image/png"
	let:url
	let:error
	class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100">
    <p>The file has been uploaded!</p>
    <a href={url}>Download it here</a>
	<div slot="fallback">
		Error uploading file: {error}
	</div>
</Upload>
`;
