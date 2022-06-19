<template>
  <el-row class="comment-list">
    <el-col class="user-icon">
      <img src="" alt="" />
    </el-col>
    <el-col class="comment-details">
      <div class="title"></div>
      <el-row class="">
        <el-col class="user-name"></el-col>
        <el-col class="comment-date"></el-col>
      </el-row>
      <div class="comment-content">品论的内容</div>
      <div class="reply">回复评论</div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'comment-list'
}
</script>

<style></style>
