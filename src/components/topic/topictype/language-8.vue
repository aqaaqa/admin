<template>
  <div class="language8">
    <div class="language8-detail">
      <div class="language8-article" :id='itemAll.id' ref="article" v-html="itemAll.opAr">
      </div>
      <div class="language8-box" v-if="itemAll.detail&&itemAll.detail.length!=0">
        <div class="language8-options" v-for="(item,index) in itemAll.detail" :key="index">
          <ul class="language8-select">
              <li v-for='(liItem, liIde) in item.options' :key="liIde">{{liItem}}</li>
          </ul>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id:null,
      isShow:this.item.isShow
    }
  },
  props: {
    item:Object
  },
  watch:{
    item:{
      handler(val) {
        this.isShow = val.isShow
        this.$nextTick(() => {
          this.viewAnswer()
        })
      },
      deep:true
    }
  },
  computed: {
    itemAll () {
      var zm = "ABCDEFGHI";
      
      var opAr = '';
      for(let i=0;i<this.item.detail[0].steam.length; i++) {
        let a = this.item.detail[0].steam[i].replace(/(_)+([0-9]{0,2})?(_)+/g,'<span class="line" style=" border-bottom: 1px #000 solid;line-height:20px;display: inline-block;width:100px;height:20px;text-align:center"></span>');
        opAr = opAr + a +'</br>' 
      }
      // opAr = opAr.replace(/(_)+(\d)?(_)+/g,'<span class="line" style=" border-bottom: 1px #000 solid;line-height:20px;display: inline-block;width:100px;height:20px;text-align:center"></span>');
      this.item.opAr = opAr;
      this.id = this.item.id;
      var correctArr = [];
      this.item.detail.forEach((ele) => {
        var correct =  ele.correct[0];
        var options = ele.options;
        options.forEach((op,oIdx) => {
          var zm = op.split(".")[0];
          var word = op.split(".")[1];
          if(zm.trim() === correct){
            correctArr.push(word.trim());
          }
        })
      })
      this.item.correctArr = correctArr;
      return this.item;
    }
  },
  methods: {
    handleArticle() {
      var lineList = document.getElementById(this.id).querySelectorAll(".line");
      for(let i = 0; i<lineList.length; i++) {
        lineList[i].innerHTML = (i+1);
      }
    },
    //显示答案
     viewAnswer () {
      if(this.isShow){
        var lineList = document.getElementById(this.id).querySelectorAll(".line");
        for(let i = 0; i<lineList.length; i++) {
          this.$nextTick(function(){
            lineList[i].innerHTML = this.itemAll.detail[0].correct[i];
          })
        }
      }else{
        this.handleArticle();
      } 
    }
  },
  updated () {
    this.handleArticle();
  },
  mounted () {
    this.handleArticle();
  }
}
</script>

<style lang="scss" scoped>
 ul{
   list-style: none;
   margin: 0;
 }
 .language8 {
   margin-top: 20px;
 }
.language8-article{
  width:700px;
  font-size:14px;
  font-weight:400;
  color:rgba(0,0,0,0.85);
  line-height:28px;
  margin-bottom:24px;
  .line8{
    border-bottom: 1px #000 solid;
    line-height:20px;
    display: inline-block;
    width:100px;
    height:20px;
  }
}
.language8-options{
    // display: flex;
    // justify-content: flex-start;
    // align-items: center;
    margin-bottom: 16px;
    .language8-num{
      width: 24px;
      line-height:20px;
    }
    .language8-select{
      padding: 0;
      // display: flex;
      // justify-content: flex-start;
      // align-items: center;
      font-size:14px;
      color:rgba(0,0,0,0.85);
      line-height:36px;
      li{
        margin-right:40px;
      }
    }
}
</style>


