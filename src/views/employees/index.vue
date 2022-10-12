<template>
  <div v-loading="loading" class="app-container">
    <PageTools>
      <template #before>
        <span>共166条记录</span>
      </template>
      <template #after>
        <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
        <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
        <el-button size="small" type="primary" @click="handleEmploy">新增员工</el-button>
      </template>
    </PageTools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table :data="list" border>
        <el-table-column label="序号" sortable width="80" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column
          label="聘用形式"
          prop="formOfEmployment"
          :formatter="formatterFn"
        >
          <!-- {{ formOfEmployment? '正式' : '非正式' }} -->
          <!-- <template slot-scope="scope">
            {{ scope.row.formOfEmployment? '正式' : '非正式' }}
          </template> -->
        </el-table-column>
        <el-table-column
          label="
          部门"
          prop="departmentName"
        />
        <el-table-column label="入职时间" sortable prop="timeOfEntry">
          <template slot-scope="{row}">
            {{ row.timeOfEntry| formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态">
          <template slot-scope="{ row }">
            <!-- 根据当前状态来确定 是否打开开关 -->
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          layout="prev, pager, next ,sizes,total"
          :total="total"
          :current-page.sync="page.page"
          :page-size.sync="page.size"
          :page-sizes="[2,5,10]"
          @current-change="getEmployeeList"
          @size-change="getEmployeeList"
        />
      </el-row>
    </el-card>
    <addEmployee :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EnumHireType from '@/api/constant/employees'
import addEmployee from '@/views/employees/components/add-employee'
export default {
  components: {
    addEmployee
  },
  data() {
    return {
      page: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      loading: false,
      hireType: EnumHireType.hireType,
      dialogVisible: false
    }
  },
  mounted() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      try {
        this.loading = true
        const { rows, total } = await getEmployeeList(this.page)
        this.list = rows
        this.total = total

        // total大于0 并且  rows的length === 0  page-1  重新发起请求
        if (total > 0 && rows.length === 0) {
          this.page.page--
          this.getEmployeeList()
        }
      } finally {
        this.loading = false
      }
    },
    formatterFn(row, column, cellValue) {
      // const res = this.hireType.find(ele => {
      //   if (cellValue) {
      //     return +ele.id === cellValue
      //   } else {
      //     return '非正式'
      //   }
      // })
      // return res.value
      const res = this.hireType.find(ele => ele.id === cellValue)
      return res && res.value || this.hireType[1].value
    },
    handleEmploy() {
      //  点击的时候  需要弹出新增员工的弹窗
      this.dialogVisible = true
    },
    // 二次确定
    async del(id) {
      try {
        await this.$confirm('确认删除该员工吗？', '删除员工', {
          type: 'warning'
        })
        await delEmployee(id)
        this.$message.success('删除成功!')
        this.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    },
    async exportExcel() {
      // 懒加载  文件加载成功   在await 中也能拿到成功的结果
      // import('@/vendor/Export2Excel').then((res) => {
      //   console.log(res)
      // })
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployeeList({
        page: 1,
        size: this.total
      })
      const exportExcelMapPath = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map(item => {
        return header.map(h => {
          if (h === '聘用形式') {
            const find = this.hireType.find(hire => hire.id === item[exportExcelMapPath[h]])
            return find ? find.value : '未知'
          }
          return item[exportExcelMapPath[h]]
        })
      })
      export_json_to_excel({
        header, // 表头 必填
        multiHeader: [['手机号', '核心信息', '', '', '', '其他信息', '']],
        merges: ['A1:A2', 'B1:E1', 'F1:G1'],
        // data里面的二维数组,每一个数组是一行的数据
        data, // 具体数据 必填
        // 导出的文件名字
        filename: '员工列表', // 非必填
        //  单元格是否要自适应宽度
        autoWidth: true, // 非必填
        //  导出文件类型
        bookType: 'xlsx' // 非必填
      })
    }
  }

}
</script>
