<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <svg-icon icon-class="eye-open" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    onSuccess(data) {
      console.log(data)
    },
    beforeUpload(file) {
      console.log(file)
      // 大小为byte  b
      if (file.size > 1024) {
        this.$message.error('文件上传过大')
        return false
      }
      return true
    }
  }
  // async created() {
  //   const res = await this.$store.dispatch('user/getUserInfo')
  //   console.log(res)
  // }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
