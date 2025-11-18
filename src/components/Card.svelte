<script lang="ts">
  import type { Snippet } from "svelte";
  import type { SizeClass } from "../util/getSizeClass";

  interface CardProps {
    children: Snippet;
    size: SizeClass;
    title: string;
  }

  let { children, size, title }: CardProps = $props();
</script>

<div class="card">
  <div class={`${size}-container`}>
    <h2 class="fancy-font {size}-title">{title}</h2>
    {@render children()}
  </div>
</div>

<style>
  .fancy-font {
    font-family: "Sedan SC", sans-serif;
  }

  .nano-container {
    margin: 0rem;
    margin-right: -0.2rem;
    margin-left: -0.2rem;
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }

  .nano-title {
    line-height: 1;
    margin-top: -0.5rem;
    font-size: 0.8rem;
  }

  .card {
    display: inline-flex;
    flex-direction: column;
    border: 1px solid #ccc;
    padding: 0.8rem;
    width: 25%;
    aspect-ratio: 1 / 1.4;
    position: relative;
    overflow: hidden;
    vertical-align: top;
  }

  .error {
    color: red;
  }
</style>