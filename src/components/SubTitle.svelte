<script lang="ts">
  import type { SizeClass } from '../util/getSizeClass';
  import type { Snippet } from 'svelte';

  interface SpellCardContentProps {
    children: Snippet;
    size: SizeClass;
  }

  let { children, size }: SpellCardContentProps = $props();
</script>

<div class="subtitle {size}-subtitle {size === 'nano' ? size : 'micro'}-font">
  {@render children()}
</div>

<style>
  .subtitle {
    color: #666;
    margin: 0.25rem 0 0.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  :global(.subtitle p) {
    margin: 0;
  }

  .nano-subtitle {
    margin: 0.1rem 0 0.2rem 0;
    gap: 0.1rem;
  }
</style>