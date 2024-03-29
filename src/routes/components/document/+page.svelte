<script>
	import {
		codeDocument01,
		codeDocument02,
		codeDocument03,
		codeDocument04,
		codeDocument05
	} from '$lib/demo/sample-code';
	import CodeBlock from '$lib/demo/CodeBlock.svelte';
	import Table from '$lib/demo/layout/Table.svelte';

	const documentProps = [
		{ key: 'path', description: 'String | Document Reference' },
		{
			key: 'log',
			description: 'Display console logs <br /><span class="font-bold">Default:</span> false<br />'
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

	const documentEvents = [
		{
			key: 'on:data',
			description: "Dispatched when the document has loaded containing it's data"
		},
		{
			key: 'on:ref',
			description: 'Dispatched when the document reference is created, usefull for updates'
		}
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
<CodeBlock code={codeDocument01} />
<p>
	If Firebase isn't initialized by the time you use Doc, it will automatically be initialized based
	on your
	<a href="/#dotenv">.env config</a>
</p>
<h2>Enable console logs</h2>
<CodeBlock code={codeDocument02} />
<h2>Loading State</h2>
<CodeBlock code={codeDocument03} />
<h2>Error Handling</h2>
<CodeBlock code={codeDocument04} />
<hr />
<h1>Parameters</h1>
<h2 class="italic">Doc props</h2>
<Table values={documentProps} keyDescription="Props" valueDescription="Description" />
<h2 class="italic">Doc slots</h2>
<Table values={documentSlots} keyDescription="Slots" valueDescription="Description" />
<h2 class="italic">Doc events</h2>
<Table values={documentEvents} keyDescription="Events" valueDescription="Description" />
<p>
	When you need to access document that are private to authenticated users, you can use it in inside
	a
	<a class="!text-brand-600" href="/components/user">
		<code class="!text-brand-600">User</code>
	</a>
	component.
</p>
<hr />
<h1>With Realtime Updates</h1>
<p>
	If you need to use Firestore realtime updates and have your page react to updates on a document
	use
	<code>DocRealtime</code>
	instead of
	<code>Doc</code>
</p>
<p>
	It's powered by
	<a href="https://firebase.google.com/docs/firestore/query-data/listen" target="_blank">
		Firestore's Realtime Updates
	</a>
</p>
<CodeBlock code={codeDocument05} />