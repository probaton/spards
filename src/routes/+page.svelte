<script lang="ts">
  import Card from "../components/Card.svelte";

  let cards: Spell[] = [
    {"index":"acid-arrow","name":"Acid Arrow","level":2,"url":"/api/2014/spells/acid-arrow"},
  ];
</script>

<h1>Spards</h1>
{#each cards as card}
  <Card {card} />
{/each}
