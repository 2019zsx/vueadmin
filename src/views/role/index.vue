<template>
  <div class="app-container">
    <el-row :gutter="24">
      <!--头部-->
      <el-col :span="24">
        <div class="i-operation">
          <!--操作-->
          <el-row :gutter="24">
            <el-col :span="2" :xs="6" :sm="4" :md="2" :lg="2" :xl="1">
              <!--添加-->
              <el-button
                type="primary"
                icon="fa i-fa fa-plus-circle"
                @click="onCreate"
              >添加</el-button>
            </el-col>
            <el-col :span="6" :xs="18" :sm="10" :md="8" :lg="6" :xl="3">
              <!--搜索-->
              <el-input v-model="search" placeholder="请输入登录名称或姓名">
                <el-button slot="append" icon="el-icon-search" size="medium" />
              </el-input>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="i-table">
          <el-table
            style="width:100%"
            :row-style="{ height: '20px' }"
            :data="tableData"
            :border="true"
            height="68vh"
          >
            <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="100" />
            <el-table-column
              align="center"
              prop="roleName"
              label="角色名称"
              width="300"
            />
            <el-table-column
              align="center"
              prop="isDeleted"
              label="状态"
              width="300"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.isDeleted==true?'info':'success'"
                  disable-transitions
                >
                  {{ scope.row.isDeleted==true?'禁用':'启用' }}
                </el-tag>
              </template>
            </el-table-column>
             <el-table-column
              align="center"
              prop="describe"
              label="描述"
              width="300"
            />
             <el-table-column
              align="center"
              prop="createTime"
              label="创建时间"
              width="300"
            />
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="150"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  title="修改"
                  plain
                  icon="fa fa-pencil"
                  circle
                  @click="onEdit(scope.row.id)"
                />
                <el-button
                  size="small"
                  title="删除"
                  type="danger"
                  plain
                  circle
                  icon="el-icon-delete"
                  @click="onDel(scope.row.id)"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="i-page">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 30, 40]"
            :total="page.dataCount"
            :current-page="page.currentPage"
            :page-size="page.pagesize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { pageparameter } from '@/common/pageparameter.js'
import { GetRolePage ,Del} from '@/api/role'
import filters from '@/filters'

export default {
  data() {
    return {
      search: '',
      isdialog: true,
      tableData: [], // 表格数据
      loading: true,
      page: pageparameter // 分页数据
    }
  },
  created() {
    this.GetRolePage()
  },
  methods: {
   onDel(id) {
     this.$confirm('删除该数据, 是否继续?', '提示', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       type: 'warning'
     }).then(() => {
       Del({
         id: id
       }).then((res) => {
         this.GetRolePage();
   
       }).catch((res) => {});
     }).catch(() => {
       this.$message({
         type: 'info',
         message: '已取消删除'
       });
     });
   
   },
    onEdit(id) {
      this.$router.push({ path: '/user/role/edit', query: { id: id }})
    },
    roleName(roleNamearr) {
      return roleNamearr.split(',')
    },
    handleSizeChange(val) {
      // 条数修改
      this.page.pagesize = val
      this.GetRolePage()
    },
    handleCurrentChange(val) {
      // 页数修改
      this.page.currentPage = val
      this.GetRolePage()
    },
    GetRolePage() {
      GetRolePage({
        PageIndex: this.page.currentPage,
        PageSize: this.page.pagesize,
        search: this.search
      })
        .then((res) => {
          this.tableData = res.data
          this.page.dataCount = res.count
        })
        .catch(() => {})
    },
    onCreate() {
      this.$router.push('/user/role/create')
      // this.isdialog = true;
    }
  }
}
</script>

<style scoped>
</style>

