<template>
  <el-form>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="昵称">
        <el-input v-model="formInline.user" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formInline.email" type="email" placeholder="邮箱"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input type="textarea" v-model="formInline.content" placeholder="您可以在这里输入评论内容..."></el-input>
      </el-form-item>
    </el-form>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: '',
        content: 'user'
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
