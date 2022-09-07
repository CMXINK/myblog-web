<template>
  <div class="theme">
    <header class="header">
      <el-row class="menu hidden-xs-only">
        <el-col :span="3" :offset="2" class="menu-left">
          <font-awesome-icon icon="fa-solid  fa-star-and-crescent" class="fa-spin fa-2xl menu-left-icon" />
        </el-col>
        <el-col :span="10" :offset="2"
          ><el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="margin: auto; display: flex; justify-content: space-around">
            <el-menu-item v-for="(item, index) in data" :key="String(index)" :index="String(index)" @click="changeActiveIndex(String(index), item)"><i :class="item.iconClass"></i>{{ item.menuName }}</el-menu-item>
            <el-menu-item index="100" @click="changeActiveIndex('100', 'search')"><i class="el-icon-search"></i>Search</el-menu-item>
          </el-menu></el-col
        >
        <!-- <el-col :span="3" :offset="2" class="menu-right"><font-awesome-icon icon="fa-solid fa-right-to-bracket" /> 登录 </el-col> -->
      </el-row>

      <el-row class="hidden-sm-and-up menu-mobile">
        <img src="../../../public/images/cat.png" />
        <font-awesome-icon icon="fa-solid fa-bars" class="menu-mobile-icon" @click="dialogVisible = true" />
      </el-row>
    </header>
    <!-- mobile弹出层 -->
    <el-dialog :visible.sync="dialogVisible" :modal="false" custom-class="mobile-menu-model">
      <div v-for="(item, index) in data" :key="index" :class="String(index) === activeIndex ? 'mobile-active' : ''" @click="changeActiveIndex(String(index), item)"><i :class="item.iconClass"></i>&nbsp;&nbsp;&nbsp;{{ item.menuName }}</div>
      <div :class="'100' === activeIndex ? 'mobile-active' : ''" @click="changeActiveIndex('100', 'search')"><i class="el-icon-search"></i>&nbsp;&nbsp;&nbsp;搜索</div>
    </el-dialog>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
export default {
  inject: ['reload'],
  data() {
    return {
      activeIndex: '0',
      dialogVisible: false,
      data: '',
      content: '暂无内容'
    }
  },
  created() {
    this.$http.get('/pageindex/').then(res => {
      this.data = res.data.data
      this.activeIndex = sessionStorage.getItem('activeIndex') ? sessionStorage.getItem('activeIndex') : '0'
    })
  },
  methods: {
    changeActiveIndex(index, item) {
      sessionStorage.setItem('activeIndex', index)
      this.activeIndex = index
      this.dialogVisible = false
      if (item.menuName === '首页') {
        if (this.$route.fullPath === '/home/new') {
          return
        }
        this.$router.push({
          path: '/home/new'
        })
        this.reload()
      } else if (item !== 'search') {
        if (this.$route.fullPath === `/home/list?id=${item.id}`) {
          return
        }
        this.$router.push({
          path: '/home/list',
          query: {
            id: item.id
          }
        })
        this.reload()
      } else {
        this.$prompt('', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'mySearchBox',
          showConfirmButton: false,
          showCancelButton: false,
          inputPlaceholder: '请输入检索内容...',
          showClose: false
        })
          .then(({ value }) => {
            console.log(value)
            if (value.length > 0) {
              this.$router.push({
                path: '/home/list',
                query: {
                  searchValue: value,
                  isSearch: true
                }
              })
            } else {
              return false
            }
          })
          .catch(() => {})
      }
    },
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
}
.el-dialog {
  border-radius: 10px;
}
.mobile-menu-model {
  .mobile-active {
    color: #8400fa;
    font-size: 15px;
    font-weight: bold;
  }
  div {
    // text-align: center;
    padding: 10px;
    color: #333;
  }
}
.menu {
  border: 1px solid transparent;
  margin-top: 30px;
  letter-spacing: 2px;
  position: fixed;
  width: 100%;
  z-index: 3;
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
.menu-mobile {
  width: 100%;
  height: 120px;
  position: fixed;
  z-index: 2;
  // background-color: rgba(0, 0, 0, 0.1);
  img {
    height: 90px;
    position: absolute;
    left: 20px;
    top: 15px;
    line-height: 90px;
  }
}
.menu-mobile-icon {
  color: #fff;
  font-weight: 700;
  font-size: 30px;
  position: absolute;
  top: 50%;
  right: 40px;
  transform: translateY(-50%);
}
</style>
