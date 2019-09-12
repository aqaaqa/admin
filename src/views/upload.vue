<template>
  <div class="upload-box">
    <p class="upload-text">上传图片：</p>
    <el-upload
      class="uploads"
      :action="gerUrl"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-success="handleAvatarSuccess"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <div class="upload-url">
      图片地址：
      <p class="hint-text">
        请复制img标签到试题录入指定位置
      </p>
      <div style="margin-top: 20px;" v-for="(item,index) in url" :key="index">
        <p>{{`&lt;img src="${item}" width="80%" style="display:block; margin:0 auto;" /&gt;`}}</p>
        <p style="width:500px;border:1px solid #ccc;padding:10px 0;margin-top: 15px;">
          <img :src="item" width="80%" style="display:block; margin:0 auto;" />
        </p>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        url: []
      };
    },
    computed: {
      gerUrl() {
        return process.env.VUE_APP_BASE_API+'/back/qest/upload' 
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.url.filter(e =>  {
          e.indexOf(file.name) < 0
        })
        console.log(this.url)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleAvatarSuccess(res, file) {
        console.log(res)
        const { data } = res
        this.url.push(`${data.picUrl}${data.picture}`)
        // this.imageUrl = URL.createObjectURL(file.raw);
      },
    }
  }
</script>

<style lang="scss" scoped>
  .upload-box {
    padding: 20px;
  }
  .upload-text {
    padding: 10px 0;
    font-size: 14px;
    display: inline-block;
    margin-right: 20px;
    vertical-align: top;
  }
  .uploads {
    vertical-align: top;
    display: inline-block;
  }

  .upload-url {
    margin-top: 20px;
    font-size: 14px;
    p {
      line-height: 24px;
    }
  }
</style>

<style lang="scss">
.el-upload-list__item-actions {
  display: none;
}
</style>
