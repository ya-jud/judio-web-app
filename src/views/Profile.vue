<template>
  <div class="content-profile">
    <ProfileHeader></ProfileHeader>
    <div class="user-video">
      <div
        class="video"
        v-for="video in $store.state.dataOfVideo.listUserVideos"
        :key="video.id"
      >
        <img :src="video.preview" @click="goToVideo(video)" />
        <div class="info-text">
          <span class="title">{{ video.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileHeader from "../components/ProfileHeader";
export default {
  props: ["id"],
  name: "Profile",
  components: {
    ProfileHeader
  },
  methods: {
    goToVideo(i) {
      this.$router
        .push({ path: "/Watch/" + i.id, params: { id: i.id } })
        .catch(() => {});
    }
  },
  watch: {
    "$route.params": async function() {
      await this.$store.dispatch("getUserVideo", this.id);
    }
  },
  async mounted() {
    await this.$store.dispatch("getUserVideo", this.id);
  }
};
</script>

<style scoped>
.content-profile {
  position: relative;
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-video {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-items: center;
}
.video {
  position: relative;
  margin: 50px;
  width: 400px;
  height: 350px;
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
