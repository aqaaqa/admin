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
  <el-form-item label="提示" :label-width="formLabelWidth" > 
    <p class="hint-text">注：小题之间空行隔开</p>
    <el-input type="textarea" v-model="form.options" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
</el-form>  
</template>

<script>
import { discSteam } from '@/utils/arr'

export default {
  data(){
    return {
      form: {
        desc: '四、对话题',
        steam: 'Work in pairs. Act out the following situation. You and your friends are planning a trip. You may consider:',
        options: 'a) What’s your destination?\r\n\nb) Why do you want to go to this place? \r\n\nc) What should you prepare, for example, flight, visa, hotel, etc.?'
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
      let list  = discSteam(form.steam, form.options)
      partObj.detail = list

      return partObj
    }

  }
}
</script>