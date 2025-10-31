<script lang="ts">
  import Card from "../components/Card/Card.svelte";
  import SpellCardContent from "../components/Card/SpellCardContent.svelte";
  import MonsterCardContent from "../components/Card/MonsterCardContent.svelte";
  import type { SpellDetails } from "../util/fetchSpellDetails";
  import type { MonsterDetails } from "../util/fetchMonsterDetails";
  import type { PageData } from './$types';
  import { getSizeClass } from "../components/Card/Card";

  let { data }: { data: PageData } = $props();

  // let truncatedCards = $derived(data.spells.slice(0, 10));
</script>

{#each data.spellInfo as spellInfo}
  {@const size = getSizeClass(spellInfo.spell as SpellDetails)}
  <Card error={spellInfo.error} title={(spellInfo.spell as SpellDetails).name} size={size}>
    <SpellCardContent spell={spellInfo.spell as SpellDetails} size={size} />
  </Card>
{/each}
{#each data.monsterInfo as monsterInfo}
  <Card error={monsterInfo.error} title={(monsterInfo.monster as MonsterDetails).name} size='mid'>
    <MonsterCardContent monster={monsterInfo.monster as MonsterDetails} />
  </Card>
{/each}
