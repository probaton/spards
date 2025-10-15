<script lang="ts">
  import Card from "../components/Card.svelte";
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let truncatedCards = $derived(data.spells.slice(0, 10));
</script>

<h1>Spards</h1>
{#each truncatedCards as card}
  <Card {...card} />
{/each}
