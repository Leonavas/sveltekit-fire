<script>
	// const firebaseConfig = {
	// 	apiKey: 'AIzaSyAzNnQ4pY5EbxlCJYikZkOp8s3IhMvtUcc',
	// 	authDomain: 'sveltekitfire.firebaseapp.com',
	// 	projectId: 'sveltekitfire',
	// 	storageBucket: 'sveltekitfire.appspot.com',
	// 	messagingSenderId: '190977460628',
	// 	appId: '1:190977460628:web:1ca8cd6ba2d62280342781',
	// 	measurementId: 'G-9EEEDDH8JB'
	// };

import CodeHighlight from "$lib/demo/CodeBlock.svelte";

	let firebaseConfig = '';
	let parsedConfig = '';
	let parseError = '';
	$: try {
		parsedConfig = firebaseConfig;
		if (parsedConfig !== '') {
			if (parsedConfig.includes('const firebaseConfig')) {
				const extractObjectRegex = /[^=]{(.|\n)*(?!$)/;
				const addDoubleQuotesToJsonKeysRegex = /(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9_]+)(['"])?:/g;
				parsedConfig = firebaseConfig.match(extractObjectRegex)[0];
				parsedConfig = parsedConfig.replace(addDoubleQuotesToJsonKeysRegex, '$1"$3":');
				console.log('almost there');
				console.log(parsedConfig);
			}
			JSON.parse(parsedConfig);
		}
		parseError = '';
	} catch (err) {
		parseError = 'Firebase Config is not a valid JSON object';
	}
</script>

<div class="">

	<h1 class="text-xl">Env file generator</h1>
	<p>
		Utility tool to convert a firebase configuration object into
		<span class="text-brand-600 font-bold">Sveltekit Fire</span>
		.env files
	</p>
	<span class="text-sm">
		Paste your
		<code class="italic font-bold">firebaseConfig</code>
		here
	</span>
	<textarea
		bind:value={firebaseConfig}
		class="rounded-lg border-warmGray-200 border bg-white h-80 w-full text-warmGray-600 resize-none py-2 px-4"
		placeholder={`//example:
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};`} />
	{#if !!parseError}
		<div class="text-rose-600">Error: {parseError}</div>
	{/if}

    <CodeHighlight />
</div>
