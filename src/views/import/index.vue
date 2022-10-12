<template>
  <UploadExcel :on-success="onSuccess" />
</template>

<script>
import UploadExcel from '@/components/UploadExcel'
import { importEmployee } from '@/api/employees'
export default {
  components: {
    UploadExcel
  },
  methods: {
    async onSuccess({ header, results }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = results.map(item => {
        const userinfo = {}
        Object.keys(item).forEach(key => {
          userinfo[userRelations[key]] = item[key]
        })
        return userinfo
      })
      await importEmployee(arr)
      this.$message.success('批量导入成功')
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
