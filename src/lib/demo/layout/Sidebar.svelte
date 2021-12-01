<script>
	import { page } from '$app/stores';

	const menu = [
		{ divider: true, label: 'Getting Started' },
		{ label: 'Installation', path: '/'},
		{ label: 'Config Files', path: '/env-generator' },
		{ divider: true, label: 'Components' },
		{ label: 'Document', path: '/components/document' },
		{ label: 'Collection', path: '/components/collection' },
		// { divider: true, label: 'Utils' },
		// { label: '.env Generator', path: '/env-generator' },
		{ divider: true, label: 'Wanna help?' },
		{ label: 'Contributing', path: '/contributing' }
	];
</script>

<div
	class="fixed z-40 inset-0 flex-none h-full w-full lg:static lg:h-auto lg:overflow-y-visible
	lg:pt-0 lg:w-60 xl:w-64 lg:block hidden">
	<!-- <div
		class="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:sticky lg:bg-transparent
		overflow-hidden lg:top-18 mr-24 lg:mr-0"> -->
	<nav
		class="fixed pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 pb-10
		lg:pt-10 lg:pb-14 h-screen flex-col flex w-64 gap-2">

		{#each menu as item, i}
			{#if item.divider}
			<h4 class={`${i === 0 ? '' : 'mt-5'} uppercase tracking-wide font-semibold text-xs  text-gray-900 px-4`} >
				{item.label}
			</h4>
			{:else}
				<a
					href={item.path}
					class={`${$page.path === item.path ? 'text-brand-600 bg-brand-200/20' : 'text-gray-500'} text-md rounded-md px-4 py-1`}>
					{item.label}
				</a>
			{/if}
		{/each}

		
	</nav>
</div>
