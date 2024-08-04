# myblog

个人博客项目前端

博客访问地址: [SakuraLong Blog](https://www.sakuralong.com)

#### backend

详见: [backend](https://github.com/SakuraLong/backend)

#### 密码

运行项目需要在 `根目录/src/assets/js/BlogManager`下新增 `password.js`文件，文件格式如下：

```javascript
const RSA_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----`

const AES_KEY = '需要与后端AES_KEY相同'

const AES_TOKEN_KEY = '自定义'

const USER_NAME = process.env.VUE_APP_USER_NAME === 'true' ? 'username' : ''

const PASSWORD = process.env.VUE_APP_PASSWORD === 'true' ? 'password' : ''

export default {
  RSA_PUBLIC_KEY,
  AES_KEY,
  AES_TOKEN_KEY,
  USER_NAME,
  PASSWORD
}

```

## 关于博客
### 功能
1. 分页
2. 归档
    1. 时间
    2. 字数
    3. 中文首字母
    4. 英文首字母
3. 分类
4. 标签
5. 检索
6. 菜单
    1. 关于
    2. 项目
    3. 友链
    4. 设置 (todo)
7. 文章显示 (插件详见[MdRenderer](https://github.com/SakuraLong/myblog/tree/master/src/components/MdRenderer))
8. 长按Tab后移动鼠标快速切换页面
9. 主题与语言切换
10. Live2D模型与配套信息提示 (v1.1.0)

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
