<template>
  <div>
    <el-row class="cardList" type="flex" align="middle" justify="space-around">
      <el-col :sm="5" :xs="9">
        <div @click="addNew">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card-item">
            <img v-lazy="$baseurl + 'static/addNew.png'" class="image" />
            <div class="info">
              <div class="title">
                点 我 新 建 <font color="red" size="4"> {{ isArticle ? '文 章' : '目 录' }}</font>
              </div>
              <el-row class="bottom">
                <el-button type="text" class="options"><i class="el-icon-delete-solid"></i></el-button>
                <el-button type="text" class="options"><i class="el-icon-s-release"></i></el-button>
                <el-button type="text" class="options"><i class="el-icon-upload2"></i></el-button>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :sm="5" :xs="9" v-for="(item, index) in data" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card-item">
          <img v-lazy="isArticle ? $baseurl + item.cover : $baseurl + 'static/menu.png'" class="image" @click="getData(item)" />
          <div class="info">
            <span class="title" @click="getData(item)">{{ isArticle ? item.title : item.menuName }}</span>
            <el-row class="bottom">
              <el-button type="text" class="options" @click="del(item.id)"><i class="el-icon-delete-solid"></i></el-button>
              <el-button type="text" class="options" @click="update(item.id)" v-if="!isArticle"><i class="el-icon-edit"></i></el-button>
              <el-button type="text" class="options" @click="release(item.id, 0)"><i class="el-icon-s-release"></i></el-button>
              <el-button type="text" class="options" @click="release(item.id, 1)"><i class="el-icon-upload2"></i></el-button>
              <el-button type="text" class="options" @click="setHeadOverF(item.id)" v-if="isArticle"><i class="el-icon-s-promotion"></i></el-button>
              <el-button type="text" class="options" @click="setIndexF(item.id)" v-if="isArticle"><i class="el-icon-user-solid"></i></el-button>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 新建目录form -->
    <el-dialog :visible.sync="dialogVisible" :modal="false" custom-class="mobile-menu-model add-new-dialog">
      <el-form :model="formAddNew" label-position="left" label-width="80px" :rules="rules" ref="addMenuForm">
        <el-form-item label="标题名称" prop="menuName">
          <el-input v-model="formAddNew.menuName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-select v-model="formAddNew.iconClass" placeholder="请选择图标">
            <el-option label="" :value="item" v-for="(item, index) in iconData" :key="index"><i :class="item"></i></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetMenu()">取 消</el-button>
        <el-button type="primary" @click="addMenu('addMenuForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      left: 0,
      right: 0,
      level: 0,
      data: [],
      id: 1,
      isArticle: false,
      dialogVisible: false,
      currentDate: new Date(),
      iconData: [
        'el-icon-platform-eleme',
        'el-icon-eleme',
        'el-icon-delete-solid',
        'el-icon-delete',
        'el-icon-s-tools',
        'el-icon-setting',
        'el-icon-user-solid',
        'el-icon-user',
        'el-icon-phone',
        'el-icon-phone-outline',
        'el-icon-more',
        'el-icon-more-outline',
        'el-icon-star-on',
        'el-icon-star-off',
        'el-icon-s-goods',
        'el-icon-goods',
        'el-icon-warning',
        'el-icon-warning-outline',
        'el-icon-question',
        'el-icon-info',
        'el-icon-remove',
        'el-icon-circle-plus',
        'el-icon-success',
        'el-icon-error',
        'el-icon-zoom-in',
        'el-icon-zoom-out',
        'el-icon-remove-outline',
        'el-icon-circle-plus-outline',
        'el-icon-circle-check',
        'el-icon-circle-close',
        'el-icon-s-help',
        'el-icon-help',
        'el-icon-minus',
        'el-icon-plus',
        'el-icon-check',
        'el-icon-close',
        'el-icon-picture',
        'el-icon-picture-outline',
        'el-icon-picture-outline-round'
      ],
      formAddNew: {
        menuName: '',
        iconClass: ''
      },
      rules: {
        menuName: [
          { required: true, message: '请输入标题名称', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initData()
  },
  props: {
    proLeft: {
      type: Number,
      default: () => 0
    },
    proLevel: {
      type: Number,
      default: () => 0
    },
    proRight: {
      type: Number,
      default: () => 0
    },
    proIsArticle: {
      typeof: Boolean,
      default: () => false
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (val.name === 'cardList') {
          this.initData()
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    addMenu(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogVisible = false
          this.$http
            .post('/menu/add', { menu: this.formAddNew.menuName, left: this.left, level: this.level, right: this.right, icon: this.formAddNew.iconClass })
            .then(res => {
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '目录名称是: ' + this.formAddNew.menuName
                })
                this.initData()
              } else {
                this.$message({
                  type: 'error',
                  message: '该名称已经存在,请重新输入'
                })
              }
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '该名称已经存在'
              })
            })
        } else {
          this.$message({
            type: 'info',
            message: '输入有误'
          })
        }
        this.resetMenu()
      })
    },
    resetMenu() {
      this.dialogVisible = false
      this.formAddNew.menuName = ''
      this.formAddNew.iconClass = ''
    },
    // 初始化数据
    initData() {
      this.left = this.$route.query.left ? this.$route.query.left : 0
      this.right = this.$route.query.right ? this.$route.query.right : 0
      this.level = this.$route.query.level ? this.$route.query.level : 0
      this.isArticle = this.$route.query.isArticle ? this.$route.query.isArticle : false
      this.id = this.$route.query.id ? this.$route.query.id : 1
      this.$http.get('/menu/', { params: { level: this.level, left: this.left, right: this.right, id: this.id } }).then(res => {
        this.data = res.data.data
        this.isArticle = res.data.isArticle
        this.level = res.data.level
      })
    },
    // 获取页面的数据
    getData(item) {
      if (this.isArticle) {
        this.$router.push({
          name: 'writeArticle',
          query: {
            id: item.id,
            isAdd: false
          }
        })
      } else {
        this.$router.push({
          path: '/cardList',
          query: {
            left: item.left,
            right: item.right,
            level: item.level,
            id: item.id,
            isArticle: this.isArticle
          }
        })
      }
    },
    // 发布,撤销所有文章 1发布,0撤销
    release(value, status) {
      this.$confirm(`此操作将${status === 1 ? '发布' : '撤销'}该${this.isArticle ? '文章' : '项目及子文件'}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'MyMessageBox',
        type: 'warning'
      })
        .then(() => {
          this.$http.get(this.isArticle ? '/article/release' : '/menu/release', { params: { id: value, status } }).then(res => {
            if (res.data.code === 200) {
              this.$message.success(`${status === 1 ? '发布' : '撤销'}成功`)
              this.initData()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    // 发布, 撤销某一篇文章

    // 新增逻辑
    addNew() {
      if (!this.isArticle) {
        this.dialogVisible = true
      } else {
        this.$router.push({
          name: 'writeArticle',
          query: {
            id: this.id,
            isAdd: true
          }
        })
      }
    },
    // 设置成首页文章
    setIndexF(value) {
      this.$confirm('此操作将将该文章设置成首页文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'MyMessageBox',
        type: 'warning'
      })
        .then(() => {
          this.$http.get(`article/setindex/${value}`).then(res => {
            if (res.data.code === 200) {
              this.$message.success('设置成功')
              this.initData()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    // 顶置文章
    setHeadOverF(value) {
      this.$confirm('此操作将顶置该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'MyMessageBox',
        type: 'warning'
      })
        .then(() => {
          this.$http.get(`article/overhead/${value}`).then(res => {
            if (res.data.code === 200) {
              this.$message.success('设置成功')
              this.initData()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消顶置'
          })
        })
    },
    // 更新逻辑
    update(id) {
      if (!this.isArticle) {
        this.$prompt('更新目录名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'MyMessageBox'
        })
          .then(({ value }) => {
            this.$http.get('/menu/update', { params: { id: id, menu: value } }).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '目录名称是: ' + value
                })
                this.initData()
              } else {
                this.$message({
                  type: 'error',
                  message: '该名称已经存在,请重新输入'
                })
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            })
          })
      }
    },
    // 删除逻辑
    del(value) {
      this.$confirm('此操作将永久删除该项目及子文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'MyMessageBox',
        type: 'warning'
      })
        .then(() => {
          this.$http.get(this.isArticle ? '/article/del' : '/menu/del', { params: { id: value } }).then(res => {
            if (res.data.code === 200) {
              this.$message.success('删除成功')
              this.initData()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
<style scoped lang="less">
@media screen and (max-width: 767px) {
  i {
    font-size: 16px !important;
  }
  .title {
    height: 32px !important;
    font-size: 12px !important;
    font-weight: 400 !important;
  }
  .info {
    padding: 8px !important;
  }
  .bottom {
    margin: 0 !important;
  }
}
.info {
  padding: 14px;
}
.cardList {
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
}
.title {
  cursor: pointer;
  height: 42px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 多行在这里修改数字即可，这里显示2行
  overflow: hidden;
  -webkit-box-orient: vertical;
  font-size: 16px;
  font-weight: 600;
}
.card-item {
  margin: 20px 0 12px;
  border-radius: 12px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.options {
  flex: 1;
  i {
    font-size: 22px;
  }
}
.image {
  // min-height: 170px;
  width: 100%;
  display: block;
  cursor: pointer;
}
</style>
