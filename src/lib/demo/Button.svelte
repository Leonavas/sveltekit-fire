<button
	on:click
	class="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium
	text-stone-100 transition duration-300 ease-out rounded-lg shadow-md group hover:ring-1
	hover:ring-brand-300">
	<span
		class="absolute inset-0 w-full h-full bg-gradient-to-br from-svelte via-brand-600 to-firebase" />
	<span
		class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500
		origin-bottom-left transform rotate-45 translate-x-24 bg-brand-500 rounded-md opacity-30
		group-hover:rotate-90 ease" />
	<span class="relative text-warmGray-100">
		<slot />
	</span>
</button>
