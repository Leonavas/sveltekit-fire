<script lang="ts">
    export let path;
    export let query = null;
    export let log = false;
    export let startWith = undefined;
    export let maxWait = 10000;
    import { onMount, createEventDispatcher } from "svelte";
    import { collectionStore } from "./firestore";
    const opts = {
      startWith,
      log,
      maxWait
    }
    let store = collectionStore(path, query, opts);
    const dispatch = createEventDispatcher();
    let unsub;

    $: {
      if (unsub) {
        unsub();
        store = collectionStore(path, query, opts);
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
    <slot data={$store} ref={store.ref} error={store.error} first={store.meta.first} last={store.meta.last} />
  {:else if store.loading}
    <slot name="loading" />
  {:else}
    <slot name="fallback" />
  {/if}
  <slot name="after" />