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

<Doc log={true} let:data={post} let:error={error}>
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
<br />
<!-- <CollectionRealtime log={true} path={'posts'} let:data let:last>

	{#each data as post}{post.title}{/each}
	<br />
	{last.title}
	<div slot="loading">Carregando...</div>
	
</CollectionRealtime> -->
<br />
<br />
<br />
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
