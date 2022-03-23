<template>
  <div class="content-home">
    <div
      class="video"
      v-for="video in $store.state.dataOfVideo.listVideos"
      :key="video.id"
    >
      <img :src="video.preview" alt="" @click="goToVideo(video)" />
      <div class="info-text">
        <span class="title">{{ video.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    goToVideo(i) {
      this.$router
        .push({ path: "/Watch/" + i.id, params: { id: i.id } })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.$store.dispatch("getDataOfVideos");
  }
};
</script>

<style scoped>
.content-home {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-items: center;
  margin-left: 90px;
}
.video {
  position: relative;
  margin: 50px;
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.video > img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
}
.info-text {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  font-size: 22px;
  font-weight: 600;
  color: #505050;
}
</style>
