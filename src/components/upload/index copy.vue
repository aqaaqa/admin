<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      accept="audio/mp3,audio/wav,audio/ogg"
      :action="getUrl"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :before-remove="beforeRemove"
      :limit = "2"
      :data="upData"
      :auto-upload="false"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>
      <!-- :http-request="uploadFile"     -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import  VueAudio  from '../audio'
import { RequestUploads, EditUploads } from '@/api/ajax'

export default {
  data() {
    return {
      fileList: [],
      imageUrl: '',
      mp3Stem: '',
      audios: {
        controlList: "noDownload noSpeed onlyOnePlaying"
      },
      upData: {},
      uploads: '',
      count:0,
      stem: false
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
    ...mapGetters([
      'upload',
    ])
  },
  watch: {
    fileList: {
      handler(val) {
        this.urls()
      },
      deep: true
    },
  },
  methods: {
    arrPush(url,stem,path) {
      this.fileList = []
      if(url) {
        this.fileList = [{
          name: url,
          url: url,
          status: 'finished'
        }]
        this.imageUrl = url
      }
      if(stem) {
        this.fileList.push({
          name: stem,
          url: stem,
          status: 'finished'
        })
        this.mp3Stem = stem
      }
    },
    submitUpload() {
      if(this.upload.part == '听力') {
        if(this.fileList.length > 1) {
          for(let i in this.fileList) {
            if(this.fileList[i].name.indexOf('stem')> -1) {
              this.stem = true
              break
            } else {
              this.stem = false
            }
          }
        } else {
          this.stem = true
        }
      } else {
        this.stem = true
      }
      this.uploadFile()
    },

    uploadFile() {
      if(!this.stem) {
        this.$message.warning('缺少名为"stem"的文件') 
        if(this.upload.id) {
          this.$parent.$parent.$parent.$parent.$parent.$parent.loading1 = false
        } else {
          this.$parent.$parent.$parent.$parent.loading = false
        }
        return false
      }
      // 通过 FormData 对象上传文件
      var formData = new FormData();
      let file=''
      for(let i=0;i<this.fileList.length;i++){
        if(this.fileList[i].status == 'ready') {
          file='file'+this.count
          this.count++
          formData.append(file,this.fileList[i].raw);
        }
      }
      this.upload.mp3 = this.upload.mp3.substring(this.upload.mp3.lastIndexOf('/')+1)
      this.upload.mp3Stem = this.upload.mp3Stem.substring(this.upload.mp3Stem.lastIndexOf('/')+1)
      const _data = JSON.stringify(this.upload);
      formData.append("data", _data);
      if(this.upload.id) {
        // 发起请求
        EditUploads(formData).then(res=> {
          if (res.status == 1) {
            this.$message({
              type: "success",
              message: '修改成功'
            })
            this.count = 0
            this.$parent.$parent.$parent.$parent.$parent.handleClose()
            this.$parent.$parent.$parent.$parent.$parent.$parent.qestList()
            this.$parent.$parent.$parent.$parent.$parent.$parent.loading1 = false
          } else {
            this.$message({
              type: "warning",
              message: '修改失败,请检查音频'
            })
            this.count = 0
            this.$parent.$parent.$parent.$parent.$parent.$parent.loading1 = false
          }
        }).catch((res) => {
          this.$message({
            type: "error",
            message: '修改失败,请检查音频'
          })
          this.count = 0
          this.$parent.$parent.$parent.$parent.$parent.$parent.loading1 = false
        })
      } else {
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
      }
      
    },
    handleChange(file, fileList) {
      // this.fileList = fileList.slice(-1);C
      this.fileList=fileList
      
    },
    handleRemove(file, fileList) {
      this.fileList=fileList
    },
    handlePreview(file) {
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 2 个文件，请先删除已存在文件`);
    },
    beforeRemove(file, fileList) {
      this.fileList=fileList
    },
    urls() {
      this.imageUrl = ''
      this.mp3Stem = ''
      for(let i in this.fileList) {
        let k = this.fileList[i]
        if(k) {
          if(k.name.indexOf('stem')>-1) {
            if(k.status == "finished") {
              this.mp3Stem = k.url;
            } else {
              this.mp3Stem = URL.createObjectURL(k.raw);
            }
          } else {
            if(k.status == "finished") {
              this.imageUrl = k.url;
            } else {
              this.imageUrl = URL.createObjectURL(k.raw);
            }
            
          }
        }
        
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>