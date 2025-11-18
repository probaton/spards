<script lang="ts">
  import type { ItemDetails } from '../util/fetchItemDetails';
  import type { SizeClass } from '../util/getSizeClass';
  import { formatParagraph } from '../util/formatting';
  import Orbs from './Orbs.svelte';

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

<div class="subtitle {size}-subtitle {size === 'nano' ? size : 'micro'}-font">{subtitleText}</div>
<div class="description {size}-description {size}-font">
  {#each paragraphs as paragraph}<p>{@html formatParagraph(paragraph)}</p>{/each}
</div>
<div class="rarity-orb-container"><Orbs orbs={rarityOrbs} /></div>

<style>
  .subtitle {
    color: #666;
    margin: 0.25rem 0 0.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    p {
      margin: 0;
    }
  }

  .description {
    margin: 0.25rem 0;
    font-size: 0.9rem;

    p {
      margin: 0.25rem 0;
    }
  }

  .nano-description {
    > p {
      margin: 0.1rem;
    }
  }

  .mid-font {
    font-size: 0.8rem;
  }

  .mini-font {
    font-size: 0.7rem;
  }

  .micro-font {
    font-size: 0.65rem;
  }

  .nano-font {
    font-size: 0.5rem;
  }

  .rarity-orb-container {
    display: flex;
    position: absolute;
    right: 0.2rem;
    bottom: 0.2rem;
    font-size: 0.6rem;
  }
</style>