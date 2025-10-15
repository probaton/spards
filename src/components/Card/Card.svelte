<script lang="ts">
  import type { Spell } from '../../routes/+page';
  import type { SpellDetails } from './Card';
  import { fetchSpellDetails } from './Card';

  let { index, name }: Spell = $props();

  let spell = $state<SpellDetails | undefined>();
  let loading = $state(true);
  let error = $state<string | undefined>();

  let title = $derived(spell && `${spell.level === 0 ? 'C' : spell.level} ${spell.name}${spell.ritual ? '®' : ''}${spell.concentration ? '†' : '©'}`);

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
    <p>Loading {name}...</p>
  {:else if error}
    <p class="error">Error: {error}</p>
  {:else if spell}
    <h2>{title}</h2>
    <p><strong>Level:</strong> {spell.level}</p>
    <p><strong>School:</strong> {spell.school.name}</p>
    <p><strong>Casting Time:</strong> {spell.casting_time}</p>
    <p><strong>Range:</strong> {spell.range}</p>
    <p><strong>Components:</strong> {spell.components.join(', ')}</p>
    {#if spell.material}
      <p><strong>Material:</strong> {spell.material}</p>
    {/if}
    <p><strong>Duration:</strong> {spell.duration}</p>
    <p><strong>Concentration:</strong> {spell.concentration ? 'Yes' : 'No'}</p>
    <p><strong>Ritual:</strong> {spell.ritual ? 'Yes' : 'No'}</p>
    <div class="description">
      <strong>Description:</strong>
      {#each spell.desc as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>
    <p><strong>Classes:</strong> {spell.classes.map(c => c.name).join(', ')}</p>
  {/if}
</div>

<style>
  .card {
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 8px;
    background: #f9f9f9;
  }

  .error {
    color: red;
  }

  .description {
    margin: 1rem 0;
  }

  .description p {
    margin: 0.5rem 0;
  }

  h2 {
    margin-top: 0;
  }
</style>