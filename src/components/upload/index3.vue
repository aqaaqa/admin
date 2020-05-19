<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="getUrl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :before-remove="beforeRemove"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import  VueAudio  from '../audio'
import { upload } from '@/api/ajax'
import { RequestUploads, EditUploads } from '@/api/ajax'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      fileList: [],
      imageUrl: 'blob:',
      mp3Stem: '',
      audios: {
        controlList: "noDownload noSpeed onlyOnePlaying"
      },
      upData: {},
      uploads: '',
      count:0,
      stem: true,
      upload: {
        article: "<span>1.</span><span>W: What’s that building next to the playground? The sports centre? <br/>M: No, it’s the library. The sports centre is near the meeting hall.</span><br/><span>2.</span><span>B: Have you seen my dictionary? I remember I put it next to the textbooks, but it’s not there.<br/>W: Let me check the shelf. Um… Nope. Ah, here it is, under the newspaper!</span><br/><br/>you can learn this for some time hi this is listening article , you can learn this for some time<br/>hi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time",
        detail: [],
        directions: {},
        mp3: "",
        mp3Stem: "",
        name: "一、听短对话，选择正确的答案",
        part: "听力",
        qestBase: "100002",
        title: "听第一段对话，回答第6至第7题。",
        type: "选择题",
      }
    };
  },
  components : {
    VueAudio
  },
  computed: {
    getUrl() {
      if(this.upload.id) {
        return process.env.VUE_APP_BASE_API+'back/qest/editWithMp3' 
      } else {
        return process.env.VUE_APP_BASE_API+'back/qest/submitWithMp3'
      }
      
    },
  },
  methods: {
    arrPush(url,stem,path) {
     
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    },
    beforeRemove(file, fileList) {
      this.fileList=fileList
    },
    uploadFile(params) {
      var formData = new FormData();
      const _data = JSON.stringify(this.upload);
      formData.append("file", params.file);
      formData.append("data", _data);
      
      // 发起请求
      RequestUploads(formData).then(res=> {
        if (res.status == 1) {
          this.$message({
            type: "success",
            message: '上传成功'
          })
          this.count = 0
          this.$parent.$parent.$parent.$parent.loading = false
          this.$parent.$parent.$parent.$parent.value7 = ''
        } else {
          this.$message({
            type: "warning",
            message: '上传失败'
          })
          this.count = 0
          // this.uploads = '失败'
          this.$parent.$parent.$parent.$parent.loading = false
        }
      }).catch(() => {
        this.$message({
          type: "error",
          message: '网络传输失败，请重新上传'
        })
        this.count = 0
        this.$parent.$parent.$parent.$parent.loading = false
      })
      
    },
  }
}
</script>

<style lang="scss" scoped>

</style>