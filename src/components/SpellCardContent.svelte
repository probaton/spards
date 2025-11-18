<script lang="ts">
  import type { SpellDetails } from '../util/fetchSpellDetails';
  import type { SizeClass } from '../util/getSizeClass';
  import { formatParagraph } from '../util/formatting';
  import Orbs from './Orbs.svelte';
  import SubTitle from './SubTitle.svelte';
  import Backdrop from './Backdrop.svelte';

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

<Backdrop --bd-mr={isCantrip ? "-2.0rem" : "auto"}>{isCantrip ? '∞' : level}</Backdrop>
<Orbs orbs={orbData} />
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
<Orbs orbs={classOrbData} position="bottom-right" />

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
</style>