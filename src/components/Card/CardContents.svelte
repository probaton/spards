<script lang="ts">
  import type { SpellDetails } from './Card';

  let { casting_time, classes, components, concentration, desc, duration, level, material, name, range, ritual, school }: SpellDetails = $props();

  let title = $derived(`${level === 0 ? 'C' : level} ${name}${ritual ? '®' : ''}${concentration ? '©' : ''}`);

  let formatParagraph = (text: string) => text.replace(/\*\*\*(.*)\*\*\*/g, '<strong>$1</strong>');
</script>

<h2>{title}</h2>
<span class="subtitle">{school.name}<br />{casting_time} - {range} - {duration}</span>
<span><strong>Components:</strong> {components.join(', ')}</span>
{#if material}
  <span><strong>Material:</strong> {material}</span>
{/if}
<div class="description">
  {#each desc as paragraph}
    <p>{@html formatParagraph(paragraph)}</p>
  {/each}
</div>
    <span><strong>Classes:</strong> {classes.map(c => c.name).join(', ')}</span>

<style>
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
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
  }
</style>