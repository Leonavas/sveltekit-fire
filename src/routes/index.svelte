<script>
	import { getAuth, signOut } from '@firebase/auth';

	import { User, Doc, CollectionRealtime } from 'sveltekit-fire';
	//import { userStore } from 'sveltekit-fire';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import Button from '$lib/demo/Button.svelte';
	import CodeBlock from '$lib/demo/CodeBlock.svelte';

	//let user = userStore();

	function googleLogin(event) {
		const googleProvider = new GoogleAuthProvider();
		googleProvider.setDefaultLanguage('pt_br');
		signInWithPopup(getAuth(), googleProvider)
			.then((result) => {
				var user = result.user;
			})
			.catch((err) => {
				console.error(err);
			});
	}
</script>

<h1>Installation</h1>

<p>
	Integrate
	<a class="!text-svelte" href="https://kit.svelte.dev/">Svelte Kit</a>
	projects with
	<a class="!text-firebase" href="https://firebase.google.com/">Firebase</a>
	effortlessly!
</p>
<hr />
<h1>Getting Started</h1>
<p>To install Sveltekit Fire run on your terminal</p>
<CodeBlock lang="bash" code={`npm install -D sveltekit-fire`} />
<p>
	You will probably need to use other modules from firebase. If you do so, make sure you install
	firebase js sdk v9+
</p>
<CodeBlock lang="bash" code={`npm install -D firebase`} />
<p>
	Now you'll need to create a new app inside a Firebase project. Make sure to choose the option
	<i>web</i>
</p>
<h2>Initializing Firebase</h2>
<p>
	Sveltekit Fire uses .env files to store firebase configuration data in order to provide a cleaner
	code and the ability to lazily initialize Firebase from multiple components.
</p>
<p class="!-mb-5">
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
VITE_PUBLIC_FIREBASE_MEASUREMENT_ID="YOUR_MEASUREMENT_ID
VITE_PUBLIC_FIREBASE_USE_ANALYTICS=true
VITE_PUBLIC_FIREBASE_USE_PERFORMANCE=true
VITE_PUBLIC_FIREBASE_USER_PERSISTENCE="local"`} />
<table class="w-full text-left border-collapse">
	<thead>
		<tr>
			<th class="z-20 sticky top-0 text-sm font-semibold text-gray-600 bg-white p-0">
				<div class="pb-2 pr-2 border-b border-gray-200">Class</div>
			</th>
			<th class="z-20 sticky top-0 text-sm font-semibold text-gray-600 bg-white p-0">
				<div class="pb-2 pl-2 border-b border-gray-200">Properties</div>
			</th>
		</tr>
	</thead>
	<tbody class="align-baseline">
		<tr>
			<td  class="py-2 pr-2 font-mono text-xs text-violet-600 whitespace-nowrap">
				resize-none
			</td>
			<td  class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre">
				resize: none;
			</td>
		</tr>
		<tr>
			<td
				class="py-2 pr-2 font-mono text-xs text-violet-600 whitespace-nowrap border-t
				border-gray-200">
				resize-y
			</td>
			<td
				class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t
				border-gray-200">
				resize: vertical;
			</td>
		</tr>
		<tr>
			<td
				class="py-2 pr-2 font-mono text-xs text-violet-600 whitespace-nowrap border-t
				border-gray-200">
				resize-x
			</td>
			<td
				class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t
				border-gray-200">
				resize: horizontal;
			</td>
		</tr>
		<tr>
			<td
				class="py-2 pr-2 font-mono text-xs text-violet-600 whitespace-nowrap border-t
				border-gray-200">
				resize
			</td>
			<td
				class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t
				border-gray-200">
				resize: both;
			</td>
		</tr>
	</tbody>
</table>
<hr />
<h1>Starter Project</h1>
<p>Start faster with the starter project</p>
<pre>
	<code>@TODO npx degit sveltekit-fire</code>
</pre>
<hr />
<h1>Server Side Rendering</h1>
<p>
	Although Sveltekit Fire is compatible with ssr, it's not yet fully supported. For instance,
	collections and documents that require a logged user are not compatible with ssr.
</p>
<hr />
<h1>Disclaimer</h1>
<p>
	This lib was initially intendend to be a PR to the awesome
	<a href="https://github.com/codediodeio/sveltefire">codediodeio/sveltefire</a>

	<br />
	But as the work progressed, in order to maximize the benefits of firebase js sdk 9.0+ and
	sveltekit the project started to grow in a very different way so I decided to create a new lib.
	<br />
	Some of the code was heavily inspired by the sveltefire project.
</p>
<!-- </div> -->
<!-- <Doc log={true} let:data={post} let:error={error}>
	{post.title}
	<div slot="loading">Loading...</div>
	<div slot="fallback">{error}</div>
</Doc>
<User let:user on:user>
	{user.displayName}
	<button class="text-[#ff3e00]"
		on:click={() => {
			signOut(getAuth());
		}}>
		Logout
	</button>
	<p class="text-svelte">Svelte</p>
	<p class="text-firebase">Firebase</p>
	<p class="text-brand-500">Sveltekit Fire</p>
	<div slot="signed-out">
		<button on:click={googleLogin}>Google Login</button>
	</div>
</User>
<br />
<br />
<br />
<br /> -->
<!-- <CollectionRealtime log={true} path={'posts'} let:data let:last>

	{#each data as post}{post.title}{/each}
	<br />
	{last.title}
	<div slot="loading">Carregando...</div>
	
</CollectionRealtime> -->
<!-- <br />
<br />
<br /> -->
<!-- <Doc
	path={'posts/how-can-i-get-involved'}
	log
	traceId={'postRead'}
	let:data={post}
	let:ref={myRef}
	on:data
	on:ref>
	{post.title}
	<span slot="loading">Loading...</span>
	<span slot="fallback">Error...</span>
</Doc> -->
<!-- {#if $user}
	{$user.displayName}
	<button
		on:click={() => {
			signOut(getAuth());
		}}>
		Logout
	</button>
{:else}
	<button on:click={googleLogin}>Google Login</button>
{/if} -->
