<script>
	import { createEventDispatcher } from 'svelte';
	import { userStore } from 'sveltekit-fire';
	import { onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	const store = userStore();

	onMount(() => {
		store.subscribe(function (user) {
			if (user) {
				dispatch('user', user);
			} else {
				dispatch('signed-out', null);
			}
		});
	});
</script>
