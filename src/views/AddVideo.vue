<template>
  <div class="add-video">
    <div class="container">
      <div class="for-files fs-c">
        <!---------------------- Загрузка видео ---------------------->
        <Judio
          :url_video="$store.state.localVideo.urlVideo"
          v-show="$store.state.localVideo.videoIsActive"
        ></Judio>
        <DropZone
          v-show="$store.state.localVideo.videoIsActive == false"
          :margin="'20px'"
        ></DropZone>
        <!---------------------- Загрузка видео ---------------------->
        <!---------------------- Загрузка превью ---------------------->
        <div class="preview-for-video">
          <div class="preview fs-c">
            <img :src="$store.state.localPreview.urlImage" alt="default" />
            default preview
          </div>
          <DropZone width="300px" height="200px" typeFile="image/*"></DropZone>
        </div>
        <!---------------------- Загрузка превью ---------------------->
      </div>
      <!---------------------- Информация о видео ---------------------->
      <div class="for-info fs-c">
        <div class="info-of-video">
          <div class="name-video black-border">
            <input
              v-model="title"
              class="info-inp"
              type="text"
              placeholder="Title of the video"
              maxlength="50"
            />
            <span class="material-icons-outlined select-off">create</span>
          </div>
          <div class="description-video black-border">
            <textarea
              v-model="description"
              class="info-inp"
              type="text"
              placeholder="Description"
              maxlength="1000"
              size="100px"
            >
            </textarea>
            <span class="material-icons-outlined select-off">create</span>
          </div>
        </div>
        <!---------------------- Теги ---------------------->
        <div class="tags">
          <span>
            Tags:
            <span
              class="material-icons-outlined"
              @click="tagInput = !tagInput"
              v-show="!tagInput"
              >add_circle_outline</span
            >
            <input
              class="tagInput"
              type="text"
              maxlength="20"
              v-focus
              v-model="tag"
              @keyup.enter="addTags"
              v-if="tagInput"
            />
          </span>
          <div class="tag-container">
            <span class="tag" v-for="tag in tags" :key="tag.id">
              <span>#{{ tag }}</span>
            </span>
          </div>
        </div>
        <!---------------------- Теги ---------------------->
      </div>
      <!---------------------- Информация о видео ---------------------->
    </div>
    <div class="undo-add">
      <div class="undo fs-c black-border" type="button" @click="clear">
        Undo
      </div>
      <div
        class="push-video fs-c black-border"
        type="button"
        @click="addNewVideo"
      >
        Add video
      </div>
    </div>
  </div>
</template>

<script>
import Judio from "../components/Judio";
import DropZone from "../components/DropZone";

export default {
  name: "add-video",
  components: {
    Judio,
    DropZone
  },
  data: () => ({
    tagInput: false,
    title: "",
    description: "",
    tag: "",
    tags: []
  }),
  methods: {
    addTags() {
      this.tags.push(this.tag);
      this.tag = "";
      this.tagInput = !this.tagInput;
    },
    async addNewVideo() {
      this.$store.dispatch("setInfoVideo", {
        title: this.title,
        description: this.description,
        tags: this.tags
      });
      const file = {
        video: this.$store.state.localVideo.fileVideo,
        image: this.$store.state.localPreview.fileImage
      };
      await this.$store.dispatch("addObj", file);
      const id = this.$store.state.id;
      this.$router
        .push({
          path: "/Watch/" + id,
          params: { id: id }
        })
        .catch(() => {});
      this.clear();
    },
    clear() {
      this.title = "";
      this.description = "";
      this.tags = [];
      let video = {
        url: "",
        file: "",
        active: false
      };
      let image = {
        url:
          "https://firebasestorage.googleapis.com/v0/b/judio-10aa1.appspot.com/o/videos%2Fpreviews%2Fdefault-preview.jpg?alt=media&token=c2b3b050-e1c9-4c6c-84cc-27f1bf8bd209",
        file: "",
        active: false
      };
      this.$store.dispatch("setPreview", image);
      this.$store.dispatch("setVideo", video);
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>

<style>
.add-video {
  position: relative;
  height: 100%;
  margin-left: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.preview-for-video {
  height: 415px;
  width: 300px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.preview {
  position: relative;
  height: 200px;
  width: 100%;
  border: solid 1px #000;
}
.preview > img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.preview > span {
  position: absolute;
}
.for-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.info-of-video {
  width: 730px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px;
}
.name-video {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}
.description-video {
  width: 100%;
  height: 200px;
  margin-top: 20px;
  display: flex;
}
.info-inp {
  font-size: 24px;
  font-family: "Roboto Regular";
  padding: 0 20px 0 20px;
  margin: 0;
  width: 100%;
  height: 100%;
  border-width: 0;
  outline: none;
}
.description-video > textarea {
  padding: 15px 20px 15px 20px;
  height: auto;
  resize: none;
}
.tags {
  position: relative;
  height: 280px;
  width: 300px;
  margin: 30px 20px 20px 20px;
  font-size: 24px;
  overflow: auto;
}
.tags > span {
  width: 300px;
  height: 45px;
  background-color: #fff;
  position: fixed;
  display: flex;
  align-items: center;
  border-bottom: solid 1px #000;
}
.tagInput {
  font-size: 24px;
  font-family: "Roboto Regular";
  padding: 0 20px 0 20px;
  margin: 0;
  width: 100%;
  height: 100%;
  border-width: 0;
  outline: none;
}
.tag-container {
  width: 100%;
  padding-top: 50px;
  display: flex;
  flex-wrap: wrap;
}
.tag {
  border: solid 1px #000;
  border-radius: 30px;
  padding: 10px;
  margin: 5px;
  max-width: 250px;
  overflow: hidden;
}
.undo-add {
  height: auto;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  width: 430px;
  margin: 20px;
}
.undo-add > div {
  width: 200px;
  height: 40px;
  border-radius: 7px;
  font-size: 24px;
  cursor: pointer;
}
.push-video {
  background-color: #da2222;
  color: #fff;
}
.undo {
  background-color: #ededed;
}
</style>

<style scoped>
.container {
  position: relative;
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.material-icons-outlined {
  color: #505050;
  font-size: 35px;
  width: 35px;
  height: 35px;
  cursor: pointer;
  padding: 5px;
}
.select-off {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
}
.fs-c {
  display: flex;
  justify-content: center;
  align-items: center;
}
.active {
  opacity: 1;
  z-index: 10;
}
.non-active {
  opacity: 0;
  z-index: 0;
}
.black-border {
  border: solid 1px #000;
}
</style>
