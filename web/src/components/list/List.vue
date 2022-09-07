<template>
  <div class="list">
    <div class="pre-title">{{ isSearch ? '搜索 ' + searchValue : '最新文章' }}</div>
    <div @click="getArticleDetail(item.id)" v-for="item in data" :key="item.id" class="article-item">
      <el-row class="list-item" data-wow-duration="1.5s" v-animate="' animate__zoomIn animate__animated'">
        <el-col :xs="24" :sm="0" class="pic" style="text-align: center">
          <img v-lazy="$baseurl + item.cover" alt="" srcset="" />
        </el-col>
        <el-col>
          <el-row type="flex" :gutter="20">
            <el-col class="pic hidden-xs-only" :sm="8" style="padding-left: 0">
              <img v-lazy="$baseurl + item.cover" alt="" class="pc-img" />
            </el-col>
            <el-col class="content" :xs="24" :sm="16">
              <el-row type="flex" justify="space-around" style="flex-direction: column; height: 100%">
                <div class="header"><font-awesome-icon icon="fa-solid fa-folder" /> cmx笔记</div>
                <div class="title">{{ item.title }}</div>
                <div class="description">{{ item.describe }}</div>
                <el-row class="footer" align="middle" justify="center" type="flex">
                  <el-col class="left-icon" :sm="3" :xs="5">
                    <div class="icon">
                      <img src="../../../public/images/headimg_dl.jpg" alt="" srcset="" />
                    </div>
                  </el-col>
                  <el-col class="date hidden-xs-only" :sm="7">{{ item.publishedTime }}</el-col>
                  <el-col class="lover" :sm="3" :xs="5"><font-awesome-icon icon="fa-solid fa-heart" />1.2k</el-col>
                  <el-col class="comments" :sm="3" :xs="5"><font-awesome-icon icon="fa-solid fa-comment-dots" />18</el-col>
                  <el-col class="right-icon" :sm="8" :xs="9"><div class="footer-right-icon"></div></el-col>
                </el-row>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
// import { WOW } from 'wowjs'
import 'element-ui/lib/theme-chalk/display.css'
import 'animate.css'
export default {
  inject: ['reload'],
  name: 'List',
  data() {
    return {
      isSearch: false,
      searchValue: '',
      data: []
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (val.name === 'articleList') {
          this.reload()
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    initData() {
      this.isSearch = this.$route.query.isSearch ? this.$route.query.isSearch : false
      if (this.isSearch) {
        this.searchValue = this.$route.query.searchValue
        this.$http.get(`/pagearticle/search/${this.searchValue}`).then(res => {
          if (res.data.code === 200) {
            this.data = res.data.data
          }
        })
      } else {
        this.id = this.$route.query.id
        this.$http.get(`/pagearticle/${this.id}`).then(res => {
          this.data = res.data.data
        })
      }
    },
    getArticleDetail(id) {
      this.$router.push({
        path: '/home/new',
        query: {
          id
        }
      })
    }
  },
  mounted() {
    // // wow初始化
    // setTimeout(() => {
    //   wow.init()
    // }, 0)
  },
  created() {
    // const wow = new WOW({
    //   boxClass: 'wow', // default
    //   animateClass: 'animate__zoomIn animate__animated animate__bounce', // default
    //   offset: 0, // default
    //   mobile: true, // default
    //   live: true,
    //   // live为true时，控制台会提示：MutationObserver is not supported by your browser. & WOW.js cannot detect dom mutations, please call .sync() after loading new content.
    //   callback: function (box) {
    //     console.log('WOW: animating <' + box.tagName.toLowerCase() + '>')
    //   }
    // })
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     wow.init()
    //   }, 200)
    // })
    this.initData()
  }
}
</script>

<style scoped lang="less">
/deep/ .animate__animated {
  --animate-duration: 2s !important;
}
.article-item {
  cursor: pointer;
}
.header {
  color: #ff5c72;
  letter-spacing: 2px;
  font-size: 14px;
  margin-bottom: 7px;
}
.pre-title {
  font-size: 14px;
  color: #7087a7;
  letter-spacing: 5px;
  position: relative;
  height: 14px;
  margin: 30px 90px;
  padding-left: 90px;
}
.pre-title::before {
  display: inline-block;
  content: '';
  position: absolute;
  left: 0;
  top: 7px;
  width: 80px;
  height: 1px;
  border-bottom: 1.5px solid #c3c8cf;
}
.title {
  margin-bottom: 10px;
  color: #37475c;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  text-shadow: #d0cdcd 0.031em 0.031em 0.051em;
}
.description {
  font-size: 14px;
  font-weight: 400;
  margin: 5px 0;
  color: #7087a7;
}
.list {
  box-sizing: border-box;
  width: 100%;
  padding: 20px 0;
  background-color: rgba(255, 255, 255, 0.9);
}
.list-item {
  max-width: 1080px;
  margin: auto;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #d4c4f882;
  margin-bottom: 20px;
}
.list-item:hover {
  box-shadow: #ebe8e8 2px 2px 2px 2px;
}
.pic img {
  max-width: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: all 0.4s cubic-bezier(0.7, 0, 0.3, 1);
}
.pc-img {
  min-height: 170px;
}
.lover,
.comments {
  text-align: center;
}
.footer {
  color: rgb(124, 121, 121);
  font-size: 14px;
  padding-top: 10px;
  position: relative;
  height: 72px;
  border: 1px solid #dde8f7;
  border-left: none;
  border-right: none;
  // perspective: 500px;
  .icon {
    max-width: 48px;
    transform: rotateZ(45deg) scale(0.7);
    border: 2px solid red;
    // border-top: none;
    // border-right: none;
    border-radius: 5px;
    // padding: 2px;
  }
  .icon img {
    max-width: 48px;
    transform: translateX(3px) translateY(-2px);
    border-radius: 4px;
  }
  .right-icon {
    text-align: center;
    height: 100%;
    .footer-right-icon {
      height: 100%;
      background-repeat: no-repeat;
      width: 75%;
      transform: translateX(50%);
      background-image: url('../../../public/images/foot-right-icon.png');
      background-size: contain;
    }
  }
}
</style>
