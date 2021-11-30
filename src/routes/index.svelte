<script>
	import { getAuth, signOut } from '@firebase/auth';

	import { User, Doc, CollectionRealtime } from 'sveltekit-fire';
	//import { userStore } from 'sveltekit-fire';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import Button from '$lib/demo/Button.svelte';

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

<!-- <div class="prose"> -->
<h1>Documentation</h1>
<!-- <Button /> -->
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
<pre>
	<code>npm i -D sveltekit-fire</code>
</pre>
<hr />
<h1>Starter Project</h1>
<p>Start fast with the starter project</p>
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
