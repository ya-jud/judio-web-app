<template>
  <div class="button-component" type="button">
    <span class="icon">
      <slot name="icon"></slot>
    </span>
    <transition name="textActive">
      <span class="text" v-if="$store.state.navbarIsActive">
        <slot name="text">Button</slot>
      </span>
    </transition>
  </div>
</template>

<script>
export default {
  name: "button-component"
};
</script>

<style>
.button-component {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
}
.button-component:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.button-component:active {
  background-color: rgba(0, 0, 0, 0.075);
}
.icon {
  width: 40px;
  height: 40px;
  padding: 15px 20px 15px 20px;
}
.text {
  font-size: 24px;
  color: #505050;
  padding: 20px 20px 20px 20px;
  opacity: 1;
}
.textActive-enter-active {
  transition: 0.5s;
}
.textActive-enter {
  opacity: 0;
}
</style>
