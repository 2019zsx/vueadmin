<template>
  <div class="app-container">
    <div class="i-operation">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="9" :xs="24" :sm="20" :md="16" :lg="9" :xl="8">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="角色名称:" prop="roleName">
              <el-input v-model="ruleForm.roleName" />
            </el-form-item>
            <el-form-item label="描述:">
              <el-input type="textarea" v-model="ruleForm.describe"></el-input>
            </el-form-item>
            <el-form-item label="是否启用:">
              <el-select v-model="ruleForm.isDeleted" placeholder="请选择活动区域">
                <el-option label="启用" value="true"></el-option>
                <el-option label="禁用" value='false'></el-option>
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
    Create
  } from '@/api/role'
  export default {
    data() {
      return {
        roledata: [],
        ruleForm: {
          roleName: '',
          describe: '',
          isDeleted: 'false'
        },
        rules: {
          roleName: [{
              required: true,
              message: '请输入角色名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 14,
              message: '长度在 2 到 10 个字符',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    created() {
      this.GetRoleList()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var data = Object.assign(this.ruleForm)
            data.isDeleted = Boolean(data.isDeleted)
            Create(data)
              .then((res) => {
                if (res.state === 10001) {
                  this.$router.push({
                    path: '/user/role/index'
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
