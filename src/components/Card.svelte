<script lang="ts">
  import type { Spell } from '../routes/+page';

  let { name, level }: Spell = $props();
</script>

<div>
  <h2>{name}</h2>
  <p>Level: {level}</p>
</div>