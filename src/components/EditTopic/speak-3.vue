<template>
<el-form :model="form" size="mini">
  <el-form-item label="标题和描述" :label-width="formLabelWidth">
    <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
    <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
  </el-form-item>
  <el-form-item label="题目" :label-width="formLabelWidth" > 
    <p class="hint-text">注：只能放一个小题</p>
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
        desc: '二、讨论题',
        steam: '91.随着网络时代的来临，市面上出现了越来越多的线上英语学习工具，如APP、电子书、网络课程等，你如何看待这些线上学习工具？\n提示：',
        options: '（1）What kind of online English learning tools have you used? \r\n\n（2）Which one do you prefer, online English learning tools or traditional ways of learning?\r\n\n（3）What are the reasons for your preference?'
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