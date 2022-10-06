<template>

  <!-- 新增部门的弹层 -->
  <el-dialog :title="title" :visible="dialogVisible" @close="handleClise">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="addDeptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployessSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button v-loading="loading" type="primary" size="small" @click="submit">确定</el-button>
        <el-button size="small" @click="handleClise">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>

</template>

<script>
import { getDepartmentsAPI, addDepartments, updateDepartments } from '@/api/departments.js'
import { getEmployessSimple } from '@/api/employees'
export default {
  name: 'AddDept',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartmentsAPI()
      // console.log(depts)
      if (this.formData.id) { // 如果有id
        depts.some(ele => ele.id !== this.formData.id && ele.code === value) ? callback(new Error(`模块下已经存在${value}编码`)) : callback()
      } else {
        depts.some(ele => ele.code === value) ? callback(new Error(`模块下已经存在${value}编码`)) : callback()
      }

      // 编辑模式下,让我自己和自己对比校验了？？？
      //  解决方案, 对比的过程中吧自己排除掉, 然后再去对比
    }
    const nameCheck = async(rule, value, callback) => {
      const { depts } = await getDepartmentsAPI()
      if (this.formData.id) { //  编辑
        const deptstj1 = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id)
        deptstj1.some(item => item.name === value) ? callback(new Error(`该部门下已经存在${value}部门名称`)) : callback()
      } else { // 新增
        const deptstj = depts.filter(item => item.pid === this.treeNode.id)
        // console.log(deptstj)
        deptstj.some(item => item.name === value) ? callback(new Error(`该部门下已经存在${value}部门名称`)) : callback()
      }
      callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称1-50个字符', trigger: 'blur' },
          { validator: nameCheck, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码1-50个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: checkCodeRepeat
          }

        ],
        manager: [
          { required: true, message: '部门负责人必填' }
        ],
        introduce: [
          { required: true, message: '部门介绍必填', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍1-300个字符', trigger: 'blur' }
        ]
      },
      peoples: [],
      loading: false
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    handleClise() {
      this.$emit('update:dialogVisible', false)
      this.$refs.addDeptForm.resetFields()
      // this.treeNode = {}
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
    },
    async getEmployessSimple() {
      const res = await getEmployessSimple()
      this.peoples = res
    },
    async submit() {
      try {
        await this.$refs.addDeptForm.validate()
        this.loading = true
        if (this.formData.id) {
          await updateDepartments(this.formData)
        } else {
          await addDepartments({ ...this.formData, pid: this.treeNode.id })
        }
        this.$message.success(`${this.formData.id ? '编辑' : '新增'}` + '成功！')
        this.$parent.getDepartments()
        this.handleClise()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }

  }
}
</script>

<style>

</style>
