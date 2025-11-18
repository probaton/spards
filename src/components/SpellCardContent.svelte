<script lang="ts">
  import type { SpellDetails } from '../util/fetchSpellDetails';
  import type { SizeClass } from '../util/getSizeClass';
  import { formatParagraph } from '../util/formatting';
  import Orbs from './Orbs.svelte';
  import SubTitle from './SubTitle.svelte';

  interface SpellCardContentProps {
    spell: SpellDetails;
    size: SizeClass;
  }

  let { spell, size }: SpellCardContentProps = $props();
  const {
    casting_time,
    classes,
    components,
    concentration,
    desc,
    duration,
    higher_level,
    level,
    material,
    range,
    ritual,
    school
  }: SpellDetails = spell;

  const orbData = [
    ...(concentration ? [{ text: 'C', inverted: true }] : []),
    ...(ritual ? [{ text: 'R', inverted: true }] : []),
    ...components.map(c => ({ text: c })),
  ];
  const classOrbData = [...classes.map(c => ({ text: c.name.slice(0, 2) })), { text: school.name.slice(0, 3), inverted: true }];
  const paragraphs = [...desc, ...higher_level || []];
  const isCantrip = level === 0;
</script>

<span class={`backdrop fancy-font ${isCantrip ? "cantrip" : ""}`}>{isCantrip ? '∞' : level}</span>
<div class="orb-container"><Orbs orbs={orbData} /></div>
<SubTitle {size}>
  {#if casting_time.length > 15}
    <p>{casting_time}</p>
    <p>{range} - {duration}</p>
  {:else}
    <p>{casting_time} - {range} - {duration}</p>
  {/if}
  {#if material}<p>{material}</p>{/if}
</SubTitle>
<div class="description {size}-description {size}-font">
  {#each paragraphs as paragraph}<p>{@html formatParagraph(paragraph)}</p>{/each}
</div>
<div class="class-orb-container"><Orbs orbs={classOrbData} /></div>

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

  .backdrop {
    position: absolute;
    top: 0;
    right: 2.5rem;
    margin-top: -3.5rem;
    font-size: 13rem;
    font-weight: 600;
    color: #e4e0df;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: right;
  }

  .cantrip {
    margin-right: -2.0rem;
  }

  .orb-container {
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    font-size: 0.6rem;
  }

  .class-orb-container {
    display: flex;
    position: absolute;
    right: 0.2rem;
    bottom: 0.2rem;
    font-size: 0.6rem;
  }
</style>