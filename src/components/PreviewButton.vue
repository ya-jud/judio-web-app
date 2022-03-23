<template>
  <div class="container" :style="{ width: width, height: height }">
    <img class="preview" src="url_preview" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    url_preview: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "730px"
    },
    height: {
      type: String,
      default: "415px"
    }
  }
};
</script>

<style scoped>
.container {
  position: relative;
  border: solid 1px #000;
  margin: 20px;
}
.preview {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
