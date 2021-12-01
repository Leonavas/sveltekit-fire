<script>
	import { onMount } from 'svelte';
	import Prism from 'prismjs';
	import 'prism-svelte';
	import { fade } from 'svelte/transition';
	
	export let lang = 'js';

	onMount(() => {
		Prism.highlightAll();
	});

	export let code = '';

	let copied = false;
</script>

<div class="relative group">

	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="absolute top-1 right-2 h-6 w-6 hover:text-gray-50 cursor-pointer text-gray-400"
		fill="none"
		on:click={() => {
			navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 10);
		}}
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0
			002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
	</svg>

	{#if copied}
		<svg
			out:fade={{ delay: 2000, duration: 600 }}
			xmlns="http://www.w3.org/2000/svg"
			class="absolute top-1 right-2 h-6 w-6 text-emerald-400 cursor-pointer"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2
				0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
		</svg>
	{/if}

	<pre class="!py-5">
		<code class={`language-${lang}`}>{code}</code>
	</pre>
</div>
