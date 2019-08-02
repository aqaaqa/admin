<template>
<el-form :model="form" size="mini">
  <el-form-item label="标题和描述" :label-width="formLabelWidth">
    <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
    <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
  </el-form-item>
  <el-form-item label="正方" :label-width="formLabelWidth" > 
    <p class="hint-text">注：题目和小题之间空行隔开</p>
    <el-input type="textarea" v-model="form.steam1" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
  <el-form-item label="反方" :label-width="formLabelWidth" > 
    <p class="hint-text">注：题目和小题之间空行隔开</p>
    <el-input type="textarea" v-model="form.steam2" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
</el-form>  
</template>

<script>
import { argueSteam, readStr } from '@/utils/arr'

export default {
  data(){
    return {
      form: {
        desc: '五、辩论题\nWork in groups. Hold a debate on whether we should use animals for research and experiments. \n分组辩论：是否应该用动物进行科学实验和研究。根据以下正反双方的观点以及提示的论点进行辩论。',
        steam1: 'Group A is in favour of using animals for research and experiments. You could use the following arguments:\r\n\na) Invaluable advances can be made in medicine through experiments on animals.\nb) Animal experiments help to reduce harm on patients and volunteers.\nc) It is possible to experiment on animals without being cruel to animals.',
        steam2: 'Group B is against using animals for research and experiments. You could use the following arguments:\r\n\na) What’s your destination?\nb) Why do you want to go to this place? \nc) What should you prepare, for example, flight, visa, hotel, etc.?'
      },
      formLabelWidth: '100px',
    }
  },
  methods: {
    partForm(val) {
      let form = this.form
      let a = readStr(val)
      let detail = val.detail
      form.steam1 = detail[0].steam.join('\n') + '\r\n\n' + detail[0].options.join('\n')
      form.steam2 = detail[1].steam.join('\n') + '\r\n\n' + detail[1].options.join('\n')
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
      let list  = argueSteam(form.steam1, form.steam2)
      partObj.detail = list

      return partObj
    }

  }
}
</script>