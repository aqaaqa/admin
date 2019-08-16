<template>
  <div class="tinys-box">
    <p class="hint-text">注释：将表格整体粘贴进来，复制下行代码<br>
    <strong style="color:#409EFF;">&lt;table style="border-collapse: collapse; width: 100%;" border="1px #000 solid;"&gt;</strong><br>
    点击“视图”=>“源代码”<br>
    将源代码第一行&lt;table&gt;修改为复制的代码<br>
    将整个源代码内容复制到编辑文本框点击查看表格完成
    </p>
    <Tinymce ref="editor" v-model="content" :height="400" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  data() {
    return {
      content: ''
    }
  },
  components: {
    Tinymce
  }
}
</script>

<style lang="scss" scoped>
.tinys-box {
  width: auto;
  margin: 20px;
  .hint-text {
    line-height: 24px;
    margin-bottom: 20px;
  }
}
</style>
<style lang="scss">
table {
  td {
    padding-left: 10px;
  }
}
</style>