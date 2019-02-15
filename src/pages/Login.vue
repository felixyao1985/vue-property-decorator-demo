<template>
  <div class="login">
    <div v-title>后台管理登录</div>
    <div class="wrapper">
      <div class="page-title">
        <img src="../../static/img/logo.png" alt="">
        <p>爱照护后台管理系统欢迎您，请登录!</p>
      </div>
      <el-card class="login-box">
        <el-form ref="form" :model="form">
          <el-form-item prop="username"
                        :rules="[{ required: true, message: '请输入账号', trigger: 'change' }]">
            <el-input v-model="form.username" placeholder="请输入账号" @keyup.enter.native="login"></el-input>
          </el-form-item>
          <el-form-item prop="password"
                        :rules="[{ required: true, message: '请输入密码', trigger: 'change' }]">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="vcode"
                        :rules="[{ required: true, message: '请输入图形验证码', trigger: 'change' }]">
            <div class="code-box">
              <el-input placeholder="请输入图形验证码" v-model="form.vcode" @keyup.enter.native="login"></el-input>
              <div class="img">
                <img :src="imgCode" alt="" @click="getCode">
              </div>
            </div>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="login">登录</el-button>
      </el-card>
    </div>
  </div>
</template>
<script>
  import {getImgCode, login, getPermissions} from '@/store/api/loginAdmin'
  export default{
    name: 'login',
    data(){
      return {
        imgCode: '', //图片验证码
        form: {
          username: '',
          password: '',
          vcode: '',
          vtoken: '',

        },
      }
    },
    created(){
      this.getCode()
    },
    methods: {
      //获取图片验证码
      async getCode(){
        let {baseStr, token} = await getImgCode();
        this.imgCode = baseStr;
        this.form.vtoken = token;
      },
      //登录
      login(){
        this.$refs.form.validate(valid => {
          if (valid) {
            login({...this.form}).then(res => {
              this.$store.commit('SET_USERINFO', res)
              this.$message.success('登录成功');
              //获取用户权限
              getPermissions().then(res => {
                this.$router.replace('/home/home');
                setTimeout(()=>{
                  window.location.reload();
                },300)

              })
            }).catch(res => {
              this.$message.error(res)
            })
          }
        })

      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../common/css/mixins";

  .login {
    width: 100%;
    height: calc(100vh);
    position: relative;
    background: #fff;
    background: url("../../static/img/login-bg.jpg") center no-repeat;
    background-size: cover;
  }

  .wrapper {
    @include middle;
  }

  .page-title {
    padding-top: 30px;
    text-align: center;
    width: 1200px;
    margin: 0 auto 40px;
    font-size: 30px;
    color: #fff;
    p {
      text-indent: 0;
      padding: 0;
      margin: 0;
    }
    img {
      margin-bottom: 10px;
    }
  }

  .login-box {
    padding: 30px 10px 20px;
    width: 400px;
    margin: 0 auto;
    .el-input {
      box-sizing: border-box;
      font-size: 16px;
    }
    button {
      margin-top: 40px;
      width: 100%;
      display: block;
      font-size: 16px;
    }
  }

  .code-box {
    display: flex;
    flex-direction: row;
    .el-input {
      flex: 1;
    }
    .img {
      width: 160px;
      img {
        width: 100%;
        vertical-align: top;
        cursor: pointer;
      }
    }
  }

</style>
