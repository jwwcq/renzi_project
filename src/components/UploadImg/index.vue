<template>
  <div>
    <el-upload
      v-loading="loading"
      action="#"
      class="uploadImg"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"
      :http-request="onHttpRequest"
      :before-upload="beforeUpload"
      :limit="1"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      title="图片预览"
      :visible.sync="previewDialog"
      width="50%"
    >
      <img style="width:100%;" :src="previewSrc">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDsZ2GFzThmeIBpFPJxNaZLsABRSFl24tW',
  SecretKey: 'ShiV2LQH6sSq11qU0JVWN4Yt2znQr690'
})
export default {
  name: 'UploadImg',
  props: {
    defaultUrl: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      fileList: [],
      previewDialog: false,
      previewSrc: '',
      loading: false
    }
  },
  watch: {
    defaultUrl() {
      this.fileList.push({
        name: 'default', url: this.defaultUrl
      })
    }
  },
  methods: {
    onPreview(file) {
      this.previewDialog = true
      console.log(file.url)
      this.previewSrc = file.url
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    // 会覆盖默认上传的行为
    onHttpRequest({ file }) {
      this.loading = true
      cos.putObject({
        Bucket: 'jww-1314348501', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        if (err) {
          this.loading = false
          return this.$message.error('图片上传失败')
        }
        this.loading = false
        this.$emit('onSuccess', { imgUrl: 'https://' + data.Location })
      })
    },
    // 上传文件之前
    beforeUpload(file) {
      const allowType = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      const flag = allowType.includes(file.type)
      //  限制图片上传的格式
      if (!flag) {
        this.$message.error('请上传' + allowType.join('、') + '格式的图片')
        return false
      }

      //  限制图片上传的大小
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传的图片不能大于1MB')
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .uploadImg{
    width: 148px;
    height: 148px;
    overflow: hidden;
  }
</style>
