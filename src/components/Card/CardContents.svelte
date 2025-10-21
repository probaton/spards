<script lang="ts">
  import type { SpellDetails } from './Card';
  import Orbs from './Orbs.svelte';

  let { casting_time, classes, components, concentration, desc, duration, level, material, name, range, ritual, school }: SpellDetails = $props();

  let orbTexts = $derived([
    ...(concentration ? ['C'] : []),
    ...(ritual ? ['R'] : []),
    ...components,
  ]);
  let classOrbTexts = $derived([...classes.map(c => c.name.slice(0, 2)), school.name.slice(0, 3)]);

  let formatParagraph = (text: string) => text.replace(/\*\*\*(.*)\*\*\*/g, '<strong>$1</strong>');
</script>

<span class="level">{level === 0 ? '∞' : level}</span>
<div class="orb-container"><Orbs orbTexts={orbTexts} /></div>
<div class="container">
  <h2>{name}</h2>
  <span class="subtitle">
    {casting_time} - {range} - {duration}
    <br />
    {#if material}
      <span>{material}</span>
    {/if}
  </span>
  <div class="description">
    {#each desc as paragraph}
      <p>{@html formatParagraph(paragraph)}</p>
    {/each}
  </div>
</div>
<div class="class-orb-container"><Orbs orbTexts={classOrbTexts} /></div>

<style>
  .container {
    z-index: 2;
  }

  .description {
    margin: 0.25rem 0;
    p {
      margin: 0.25rem 0;
    }
  }

  h2 {
    margin: 0;
  }

  .subtitle {
    font-size: 0.7rem;
    color: #666;
    margin-bottom: 0.5rem;
  }

  .level {
    position: absolute;
    top: 0;
    right: 2.5rem;
    margin-top: -0.5rem;
    font-size: 6rem;
    font-weight: 600;
    color: #e4e0df;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: right;
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