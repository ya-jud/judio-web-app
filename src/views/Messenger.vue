<template>
  <div class="messenger">
    <div class="users-chat">
      <div class="search-chat">
        <input type="text" placeholder="Search" />
      </div>
      <div class="user-chat">
        that other component
      </div>
    </div>
    <div class="correspondence"></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.messenger {
  position: absolute;
  width: auto;
  height: 100%;
  display: flex;
  margin-left: 90px;
}
.users-chat {
  position: relative;
  width: 360px;
  height: 100%;
  border-right: solid 1px #000;
}
.search-chat {
  width: auto;
  height: 60px;
}
.search-chat > input {
  width: 320px;
  height: 100%;
  outline: none;
  font-size: 20px;
  padding: 0 20px 0 20px;
  border-width: 0;
  border-bottom: solid 1px #505050;
}
.correspondence {
  width: auto;
}
.user-chat {
  width: 100%;
  height: 50px;
  margin-top: 10px;
  text-align: center;
}
</style>
