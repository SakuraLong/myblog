<template>
  <div class="manage-editor-controller">
    <div main>
      <router-link
        to="/manage/home"
        class="link"
        style="margin: 0px 10px;"
      >返回</router-link>
      <el-button
        size="small"
        @click="detailDialogVisible = true"
      >详细信息</el-button>
      <el-button
        size="small"
        @click="imageDialogVisible = true"
      >图片管理</el-button>
      <el-button
        size="small"
        @click="savePost"
      >文章保存</el-button>
      <el-button
        size="small"
        @click="publishPost"
      >文章发布</el-button>
    </div>
    <div slider>
      <el-slider
        v-model="width_"
        size="small"
      />
    </div>
    <el-dialog
      v-model="detailDialogVisible"
      title="详细信息"
      width="60%"
    >
      <div class="mec-dialog__main">
        <div>
          <span>title</span>
          <el-input
            v-model="detailData.title"
            placeholder="请输入title"
          />
        </div>
        <div>
          <span>titlePinyin</span>
          <el-input
            v-model="detailData.titlePinyin"
            placeholder="请输入titlePinyin"
          />
        </div>
        <div>
          <span>author</span>
          <el-input
            v-model="detailData.author"
            placeholder="请输入author"
          />
        </div>
        <div>
          <span>tags</span>
          <el-input
            v-model="detailData.tags"
            placeholder="请输入tags"
          />
        </div>
        <div>
          <span>categories</span>
          <el-input
            v-model="detailData.categories"
            placeholder="请输入categories"
          />
        </div>
        <div>
          <span>abstract</span>
          <el-input
            v-model="detailData.abstract"
            placeholder="请输入abstract"
            :rows="2"
            type="textarea"
          />
        </div>
        <div>
          <span>分类介绍</span>
          <br>
          <el-switch
            v-model="detailData.categoriesIntroduction"
            active-text="是"
            inactive-text="否"
          />
        </div>
      </div>
      <template #footer>
        <div>
          <el-button @click="detailDialogVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="detailDialogChange"
          >
            修改
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="imageDialogVisible"
      title="图片管理"
      width="60%"
    >
      <imagesManager :id-en="idEn" />
      <template #footer>
        <div>
          <el-button
            type="primary"
            @click="imageDialogVisible =false"
          >
            关闭
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import BlogManager from '@/assets/js/BlogManager'
import { detailDataSave, publish } from '@/api/blogManage'
import { deepClone, message, convertKeysToSnakeCase } from '@/utils/utils'
import imagesManager from './imagesManager.vue'
export default {
  components: {
    imagesManager
  },
  props: {
    width: {
      default: 50,
      type: Number
    }
  },
  data() {
    return {
      id: 0,
      detailDialogVisible: false,
      detailData: {
        title: '',
        titlePinyin: '',
        author: '',
        abstract: '',
        tags: '',
        categories: '',
        categoriesIntroduction: false
      },
      imageDialogVisible: false,
      imagesUrl: [],
      type: this.$route.params.pathMatch[0],
      idEn: this.$route.params.pathMatch[1]
    }
  },
  computed: {
    width_: {
      get() {
        return this.width
      },
      set(val) {
        this.$emit('update:width', val)
      }
    }
  },
  mounted() {
    const bm = new BlogManager()
    const post_ = this.type === 'draft' ? bm.sm.dm.getPostByIdEnSync(this.idEn) : bm.sm.pm.getPostByIdEnSync(this.idEn)
    const post = post_.post
    this.id = post.id
    this.detailData.title = post.title
    this.detailData.titlePinyin = post.titlePinyin
    this.detailData.author = post.author
    this.detailData.abstract = post.abstract
    this.detailData.tags = post.tags.join('/')
    this.detailData.categories = post.categories.join('/')
    this.detailData.categoriesIntroduction = post.categoriesIntroduction
    // console.log(post)
  },
  methods: {
    detailDialogChange() {
      const detailData = convertKeysToSnakeCase(deepClone(this.detailData))
      detailData.tags = detailData.tags.split('/')
      detailData.categories = detailData.categories.split('/')
      detailDataSave({
        id: this.id,
        post: detailData
      }).then((res) => {
        message('修改成功', 'success')
        this.detailDialogVisible = false
      }).catch((err) => {
        console.error(err)
        message('修改失败')
      })
    },
    savePost() {
      this.$emit('savePost')
    },
    publishPost() {
      publish(this.id).then((res) => {
        message('发布成功', 'success')
      }).catch((err) => {
        message('发布失败: ' + err)
      })
    }
  }
}
</script>

<style>
.manage-editor-controller {
  position: sticky;
  top: 60px;
  z-index: 500;
  background-color: var(--bl-color-lighter-fill);
}
.manage-editor-controller > div[main],
.manage-editor-controller > div[silder] {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}
.manage-editor-controller > div[main] {
  height: 20px;
}
.manage-editor-controller > div[silder] {
  height: 30px;
}

.mec-dialog__main  > div {
  margin-bottom: 10px;
}
</style>
