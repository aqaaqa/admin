<template>
  <el-form :model="form" size="mini">
    <el-form-item label="标题和描述" :label-width="formLabelWidth">
      <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
      <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
      
    </el-form-item>
    <el-form-item label="题目左侧项" :label-width="formLabelWidth" > 
      <p class="hint-text">注：每题之间空行隔开</p>
      <el-input type="textarea" v-model="form.detail" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
    <el-form-item label="题目右侧项" :label-width="formLabelWidth" > 
      <p class="hint-text">注：每题之间空行隔开</p>
      <el-input type="textarea" v-model="form.steam" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
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
import { matchOper } from '@/utils/arr'


export default {
  data(){
    return {
      form: {
        desc: '五、匹配题',
        detail: '1. It’s always a problem for a family with children to find a suitable restaurant on holiday.\r\n\n2. Children can cook by themselves and their parents can clean up for them.\r\n\n3. Family Restaurant only welcomes children from six to twelve years old.',
        steam: 'A. Around the White House.\r\n\nB. Near the Washington Monument.\r\n\nC. In the National Park.\r\n\nD. Around the Tidal Basin.',
        url: '1.mp3',
        cor: 'ACBD'
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
      let list  = matchOper(form.detail, form.steam,form.cor)
      partObj.detail = list
      partObj.mp3 = form.url
      return partObj
    }
  }
}
</script>