export default `<script>
	import { Upload } from 'sveltekit-fire';
</script>

<Upload
	path="path/to/your/folder/file.png"
	let:url>
    <p>The file has been uploaded!</p>
    <a href={url}>Download it here</a>
</Upload>
`;
