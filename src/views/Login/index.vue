<template>
  <div class="login">
    <div>
      <h1>登录</h1>
      <div>
        <h3>用户名</h3>
        <div>
          <el-input
            v-model="username"
            size="large"
            class="login-input"
            placeholder="请输入用户名"
            type="username"
          />
        </div>
        <h3>密码</h3>
        <div>
          <el-input
            v-model="password"
            size="large"
            class="login-input"
            type="password"
            placeholder="Please input password"
            show-password
          />
        </div>
        <h3>操作</h3>
        <div>
          <el-button
            type="primary"
            @click="login"
          >登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { message, throttle } from '@/utils/utils'
import router from '@/router'
import routes from './routes'
import { login } from '@/api/login'
import code from '@/utils/code'
import { setToken } from '@/utils/auth'
import BlogManager from '@/assets/js/BlogManager'
export default {
  data() {
    return {
      username: BlogManager.password.USER_NAME,
      password: BlogManager.password.PASSWORD
    }
  },
  methods: {
    login() {
      if (!this.username || !this.password) {
        message('请填写用户名和密码')
        return
      }
      const username = code.Base64.encode(code.CryptoJS.encrypt(this.username))
      const password = code.RSA.encrypt(code.MD5.encrypt(this.password))
      login({
        username,
        password
      }).then((res) => {
        setToken(res.token)
        message('登录成功', 'success')
        if (!router.hasRoute('manage')) {
          router.addRoute(routes)
        }
        router.push('/manage/home')
      }).catch((err) => {
        console.error(err)
        message(err)
      })
    }
  }
}
</script>

<style>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login > div > h1 {
  margin-block-start: 0;
}
.login > div {
  color: var(--bl-color-primary-text);
  border: 1px solid var(--bl-color-base-border);
  background-color: var(--bl-color-lighter-fill);
  padding: 30px;
  border-radius: 10px;
  max-width: 500px;
}
.login-input {
  /* max-width: 300px; */
}
</style>
