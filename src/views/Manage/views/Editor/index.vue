<template>
  <Structure :no-body="true">
    <template #header>
      <Header />
    </template>
    <template #top>
      <div class="manage-editor-container">
        <ManageEditorController
          v-model:width="width"
          @savePost="savePost"
        />
        <div class="manage-editor__editor">
          <div :style="{'--width': width.toString() + '%'}">
            <Codemirror
              v-model="code"
              :style="{ height: '100%',
                        width: '100%',
              }"
              class="manage-editor__codemirror"
              :extensions="extensions"
              :indent-with-tab="true"
              :tab-size="2"
            />
          </div>
          <div :style="{'--width': (100 - width).toString() + '%'}">
            <MdRenderer
              :id-en="idEn"
              :text="code"
            />
            <div style="height: 500px;" />
          </div>
        </div>
      </div>
    </template>
  </Structure>
</template>

<script>
import Structure from '@/components/Structure'
import Header from '@/components/Header'
import { Codemirror } from 'vue-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import MdRenderer from '@/components/MdRenderer'
import ManageEditorController from '@/components/ManageEditorController'
import BlogManager from '@/assets/js/BlogManager'
import { detailDataSave } from '@/api/blogManage'
import { message, convertKeysToSnakeCase } from '@/utils/utils'
export default {
  components: {
    Structure,
    Header,
    Codemirror,
    MdRenderer,
    ManageEditorController
  },
  data() {
    return {
      extensions: [markdown(), oneDark],
      code: '',
      width: 50,
      type: this.$route.params.pathMatch[0],
      idEn: this.$route.params.pathMatch[1],
      post: null,
      id: 0
    }
  },
  mounted() {
    const bm = new BlogManager()
    const post = this.type === 'draft' ? bm.sm.dm.getPostByIdEnSync(this.idEn) : bm.sm.pm.getPostByIdEnSync(this.idEn)
    this.post = post.post
    this.code = this.post.body
    this.id = this.post.id
  },
  methods: {
    themeChange(data) {
      const useMode = data.useMode
    },
    savePost() {
      const post = {
        wordCount: this.code.trim().length,
        body: this.code
      }
      detailDataSave({
        id: this.id,
        post: convertKeysToSnakeCase(post)
      }).then((res) => {
        message('修改成功', 'success')
      }).catch((err) => {
        message('修改失败: ' + err)
      })
    }
  }
}
</script>

<style>
.manage-editor-container {
  width: 100%;
  padding-top: 60px;
}
.manage-editor__editor {
  display: flex;
  /* height: calc(100vh - 50px - 60px); */
  width: 100%;
}
.manage-editor__editor > div {
  width: var(--width);
}
.manage-editor__editor > div:first-child {
  position: sticky;
  top: calc(60px + 50px);
  height: calc(100vh - 50px - 60px);
  overflow: auto;
}
.manage-editor__codemirror > * {
  width: auto;
}
.cm-editor {
  overflow: visible;
}
.manage-editor__codemirror span ,
.manage-editor__codemirror * {
  font-family: 'Consolas' !important;
}
</style>
