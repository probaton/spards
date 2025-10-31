<script lang="ts">
  import type { MonsterDetails } from '../../util/fetchMonsterDetails';
  import { formatParagraph } from './Card';
  import Orbs from './Orbs.svelte';

  interface MonsterCardContentProps {
    monster: MonsterDetails;
  }

  let { monster }: MonsterCardContentProps = $props();
  const {
    actions,
    alignment,
    armor_class,
    challenge_rating,
    charisma,
    condition_immunities,
    constitution,
    damage_immunities,
    damage_resistances,
    damage_vulnerabilities,
    dexterity,
    hit_dice,
    hit_points,
    intelligence,
    languages,
    legendary_actions,
    proficiency_bonus,
    reactions,
    wisdom,
    type,
    senses,
    size,
    special_abilities,
    speed,
    strength,
  }: MonsterDetails = monster;

  const speedText = Object.entries(speed).map(([key, value]) => `${value}${key === 'walk' ? '' : ` ${key}`}`).join('/');
  const sensesText = Object.entries(senses).map(([key, value]) => `${value} ${key.replace(/_/g, ' ')}`).join(', ');
  const armorClassText = armor_class.map(c => `AC${c.value}(${c.type})`).join('/');

  const specialAbilityParagraphs = (special_abilities || []).map(a => formatParagraph(a.desc, a.name));
  const actionParagraphs = [...actions, ...legendary_actions, ...reactions || []].map(a => formatParagraph(a.desc, a.name));
  const paragraphs = [...actionParagraphs, ...specialAbilityParagraphs];

  const immunities = [...damage_immunities.map(i => `${i} damage`), ...condition_immunities.map(c => c.name.toLowerCase())];

  const statOrbs = [
    { text: `+${proficiency_bonus}`, inverted: true },
    ...[strength, dexterity, constitution, intelligence, wisdom, charisma].map(s => ({ text: `${s}` }))
  ];
  const alignmentOrbs = [{ text: alignment.replace(/(\w)\w+/g, '$1').toUpperCase(), inverted: true }];
</script>

<span class="backdrop fancy-font">{challenge_rating}</span>

<div class="subtitle micro-font">
  <p>{size} {type} - {armorClassText} - {hit_points}/{hit_dice} - {speedText}</p>
  <p>{sensesText}</p>
</div>
<div class="orb-container"><Orbs orbs={statOrbs} /></div>
<div class="description">
  {#each paragraphs as paragraph}<p>{@html paragraph}</p>{/each}
  {#if immunities.length > 0}<p>{@html formatParagraph(immunities.join(', '), 'Immunities')}</p>{/if}
  {#if damage_resistances.length > 0}<p>{@html formatParagraph(damage_resistances.join(', '), 'Resistances')}</p>{/if}
  {#if damage_vulnerabilities.length > 0}<p>{@html formatParagraph(damage_vulnerabilities.join(', '), 'Vulnerabilities')}</p>{/if}
  {#if languages.length > 0}<p>{@html formatParagraph(languages, 'Languages')}</p>{/if}
</div>
<div class="alignment-orb-container"><Orbs orbs={alignmentOrbs} /></div>

<style>
  .fancy-font {
    font-family: 'Sedan SC', sans-serif;
  }

  .orb-container {
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    font-size: 0.6rem;
  }

  .backdrop {
    position: absolute;
    top: 0;
    right: 0.5rem;
    margin-top: -0.5rem;
    font-size: 7rem;
    font-weight: 600;
    color: #e4e0df;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: right;
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

  .description {
    margin: 0.25rem 0;
    font-size: 0.9rem;

    p {
      margin: 0.25rem 0;
    }
  }

  .micro-font {
    font-size: 0.65rem;
  }

  .alignment-orb-container {
    display: flex;
    position: absolute;
    right: 0.2rem;
    bottom: 0.2rem;
    font-size: 0.6rem;
  }
</style>