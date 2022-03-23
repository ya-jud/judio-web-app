<template>
  <div class="content">
    <div class="box-user">
      <div class="user-actions">
        <div class="custom-functions">
          <judio
            :width="width"
            :height="height"
            :url_video="video.url"
            ref="top"
          ></judio>
          <div class="info-block" :class="{ 'info-height': descrip }">
            <span class="title">{{ video.title }}</span>
            <div class="description-btn" @click="descrip = !descrip">
              Description
            </div>
            <div class="description" v-show="descrip">
              {{ video.description }}
            </div>
          </div>
        </div>
        <div class="infoAuthor">
          <div class="avatarAuthor" @click="goToAuthor">
            <img :src="$store.state.dataOfAuthor.avatar" alt="" />
          </div>
          <span class="nameAuthor" @click="goToAuthor"
            >{{ $store.state.dataOfAuthor.name }}
            <div class="subAuthor"><span>123284</span> subscribers</div>
          </span>
          <div class="sub-btn">Subscribe</div>
          <div class="action-btn">
            <span class="material-icons-outlined">thumb_up</span>
            <span class="material-icons-outlined">thumb_down_alt</span>
            <span class="material-icons-outlined">report</span>
          </div>
        </div>
      </div>
      <!-- <div class="comments">
        <span class="comm-text">Comments</span>
      </div> -->
    </div>
    <div class="recom">
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
  </div>
</template>

<script>
import judio from "../components/Judio.vue";
import { firebase } from "../plugins/firebase";

export default {
  props: ["id"],
  components: {
    judio
  },
  data: () => ({
    width: "1050px",
    height: "600px",
    video: "",
    path: "",
    descrip: false
  }),
  methods: {
    async takeVideo() {
      await firebase
        .firestore()
        .collection("videos")
        .doc(this.id)
        .get()
        .then(doc => {
          this.video = doc.data();
        })
        .catch(err => {
          console.log(err);
        });
    },
    goToVideo(i) {
      document.querySelector(".custom-functions").scrollIntoView(true);
      this.$router
        .push({ path: "/Watch/" + i.id, params: { id: i.id } })
        .catch(() => {});
    },
    goToAuthor() {
      let uid = this.video.uid;
      this.$router
        .push({ path: "/Profile/" + uid, params: { id: uid } })
        .catch(() => {});
    }
  },
  watch: {
    "$route.params": async function() {
      await this.takeVideo();
      this.$store.dispatch("getIdAuthor", this.video.uid);
    }
  },
  async mounted() {
    await this.takeVideo();
    this.$store.dispatch("getIdAuthor", this.video.uid);
    this.$store.dispatch("getDataOfVideos");
    this.path = this.$router.history.current.name;
  }
};
</script>

<style scoped>
.content {
  top: 5%;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.box-user {
  position: relative;
  display: flex;
}
.box-rec {
  position: relative;
  top: 15%;
}
.user-actions {
  height: 800px;
}
.custom-functions {
  display: flex;
  flex-direction: column;
}
.info-block {
  position: relative;
  width: 1050px;
  height: 80px;
  margin: 20px;
  display: flex;
  justify-content: space-around;
  border-bottom: solid 2px #505050;
  overflow: auto;
  transition: 0.2s;
}
.info-height {
  transition: 0.2s;
  height: 200px;
  box-shadow: 0 -20px 15px -15px rgba(0, 0, 0, 0.3) inset;
}
.title {
  position: absolute;
  font-size: 30px;
  left: 0;
  margin: 0 50px;
}
.description-btn {
  position: absolute;
  right: 0;
  font-size: 24px;
  padding: 1px 10px;
  margin: 0 50px;
  border: solid 2px #000;
  border-radius: 8px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
}
.description-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.description-btn:active {
  background-color: rgba(255, 93, 93, 0.05);
}
.description {
  position: absolute;
  top: 35%;
  font-size: 24px;
  width: 90%;
  height: auto;
}
.infoAuthor {
  background-color: #fff;
  position: relative;
  margin: 0 20px;
  display: flex;
  align-items: center;
}
.avatarAuthor {
  width: 50px;
  height: 50px;
  overflow: hidden;
  margin: 0 0 0 50px;
  cursor: pointer;
  border-radius: 25px;
}
.avatarAuthor > img {
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
}
.nameAuthor {
  font-size: 24px;
  margin: 0 20px;
  cursor: pointer;
}
.subAuthor {
  font-size: 18px;
  cursor: default;
}
.subAuthor > span {
  color: #da2222;
}
.sub-btn {
  background-color: #da2222;
  color: #fff;
  font-size: 24px;
  border: solid 1px black;
  border-radius: 8px;
  cursor: pointer;
  padding: 5px 20px 5px 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
}
.action-btn {
  position: absolute;
  right: 0;
  padding: 0 50px;
}
.action-btn > span {
  margin-left: 10px;
  padding: 5px;
}
.action-btn > .material-icons-outlined {
  font-size: 32px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
}
.action-btn > .material-icons-outlined:hover {
  color: #da2222;
}
.action-btn > .material-icons-outlined:active {
  color: #008baa;
}
.comments {
  position: relative;
  margin: 20px;
  width: 480px;
  height: 800px;
  /* border: solid 1px black; */
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.5);
}
.comm-text {
  position: absolute;
  font-size: 24px;
  color: #505050;
  width: 90%;
  margin: 5px 15px;
  padding: 5px 10px;
  border-bottom: solid 2px #000;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
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
.recom {
  position: relative;
  top: 15%;
  width: 80%;
  height: 100px;
  display: grid;
  grid-template-columns: auto auto auto;
  justify-items: center;
}
</style>
