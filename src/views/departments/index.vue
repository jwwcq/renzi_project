<template>
  <div class="departments-container">
    <el-card>
      <tree-tools :tree-node="company" :is-root="false" @addDept="addDepts" />
    </el-card>
    <el-tree :data="data" :default-expand-all="true" :props="defaultProps">
      <tree-tools slot-scope="{data}" :tree-node="data" @addDept="addDepts" />
    </el-tree>
    <add-dept :dialog-visible.sync="dialogVisible" :tree-node="currentNode" />
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
      currentNode: {}
    }
  },
  mounted() {
    this.getDepartments()
  },
  methods: {
    async  getDepartments() {
      const { depts, companyName, companyManage } = await getDepartmentsAPI()
      this.data = tranListToTreeData(depts, '')
      this.company = { name: companyName, manager: companyManage, id: '' }
    },
    addDepts(node) {
      this.dialogVisible = true
      this.currentNode = node
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
