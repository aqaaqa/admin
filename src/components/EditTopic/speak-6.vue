<template>
  <el-form :model="form" size="mini">
    <el-form-item label="音频文件" :label-width="formLabelWidth" > 
      <p class="hint-text">注：只能上传mp3,ogg,wav格式文件</p>
      <upload ref = 'mp3Up' />
    </el-form-item>
    <el-form-item label="标题和描述" :label-width="formLabelWidth">
      <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
      <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
      
    </el-form-item>
    <el-form-item label="题目" :label-width="formLabelWidth" > 
      <p class="hint-text">注：每题之间空行隔开</p>
      <el-input type="textarea" v-model="form.detail" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
      
    </el-form-item>
    <el-form-item label="音频脚本" :label-width="formLabelWidth" > 
      <p class="hint-text">注：段落之间换行隔开</p>
      <el-input type="textarea" v-model="form.article" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
  </el-form>  
</template>

<script>
import { retellOper, listenStr } from '@/utils/arr'
import upload  from '../upload/index' 

export default {
  data(){
    return {
      form: {
        desc: '三、复述题。',
        detail: '79.听一段短文，然后用英语复述短文内容。',
        article: 'Giant pandas are black and white bears. Their eyes, ears, legs, and shoulders are all black, and the rest of their bodies are white. Right now most of the giant pandas in the world live in Central China. Scientists think that around 2,000 pandas live in the wild in China. They like forests with lots of bamboo. Giant pandas are not on the endangered species list now because they are well protected.'
      },
      formLabelWidth: '100px',
    }
  },
  components: {
    upload
  },
  methods: {
    partForm(val) {
      let form = this.form
      let a = listenStr(val)
      val.detail.forEach(e=> {
        form.detail = e.steam.join('\r\n\n').replace(/<br>|<br\/>/g, '\n')
      })
      this.$refs.mp3Up.arrPush(val.mp3,'',val.mp3Path)
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
      let list  = retellOper(form.detail)

      console.log(list)
      partObj.detail = list
      partObj.mp3 = this.$refs.mp3Up.imageUrl
      partObj.article = form.article.replace(/(\r\n)|(\n)/g,'<br/>')
      return partObj
    }
  }
}
</script>
