<script>
	import {
		codeCollection01,
		codeCollection02,
		codeCollection03,
		codeCollection04,
		codeCollection05,
		codeCollection06,
		codeCollection07
	} from '$lib/demo/sample-code';
	import CodeBlock from '$lib/demo/CodeBlock.svelte';
	import Table from '$lib/demo/layout/Table.svelte';

	const collectionProps = [
		{ key: 'path', description: 'String | Collection Reference' },
		{
			key: 'log',
			description: 'Display console logs <br /><span class="font-bold">Default:</span> false<br />'
		},
		{
			key: 'maxWait',
			description:
				'Number <span class="font-bold">Default:</span> 10000<br />Timeout to fetch data in ms'
		},
		{
			key: 'query',
			description:
				'Receives an array of Firestore queries in order to filter data. <br /><span class="font-bold">Default:</span> null<br />'
		},
		{
			key: 'startWith',
			description:
				'Initial state for the data variable. Prevents the display of loading state and is usefull for displaying cached content. <br /><span class="font-bold">Default:</span> undefined<br />'
		},
		{ key: 'data', description: 'Variable where the data from the collection is stored' },
		{ key: 'error', description: 'Variable where the error message is stored if an error occurs' }
	];

	const collectionSlots = [
		{
			key: 'loading',
			description:
				'Initial state of the component. Is shown before data is fetched or an error occurs'
		},
		{ key: 'fallback', description: 'Rendered if an error occurs' },
		{ key: 'default', description: 'Default slot rendered when collection data is loaded' },
		{ key: 'before', description: 'Rendered before the collection' },
		{ key: 'after', description: 'Rendered after the collection' }
	];

	const collectionEvents = [
		{
			key: 'on:data',
			description: "Dispatched when the collection data has loaded containing it's data"
		},
		{
			key: 'on:ref',
			description: 'Dispatched when the collection reference is created, usefull for updates'
		}
	];
</script>

<h1>Collection</h1>
<p>
	The
	<code>Col</code>
	component fetches data from a Firestore dollection.
</p>
<p>
	<code>Col</code>
	relies on
	<a href="https://firebase.google.com/docs/firestore/solutions/firestore-lite" target="_blank">
		Cloud Firestore Lite SDK
	</a>
	to provide a light and fast access to Firestore collections data.
</p>
<h2>Fetch data from a collection</h2>
<CodeBlock code={codeCollection01} />
<p>
	If Firebase isn't initialized by the time you use Col, it will automatically be initialized based
	on your
	<a href="/#dotenv">.env config</a>
</p>
<h2>Enable console logs</h2>
<CodeBlock code={codeCollection02} />
<h2>Loading State</h2>
<CodeBlock code={codeCollection03} />
<h2>Error Handling</h2>
<CodeBlock code={codeCollection04} />
<h2>Performing Queries</h2>
<p>
	You can filter data by using
	<a href="https://firebase.google.com/docs/firestore/query-data/queries">Firestore Queries</a>
	like this:
</p>
<CodeBlock code={codeCollection05} />
<hr />
<h1>Parameters</h1>
<h2 class="italic">Col props</h2>
<Table values={collectionProps} keyDescription="Props" valueDescription="Description" />
<h2 class="italic">Col slots</h2>
<Table values={collectionSlots} keyDescription="Slots" valueDescription="Description" />
<h2 class="italic">Col events</h2>
<Table values={collectionEvents} keyDescription="Events" valueDescription="Description" />
<p>
	When you need to access collection that is private to authenticated users, you can use it in
	inside a
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
	<code>ColRealtime</code>
	instead of
	<code>Col</code>
</p>
<p>
	It's powered by
	<a href="https://firebase.google.com/docs/firestore/query-data/listen" target="_blank">
		Firestore's Realtime Updates
	</a>
</p>
<CodeBlock code={codeCollection06} />
<h2>Performing Queries</h2>
<p>
	<code>ColRealtime</code>
	also supports filtering data using queries, like this example:
</p>
<CodeBlock code={codeCollection07} />
