<script lang="ts">
    export let path;
    export let log = false;
    export let startWith = undefined; // Why? Firestore returns null for docs that don't exist, predictible loading state.
    export let maxWait = 10000;
    import { onMount, createEventDispatcher } from "svelte";
    import { docStore } from "./firestore";
    const opts = {
      startWith,
      log,
      maxWait,
    }
    let store = docStore(path, opts);
    const dispatch = createEventDispatcher();
    let unsub;

    $: {
      if (unsub) {
        // Unsub and create new store
        unsub();
        store = docStore(path, opts);
        dispatch("ref", { ref: store.ref });
      }
      unsub = store.subscribe(data => {
        dispatch("data", {
          data
        });
      });
    }
    onMount(() => dispatch("ref", { ref: store.ref }))
    // onDestroy generationg "Cannot read properties of undefined (reading 'push')" when used as package
    //onDestroy(() => unsub());
  </script>
  
  <slot name="before" />
  
  {#if $store}
    <slot data={$store} ref={store.ref} error={store.error} />
  {:else if store.loading}
    <slot name="loading" />
  {:else}
    <slot name="fallback" />
  {/if}
  
  <slot name="after" />