<template>
  <div>
    <el-row class="articel-info" type="flex" align="middle" justify="space-around">
      <el-col :span="9">
        <ImgCutter rate="8:5" @cutDown="cutDown" :cutWidth="440" :cutHeight="275" class="cover">
          <template class="btn btn-primary" #open><div class="openImgCutter" :style="bgi">选择封面</div></template>
        </ImgCutter>
      </el-col>
      <el-col :span="15">
        <el-form :label-position="'left'" label-width="80px" :model="formLabelAlign" :rules="rules" ref="articleForm">
          <el-form-item label="标题" prop="title">
            <el-input v-model="formLabelAlign.title"></el-input>
          </el-form-item>
          <el-form-item label="描述文本" prop="describe">
            <el-input v-model="formLabelAlign.describe"></el-input>
          </el-form-item>
          <el-form-item label="发布时间">
            <!-- <el-col class="lover" :sm="3" :xs="5"><font-awesome-icon icon="fa-solid fa-heart" />1.2k</el-col> -->
            <!-- <el-input v-model="formLabelAlign.region" type="Date"></el-input> -->
            <div class="box">
              <el-date-picker v-model="formLabelAlign.publishedTime" type="date" placeholder="选择日期" style="display: inline-block" value-format="timestamp"> </el-date-picker>
              <el-checkbox label="发布" v-model="formLabelAlign.published" @change="setOther"></el-checkbox>
              <el-checkbox label="顶置" v-model="formLabelAlign.overhead" @change="setRelease"></el-checkbox>
              <el-checkbox label="应用首页" v-model="formLabelAlign.setIndex" @change="setRelease"></el-checkbox>
              <el-button @click="reback">返回</el-button>
              <el-button type="primary" @click="isAdd ? saveAll('articleForm') : update()">保存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ImgCutter from 'vue-img-cutter'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'myImgCutter',
  data() {
    return {
      isAdd: true,
      formLabelAlign: {
        title: '',
        describe: '',
        publishedTime: '',
        overhead: true,
        setIndex: true,
        published: true,
        file: '',
        flag: '3',
        changeFile: false,
        id: this.$route.query.id ? this.$route.query.id : '',
        content: this.content
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 28, message: '标题长度必须在3到28个字之间', trigger: 'blur' }
        ],
        describe: [{ required: true, message: '请输入描述文本', trigger: 'blur' }]
      },
      bgi: 'background-image:linear-gradient(45deg, rgba(0, 0, 0, 0.25) 25%, transparent 0, transparent 75%, rgba(0, 0, 0, 0.25) 0), linear-gradient(45deg, rgba(0, 0, 0, 0.25) 25%, transparent 0, transparent 75%, rgba(0, 0, 0, 0.25) 0);'
    }
  },
  created() {
    this.isAdd = this.$route.query.isAdd
    if (!this.isAdd) {
      this.$http.get(`/article/${this.$route.query.id}`).then(res => {
        this.data = res.data.data
        this.contentSetter(res.data.data.content)
        this.formLabelAlign = res.data.data
        this.bgi = `background-image:url(${this.$baseurl + res.data.data.cover});` + 'background-size:cover'
        this.formLabelAlign.file = res.data.data.cover
      })
    }
  },
  components: {
    ImgCutter
  },
  computed: {
    ...mapState('writeArticleOptions', ['content'])
  },
  methods: {
    ...mapMutations('writeArticleOptions', ['contentSetter']),
    update() {
      console.log(1234)
      if (!this.formLabelAlign.title) {
        this.$message.error('请设置文章标题')
      } else if (!this.formLabelAlign.describe) {
        this.$message.error('请设置描述文本')
      } else if (!this.formLabelAlign.content) {
        this.$message.error('请设置文章内容')
      } else {
        this.formLabelAlign.content = this.content
        console.log(this.formLabelAlign)
        const fromData = new FormData()
        fromData.append('flag', 3)
        fromData.append('file', this.formLabelAlign.file)
        Object.keys(this.formLabelAlign).map(key => {
          fromData.append(key, this.formLabelAlign[key])
        })
        this.$http
          .post('/article/update', fromData, {
            'Content-type': 'multipart/form-data'
          })
          .then(res => {
            if (res.data.code === 200) {
              this.$message.success('保存成功!')
              this.reback()
              this.contentSetter('')
            } else {
              this.$message.warning(res.data.msg)
            }
          })
      }
    },
    saveAll(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.formLabelAlign.file) this.$message.error('请选择封面')
          else if (!this.content) this.$message.error('请填写文章内容')
          else {
            this.formLabelAlign.content = this.content
            const fromData = new FormData()
            // fromData.append('file', this.formLabelAlign.file)
            Object.keys(this.formLabelAlign).map(key => {
              fromData.append(key, this.formLabelAlign[key])
            })
            console.log('this.formLabelAlign', this.formLabelAlign)
            this.$http
              .post(this.isAdd ? '/article/add' : '/article/update', fromData, {
                'Content-type': 'multipart/form-data'
              })
              .then(res => {
                if (res.data.code === 200) {
                  this.$message.success('保存成功!')
                  this.reback()
                  this.contentSetter('')
                } else {
                  this.$message.warning(res.data.msg)
                }
              })
          }
        }
      })
    },
    reback() {
      this.$router.back()
    },
    cutDown(obj) {
      this.bgi = `background-image:url(${obj.dataURL});` + 'background-size:cover'
      this.formLabelAlign.file = obj.file
    },
    setRelease(value) {
      if (value) this.formLabelAlign.published = true
    },
    setOther(value) {
      if (!value) {
        this.formLabelAlign.overhead = false
        this.formLabelAlign.setIndex = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.openImgCutter {
  aspect-ratio: 8/5;
  width: 100%;
  background-color: #eee;
  background-size: 30px 30px;
  background-position: 0 0, 15px 15px;
  text-align: center;
  color: orangered;
  font-weight: 700;
  cursor: pointer;
  max-width: 315.587px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 18px;
  margin-left: 10px;
}
// .form-info {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   flex-direction: column;
// }
.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.articel-info {
  width: 90vw;
  margin-top: 20px;
}
// .cover * {
//   margin: auto;
// }
</style>
