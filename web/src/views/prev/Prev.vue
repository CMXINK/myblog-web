<template>
  <div class="prev">
    <span class="wel">星光不负赶路人</span>
    <router-link to="/home" class="go-home" active-class="">
      <i class="el-icon-arrow-down down-icon"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Prev'
}
</script>

<style lang="less" scoped>
.prev {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url('../../../public/images/bg.jpg');

  background-position: center center;
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  /* 设置背景颜色，背景图加载过程中会显示背景色 */
  background-color: #464646;
  overflow: hidden;
  .wel {
    position: absolute;
    left: 50%;
    top: 45%;
    font-weight: 600;
    text-align: center;
    text-shadow: 6px 6px 9px #888;
    letter-spacing: 12px;
    transform: translateX(-50%) translateY(-50%);
    width: 80%;
    font-size: 85px;
    color: #f2f2f2;
    font-family: STLiti;
  }
  .go-home {
    width: 96px;
    height: 96px;
    // opacity: 0.3;
    position: absolute;
    background-color: rgba(100, 100, 100, 0.3);
    border-radius: 47px;
    left: 50%;
    top: 100%;
    transform: translateX(-50%) translateY(-50%);
    .down-icon {
      color: #f2f2f2;
      font-size: 32px;
      position: absolute;
      font-weight: 700;
      z-index: 1;
      left: 50%;
      transform: translateX(-50%);
      animation: down 1.8s infinite;
    }
  }
  .go-home:hover .down-icon {
    color: #00fd19;
  }
}
@keyframes down {
  0% {
    top: 7px;
    opacity: 0.5;
  }
  25% {
    top: 17px;
    opacity: 1;
  }
  50% {
    top: 12px;
    opacity: 1;
  }
  100% {
    top: 22px;
    opacity: 0;
  }
}
</style>
