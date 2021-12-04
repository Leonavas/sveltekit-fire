<script>
    export let keyDescription = ''
    export let valueDescription = ''
    export let values = []
</script>


<table class="w-full text-left border-collapse">
	<thead>
		<tr>
			<th class="z-20 sticky top-0 text-sm font-semibold text-gray-600 p-0">
				<div class="pb-2 pr-2">{keyDescription}</div>
			</th>
			<th class="z-20 sticky top-0 text-sm font-semibold text-gray-600 p-0">
				<div class="pb-2">{valueDescription}</div>
			</th>
		</tr>
	</thead>
	<tbody class="align-baseline">
		{#each values as value}
			<tr>
				<td class="py-2 pr-2 font-mono text-xs text-brand-600 whitespace-nowrap">{value.key}</td>
				<td class="py-2 pl-2 font-mono text-xs text-light-blue-600 whitespace-pre">
					{@html value.description}
				</td>
			</tr>
		{/each}
	</tbody>
</table>