<script lang="ts">
  import type { Snippet } from "svelte";

  interface BackdropProps {
    children: Snippet;
  }

  let { children }: BackdropProps = $props();
</script>

<span class="backdrop fancy-font">{@render children()}</span>

<style>
  .backdrop {
    position: absolute;
    top: 0;
    right: var(--bd-r, 2.5rem);
    margin-top: var(--bd-mt, -3.5rem);
    margin-right: var(--bd-mr, auto);
    font-size: var(--bd-fs, 13rem);
    font-weight: 600;
    color: #e4e0df;
    z-index: -2;
    display: flex;
    align-items: center;
    justify-content: right;
  }
</style>