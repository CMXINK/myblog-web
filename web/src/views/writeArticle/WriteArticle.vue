<template>
  <div class="writeArticle">
    <myImgCutter></myImgCutter>
    <myTinymce></myTinymce>
  </div>
</template>

<script>
import myImgCutter from '../../components/ImgCutter/ImgCutter.vue'
import myTinymce from '../../components/tinymce/Tinymce.vue'
export default { components: { myImgCutter, myTinymce } }
</script>

<style></style>
