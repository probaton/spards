<script lang="ts">
  import Card from "../components/Card/Card.svelte";
  import SpellCardContent from "../components/Card/SpellCardContent.svelte";
  import MonsterCardContent from "../components/Card/MonsterCardContent.svelte";
  import type { PageData } from './$types';
  import { getSizeClass, getSpellSizeClass } from "../components/Card/Card";
  import ItemCardContent from "../components/Card/ItemCardContent.svelte";

  let { data }: { data: PageData } = $props();

  // let truncatedCards = $derived(data.spells.slice(0, 10));
</script>

<div class="page-container">
  {#each data.spells as spell}
    {@const size = getSpellSizeClass(spell)}
    <Card title={spell.name} size={size}>
      <SpellCardContent spell={spell} size={size} />
    </Card>
  {/each}
  {#each data.monsters as monster}
    <Card title={monster.name} size='mid'>
      <MonsterCardContent monster={monster} />
    </Card>
  {/each}
  {#each data.items as item}
    {@const size = getSizeClass(item.desc)}
    <Card title={item.name} size={size}>
      <ItemCardContent item={item} size={size} />
    </Card>
  {/each}
  {#each data.errors as error}
    <Card title='Error' size='mid'><p class="error">{error}</p></Card>
  {/each}
</div>

<style>
  .page-container {
    font-size: 0;
  }

  .error {
    font-size: 1rem;
    color: red;
  }
</style>