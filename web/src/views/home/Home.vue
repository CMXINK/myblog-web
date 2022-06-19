<template>
  <div class="home">
    <Theme>
      <template>
        <WriteArticle></WriteArticle>
      </template>
    </Theme>
  </div>
</template>

<script>
// import List from '../../components/list/List.vue'
import Theme from '../../components/theme/Theme'
import WriteArticle from '../writeArticle/WriteArticle.vue'
export default {
  components: { Theme, WriteArticle },
  name: 'Home'
}
</script>

<style></style>
