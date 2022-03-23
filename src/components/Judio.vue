<template>
  <div ref="video" class="container" :style="{ width: width, height: height }">
    <video
      ref="video"
      class="video"
      :src="url_video"
      loop
      controls
      autoplay
    ></video>
  </div>
</template>

<script>
export default {
  props: {
    url_video: {
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
  },
  data: () => ({
    isActive: true
  }),
  methods: {
    stop() {
      const video = this.$refs.video;
      video.pause();
      video.currentTime = 0;
    }
  }
};
</script>

<style scoped>
.container {
  background-color: rgb(39, 39, 39);
  position: relative;
  border: solid 1px #000;
  margin: 20px;
}
.video {
  /* object-fit: cover; убирает чертов отступ у видео */
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
