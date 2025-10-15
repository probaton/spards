<script lang="ts">
  import Card from "../components/Card.svelte";

  let cards: Spell[] = [
    {"index":"acid-arrow","name":"Acid Arrow","level":2,"url":"/api/2014/spells/acid-arrow"},
  ];

  let truncatedCards = $derived(cards.slice(0, 10));
</script>

<h1>Spards</h1>
{#each truncatedCards as card}
  <Card {...card} />
{/each}
