<script>
	import Upload from '$lib/Upload.svelte';
	import CodeBlock from '$lib/demo/CodeBlock.svelte';
	import {
		codeUpload01,
		codeUpload02,
		codeUpload03,
		codeUpload04,
		codeUpload05,
		codeUpload06,
		codeUpload07,
		codeUpload08
	} from '$lib/demo/sample-code';

	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import Table from '$lib/demo/layout/Table.svelte';

	const animatedProgress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	animatedProgress.set(0);

	const uploadProps = [
		{ key: 'path', description: 'String | The path to Firebase Storage Folder' },
		{
			key: 'accept',
			description: 'The accepted file types. <br /><span class="font-bold">Default:</span> null'
		},
		{
			key: 'contentType',
			description:
				'The content type metadata to store with the file. <br /><span class="font-bold">Default:</span> do not set any content type'
		},
		{
			key: 'keepFileName',
			description:
				'If true, the file name and extension will be added to the end of <code>path</code>.<br /><span class="font-bold">Default:</span> false'
		},
		{
			key: 'hidden',
			description:
				'If true, the <code>&lt;input type="file"...</code> will have a hidden value. Usefull to create custom upload buttons. <br /><span class="font-bold">Default:</span> false'
		},
		{
			key: 'log',
			description: 'Display console logs <br /><span class="font-bold">Default:</span> false<br />'
		},
		{
			key: 'url',
			description:
				'Variable where the download url of the file is stored after the upload is complete'
		},
		{ key: 'error', description: 'Variable where the error message is stored if an error occurs' },
		{ key: 'progress', description: 'Variable where the progress % is stored' },
		{ key: 'progressMb', description: 'Variable where the progress in MB is stored' }
	];

	const uploadSlots = [
		{
			key: 'uploading',
			description: 'Rendered while the file is being uploaded'
		},
		{ key: 'fallback', description: 'Rendered if an error occurs' },
		{ key: 'default', description: 'Default slot rendered when the upload is complete' }
	];

	const uploadEvents = [
		{
			key: 'on:progressChange',
			description: 'Dispatched when the progress of the upload changes'
		},
		{
			key: 'on:uploadComplete',
			description: 'Dispatched when the upload is complete'
		}
	];
</script>

<h1>Upload to Firebase Storage</h1>
<p>
	The
	<code>Upload</code>
	component is a
	<code>&lt;input type="file"...</code>
	tag with the functionality to upload files to Firebase Storage.
</p>
<h2>Basic Usage</h2>
<CodeBlock code={codeUpload01} />
<h2>Preserving file name</h2>
<p>
	If you dont want to overwrite the filename, use the
	<code>keepFileName</code>
	flag and remove the filename from the
	<code>path</code>
</p>
<CodeBlock code={codeUpload02} />
<h2>Error Handling</h2>
<CodeBlock code={codeUpload03} />
<h2>Setting content type</h2>
<CodeBlock code={codeUpload04} />
<h2>Styling the component</h2>
<p>
	All the classes passed to the component are reflected to the
	<code>&lt;input type="file"...</code>
	tag, so you can pass your own classes or style the button like this if you are using tailwindcss:
</p>
<CodeBlock code={codeUpload05} />
<p>The above code would produce a button like this:</p>
<Upload
	path="path/to/your/folder/file.png"
	contentType="image/png"
	let:url
	let:error
	class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
	file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100">
	<p>The file has been uploaded!</p>
	<a href={url}>Download is here</a>
	<div slot="fallback">Error uploading file: {error}</div>
</Upload>
<h2>Custom Upload Buttons</h2>
<p>
	If you don't want to use the browser default input file, you can create your own and pass the
	<code>hidden</code>
	flag, like this:
</p>
<CodeBlock code={codeUpload06} />
<h2>Showing upload progress</h2>
<CodeBlock code={codeUpload07} />
<h2>Smooth upload progress with Svelte</h2>
<CodeBlock code={codeUpload08} />
<p>The above code will produce a progress indicator like this</p>
<img src="/smooth-progress.gif" alt="Smooth progress gif" />
<hr />
<h1>Parameters</h1>
<h2 class="italic">Upload props</h2>
<Table values={uploadProps} keyDescription="Props" valueDescription="Description" />
<h2 class="italic">Upload slots</h2>
<Table values={uploadSlots} keyDescription="Slots" valueDescription="Description" />
<h2 class="italic">Upload events</h2>
<Table values={uploadEvents} keyDescription="Events" valueDescription="Description" />
