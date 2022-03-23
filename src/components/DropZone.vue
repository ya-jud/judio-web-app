<template>
  <!----------------------------------------------------------------------->
  <!---------------------- Здесь код нужно сократить ---------------------->
  <!----------------------------------------------------------------------->
  <div class="container fs-c">
    <!---------------------- Дроп через дроп хД ---------------------->
    <!-- Дроп для видео -->
    <div
      class="dropzone"
      :style="{ width: width, height: height, margin: margin }"
      v-if="typeFile == 'video/*'"
    >
      <span
        class="material-icons-outlined s-off"
        :class="{
          active: isActive,
          'non-active': isActive == false
        }"
      >
        upload_file
      </span>
      <div
        class="droppable"
        :class="{ active: isActive }"
        @dragenter="isActive = true"
        @dragleave="isActive = false"
        @dragover.prevent=""
        @drop.prevent="dropFile"
      ></div>
    </div>
    <!--------------------------------------------------->
    <!-- Дроп для изображений -->
    <div
      class="dropzone"
      :style="{ width: width, height: height, margin: margin }"
      v-if="typeFile == 'image/*'"
    >
      <span
        class="material-icons-outlined fs-c s-off"
        :style="{ 'font-size': '60px' }"
        :class="{
          active: isActive,
          'non-active': isActive == false
        }"
      >
        upload_file
      </span>
      <div
        class="droppable"
        :class="{ active: isActive }"
        @dragenter="isActive = true"
        @dragleave="isActive = false"
        @dragover.prevent=""
        @drop.prevent="dropFile"
      ></div>
    </div>
    <!---------------------- Дроп через дроп хД ---------------------->
    <!---------------------- Дроп через инпут ---------------------->
    <div
      class="select-file fs-c s-off"
      :class="{ 'non-active': isActive }"
      v-if="typeFile == 'video/*'"
    >
      <!-- Инпут для видео -->
      <label for="video" class="upload-video fs-c s-off">Select a video</label>
      <input
        id="video"
        style="visibility:hidden;"
        type="file"
        :accept="typeFile"
        @change="inputFile"
      />
      <span>or throw it here</span>
    </div>
    <!--------------------------------------------------->
    <div
      class="select-file fs-c s-off"
      :class="{ 'non-active': isActive }"
      v-if="typeFile == 'image/*'"
    >
      <!-- Инпут для изображений -->
      <label for="image" class="upload-image fs-c s-off">Select a image</label>
      <input
        id="image"
        style="visibility:hidden;"
        type="file"
        :accept="typeFile"
        @change="inputFile"
      />
    </div>
    <!---------------------- Дроп через инпут ---------------------->
  </div>
</template>

<script>
export default {
  data: () => ({
    isActive: false
  }),
  props: {
    width: {
      type: String,
      default: "730px"
    },
    height: {
      type: String,
      default: "415px"
    },
    typeFile: {
      type: String,
      default: "video/*"
    },
    margin: {
      type: String,
      default: "0px"
    }
  },
  methods: {
    dropFile(e) {
      const localFile = e.dataTransfer.files[0];
      if (this.typeFile == "image/*") {
        let image = {
          url: URL.createObjectURL(localFile),
          file: localFile,
          active: true
        };
        this.$store.dispatch("setPreview", image);
      } else {
        let video = {
          url: URL.createObjectURL(localFile),
          file: localFile,
          active: true
        };
        this.$store.dispatch("setVideo", video);
      }
      this.isActive = false;
    },
    inputFile(e) {
      const localFile = e.target.files[0];
      if (this.typeFile == "image/*") {
        let image = {
          url: URL.createObjectURL(localFile),
          file: localFile,
          active: true
        };
        this.$store.dispatch("setPreview", image);
      } else {
        this.isActive = true;
        let video = {
          url: URL.createObjectURL(localFile),
          file: localFile,
          active: true
        };
        this.$store.dispatch("setVideo", video);
      }
      this.isActive = false;
    }
  }
};
</script>

<style scoped>
/* ---------------------- Всё, что связанно с файлами ---------------------- */
.dropzone {
  border: solid 1px #000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.droppable {
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0;
}
.select-file {
  position: absolute;
  flex-direction: column;
  width: 170px;
  height: 50px;
  z-index: 10;
  opacity: 1;
}
#image {
  display: none;
}
.upload-image {
  width: 140px;
  height: 30px;
  border-radius: 5px;
  font-size: 18px;
  background-color: #4eb16c;
  color: #fff;
  cursor: pointer;
  border: solid 1px #000;
}
.upload-video {
  width: 170px;
  height: 40px;
  border-radius: 7px;
  font-size: 24px;
  background-color: #009fc2;
  color: #fff;
  cursor: pointer;
  border: solid 1px #000;
}
/* ---------------------- Всё, что связанно с файлами ---------------------- */

/* ---------------------- Стили иконок ---------------------- */
.material-icons-outlined {
  position: absolute;
  width: 100px;
  height: 100px;
  font-size: 100px;
  color: #009fc2;
}
/* ---------------------- Стили иконок ---------------------- */

/* ---------------------- Спец. классы ---------------------- */
.active {
  opacity: 1;
  z-index: 10;
}
.non-active {
  opacity: 0;
  z-index: 0;
}
.s-off {
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
/* ---------------------- Спец. классы ---------------------- */
</style>
