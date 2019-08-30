<template>
  <div>
    <input type="file" class="upload" @change="addImg" ref="inputer" multiple accept="image/png,image/jpeg,image/gif,image/jpg"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: '',
      vals: '',
      formData:new FormData(),
      imgs: {},
      imgLen:0,
    }
  },
  methods: {
    handleChange() {
    },
    addImg(event){
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.fil = inputDOM.files;
      let oldLen=this.imgLen;
      let len=this.fil.length+oldLen;
      if(len>4){
        alert('最多可上传4张，您还可以上传'+(4-oldLen)+'张');
        return false;
      }
      for (let i=0; i < this.fil.length; i++) {
        let size = Math.floor(this.fil[i].size / 1024);
        if (size > 5*1024*1024) {
          alert('请选择5M以内的图片！');
          return false
        }
        this.imgLen++;
        this.$set(this.imgs,this.fil[i].name+'?'+new Date().getTime()+i,this.fil[i]);
      }
    },
    getObjectURL(file) {
      var url = null ;
      if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
      } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
      } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
      }
      return url ;
    },
    delImg(key){
      this.$delete(this.imgs,key);
      this.imgLen--;
    },
    submit(){
      for(let key in this.imgs){
        let name=key.split('?')[0];
        this.formData.append('multipartFiles',this.imgs[key],name);
      }
      this.$http.post('/opinion/feedback', this.formData,{
        headers: {'Content-Type': 'multipart/form-data'}
      }).then(res => {
        this.alertShow=true;
      });
    },
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
  }
}
</script>

<style lang="scss" scoped>

</style>