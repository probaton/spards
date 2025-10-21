<script lang="ts">
  let { orbTexts }: { orbTexts: string[] } = $props();
</script>

{#each orbTexts as text}
  <div class="orb">{text}</div>
{/each}

<style>
  .orb {
    display: flex;
    color: #aaaaaa;
    border: 2px solid #d2d2d2;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    font-weight: 600;
    font-size: 0.6rem;
    align-items: center;
    justify-content: center;
  }
</style>