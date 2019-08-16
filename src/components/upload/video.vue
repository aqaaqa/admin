<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="getUrl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :before-remove="beforeRemove"
      :limit="1"
      :data="upData"
      ref="upload"
      :auto-upload="false"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>

    <div class="audio-box" v-if="imageUrl" >
      <VueAudio :theUrl="imageUrl" :theControlList="audios.controlList"/>
    </div>
  </div>
</template>

<script>
import  VueAudio  from '../audio'
import { upload } from '@/api/ajax'

export default {
  data() {
    return {
      fileList: [],
      imageUrl: '',
      audios: {
        controlList: "noDownload noSpeed onlyOnePlaying"
      },
      form: {
        userid: '10',
        name: 'zhao'
      }
    };
  },
  components : {
    VueAudio
  },
  computed: {
   // 这里定义上传文件时携带的参数，即表单数据
    upData: function() {
      return {
        body: JSON.stringify(this.form)
      }
    },
    getUrl() {
      return process.env.VUE_APP_BASE_API+'back/qest/upload'
    },
  },
  methods: {
    submitUpload() {
      // this.$refs.upload.submit();
      this.$refs.upload.submit()
    },
    
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>