<template>
  <div class="theme">
    <header class="header">
      <el-row class="menu">
        <el-col :span="3" :offset="2" class="menu-left">
          <font-awesome-icon icon="fa-solid  fa-star-and-crescent" class="fa-spin fa-2xl menu-left-icon" />
        </el-col>
        <el-col :span="10" :offset="2"
          ><el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="margin: auto; display: flex; justify-content: space-around">
            <el-menu-item index="1"><i class="el-icon-s-home"></i>首页</el-menu-item>
            <el-menu-item index="2"> <i class="el-icon-warning"></i>大事件 </el-menu-item>
            <el-menu-item index="3"><i class="el-icon-star-on" style="font-weight: 700"></i>项目中心</el-menu-item>
            <el-menu-item index="4"><i class="el-icon-s-management"></i>爱收藏</el-menu-item>
            <el-menu-item index="5"><i class="el-icon-search"></i>Search</el-menu-item>
          </el-menu></el-col
        >
        <el-col :span="3" :offset="2" class="menu-right"><font-awesome-icon icon="fa-solid fa-right-to-bracket" /> 登录 </el-col>
      </el-row>
    </header>
    <slot> <Tinymce></Tinymce> </slot>
    <div class="footer">
      <div class="footerIcons">
        <ul>
          <li><font-awesome-icon icon="fa-brands fa-github" /></li>
          <li><font-awesome-icon icon="fa-brands fa-qq" /></li>
          <li><font-awesome-icon icon="fa-brands fa-weixin" /></li>
        </ul>
      </div>
      <ul class="header">
        <li>技术支撑</li>
        <li>|</li>
        <li>版权声明</li>
        <li>|</li>
        <li>网站统计</li>
      </ul>
      <div style="margin-top: 10px">Copyright © 2021 阿杰博客 | <a href="http://beian.miit.gov.cn/?spm=5176.19720258.J_9220772140.105.e9392c4adfmQib" style="color: lightgray">鄂ICP备2021022436号</a> |</div>
    </div>
  </div>
</template>

<script>
import Tinymce from '../tinymce/Tinymce'
export default {
  components: {
    Tinymce
  },
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.theme > .header {
  width: 100%;
  height: 100vh;
  background-image: url('../../../public/images/banner-1.jpg');
  border-top: 1px solid transparent;
  background-size: cover;
  background-position: 30% 30%;
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
}
.menu {
  border: 1px solid transparent;
  margin-top: 30px;
  letter-spacing: 2px;
}
.el-menu-demo {
  border: none;
  background-color: transparent;
}
.el-menu--horizontal > .el-menu-item.is-active,
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title,
.el-menu--horizontal > .el-menu-item {
  border: none;
  background-color: transparent;
}
.el-menu--horizontal > .el-menu-item,
.el-menu-item i {
  color: #fff;
}
.el-menu--horizontal > .el-menu-item.is-active,
.el-menu-item.is-active i {
  font-weight: 700;
  color: #a4f6a0;
}
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover {
  font-weight: 700;
  color: #a4f6a0;
  border: none;
  background-color: transparent;
}
.menu-left,
.menu-right {
  text-align: center;
  height: 60px;
  line-height: 60px;
  color: #00c3ff;
  // color: #fff;
  // -webkit-background-clip: text;
  // font-weight: 900;
  // background-image: linear-gradient(red, yellow);
  // -webkit-text-fill-color: transparent;
}
.menu-right {
  font-weight: 700;
  font-size: 18px;
  color: #fff;
}
.footer {
  margin-top: 40px;
  text-align: center;
  color: lightgray;
  .footerIcons ul {
    font-size: 24px;
    width: 390px;
    margin: auto;
    color: #333;
    display: flex;
    justify-content: space-around;
  }
  .header {
    display: flex;
    width: 360px;
    margin: 20px auto 20px auto;
    justify-content: space-around;
  }
}
</style>
