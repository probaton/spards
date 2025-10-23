<script lang="ts">
  import type { SpellDetails } from '../../util/fetchSpellDetails';
  import CardContents from './CardContents.svelte';

  interface CardProps {
    spell: SpellDetails;
    error?: string;
  }

  let { spell, error }: CardProps = $props();
</script>

<div class="card">
  {#if error}
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
    padding: 0.8rem;
    width: 25%;
    aspect-ratio: 1 / 1.4;
    position: relative;
    overflow: hidden;
    vertical-align: top;

    span {
      margin: 0.25rem 0;
    }
  }

  .error {
    color: red;
  }
</style>