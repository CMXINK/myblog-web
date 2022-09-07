<template>
  <div class="single-article">
    <div class="template">
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script>
import tinymceTemplate from '../../components/tinymce/TinymceTemplate.js'
import { WOW } from 'wowjs'
export default {
  inject: ['reload'],
  name: 'singleArticle',
  data() {
    return {
      content: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initAction()
    })
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (val.name === 'singleArticle') {
          this.reload()
        }
      },
      deep: true
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.$http.get(`/pagearticle/getarticle/${this.$route.query.id ? this.$route.query.id : 0}`).then(res => {
        this.content = res.data.data
        const elAddAnimate = []
        for (let i = 0; i < tinymceTemplate.template.length; i++) {
          elAddAnimate.push(tinymceTemplate.template[i].content.match(/class="(\S*)">/)[1])
        }
        for (let i = 0; i < elAddAnimate.length; i++) {
          this.content = this.content.replace(RegExp('class="' + elAddAnimate[i] + '"', 'gm'), `class="${elAddAnimate[i]} wow"`)
        }
      })
    },
    initAction() {
      const items = document.getElementsByClassName('copy-article')
      setTimeout(() => {
        for (let i = 0; i < items.length; i++) {
          items[i].onclick = () => {
            var selection = window.getSelection()
            selection.removeAllRanges()
            var range = document.createRange()
            range.selectNodeContents(items[i].parentElement.lastElementChild)
            selection.addRange(range)
          }
        }
      }, 500)
      const wow = new WOW({
        boxClass: 'wow', // default
        animateClass: 'animate-style', // default
        offset: 200, // default
        mobile: true, // default
        live: true,
        // live为true时，控制台会提示：MutationObserver is not supported by your browser. & WOW.js cannot detect dom mutations, please call .sync() after loading new content.
        callback: function (box) {
          console.log('WOW: animating <' + box.tagName.toLowerCase() + '>')
        }
      })
      setTimeout(() => {
        wow.init()
      }, 500)
    }
  }
}
</script>

<style scoped lang="less">
@keyframes mymobilanimate {
  from {
    // opacity: 0;
    width: 0;
  }
  to {
    // opacity: 1;
    width: 100%;
  }
}

@media screen and (max-width: 767px) {
  /deep/ .animate-style {
    animation: mymobilanimate 2s !important;
  }
}

