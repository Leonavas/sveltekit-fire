<script>
	import {
		codeDocument01,
		codeDocument02,
		codeDocument03,
		codeDocument04
	} from '$lib/demo/sample-code';
	import CodeBlock from '$lib/demo/CodeBlock.svelte';
	import Table from '$lib/demo/layout/Table.svelte';

	const documentProps = [
		{ key: 'path', description: 'String | Document Reference' },
		{
			key: 'log',
			description: 'Boolean <span class="font-bold">Default:</span> false<br />Display console logs'
		},
		{
			key: 'maxWait',
			description:
				'Number <span class="font-bold">Default:</span> 10000<br />Timeout to fetch data in ms'
		},
		{ key: 'data', description: 'Variable where the data from the document is stored' },
		{ key: 'error', description: 'Variable where the error message is stored if an error occurs' }
	];

	const documentSlots = [
		{
			key: 'loading',
			description:
				'Initial state of the component. Is shown before data is fetched or an error occurs'
		},
		{ key: 'fallback', description: 'Rendered if an error occurs' },
		{ key: 'default', description: 'Default slot rendered when document data is loaded' },
		{ key: 'before', description: 'Rendered before the document' },
		{ key: 'after', description: 'Rendered after the document' }
	];
</script>

<h1>Document</h1>
<p>
	The
	<code>Doc</code>
	component fetches data from a Firestore document. If Firebase is not initialized it is
	automatically initialized before fetching the document.
</p>
<p>
	<code>Doc</code>
	relies on
	<a href="https://firebase.google.com/docs/firestore/solutions/firestore-lite" target="_blank">
		Cloud Firestore Lite SDK
	</a>
	to provide a light and fast access to Firestore documents.
</p>
<h2>Fetch a document</h2>
<CodeBlock code={codeDocument01} lang="svelte" />
<p>
	If Firebase isn't initialized by the time you use Doc, it will automatically be initialized based
	on your
	<a href="/#dotenv">.env config</a>
</p>
<h2>Enable console logs</h2>
<CodeBlock code={codeDocument02} lang="svelte" />
<h2>Loading State</h2>
<CodeBlock code={codeDocument03} lang="svelte" />
<h2>Error Handling</h2>
<CodeBlock code={codeDocument04} lang="svelte" />
<hr />
<h1>Parameters</h1>
<h2 class="italic">Doc props</h2>
<Table values={documentProps} keyDescription="Props" valueDescription="Description" />
<h2 class="italic">Doc slots</h2>
<Table values={documentSlots} keyDescription="Slots" valueDescription="Description" />
<p>
	When you need to access document that are private to authenticated users, you can use it in inside
	a
	<a class="!text-brand-600" href="/components/user">
		<code class="!text-brand-600">User</code>
	</a>
	component.
</p>
<hr />
<h1>Document with reference</h1>
<hr />
<h1>With Realtime Updates</h1>
<p>If you need realtime updates use</p>
