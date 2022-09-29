<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-row>
            <el-button
              type="primary"
              style="margin-left: 10px;"
              size="small"
              icon="el-icon-plus"
              @click="dialogVisible=true"
            >新增角色</el-button>
          </el-row>
          <!-- 表格 -->
          <template>
            <el-table
              v-loading="loading"
              style="width: 100%"
              :data="roleList"
            >
              <el-table-column
                label="序号"
                width="120"
                type="index"
              />
              <el-table-column
                prop="name"
                label="角色名称"
                width="240"
              />
              <el-table-column
                prop="description"
                label="描述"
              />
              <el-table-column
                label="操作"
                width="240"
              >
                <template slot-scope="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="end" align="middle" style="height: 60px;">
              <el-pagination
                v-if="total>0"
                background
                layout="prev, pager, next,sizes"
                :page-sizes="[1,2,3,4,5,6,10]"
                :total="total"
                :current-page.sync="page.page"
                :page-size.sync="page.pagesize"
                @current-change="getRoleList"
                @size-change="getRoleList"
              />
            </el-row>
          </template>

        </el-tab-pane>

        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form :model="companyInfo" label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <addRole ref="addRole" :dialog-visible.sync="dialogVisible" @refreshList="getRoleList" />
  </div>
</template>

<script>
import { getRoleListAPI, delRoleAPI, getCompanyInfoAPI } from '@/api/setting'
import { mapGetters } from 'vuex'
import addRole from '@/views/setting/components/addRole'
export default {
  name: 'Setting',
  components: {
    addRole
  },
  data() {
    return {
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 1
      },
      roleList: [],
      total: 0,
      loading: false,
      dialogVisible: false,
      companyInfo: {}
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  mounted() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  // 获取数据
  methods: {
    async  getRoleList() {
      try {
        this.loading = true
        const { rows, total } = await getRoleListAPI(this.page)
        this.roleList = rows
        this.total = total

        // total大于0 并且  rows的length === 0  page-1  重新发起请求
        if (total > 0 && rows.length === 0) {
          this.page.page--
          this.getRoleList()
        }
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },
    // 编辑
    editRole(row) {
      // console.log(row)
      // console.log(this.$refs.addRole)
      //  数据引用类型带来的问题
      // 数据类型比较简单  直接浅拷贝   数据类型比较复杂  直接深拷贝  JSON.parse(JSON.stringify(row))
      this.$refs.addRole.formData = { ...row }
      this.dialogVisible = true
    },
    //  删除
    async delRole(id) {
      try {
        await this.$confirm('确定删除该角色吗?', '删除角色', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delRoleAPI(id)
        this.$message.success('删除成功')
        // 刷新类型
        this.getRoleList()
      } catch (cancel) {
        console.log('cancel')
      }
    },
    // 获取公司信息接口
    async  getCompanyInfo() {
      this.companyInfo = await getCompanyInfoAPI(this.companyId)
    }

  }

}
</script>

<style>

</style>
