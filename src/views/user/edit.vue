<template>
  <div class="app-container">
    <div class="i-operation">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="9" :xs="24" :sm="20" :md="16" :lg="9" :xl="8">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="登录名称:" prop="loginName">
              <el-input v-model="ruleForm.loginName" :disabled="true" />
            </el-form-item>
            <el-form-item label="姓名:" prop="userName">
              <el-input v-model="ruleForm.userName" />
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="角色:" prop="roleId">
              <el-select v-model="ruleForm.roleId" placeholder="请选择角色" style="width: 100%" multiple filterable>
                <el-option v-for="item in roledata" :key="item.id" :label="item.roleName" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="性别:" prop="sex">
              <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
              <el-radio v-model="ruleForm.sex" label="0">女</el-radio>
            </el-form-item>
            <el-form-item label="出生日期:" required prop="age">
              <el-input-number v-model="ruleForm.age" :min="1" :max="100" label="年龄" />
            </el-form-item>
            <el-form-item label="手机号:" prop="Phone">
              <el-input v-model="ruleForm.Phone" />
            </el-form-item>

            <el-form-item label="是否启用:">
              <el-select v-model="ruleForm.isDeleted" placeholder="请选择活动区域">
                <el-option label="启用" value="false"></el-option>
                <el-option label="禁用" value='true'></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
              <el-button type="danger" @click="$router.push({ path: '/user/user/index' })">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>>

<script>
  import {
    GetRoleList
  } from '@/api/role'
  import {
    GetUser,
    Edit
  } from '@/api/user'

  export default {
    data() {
      return {
        roledata: [],
        ruleForm: {
          id: 0,
          loginName: '',
          password: '',
          userName: '',
          sex: '1',
          age: 18,
          phone: '',
          isDeleted: 'false',
          roleId: []
        },
        rules: {
          roleId: [{
            required: true,
            message: '请选择角色',
            trigger: 'change',
            type: 'array'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          loginName: [{
              required: true,
              message: '请输入登录名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 14,
              message: '长度在 3 到 14 个字符',
              trigger: 'blur'
            }
          ],
          userName: [{
              required: true,
              message: '请输入名字',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 14,
              message: '长度在 3 到 14 个字符',
              trigger: 'blur'
            }
          ],
          age: [{
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }]
        }
      }
    },
    created() {
      this.GetRoleList()
      var id = this.$route.query.id
      this.GetUser(id)
    },
    methods: {
      GetUser(id) {
        GetUser({
            id: id
          })
          .then((res) => {
              res.data.sex = String(res.data.sex);
             res.data.isDeleted = String(res.data.isDeleted);
            this.ruleForm = Object.assign({}, res.data)
          })
          .catch(() => {})
      },
      GetRoleList() {
        GetRoleList()
          .then((res) => {
            this.roledata = res.data
          })
          .catch(() => {})
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var data = Object.assign(this.ruleForm)
            data.sex = Number(data.sex)
            data.isDeleted = data.isDeleted === "false" ? false : true;
            Edit(data)
              .then((res) => {
                if (res.state === 10001) {
                  this.$router.push({
                    path: '/user/user/index'
                  })
                } else {
                  this.$message.error(res.msg);
                }

              })
              .catch(() => {
                this.$message.error("操作失败");
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
<style scoped>
</style>>
