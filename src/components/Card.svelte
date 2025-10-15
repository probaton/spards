<script lang="ts">
  interface Props {
    card: Spell;
  };

  let { card }: Props = $props();
</script>

<div>
  <h2>{card.name}</h2>
  <p>Level: {card.level}</p>
</div>