<script>
import { useClipboard } from '@vueuse/core'
import { Notification } from 'element-ui'
import { debounce, throttle } from 'lodash'
import SubmitArticleDlg from '@/components/dlg/SubmitArticleDlg.vue'
import { uploadFileApi } from '@/apis/upload'
export default {
  components: {
    SubmitArticleDlg,
  },
  data() {
    const uploadImgConfig = { accept: '*', multiple: false }
    const toolbarConfig = {
      'image-link': {
        insertWithSize: true,
      },
    }
    const toolbar = {
      sumbitArticle: {
        title: '发布文章',
        icon: 'el-icon-success',
        _this: this,
        action(editor) {
          editor.$nextTick(async () => {
            const { _this } = this
            _this.submitArticle()
          })
        },
      },
      insertFileTool: {
        title: '文件上传',
        icon: 'el-icon-folder',
        menus: [
          {
            name: '图片链接',
            text: '图片链接',
            action(editor) {
              editor.insert((selected) => {
                const prefix = '![这是图片]'
                const suffix = '{{{width="auto" height="auto"}}}'
                const placeholder = '(http://)'
                const content = selected || placeholder
                return {
                  text: `${prefix}${content}${suffix}`,
                  selected: content,
                }
              })
            },
          },
          {
            name: '备注链接',
            text: '备注链接',
            action(editor) {
              editor.insert((selected) => {
                const prefix = '['
                const suffix = '](链接地址)'
                const placeholder = '链接备注'
                const content = selected || placeholder
                return {
                  text: `${prefix}${content}${suffix}`,
                  selected: content,
                }
              })
            },
          },
          {
            name: '上传文件',
            text: '上传文件',
            _this: this,
            action(editor) {
              editor.$nextTick(async () => {
                const { _this } = this
                const event = await editor.$refs.uploadFile.upload()
                _this.handleFileUpload(event.target.files[0])
              })
            },
          },
        ],
      },
    }
    return {
      toolbar,
      files: [],
      content: '',
      toolbarConfig,
      uploadImgConfig,
    }
  },
  watch: {
    content: debounce((newValue) => {
      if (newValue)
        localStorage.setItem('content', newValue)
    }, 3000),
  },
  mounted() {
    const content = localStorage.getItem('content')
    if (content)
      this.content = localStorage.getItem('content')
  },
  methods: {
    handleFullscreenChange(type) {
      if (type)
        this.$message.success('进入全屏模式')
    },
    /**
       * 上传文件
       */
    async handleFileUpload(file) {
      if (file instanceof File) {
        const formData = new FormData()
        formData.append('file', file)
        const { data, code } = await uploadFileApi(formData)
        if (code === 200) {
          const imgRegex = /^.*\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|bmp|BMP)$/
          let isImg = ''
          if (imgRegex.test(data.name)) {
            isImg = '!'
          }
          else {
            this.$refs.editorRef.text = this.$refs.editorRef.text.concat(
                `${isImg}[${data.name}](${encodeURI(data.url)})`,
            )
          }
        }
      }
    },
    handleCopyCodeSuccess(code) {
      const { copy } = useClipboard()
      copy(code)
      Notification.success({
        message: '复制成功',
        description: '代码已复制',
        duration: 1000,
      })
    },
    saveData() {
      localStorage.setItem('content', this.content)
      this.$notify({
        title: '提示',
        message: '内容已保存',
        type: 'success',
      })
    },
    savecontent: throttle(function () {
      this.saveData()
    }, 5000),
    /**
       * 发布文章
       */
    submitArticle() {
      this.$refs.submitArticleRef.showDlg(this.content)
    },
  },
}
</script>

<template>
  <div style="height: 99%; border: 2px solid #909399; border-radius: 1rem" @keydown.ctrl.s.prevent="savecontent">
    <v-md-editor
      ref="editorRef" v-model="content" left-toolbar="table|insertFileTool|sumbitArticle|emoji|undo redo "
      :toolbar="toolbar" :toolbar-config="toolbarConfig" height="100%" :disabled-menus="[]" :include-level="[1, 2, 3]"
      :upload-image-config="uploadImgConfig" @copy-code-success="handleCopyCodeSuccess"
      @fullscreen-change="handleFullscreenChange"
    />
    <SubmitArticleDlg ref="submitArticleRef" />
  </div>
</template>

  <style scoped></style>
