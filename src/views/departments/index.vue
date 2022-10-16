<template>
  <div v-loading="loading" class="departments-container">
    <el-card>
      <tree-tools :tree-node="company" :is-root="false" @addDept="addDepts" />
    </el-card>
    <el-tree :data="data" :default-expand-all="true" :props="defaultProps">
      <template slot-scope="scoped">
        <tree-tools :tree-node="scoped.data" @addDept="addDepts" @editDept="editDept" @refreshList="getDepartments" />
      </template>
    </el-tree>
    <add-dept ref="addDept" :dialog-visible.sync="dialogVisible" :tree-node="currentNode" />
  </div>
</template>

<script>
import TreeTools from '@/views/departments/components/TreeTools'
import { getDepartmentsAPI } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import AddDept from '@/views/departments/components/AddDept'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      data: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name'
      },
      company: {},
      depts: [],
      dialogVisible: false,
      currentNode: {},
      loading: false
    }
  },
  mounted() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      try {
        this.loading = true
        const { depts, companyName, companyManage } = await getDepartmentsAPI()
        this.data = tranListToTreeData(depts, '')
        this.company = { name: companyName, manager: companyManage, id: '' }
      } finally {
        this.loading = false
      }
    },
    addDepts(node) {
      this.dialogVisible = true
      this.currentNode = node
    },
    editDept(node) {
      this.dialogVisible = true
      this.currentNode = { ...node }
      this.$refs.addDept.formData = { ...node }
    }
  }
}
</script>

<style lang="scss">
  .departments-container {
    width: 900px;
    margin: 20px auto;
    .el-tree {
      .el-tree-node__content {
        padding-right: 20px;
      }
    }
  }
  </style>
