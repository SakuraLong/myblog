<template>
  <div>
    <div>
      <el-button @click="$refs.input.click()">上传图片</el-button>
      <input
        ref="input"
        type="file"
        accept="image/*"
        placeholder="选择图片"
        hidden
        multiple
        @change="changeImg"
      >
    </div>
    <div>
      <div
        v-for="image, i in imagesList"
        :key="image[1]"
      >
        <img
          :src="image[0]"
          alt=""
          draggable="false"
          width="200"
        >
        <span style="margin: 0px 10px;">{{ image[1] }}</span>
        <el-button @click="renameImage(i)">重命名</el-button>
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      :append-to-body="true"
      title="图片重命名"
      width="40%"
    >
      <div>
        <div>
          <span>old name</span>
          <el-input
            v-model="oldName"
            :readonly="true"
          />
        </div>
        <div>
          <span>new name</span>
          <el-input
            v-model="newName"
          />
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="renameImageConfirm"
          >
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import BlogManager from '@/BlogManager'
import { message } from '@/utils/utils'
export default {
  props: {
    idEn: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      imagesList: [],
      oldName: '',
      newName: '',
      selected: -1,
      dialogVisible: false
    }
  },
  mounted() {
    const bm = new BlogManager()
    bm.sm.im.getImageUrls(this.idEn).then((urls) => {
      this.imagesList = urls
    })
  },
  methods: {
    changeImg(e) {
      const files = e.target.files
      const bm = new BlogManager()
      bm.sm.im.uploadImages(files, this.idEn).then(() => {
        bm.sm.im.getImageUrls(this.idEn, true).then((urls) => {
          this.imagesList = urls
        })
      })
    },
    renameImage(i) {
      this.selected = i
      const p = this.imagesList[i][1].lastIndexOf('.')
      this.oldName = this.imagesList[i][1].slice(0, p)
      this.newName = ''
      this.dialogVisible = true
    },
    renameImageConfirm() {
      const oldName = this.imagesList[this.selected][1]
      const newName = this.newName + '.' + this.imagesList[this.selected][2]
      console.log(oldName, newName)
      const bm = new BlogManager()
      bm.sm.im.renameImage(oldName, newName, this.idEn).then(() => {
        bm.sm.im.getImageUrls(this.idEn, true).then((urls) => {
          this.imagesList = urls
        })
        this.dialogVisible = false
      }).catch((err) => {
        message(err)
      })
    }
  }
}
</script>

<style>

</style>
