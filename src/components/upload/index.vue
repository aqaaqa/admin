<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      accept="audio/mp3,audio/wav,audio/ogg"
      :action="getUrl"
      :http-request="uploadFile"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :before-remove="beforeRemove"
      :limit="1"
      :data="upData"
      :auto-upload="false"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>
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
      audios: {
        controlList: "noDownload noSpeed onlyOnePlaying"
      },
      upData: {},
      uploads: '',
    };
  },
  components : {
    VueAudio
  },
  computed: {
   // 这里定义上传文件时携带的参数，即表单数据
    // upData: function() {
    //   return {
    //     data: JSON.stringify(this.form)
    //   }
    // },
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
      }
    },
  },
  methods: {
    arrPush(val) {
      let url = val
      if(url) {
        let a = url.substring(url.lastIndexOf('/')+1)
        this.fileList = [{
          name: a,
          url: url,
          status: 'finished'
        }],
        this.imageUrl = url
      }
      
    },
    submitUpload() {
      this.$refs.upload.submit()
    },

    uploadFile(params) {
      const _file = params.file;
      const _data = JSON.stringify(this.upload);
      // const isLt2M = _file.size / 1024 / 1024 < 2;

      // 通过 FormData 对象上传文件
      var formData = new FormData();
      formData.append("file", _file);
      formData.append("data", _data);
      
      // if (!isLt2M) {
      //   this.$message.error("请上传2M以下的.xlsx文件");
      //   return false;
      // }

      if(this.upload.id) {
        // 发起请求
        EditUploads(formData).then(res=> {
          if (res.status == 1) {
            this.$message({
              type: "success",
              message: '修改成功'
            })
            this.$parent.$parent.$parent.$parent.$parent.handleClose()
            this.$parent.$parent.$parent.$parent.$parent.$parent.qestList()
            this.$parent.$parent.$parent.$parent.$parent.$parent.loading1 = false
          } else {
            this.$message({
              type: "warning",
              message: '修改失败,请检查音频'
            })
            this.$parent.$parent.$parent.$parent.$parent.$parent.loading1 = false
          }
        }).catch((res) => {
          this.$message({
            type: "error",
            message: '修改失败,请检查音频'
          })
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
            this.$parent.$parent.$parent.$parent.loading = false
            this.$parent.$parent.$parent.$parent.value7 = ''
          } else {
            this.$message({
              type: "warning",
              message: '上传失败'
            })
            // this.uploads = '失败'
            this.$parent.$parent.$parent.$parent.loading = false
          }
        }).catch(() => {
          this.$message({
            type: "error",
            message: '网络传输失败，请重新上传'
          })
          this.$parent.$parent.$parent.$parent.loading = false
        })
      }
      
    },
    handleChange(file, fileList) {
      // this.fileList = fileList.slice(-1);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleRemove(file, fileList) {
      if(fileList.length < 1) {
        this.imageUrl = ''
      }
    },
    handlePreview(file) {
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，请先删除已存在文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>