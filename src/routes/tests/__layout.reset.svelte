<script>
	import AuthHandler from '$lib/AuthHandler.svelte';
	// import { initFirebase } from '$lib';

	// initFirebase();
</script>

<AuthHandler
	on:user={(e) => {
		//console.log('recebi um user');
		console.log(e.detail);
	}}
	on:signed-out={() => {
		console.log('logged out redirect to home');
	}}
/>

<slot />
