<template>
  <el-form :model="form" size="mini">
    <el-form-item label="标题和描述" :label-width="formLabelWidth">
      <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
      <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
      
    </el-form-item>
    <el-form-item label="表格" :label-width="formLabelWidth" > 
      <p class="hint-text">注：需添加标题，例第一行第一列1.1，第二行第一列2.1，每行之间空行隔开</p>
      <el-input type="textarea" v-model="form.detail" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
    <el-form-item label="答案" :label-width="formLabelWidth" > 
      <p class="hint-text">注：每个答案之间用英文逗号 ',' 分隔</p>
      <el-input v-model="form.cor" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item v-if="show" label="听力地址" :label-width="formLabelWidth" > 
      <el-input v-model="form.url" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item label="听力脚本" :label-width="formLabelWidth" > 
      <p class="hint-text">注：段落之间换行隔开</p>
      <el-input type="textarea" v-model="form.article" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
  </el-form>  
</template>

<script>
import { tableOper, listenStr } from '@/utils/arr'


export default {
  data(){
    return {
      form: {
        desc: '三、听对话，填表格',
        detail: '1.1 Expression\n1.2 Meaning\n1.3 Explanation\r\n\n2.1 ___1___ \n2.2\n2.3 Look at this person is a treat for ___3___, just like candy is a treat for the tongue.',
        url: '1.mp3',
        cor: 'around,house',
        article: 'hi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time\nhi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time'
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    show() {
    }
  },
  methods: {
    partForm(val) {
      let form = this.form
      let a = listenStr(val)
      form.detail = '' 
      form.cor = ''
      val.detail.forEach(e=> {
        // for (let i of e.steam) {
          
        // }
        // form.cor = e.correct.join(',')
      })
      form = Object.assign(form, a)
      
    },
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
      let list  = tableOper(form.detail, form.cor)
      partObj.detail = list
      partObj.mp3 = form.url
      partObj.article = form.article.replace(/(\r\n)|(\n)/g,'<br/>')
      return partObj
    }
  }
}
</script>