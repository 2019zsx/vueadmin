<template>
  <div class="bg">
    <div class="login-container">
      <el-form
        ref="loginRules"
        :rules="loginRules"
        label-width="0px"
        :model="loginForm"
        class="login-form"
      >
        <el-form-item>
          <div class="title">
            <!--  -->
            <!-- <i class="fa fa-handshake-o fa-i-handshake" aria-hidden="true"></i> -->
            <svg-icon icon-class="system" class="yytb" />
          </div>
        </el-form-item>
        <el-form-item>
          <div class="title">测试管理系统</div>
        </el-form-item>
        <el-form-item prop="uloginname">
          <el-input
            v-model="loginForm.uloginname"
            prefix-icon="el-icon-user-solid"
            size="small"
            clearable
          />
        </el-form-item>
        <el-form-item prop="updw">
          <el-input
            v-model="loginForm.updw"
            type="password"
            prefix-icon="el-icon-s-cooperation"
            size="small"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%"
            @click="handleLogin('loginRules')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <el-dialog title="" :visible.sync="isshowrole" width="300px" center>
      <el-select
        v-model="roleid"
        placeholder="请选择角色登录"
        style="width: 100%"
      >
        <el-option
          v-for="itme in roledata"
          :key="itme.roleid"
          :label="itme.rolename"
          :value="itme.roleid"
        ></el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isshowrole = false">取 消</el-button>
        <el-button type="primary" @click="systemlogin">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetLoginRole } from "@/api/role";
export default {
  data() {
    return {
      roledata: [],
      roleid: "",
      isshowrole: false,
      loginForm: {
        uloginname: "admin", //登录名称
        updw: "123",
      },
      loginRules: {
        uloginname: [
          { required: true, message: "请输入登录名称", trigger: "blur" }, // 验证登录名称是否为空
          {
            min: 3,
            max: 16,
            message: "登录名称请输入3到8字符",
            trigger: "blur",
          },
        ],
        updw: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "密码请输入3到10字符", trigger: "blur" },
        ],
      },
      loading: false,
    };
  },
  methods: {
    systemlogin() {
      if (this.roleid == "") {
        this.$message({
          message: "请选择角色",
          type: "warning",
        });
        return;
      }
      this.$store
        .dispatch("user/login", {
          uloginname: this.loginForm.uloginname.trim(),
          updw: this.loginForm.updw,
          roleid: Number(this.roleid),
        })
        .then((res) => {
          this.$router.replace("/");
          // this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 获取科室数据
    handleuserType() {
      this.GetDictionaryList();
    },
    handleLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          GetLoginRole(this.loginForm)
            .then((res) => {
              if (res.success) {
                this.roledata = res.data;
                this.loading = false;
                this.isshowrole = true;
              }
            })
            .catch({});
        }
      });
    },
    // 获取角色列表
    GetRoleList() {},
    handledet() {},
    GetDictionaryList() {},
  },
};
</script>

<style scoped="scoped">
.yytb {
  width: 60px;
  height: 60px;
}
.fa-i-handshake {
  color: #1890ff;
  font-size: 70px;
  font-weight: 500;
}
.bg {
  margin: 0px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #2d3a4b;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
}

.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  width: 500px;
  padding: 35px 35px 15px 35px;
  background: rgba(240, 242, 245, 1);
  border: 1px solid #eaeaea;
  /* box-shadow: 0 0 25px #cac6c6; */
  z-index: 1;
  top: 50%;
  left: 50%;
  margin-top: -30vh;
  margin-left: -250px;
  position: relative;
  height: 62vh;
  z-index: 1;
}

.login-container .title {
  margin: 0px auto;
  text-align: center;
  color: #505458;
}
.title {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 20px;
  font-weight: 600;
}
</style>
