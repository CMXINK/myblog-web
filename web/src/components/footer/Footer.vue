<template>
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
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.footer {
  margin-top: 40px;
  text-align: center;
  color: lightgray;
  .footerIcons ul {
    font-size: 24px;
    max-width: 390px;
    margin: auto;
    color: #333;
    display: flex;
    justify-content: space-around;
  }
  .header {
    display: flex;
    max-width: 360px;
    margin: 20px auto 20px auto;
    justify-content: space-around;
  }
}
</style>
