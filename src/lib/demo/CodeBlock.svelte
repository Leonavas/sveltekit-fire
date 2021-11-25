<script>
	import { onMount } from 'svelte';
    import Prism from 'prismjs';

	onMount(() => {
		// let script = document.createElement('script');
		// script.src = './prism.js';
		// document.head.append(script);
        Prism.highlightAll();
	});

	// setTimeout(() => {
	// 	window.Prism = window.Prism || {};
	// 	console.log(window.Prism);
	// }, 2000);

	let code = `# Create a function to print squares of numbers in sequence.
new.function <- function(a) {
   for(i in 1:a) {
      b <- i^2
      print(b)
   }
}

# Call the function new.function supplying 6 as an argument.
new.function(6)
`;
</script>


<pre>
	<code class="language-js">{code}</code>
</pre>
<!-- <svelte:head>
  <link rel="stylesheet" href="https://tutsplus.github.io/syntax-highlighter-demos/highlighters/Prism/prism_okaidia.css">    
</svelte:head> -->
