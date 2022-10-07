<template>
  <div>
    <PageTools type="success" :show-before="true">
      <!-- <template #before="scope">
        {{ scope.aaa }}
      </template> -->
      <template #before>
        <span>共25条记录</span>
      </template>
      <template #after>
        <el-button size="small" type="warning">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
      </template>
    </PageTools>
  </div>
</template>

<script>

export default {

  data() {
    return {

    }
  }
}
</script>

<style>

</style>
