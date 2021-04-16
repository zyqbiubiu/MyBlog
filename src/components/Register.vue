<template>
  <div class="register_container">
    <div class="register_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 注册表单区域 -->
      <el-form ref="RegisterFormRef" :model="RegisterForm" :rules="RegisterFormRules" label-width="0px" class="register_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="RegisterForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="RegisterForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!-- 确认密码区域 -->
        <el-form-item prop="repassword">
          <el-input v-model="RegisterForm.repassword" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="Rebtns">
          <!-- <el-button @click="LoginRoute">跳转到登录页面</el-button> -->
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="info" @click="resetRegForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var validateRepass = (rule, value) => {
      if (value !== this.RegisterForm.password) {
        this.$message.error('两次输入密码不一致！')
      }
    }
    return {
      // 这是注册表单的数据绑定对象
      RegisterForm: {
        username: '',
        password: '',
        repassword: ''
      },
      // 这是表单的验证规则对象
      RegisterFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入注册名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '用户名不支持特殊字样',
            trigger: 'blur'
          }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入注册密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        // 验证重复密码是否合法
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validate: validateRepass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm)// 用await async来简化该promise操作
        if (res.meta.status !== 200) return this.$message.error('注册失败！')
        this.$message.success('注册成功')
        // 2. 通过编程式导航跳转到登录，路由地址是 /login
        this.$router.push('/login')
      })
    },
    // 点击重置按钮，重置注册表单
    resetLoginForm () {
      // console.log(this);
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style>
.register_container {
  background-color: #22a2a7;
  height: 100%;
}
.register_box {
  width: 450px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.678);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
}
.avatar_box img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
}
.register_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.Rebtns {
  display: flex;
  justify-content: flex-end;
}
</style>
