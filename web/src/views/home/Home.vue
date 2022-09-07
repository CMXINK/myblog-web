<template>
  <div class="home">
    <Theme> </Theme>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Footer from '../../components/footer/Footer.vue'
import Theme from '../../components/theme/Theme'
export default {
  components: { Theme, Footer },
  name: 'Home'
}
</script>

<style scoped>
@media screen and (max-width: 767px) {
  .home {
    background-image: url('../../../public/images/android-img.jpg') !important;
  }
}
.home {
  width: 100%;
  height: 100%;
  background-image: url('../../../public/images/banner-1.jpg');
  border-top: 1px solid transparent;
  background-size: cover;
  background-position: 30% 30%;
  box-sizing: border-box;
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
}
</style>
