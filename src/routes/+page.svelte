<script lang="ts">
  import Card from "../components/Card/Card.svelte";
  import type { SpellDetails } from "../util/fetchSpellDetails";
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  // let truncatedCards = $derived(data.spells.slice(0, 10));
</script>

{#each data.spellInfo as spellInfo}
  <Card spell={spellInfo.spell as SpellDetails} error={spellInfo.error} />
{/each}
