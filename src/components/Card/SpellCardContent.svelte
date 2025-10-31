<script lang="ts">
  import type { SpellDetails } from '../../util/fetchSpellDetails';
  import { formatParagraph, type SizeClass } from './Card';
  import Orbs from './Orbs.svelte';

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
  <div class="subtitle {size}-subtitle {size === 'nano' ? size : 'micro'}-font {size}-margin">
    {#if casting_time.length > 15}
      <p>{casting_time}</p>
      <p>{range} - {duration}</p>
    {:else}
      <p>{casting_time} - {range} - {duration}</p>
    {/if}
    {#if material}<p>{material}</p>{/if}
  </div>
  <div class="description {size}-description {size}-font {size}-margin">
    {#each paragraphs as paragraph}<p>{@html formatParagraph(paragraph)}</p>{/each}
  </div>
<div class="class-orb-container"><Orbs orbs={classOrbData} /></div>

<style>
  .fancy-font {
    font-family: 'Sedan SC', sans-serif;
  }

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

  .nano-subtitle {
    margin: 0.1rem 0 0.2rem 0;
    gap: 0.1rem;
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