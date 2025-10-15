<script lang="ts">
  import type { Spell } from '../../routes/+page';
  import type { SpellDetails } from './Card';
  import { fetchSpellDetails } from './Card';
  import CardContents from './CardContents.svelte';

  let { index, name }: Spell = $props();

  let spell = $state<SpellDetails | undefined>();
  let loading = $state(true);
  let error = $state<string | undefined>();

  $effect(() => {
    async function fetchSpells() {
      loading = true;
      error = undefined;
      const result = await fetchSpellDetails(index);
      if (typeof result === 'string') {
        spell = undefined;
        error = result;
      } else {
        error = undefined;
        spell = result;
      }
      loading = false;
    }

    fetchSpells();
  });
</script>

<div class="card">
  {#if loading}
    <span>Loading {name}...</span>
  {:else if error}
    <span class="error">Error: {error}</span>
  {:else if spell}
    <CardContents {...spell} />
  {/if}
</div>

<style>
  .card {
    display: inline-flex;
    flex-direction: column;
    border: 1px solid #ccc;
    padding: 1rem;
    width: 25%;
    border-radius: 8px;
    background: #f9f9f9;
    aspect-ratio: 1 / 1.3;

    span {
      margin: 0.25rem 0;
    }
  }

  .error {
    color: red;
  }
</style>