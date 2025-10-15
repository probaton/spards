<script lang="ts">
		interface Spell {
			index: string;
			name: string;
			level: number;
			url: string;
		};
  let cards: Spell[] = [
    {"index":"acid-arrow","name":"Acid Arrow","level":2,"url":"/api/2014/spells/acid-arrow"},
  ];
</script>

<h1>Spards</h1>
{#each cards as card}
  <div>
    <h2>{card.name}</h2>
    <p>Level: {card.level}</p>
  </div>
{/each}
