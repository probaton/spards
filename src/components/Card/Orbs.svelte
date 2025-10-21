<script lang="ts">
  export interface OrbData {
    text: string;
    inverted?: boolean;
  }

  let { orbs }: { orbs: OrbData[] } = $props();
</script>

{#each orbs as { text, inverted }}
  <div class={`orb ${inverted ? 'inverted' : 'verted'}`}>{text}</div>
{/each}

<style>
  .orb {
    display: flex;
    border-radius: 50%;
    width: 1rem;
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