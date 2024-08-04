<template>
  <div class="manage-h-c">
    <div
      button
      @click="modifyDialogVisible = true"
    >
      修改文章
    </div>
    <div
      button
      @click="draftDialogVisible = true"
    >
      加载草稿
    </div>
    <div
      button
      @click="newDialogVisible = true"
    >
      新建草稿
    </div>
    <router-link
      class="link"
      to="/manage/categories"
      button
    >
      管理文章
    </router-link>
    <el-dialog
      v-model="modifyDialogVisible"
      title="选择要修改的文章"
    >
      <el-select
        v-model="selctedModifyPostId"
        placeholder="选择文章"
        style="width: 240px"
      >
        <el-option
          v-for="item in modifyPosts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="modifyDialogVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="modifyDialogConfirm"
          >
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="draftDialogVisible"
      title="选择要修改的草稿"
    >
      <el-select
        v-model="selctedDraftPostId"
        placeholder="选择草稿"
        style="width: 240px"
      >
        <el-option
          v-for="item in draftPosts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="draftDialogVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="draftDialogConfirm"
          >
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="newDialogVisible"
      title="创建新的文章"
    >
      <div class="mhc-nd__main">
        <div>
          <span>title</span>
          <el-input
            v-model="newPostData.title"
            placeholder="请输入title"
          />
        </div>
        <div>
          <span>idEn</span>
          <el-input
            v-model="newPostData.idEn"
            placeholder="请输入idEn"
          />
        </div>
        <div>
          <span>titlePinyin</span>
          <el-input
            v-model="newPostData.titlePinyin"
            placeholder="请输入titlePinyin"
          />
        </div>
        <div>
          <span>author</span>
          <el-input
            v-model="newPostData.author"
            placeholder="请输入author"
          />
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="newDialogVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="newDialogConfirm"
          >
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import BlogManager from '@/assets/js/BlogManager'
import { message } from '@/utils/utils'
import router from '@/router'
export default {
  data() {
    return {
      modifyDialogVisible: false,
      selctedModifyPostId: null,
      modifyPosts: new BlogManager().sm.pm.getPostsList().map((post) => {
        return {
          value: post.id,
          label: post.title
        }
      }),
      draftDialogVisible: false,
      selctedDraftPostId: null,
      draftPosts: new BlogManager().sm.dm.getPostsList().map((post) => {
        return {
          value: post.id,
          label: post.title
        }
      }),
      newDialogVisible: false,
      newPostData: {
        title: '',
        idEn: '',
        titlePinyin: '',
        author: 'Sakura'
      }
    }
  },
  methods: {
    newDialogConfirm() {
      const bm = new BlogManager()
      const res = bm.sm.dm.create(this.newPostData)
      if (res === 0) message('所有参数都需要填写')
      else if (res === 1) message('idEn重复')
      else {
        res.then((res) => {
          const idEn = bm.sm.idMap.get(res.id)
          message('新建草稿成功', 'success')
          router.push('/manage/editor/draft/' + idEn)
        }).catch((err) => {
          message('新建草稿失败: ' + err)
        })
      }
    },
    modifyDialogConfirm() {
      if (!this.selctedModifyPostId) {
        message('请选择文章')
        return
      }
      this.modifyDialogVisible = false
      const idEn = new BlogManager().sm.idMap.get(this.selctedModifyPostId)
      router.push('/manage/editor/post/' + idEn)
    },
    draftDialogConfirm() {
      if (!this.selctedDraftPostId) {
        message('请选择草稿')
        return
      }
      this.draftDialogVisible = false
      const idEn = new BlogManager().sm.idMap.get(this.selctedDraftPostId)
      router.push('/manage/editor/draft/' + idEn)
    }
  }
}
</script>

<style>
.manage-h-c {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  color: var(--bl-color-primary-text);
}
.manage-h-c > div[button],
.manage-h-c > a[button] {
  padding: 30px;
  font-size: 24px;
  margin: 10px;
  border: 1px solid var(--bl-color-base-border);
  border-radius: 5px;
  cursor: pointer;
}

.mhc-nd__main > div {
  margin-bottom: 10px;
}
</style>