@keyframes myanimate {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
/deep/ .animate-style {
  animation: myanimate 2s;
}
.single-article {
  padding: 0;
  margin: 0;
  font-family: 'Play', 'MArima Madurai', Microsoft JhengHei, Georgia, Times, serif, Microsoft Yahei;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
  margin: auto;
  width: 90%;
  border-radius: 40px;
  padding: 40px;
}
/deep/ .template {
  .template-header-banner {
    width: 100%;
    margin: 20px auto 0px auto;
  }
  a {
    color: #f25858 !important;
  }
  .template-header-banner .header-content {
    border: none;
    border-left: 10px solid #ac9bd7;
    background: #ac9bd740;
    padding: 20px;
    font-size: 17px;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
  .template-header-banner .header-content:before {
    color: #ac9bd7;
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    transform: rotateZ(22deg);
  }
  /* 列表 */
  .template-list {
    margin: auto;
    width: 100%;
    margin-top: 20px;
  }
  .template-list .link-title {
    position: relative;
    display: inline-block;
    margin: 20px 0;
    font-size: 15px;
    padding: 0 30px 0 25px;
    height: 45px;
    line-height: 45px;
    border-radius: 0 35px 35px 0;
    background: linear-gradient(120deg, rgba(239, 118, 118, 0.6) 0%, rgba(0, 170, 253, 0.6) 100%);
    color: #fff;
  }
  .template-list ul {
    font-size: 13px;
    font-weight: 600;
    line-height: 3;
    color: #53689a;
    margin: 0;
    padding: 0;
    padding-left: 20px;
  }
  .template-list ol {
    padding-left: 15px;
    border-bottom: 1px #53689a dashed;
    position: relative;
  }
  .template-list ol:hover {
    text-indent: 0.5em;
  }
  .template-list ol:before {
    content: '';
    position: absolute;
    left: 0;
    top: 18px;
    height: 6px;
    width: 6px;
    border-radius: 20px;
    background-color: #888cdc;
  }

  /* 彩色文本盒子 */
  .template-colorfulBox {
    margin: 0px auto 0px auto;
  }
  .template-colorfulBox .box {
    padding: 0.5rem 2rem;
    font-size: 0.75rem;
    border-radius: 0.5rem;
    color: #82d616;
    border: 1px solid #82d616;
  }
  .template-colorfulBox .box {
    text-decoration: none;
  }
  .template-colorfulBox a {
    color: #82d616;
    text-decoration: none;
  }
  .template-colorfulBox a:hover {
    color: rgb(189, 1, 1);
  }

  /* 垂直文章前划线 */
  .template-vertical {
    margin: 20px auto auto 0px;
    position: relative;
  }
  .template-vertical .content {
    position: absolute;
    padding-left: 10px;
  }
  .template-vertical .content ol {
    padding: 0;
    margin: 0;
  }
  .template-vertical .content::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    content: '';
    border-radius: 8px;
    background-color: #5e72e4;
  }
  .template-vertical .content p {
    margin: 4px;
    font-size: 16px;
    color: #000;
  }

  /*  水平underLine */
  .template-horizontal .title {
    text-decoration: underline solid 0.125em firebrick;
    text-underline-offset: 0.25em;
  }

  /* 白色背景code */
  .template-code .prettyprint {
    position: relative;
    background: linear-gradient(0deg, rgba(216, 216, 216, 0.6), rgba(236, 236, 236, 0.6));
    border-radius: 10px;
    margin-bottom: 1.6em;
    max-width: 100%;
    overflow: auto;
    text-shadow: none;
    color: #000;
    padding-top: 40px;
    margin-top: 20px;
    padding-left: 10px;
    margin-bottom: 0px;
    padding-bottom: 20px;
  }
  .template-code .prettyprint:before {
    content: ' ';
    position: absolute;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: rgba(252, 98, 93, 0.7);
    width: 12px;
    height: 12px;
    left: 12px;
    margin-top: -24px;
    -webkit-box-shadow: 20px 0 rgba(253, 188, 64, 0.7), 40px 0 rgba(53, 205, 75, 0.7);
    box-shadow: 20px 0 rgba(253, 188, 64, 0.7), 40px 0 rgba(53, 205, 75, 0.7);
    z-index: 2;
  }
  .template-code .prettyprint .code {
    padding-left: 16px;
    padding-top: 16px;
    padding-bottom: 14px;
    overflow: auto;
    background: rgba(255, 255, 255, 0.5) !important;
    position: relative;
  }
  .template-code .prettyprint .code::before {
    content: '';
    height: 100%;
    width: 6px;
    border-radius: 3px;
    background: linear-gradient(180deg, rgba(252, 98, 93, 0.7), rgba(253, 188, 64, 0.7), rgba(53, 205, 75, 0.7));
    left: 3px;
    top: 0px;
    position: absolute;
  }
  .template-code .prettyprint div {
    background: #fff !important;
  }

  /* 黑色背景code */
  .template-code-black .prettyprint {
    position: relative;
    background: linear-gradient(0deg, rgba(16, 16, 16, 0.6), rgba(28, 28, 28, 0.6));
    border-radius: 10px;
    margin-bottom: 1.6em;
    max-width: 100%;
    overflow: auto;
    text-shadow: none;
    color: #000;
    padding-top: 40px;
    margin-top: 20px;
    margin-bottom: 0px;
    padding-bottom: 20px;
    padding-left: 10px;
  }
  .template-code-black .prettyprint:before {
    content: ' ';
    position: absolute;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: rgba(252, 98, 93, 0.7);
    width: 12px;
    height: 12px;
    left: 12px;
    margin-top: -24px;
    -webkit-box-shadow: 20px 0 rgba(253, 188, 64, 0.7), 40px 0 rgba(53, 205, 75, 0.7);
    box-shadow: 20px 0 rgba(253, 188, 64, 0.7), 40px 0 rgba(53, 205, 75, 0.7);
    z-index: 2;
  }
  .template-code-black .prettyprint .code {
    padding-left: 16px;
    padding-top: 16px;
    padding-bottom: 14px;
    background: rgba(0, 0, 0, 0.4) !important;
    position: relative;
  }
  .template-code-black .prettyprint .code::before {
    content: '';
    height: 100%;
    width: 6px;
    border-radius: 3px;
    background: linear-gradient(180deg, rgba(252, 98, 93, 0.7), rgba(253, 188, 64, 0.7), rgba(53, 205, 75, 0.7));
    left: 3px;
    top: 0px;
    position: absolute;
  }
  .template-code-black .prettyprint *,
  .template-code .prettyprint * {
    background: transparent !important;
  }
  .tempalte-code,
  .tempalte-code-black {
    position: relative;
  }
  .code > pre:first-child,
  .code > div:first-child {
    max-height: 450px;
    overflow: scroll;
    border-radius: 20px;
    margin-right: 10px;
    padding-left: 3px;
    font-size: 12px !important;
    line-height: 16px !important;
    white-space: pre !important;
    font-family: Consolas, 'Courier New', monospace !important;
    background-color: transparent !important;
  }
  .code > pre:first-child *,
  .code > div:first-child * {
    font-family: Consolas, 'Courier New', monospace !important;
    font-size: 12px !important;
    line-height: 16px !important;
    white-space: pre !important;
    background-color: transparent !important;
  }
  .code > pre:first-child::-webkit-scrollbar,
  .code > div:first-child::-webkit-scrollbar {
    background-color: transparent !important;
    width: 10px;
    height: 10px;
  }
  .code > pre:first-child::-webkit-scrollbar-thumb,
  .code > div:first-child::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: transparent;
    background-image: linear-gradient(182deg, rgba(33, 212, 253, 0.8) 0%, rgba(183, 33, 255, 0.8) 100%);
  }
  .code > div:first-child::-webkit-scrollbar-thumb:vertical,
  .code > pre:first-child::-webkit-scrollbar-thumb:vertical {
    background-image: linear-gradient(to right, rgba(33, 212, 253, 0.8) 0%, rgba(183, 33, 255, 0.8) 100%) !important;
  }
  .code > div:first-child::-webkit-scrollbar-thumb:horizontal,
  .code > pre:first-child::-webkit-scrollbar-thumb:horizontal {
    background-image: linear-gradient(182deg, rgba(33, 212, 253, 0.8) 0%, rgba(183, 33, 255, 0.8) 100%) !important;
  }

  .code > pre:first-child::-webkit-scrollbar-corner,
  .code > div:first-child::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  /* 可变圆形标题头 */
  .template-circleIcon-header {
    margin-top: 20px;
    margin-bottom: 0px;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .template-circleIcon-header .line {
    flex: 1;
    height: 2px;
    background-color: #638799;
  }
  .template-circleIcon-header .content {
    z-index: 100;
    display: inline-block;
    background-color: transparent;
    display: flex;
    align-items: center;
  }
  .template-circleIcon-header .circle {
    display: inline-block;
  }
  .template-circleIcon-header .circle .icon {
    border-radius: 1.5em;
    border: 3px solid #638799;
    display: inline-block;
    height: 2em;
    width: 2em;
    text-align: center;
    line-height: 2em;
    padding: 0.5em;
  }
  .template-circleIcon-header .header-title {
    text-align: center;
    display: inline-block;
  }
  .template-circleIcon-header .header-title .title {
    display: inline-block;
    line-height: 2em;
    height: 2em;
    padding-left: 3em;
  }
  .copy-article {
    position: absolute;
    color: red;
    z-index: 3;
    right: 30px;
    top: 9px;
    cursor: pointer;
  }
  .template-code,
  .template-code-black {
    position: relative;
  }
}
</style>
