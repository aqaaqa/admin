<template>
  <el-form :model="form" size="mini">
    <el-form-item label="标题和描述" :label-width="formLabelWidth">
      <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
      <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
      
    </el-form-item>
    <el-form-item label="网格" :label-width="formLabelWidth" > 
      <p class="hint-text">注：需添加标题，例第一行第一列1.1，第二行第一列2.1
        <br/>
        ****标题和内容之间必须空格隔开
        <br/>
        小题:1.2 1
        <br/>
        显示字母：2.2 e
        <br/>
        单词的空格：2.3 @
      </p>
      <el-input type="textarea" v-model="form.detail" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
    <el-form-item label="答案" :label-width="formLabelWidth" > 
      <p class="hint-text">注：每个答案之间用英文逗号 ',' 分隔
        <br>
        ****标题和答案之间必须空格隔开
      </p>
      <el-input v-model="form.cor" placeholder="请输入内容"></el-input>
    </el-form-item>
  </el-form>  
</template>

<script>
import { tableOper } from '@/utils/arr'


export default {
  data(){
    return {
      form: {
        desc: '三、纵横字谜。根据下列释义，写出相应的单词。',
        detail: '1.2 34 \n1.4 35\n1.6 37\n1.8 38\n2.2 e\n2.3 @\n2.4 r\n2.5 @\n2.6 @\n2.8 @\n3.2 @\n3.4 @\n3.6 30\n',
        cor: '2.1 a,2.2 c'
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    show() {
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
      let list  = tableOper(form.detail, form.cor)
      partObj.detail = list
      return partObj
    }
  }
}
</script>