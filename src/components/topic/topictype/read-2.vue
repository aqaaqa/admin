<template>
  <div class="read2">
    <div class="taskArtcle" v-html="item.article" :id="item.id">
    </div>
    <div v-for="(item,index) in item.detail" :key="index" class="taskOptions">
      <div v-for="(item1,index2) in item.options" :key="index2">
        {{item1}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShow: this.itemList.isShow,
        item: this.itemList
      }
    },
    props: ['itemList'],
    watch: {
      itemList: {
        handler(val) {
          this.item = val
          this.isShow = val.isShow
          this.$nextTick(() => {
            this.viewAnswer()
          })
          
        },
        deep:true
      }
    },
    created() {
      //初始化 变成__1__变成span
      this.fnInit()
    },
    mounted() {
      //加载后 变成id
      this.handleArticle()
    },
    methods: {
      fnInit() {
        var ar = this.item.article;
        this.item.ar = ar.replace(/(_)+([0-9]{0,2})?(_)+/g,
          '<span class="line" style=" border-bottom: 1px #000 solid;line-height:20px;display: inline-block;width:100px;height:20px;text-align:center"></span>'
        );
      },
      // 1 2 3 4
      handleArticle() {
        var lineList = document.getElementById(this.item.id).querySelectorAll(".line");
        for (let i = 0; i < lineList.length; i++) {
          lineList[i].innerHTML = (i + 1);
        }
      },
      // 查看答案
      viewAnswer() {
        //false 
        if (this.isShow) {
          var lineList = document.getElementById(this.item.id).querySelectorAll(".line");
          for (let i = 0; i < lineList.length; i++) {
            lineList[i].innerHTML = this.item.detail[0].corrects[i];
          }
        }else{
          this.handleArticle()
        }

      }
    }
  }

</script>

<style lang="scss" scoped>
  .read2 {
    margin-top: 20px;
  }
  .task {
    white-space: pre-line;
  }
  .taskArtcle{
    width: 700px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    margin-bottom: 24px;
  }
  .taskOptions{
    width: 700px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    margin-bottom: 24px;
  }
</style>