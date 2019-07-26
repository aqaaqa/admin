<template>
  <el-form :model="form" size="mini">
    <el-form-item label="标题和描述" :label-width="formLabelWidth">
      <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
      <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
      
    </el-form-item>
    <el-form-item label="题目" :label-width="formLabelWidth" > 
      <p class="hint-text">注：每题之间空行隔开,下划线用 '___'</p>
      <el-input type="textarea" v-model="form.detail" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
      
    </el-form-item>
    <el-form-item label="听力地址" :label-width="formLabelWidth" > 
      <el-input v-model="form.url" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item label="答案" :label-width="formLabelWidth" > 
      <p class="hint-text">注：每个答案之间用英文逗号 ',' 分隔</p>
      <el-input v-model="form.cor" placeholder="请输入内容"></el-input>
    </el-form-item>
  </el-form>  
</template>

<script>
import { gapOper } from '@/utils/arr'

export default {
  data(){
    return {
      form: {
        desc: '二、听对话，填空\nListen to a conversation between two students and complete the following notes.\n听一段对话，根据所听内容，将以下笔记中的信息补充完整。',
        detail: '11. There is a large meeting hall _______ the South Block.\r\n\n12. _______ will begin at 2:00 p.m.\r\n\n13. The red building is _______ and is close to the _______.',
        url: '1.mp3',
        cor: 'wrewr,werw,werw'
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    lists() {
      let partObj = {}
      let form = this.form
      let msg
      for(let d in form) {
        if(!form[d]) {
          msg = '信息不能为空'
        }
      }
      if(msg) {
        this.$message.error(msg)
        return false
      }
      let list  = gapOper(form.detail,form.cor)
      partObj.detail = list
      partObj.mp3 = form.url
      return partObj
    }
  }
}
</script>