<template>
  <h3>BabylonJS Demo</h3>
  <canvas> </canvas>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { StandardMaterials } from "@/BabylonExamples/StandardMaterials";

export default defineComponent({
  name: "BabylonJS Demo",
  mounted() {
    const canvas = document.querySelector("canvas")!;
    new StandardMaterials(canvas);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
  width: 100%;
  height: 100%;
  /* margin: 0; */
}
body{
  margin: 0;
}
</style>
