<script lang="ts">
  import type { Spell } from '../../routes/+page';
  import type { SpellDetails } from './Card';
  import { fetchSpellDetails } from './Card';

  let { index, name }: Spell = $props();

  let spell = $state<SpellDetails | undefined>();
  let loading = $state(true);
  let error = $state<string | undefined>();

  let title = $derived(spell && `${spell.level === 0 ? 'C' : spell.level} ${spell.name}${spell.ritual ? '®' : ''}${spell.concentration ? '©' : ''}`);

  $effect(() => {
    async function fetchSpells() {
      loading = true;
      error = undefined;
      const result = await fetchSpellDetails(index);
      if (typeof result === 'string') {
        spell = undefined;
        error = result;
      } else {
        error = undefined;
        spell = result;
      }
      loading = false;
    }

    fetchSpells();
  });
</script>

<div class="card">
  {#if loading}
    <span>Loading {name}...</span>
  {:else if error}
    <span class="error">Error: {error}</span>
  {:else if spell}
    <h2>{title}</h2>
    <span><strong>School:</strong> {spell.school.name}</span>
    <span><strong>Casting Time:</strong> {spell.casting_time}</span>
    <span><strong>Range:</strong> {spell.range}</span>
    <span><strong>Components:</strong> {spell.components.join(', ')}</span>
    {#if spell.material}
      <span><strong>Material:</strong> {spell.material}</span>
    {/if}
    <span><strong>Duration:</strong> {spell.duration}</span>
    <div class="description">
      {#each spell.desc as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>
    <span><strong>Classes:</strong> {spell.classes.map(c => c.name).join(', ')}</span>
  {/if}
</div>

<style>
  .card {
    display: inline-flex;
    flex-direction: column;
    border: 1px solid #ccc;
    padding: 1rem;
    width: 30%;
    border-radius: 8px;
    background: #f9f9f9;
    aspect-ratio: 1 / 1.5;

    span {
      margin: 0.25rem 0;
    }
  }

  .error {
    color: red;
  }

  .description {
    margin: 0.25rem 0;
  }

  .description p {
    margin: 0.25rem 0;
  }

  h2 {
    margin-top: 0;
  }
</style>