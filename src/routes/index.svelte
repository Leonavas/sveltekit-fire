<script>
	import { goto } from '$app/navigation';

	// import { getAuth } from '@firebase/auth';

	import { codeInitFirebase } from '$lib/demo/sample-code';

	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import Button from '$lib/demo/Button.svelte';
	import CodeBlock from '$lib/demo/CodeBlock.svelte';
	import Table from '$lib/demo/layout/Table.svelte';

	// function googleLogin(event) {
	// 	const googleProvider = new GoogleAuthProvider();
	// 	googleProvider.setDefaultLanguage('pt_br');
	// 	signInWithPopup(getAuth(), googleProvider)
	// 		.then((result) => {
	// 			var user = result.user;
	// 		})
	// 		.catch((err) => {
	// 			console.error(err);
	// 		});
	// }

	const configs = [
		{ key: 'VITE_PUBLIC_FIREBASE_API_KEY', description: 'firebaseConfig.apiKey' },
		{ key: 'VITE_PUBLIC_FIREBASE_AUTH_DOMAIN', description: 'firebaseConfig.authDomain' },
		{ key: 'VITE_PUBLIC_FIREBASE_PROJECT_ID', description: 'firebaseConfig.projectId' },
		{
			key: 'VITE_PUBLIC_FIREBASE_STORAGE_BUCKET',
			description: 'firebaseConfig.storageBucket'
		},
		{
			key: 'VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
			description: 'firebaseConfig.messagingSenderId'
		},
		{ key: 'VITE_PUBLIC_FIREBASE_APP_ID', description: 'firebaseConfig.appId' },
		{
			key: 'VITE_PUBLIC_FIREBASE_DATABASE_URL',
			description: 'firebaseConfig.databaseURL <span class="italic">optional</span>'
		},
		{
			key: 'VITE_PUBLIC_FIREBASE_MEASUREMENT_ID',
			description: 'firebaseConfig.measurementId <span class="italic">optional</span>'
		},
		{
			key: 'VITE_PUBLIC_FIREBASE_USE_ANALYTICS',
			description:
				'whether to use or not analytics. <br /><span class="font-bold">default:</span> true'
		},
		{
			key: 'VITE_PUBLIC_FIREBASE_USE_PERFORMANCE',
			description:
				'whether to use or not performance. <br /><span class="font-bold">default:</span> true'
		},
		{
			key: 'VITE_PUBLIC_FIREBASE_USER_PERSISTENCE',
			description: 'local | session<br /><span class="font-bold">default:</span> local'
		}
	];
</script>

<h1>Getting Started</h1>

<p>
	Integrate
	<a class="!text-svelte" href="https://kit.svelte.dev/" target="_blank">Svelte Kit</a>
	projects with
	<a class="!text-firebase" href="https://firebase.google.com/" target="_blank">Firebase</a>
	effortlessly!
</p>
<hr />
<h1>Installation</h1>
<p>To install Sveltekit Fire run on your terminal</p>
<CodeBlock lang="bash" code={`npm install -D sveltekit-fire`} />
<p>
	You will probably need to use other modules from firebase. If you do so, make sure you install
	firebase js sdk v9+
</p>
<CodeBlock lang="bash" code={`npm install -D firebase`} />

<p>if you instaleld firebase js sdk v9+, by the time os this documentation is written, you will need to add the following code to yours svelte.config.js file:<p>

<CodeBlock lang="javascript" code={`kit : {
...
	vite: {
		ssr: {
			external: ['firebase']
		}
	}
}
...`} />

<p>
	Now you'll need to create a new app inside a Firebase project. Make sure to choose the option
	<i>web</i>
</p>
<h2 id="dotenv">Firebase Configuration</h2>
<p>
	Sveltekit Fire uses .env files to store firebase configuration data in order to provide a cleaner
	code and the ability to lazily initialize Firebase from multiple components.
</p>
<p class="!-mb-2">
	A
	<code>.env</code>
	file will look like this
</p>
<CodeBlock
	lang="bash"
	code={`VITE_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
VITE_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
VITE_PUBLIC_FIREBASE_DATABASE_URL="YOUR_DATABASE_URL"
VITE_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
VITE_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
VITE_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
VITE_PUBLIC_FIREBASE_MEASUREMENT_ID="YOUR_MEASUREMENT_ID"
VITE_PUBLIC_FIREBASE_USE_ANALYTICS=true
VITE_PUBLIC_FIREBASE_USE_PERFORMANCE=true
VITE_PUBLIC_FIREBASE_USER_PERSISTENCE="local"`} />

<Table keyDescription="Config" values={configs} />
<Button
	on:click={() => {
		goto('/env-generator');
	}}>
	Generate your .env file
</Button>
<hr />
<h1>Initializing Firebase</h1>
<p>Now you can initialize Firebase like this:</p>
<CodeBlock lang="svelte" code={codeInitFirebase} />
<p>
	But dont worry, if you don't initialize Firebase, it will automatically be initialized only once
	whenever a Sveltekit Fire component is used
</p>
<hr />
<!-- <h1>Starter Project</h1>
<p>Start faster with the starter project</p>
<pre>
	<code>@TODO npx degit sveltekit-fire</code>
</pre>
<hr /> -->
<h1>Server Side Rendering</h1>
<p>
	Although Sveltekit Fire is compatible with ssr, it's not yet fully supported. For instance,
	collections and documents that require a logged user are not compatible with ssr.
</p>
<hr />
<h1>Disclaimer</h1>
<p>
	This lib was initially intendend to be a PR to the awesome
	<a href="https://github.com/codediodeio/sveltefire">codediodeio/sveltefire</a> written by Jeff Delaney.

	<br />
	But as the work progressed, in order to maximize the benefits of firebase js sdk 9.0+ and
	sveltekit the project started to grow in a very different way so I decided to create a new lib.
	<br />
	Some of the code was heavily inspired by the sveltefire project.
</p>