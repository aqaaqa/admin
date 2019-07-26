<template>
<el-form :model="form" size="mini">
  <el-form-item label="标题和描述" :label-width="formLabelWidth">
    <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
    <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
  </el-form-item>
  <el-form-item label="题目" :label-width="formLabelWidth" > 
    <p class="hint-text">注：小题之间空行隔开</p>
    <el-input type="textarea" v-model="form.steam" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
</el-form>  
</template>

<script>
import { speakSteam } from '@/utils/arr'

export default {
  data(){
    return {
      form: {
        desc: '一、朗读课文',
        steam: '90.朗读《英语》（新标准）必修第一册第21页Sophie的评论。\r\n\n91.朗读《英语》（新标准）必修第一册第21页Sophie的评论。',
      },
      formLabelWidth: '120px',
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
      let list  = speakSteam(form.steam)
      partObj.detail = list

      return partObj
    }

  }
}
</script>