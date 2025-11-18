<script lang="ts">
  export type Position = 'top-right' | 'bottom-right';

  export interface OrbData {
    text: string;
    inverted?: boolean;
  }

  interface OrbsProps {
    orbs: OrbData[];
    position?: Position;
  }

  let { orbs, position = 'top-right' }: OrbsProps = $props();
</script>

<div class={`orb-container orb-position-${position}`}>
  {#each orbs as { text, inverted }}
    <div class={`orb ${inverted ? 'inverted' : 'verted'}`}>{text}</div>
  {/each}
</div>

<style>
  .orb-container {
    display: flex;
    position: absolute;
    font-size: 0.6rem;
    z-index: -1;
  }

  .orb-position-top-right {
    flex-direction: column;
    right: 0.2rem;
    top: 0.2rem;
  }

  .orb-position-bottom-right {
    right: 0.2rem;
    bottom: 0.2rem;
  }

  .orb {
    display: flex;
    border-radius: 50%;
    min-width: 1rem;
    height: 1rem;
    font-weight: 600;
    font-size: 0.6rem;
    align-items: center;
    justify-content: center;
  }

  .verted {
    color: #aaaaaa;
    border: 2px solid #d2d2d2;
  }

  .inverted {
    color: white;
    background-color: #767676;
    border: 2px solid #767676;
  }
</style>