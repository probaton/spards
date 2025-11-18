<script lang="ts">
  import type { ItemDetails } from '../util/fetchItemDetails';
  import type { SizeClass } from '../util/getSizeClass';
  import { formatParagraph } from '../util/formatting';
  import Orbs from './Orbs.svelte';
  import SubTitle from './SubTitle.svelte';

  interface ItemCardContentProps {
    item: ItemDetails;
    size: SizeClass;
  }

  let { item, size }: ItemCardContentProps = $props();
  const {
    desc,
    rarity,
  }: ItemDetails = item;

  const subtitleText = desc[0];
  const paragraphs = desc.slice(1);
  const rarityOrbs = [{ text: rarity.name.match(/([a-zA-Z])[a-zA-Z]+/g)?.map(s => s[0]).join('').toUpperCase() || '', inverted: true }];
</script>

<SubTitle size={size}>{subtitleText}</SubTitle>
<div class="description {size}-description {size}-font">
  {#each paragraphs as paragraph}<p>{@html formatParagraph(paragraph)}</p>{/each}
</div>
<div class="rarity-orb-container"><Orbs orbs={rarityOrbs} /></div>

<style>
  .description {
    margin: 0.25rem 0;

    p {
      margin: 0.25rem 0;
    }
  }

  .nano-description {
    > p {
      margin: 0.1rem;
    }
  }

  .rarity-orb-container {
    display: flex;
    position: absolute;
    right: 0.2rem;
    bottom: 0.2rem;
    font-size: 0.6rem;
  }
</style>