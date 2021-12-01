<script>
	import { ClipboardCopy } from '$lib/demo/icons';

	let firebaseConfig = '';
	let parsedConfig;
	let parseError = '';
	let generatedEnvFile = '';

	const mandatoryKeys = [
		'apiKey',
		'authDomain',
		'projectId',
		'storageBucket',
		'messagingSenderId',
		'appId'
	];

	$: try {
		parsedConfig = firebaseConfig;
		if (parsedConfig !== '') {
			if (parsedConfig.includes('const firebaseConfig')) {
				const extractObjectRegex = /[^=]{(.|\n)*(?!$)/;
				const addDoubleQuotesToJsonKeysRegex = /(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9_]+)(['"])?:/g;
				parsedConfig = firebaseConfig.match(extractObjectRegex)[0];
				parsedConfig = parsedConfig.replace(addDoubleQuotesToJsonKeysRegex, '$1"$3":');
			}
			parsedConfig = JSON.parse(parsedConfig);

			mandatoryKeys.forEach((key) => {
				if (!parsedConfig.hasOwnProperty(key)) {
					throw `Missing key: ${key}`;
				}
			});

			generatedEnvFile = `VITE_PUBLIC_FIREBASE_API_KEY=${parsedConfig.apiKey}
VITE_PUBLIC_FIREBASE_AUTH_DOMAIN=${parsedConfig.authDomain}
VITE_PUBLIC_FIREBASE_PROJECT_ID=${parsedConfig.projectId}
VITE_PUBLIC_FIREBASE_STORAGE_BUCKET=${parsedConfig.storageBucket}
VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${parsedConfig.messagingSenderId}
VITE_PUBLIC_FIREBASE_APP_ID=${parsedConfig.appId}
${
	parsedConfig.measurementId
		? 'VITE_PUBLIC_FIREBASE_MEASUREMENT_ID=' + parsedConfig.measurementId
		: ''
}
${parsedConfig.databaseURL ? 'VITE_PUBLIC_FIREBASE_DATABASE_URL=' + parsedConfig.databaseURL : ''}
VITE_PUBLIC_FIREBASE_USE_ANALYTICS=true
VITE_PUBLIC_FIREBASE_USE_PERFORMANCE=true
VITE_PUBLIC_FIREBASE_USER_PERSISTENCE=local
`.replace(/^\s*\n/gm, '');
		} else {
			generatedEnvFile = '';
		}

		parseError = '';
	} catch (err) {
		parseError = err;
		generatedEnvFile = '';
	}
</script>

<h1 class="text-xl">Env file generator</h1>
<p>
	Utility tool to convert a firebase configuration object into
	<span class="text-brand-600 font-bold">Sveltekit Fire</span>
	.env file
</p>
<span class="text-sm">
	Paste your
	<code class="italic font-bold">firebaseConfig</code>
	here
</span>
<textarea
	bind:value={firebaseConfig}
	class="rounded-lg border-warmGray-200 border bg-white h-80 w-full text-warmGray-600 resize-none
	py-2 px-4"
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
	<div class="text-rose-600">{parseError}</div>
{/if}

{#if !!generatedEnvFile}
	<p>Here is your .env file:</p>
	<div class="relative group">
		<ClipboardCopy
			class="absolute top-2 right-2 z-50 cursor-pointer text-gray-500 group-hover:text-gray-50"
			textToCopy={generatedEnvFile} />
		<pre>
			<code>{generatedEnvFile}</code>
		</pre>
	</div>
{/if}
