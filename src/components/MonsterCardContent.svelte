<script lang="ts">
  import type { MonsterDetails } from '../util/fetchMonsterDetails';
  import { formatParagraph } from '../util/formatting';
  import type { SizeClass } from '../util/getSizeClass';
  import Backdrop from './Backdrop.svelte';
  import Orbs from './Orbs.svelte';
  import SubTitle from './SubTitle.svelte';

  interface MonsterCardContentProps {
    monster: MonsterDetails;
    size: SizeClass;
  }

  let { monster, size }: MonsterCardContentProps = $props();
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
    size: monsterSize,
    special_abilities,
    speed,
    strength,
  }: MonsterDetails = monster;

  const hasLongCrText = challenge_rating.toString().length > 1;

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

<Backdrop --bd-r={hasLongCrText ? "0.5rem" : "2.5rem"} --bd-fs={hasLongCrText ? "7rem" : "13rem"} --bd-mt={hasLongCrText ? "-0.5rem" : "-3.5rem"}>
  {challenge_rating}
</Backdrop>

<SubTitle size="mid">
  <p>{monsterSize} {type} - {armorClassText} - {hit_points}/{hit_dice} - {speedText}</p>
  <p>{sensesText}</p>
</SubTitle>
<div class="orb-container"><Orbs orbs={statOrbs} /></div>
<div class="description {size}-description {size}-font">
  {#each paragraphs as paragraph}<p>{@html paragraph}</p>{/each}
  {#if immunities.length > 0}<p>{@html formatParagraph(immunities.join(', '), 'Immunities')}</p>{/if}
  {#if damage_resistances.length > 0}<p>{@html formatParagraph(damage_resistances.join(', '), 'Resistances')}</p>{/if}
  {#if damage_vulnerabilities.length > 0}<p>{@html formatParagraph(damage_vulnerabilities.join(', '), 'Vulnerabilities')}</p>{/if}
  {#if languages.length > 0}<p>{@html formatParagraph(languages, 'Languages')}</p>{/if}
</div>
<div class="alignment-orb-container"><Orbs orbs={alignmentOrbs} /></div>

<style>
  .orb-container {
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    font-size: 0.6rem;
  }

  .description {
    margin: 0.25rem 0;

    p {
      margin: 0.25rem 0;
    }
  }

  .alignment-orb-container {
    display: flex;
    position: absolute;
    right: 0.2rem;
    bottom: 0.2rem;
    font-size: 0.6rem;
  }
</style>