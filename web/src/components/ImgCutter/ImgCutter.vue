<template>
  <div>
    <ImgCutter rate="8:5" @cutDown="cutDown" :cutWidth="360" :cutHeight="225">
      <template class="btn btn-primary" #open><div class="openImgCutter" :style="bgi">选择封面</div></template>
    </ImgCutter>
  </div>
</template>

<script>
import ImgCutter from 'vue-img-cutter'
export default {
  name: 'myImgCutter',
  data() {
    return {
      bgi: 'background-image:linear-gradient(45deg, rgba(0, 0, 0, 0.25) 25%, transparent 0, transparent 75%, rgba(0, 0, 0, 0.25) 0), linear-gradient(45deg, rgba(0, 0, 0, 0.25) 25%, transparent 0, transparent 75%, rgba(0, 0, 0, 0.25) 0);'
    }
  },
  components: {
    ImgCutter
  },
  methods: {
    cutDown(obj) {
      this.bgi = `background-image:url(${obj.dataURL});` + 'background-size:cover'
    }
  }
}
</script>

<style scoped>
.openImgCutter {
  width: 360px;
  height: 225px;
  background-color: #eee;
  background-size: 30px 30px;
  background-position: 0 0, 15px 15px;
  line-height: 225px;
  text-align: center;
  color: orangered;
  font-weight: 700;
  cursor: pointer;
  font-size: 18px;
}
</style>
