<script>
	import { getAuth, signOut } from '@firebase/auth';

	import { User, Doc, CollectionRealtime } from 'sveltekit-fire';
	//import { userStore } from 'sveltekit-fire';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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

<div class="prose">
	<h1>Documentation</h1>
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
		<code>
			npm i -D sveltekit-fire
		</code>
	</pre>
	<hr />
	<h1>Starter Project</h1>
	<p>Start fast with the starter project</p>
	<pre>
		<code>
			@TODO npx degit sveltekit-fire
		</code>
	</pre>
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
</div>

