<script>
	import { browser } from '$app/env';
	import { onDestroy, onMount } from 'svelte';

	let headers = [];
	if (browser) {
		headers = getElementsByTagNames('h1,h2', document.getElementById('content'));
	}

	let listener = function () {
		headers = getElementsByTagNames('h1,h2', document.getElementById('content'));
		updateActiveTocItems();
	};

	onMount(async () => {
		if (browser) {
			window.addEventListener('sveltekit:navigation-end', listener);
			updateActiveTocItems();
		}
	});

	onDestroy(async () => {
		if (browser) {
			window.removeEventListener('sveltekit:navigation-end', listener);
		}
	});

	function getElementsByTagNames(list, obj) {
		if (!obj) var obj = document;
		var tagNames = list.split(',');
		var resultArray = new Array();
		for (var i = 0; i < tagNames.length; i++) {
			var tags = obj.getElementsByTagName(tagNames[i]);
			for (var j = 0; j < tags.length; j++) {
				resultArray.push(tags[j]);
			}
		}
		var testNode = resultArray[0];
		if (!testNode) return [];
		if (testNode.sourceIndex) {
			resultArray.sort(function (a, b) {
				return a.sourceIndex - b.sourceIndex;
			});
		} else if (testNode.compareDocumentPosition) {
			resultArray.sort(function (a, b) {
				return 3 - (a.compareDocumentPosition(b) & 6);
			});
		}
		return resultArray;
	}

	function isInViewport(el) {
		const rect = el.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}

	function updateActiveTocItems() {
		for (let i = 0; i < headers.length; i++) {
			if (isInViewport(headers[i])) {
				headers[i].visible = true;
			} else {
				headers[i].visible = false;
			}
		}
	}
</script>

<svelte:window on:scroll={updateActiveTocItems} />

<p class="text-sm font-bold uppercase mb-2">On this page</p>
<div class="flex flex-col gap-1 text-base text-gray-500">
	{#each headers as header, i}
		{#if header.nodeName === 'H1'}
			<p
				class={`${header.visible ? 'text-gray-800' : ''} ml-1 cursor-pointer hover:text-gray-800`}
				on:click={() => {
					header.scrollIntoView({ behavior: 'smooth', block: 'center' });
				}}>
				{header.textContent}
			</p>
		{:else if header.nodeName === 'H2'}
			<p
				class={`${header.visible ? 'text-gray-800' : ''} ml-4 cursor-pointer hover:text-gray-800`}
				on:click={() => {
					header.scrollIntoView({ behavior: 'smooth', block: 'center' });
				}}>
				{header.textContent}
			</p>
		{/if}
	{/each}
</div>
