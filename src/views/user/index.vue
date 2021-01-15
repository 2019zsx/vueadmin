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
              <el-button type="primary" icon="fa i-fa fa-plus-circle" @click="onCreate">添加</el-button>
            </el-col>
            <el-col :span="6" :xs="18" :sm="10" :md="8" :lg="6" :xl="3">
              <!--搜索-->
              <el-input v-model="search" placeholder="请输入角色名称">
                <el-button slot="append" icon="el-icon-search" size="medium" />
              </el-input>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="i-table">
          <el-table :row-style="{ height: '20px' }" :data="tableData" border height="68vh">
            <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="50" />
            <el-table-column align="center" prop="loginName" label="登录名称" width="120" />
            <el-table-column prop="userName" align="center" label="姓名" width="120" />
            <el-table-column align="center" prop="isDeleted" label="状态" width="300">
              <template slot-scope="scope">
                <el-tag :type="scope.row.isDeleted==true?'info':'success'" disable-transitions>
                  {{ scope.row.isDeleted==true?'禁用':'启用' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="roleName" align="center" label="角色名称" width="300">
              <template slot-scope="scope">
                <el-tag v-for="(item, index) in roleName(scope.row.roleName)" :key="index" type="primary"
                  disable-transitions>
                  {{ item }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="sex" align="center" label="性别" width="120">
              <template slot-scope="scope">
                {{ scope.row.sex === 1 ? "男" : "女" }}
              </template>
            </el-table-column>
            <el-table-column prop="age" align="center" label="年龄" width="120" />
            <el-table-column prop="phone" align="center" label="手机号" width="200" />
            <el-table-column prop="email" align="center" label="邮编" width="160" />

            <el-table-column fixed="right" label="操作" align="center" width="160">
              <template slot-scope="scope">
                <el-button type="primary" size="small" title="修改" plain icon="fa fa-pencil" circle @click="onEdit(scope.row.id)" />
                <el-button size="small" title="删除" type="danger" plain circle icon="el-icon-delete" @click="onDel(scope.row.id)" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="i-page">
          <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30, 40]" :total="page.dataCount"
            :current-page="page.currentPage" :page-size="page.pagesize" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    pageparameter
  } from '@/common/pageparameter.js'
  import {
    Del,
    GetUserPage
  } from '@/api/user'
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
      this.GetUserPage()
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
            this.GetUserPage();

          }).catch((res) => {});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      onEdit(id) {
        this.$router.push({
          path: '/user/user/edit',
          query: {
            id: id
          }
        })
      },
      roleName(roleNamearr) {
        return roleNamearr.split(',')
      },
      handleSizeChange(val) {
        // 条数修改
        this.page.pagesize = val
        this.GetUserPage()
      },
      handleCurrentChange(val) {
        // 页数修改
        this.page.currentPage = val
        this.GetUserPage()
      },
      GetUserPage() {
        GetUserPage({
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
        this.$router.push('/user/user/create')
        // this.isdialog = true;
      },
      onSubmit() {
        this.$message('submit!')
      },
      onCancel() {




      }
    }
  }
</script>

<style scoped>
</style>
