<script lang="ts">
  import type { SpellDetails } from '../../util/fetchSpellDetails';
  import Orbs from './Orbs.svelte';

  let { casting_time, classes, components, concentration, desc, duration, level, material, name, range, ritual, school }: SpellDetails = $props();

  let orbData = $derived([
    ...(concentration ? [{ text: 'C', inverted: true }] : []),
    ...(ritual ? [{ text: 'R', inverted: true }] : []),
    ...components.map(c => ({ text: c })),
  ]);
  let classOrbData = $derived([...classes.map(c => ({ text: c.name.slice(0, 2) })), { text: school.name.slice(0, 3), inverted: true }]);
  let isCantrip = $derived(level === 0);
  let useMiniFont = $derived(desc.reduce((wc, p) => wc + p.length, (material?.length || 0) + casting_time.length) > 550);

  let formatParagraph = (text: string) => text.replace(
    /(\*\*\*(.*)\*\*\*|[Ss]trength|[Dd]exterity|[Cc]onstitution|[Ii]ntelligence|[Ww]isdom|[Cc]harisma|\d+d\d+( \+ \d+)?)/g,
    '<strong>$1</strong>'
  );
</script>

<span class={`level fancy-font ${isCantrip ? "cantrip" : ""}`}>{isCantrip ? '∞' : level}</span>
<div class="orb-container"><Orbs orbs={orbData} /></div>
<div class="container">
  <h2 class="fancy-font">{name}</h2>
  <div class="subtitle">
    {#if casting_time.length > 15}
      <p>{casting_time}</p>
      <p>{range} - {duration}</p>
    {:else}
      <p>{casting_time} - {range} - {duration}</p>
    {/if}
    {#if material}<p>{material}</p>{/if}
  </div>
  <div class={`description${useMiniFont ? ' mini-font' : ''}`}>
    {#each desc as paragraph}
      <p>{@html formatParagraph(paragraph)}</p>
    {/each}
  </div>
</div>
<div class="class-orb-container"><Orbs orbs={classOrbData} /></div>

<style>
  .fancy-font {
    font-family: 'Sedan SC', sans-serif;
  }

  .container {
    z-index: 2;
  }

  .subtitle {
    font-size: 0.7rem;
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

  .mini-font {
    font-size: 0.7rem;
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }

  .level {
    position: absolute;
    top: 0;
    right: 2.5rem;
    margin-top: -3.5rem;
    font-size: 13rem;
    font-weight: 600;
    color: #e4e0df;
    z-index: 1;
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