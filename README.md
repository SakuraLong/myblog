# blog

个人博客项目前端

#### backend
See [backend](https://github.com/SakuraLong/backend).

#### 密码

运行项目需要在`根目录\src\BlogManager`下新增`password.js`文件，文件格式如下：
```javascript
const RSA_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----`

const AES_KEY = '需要与后端AES_KEY相同'

const AES_TOKEN_KEY = '自定义'

const USER_NAME = '建议留空，此为开发环境输入框补全'

const PASSWORD = '建议留空，此为开发环境输入框补全'

export default {
  RSA_PUBLIC_KEY,
  AES_KEY,
  AES_TOKEN_KEY,
  USER_NAME,
  PASSWORD
}

```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
