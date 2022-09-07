<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
  font-family: 'Play', 'MArima Madurai', Microsoft JhengHei, Georgia, Times, serif, Microsoft Yahei;
}
a {
  color: #111;
  text-decoration: none;
}
ul li {
  list-style: none;
  display: inline;
}
.mobile-menu-model {
  border-radius: 15px !important;
  background-color: rgba(255, 255, 255, 0.9) !important;
  .el-dialog__header {
    padding: 0;
  }
  // .el-dialog__headerbtn {
  //   display: none;
  // }
}
.MyMessageBox {
  border-radius: 15px !important;
  background-color: rgba(255, 255, 255, 0.9) !important;
  .el-input {
    background-color: transparent !important;
    * {
      background-color: transparent !important;
    }
  }
}
.mySearchBox {
  max-width: 90%;
  margin: auto;
  padding-bottom: 0 !important;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.9) !important;
  .el-input {
    background-color: transparent !important;
    * {
      background-color: transparent !important;
    }
  }
  .el-message-box__header {
    display: none !important;
  }
  .el-message-box__content {
    padding: 20px !important;
  }
  .el-message-box__errormsg {
    display: none !important;
  }
  .el-input input {
    border: none;
    border-bottom: 1px solid rgb(66, 133, 249);
    border-radius: 0px !important;
    color: rgb(53, 124, 247);
    font-weight: 600;
    font-size: 14px;
  }
  .el-input input::placeholder {
    color: rgb(64, 63, 63) !important;
    font-weight: 400 !important;
    font-size: 14px;
  }
}
.add-new-dialog {
  width: 50vw !important;
  margin: auto !important;
  margin-top: 25vh !important;
  .el-dialog__body {
    padding: 50px 70px 0px 40px !important;
  }
  .el-input {
    background-color: transparent !important;
    * {
      background-color: transparent !important;
    }
  }
}
// *::-webkit-scrollbar {
//   display: none;
// }
.el-popper[x-placement^='bottom'] {
  width: 50%;
  margin: auto;
}
</style>
