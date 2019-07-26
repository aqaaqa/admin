<template>
  <div class="language5">
    <div class="language5-detail" v-if="itemAll.detail && itemAll.detail.length != 0">
      <div v-for="(item, index) in itemAll.detail" :key='index'>
        <table class="language5-options">
          <tr v-for="(wgItem,wgIndex) in item.wordsGroup" :key="wgIndex"><td v-for="(wItem,wIde) in wgItem" :key="wIde">{{wItem}}</td></tr>
        </table>
        <div class="language5-article" :id='itemAll.id' v-html='itemAll.opAr'>
        </div>
      </div>
     
    </div>
  </div>
</template>

<script>

export default {
  name: 'Language5',
  data () {
    return {
      wordsAll:[],
      id:0,
      isShow:this.item.isShow
    }
  },
  props:{
    item:Object
  },
  watch: {
    item:{
      handler(val) {
        this.isShow = val.isShow
        this.$nextTick(()=> {
          this.viewAnswer()
        })
        
      },
      deep:true
    }
  },
  computed: {
    itemAll () {
      this.item.detail.forEach(ele => {
        var words = ele.select_words;
        var count = 5;
        var leg = words.length;
        var n = 0;
        this.wordsAll = []
        this.words_Group(words,n);
        ele.wordsGroup = this.wordsAll;
      });
      var opAr = this.item.article;
      opAr = opAr.replace(/(_)+([0-9]{0,2})?(_)+/g,'<span class="line" style=" border-bottom: 1px #000 solid;line-height:20px;display: inline-block;width:100px;height:20px;text-align:center"></span>');
      this.item.opAr = opAr;
      this.id = this.item.id;
      return this.item
    }
  },
  methods: {
    words_Group (wordsAll,n) {
      var leg = wordsAll.length;
      var count = 5;
      var yushu = leg%5;
      var chushu = parseInt(leg/5);
      if(leg > count){
        if(yushu != 0){
            wordsAll.length = (chushu+1)*count
        }
      }
      var wordsGroup = [];
      var c = (n+1)*count;
      for(let i=n*count; i<c;i++){
        wordsGroup.push(wordsAll[i]); 
        if(i === (count*n+4)){
          this.wordsAll.push(wordsGroup);
          if(c<leg){
            var m = n;
            n = m+1; 
            this.words_Group(wordsAll,n); 
          }
        }
      }
    },
    handleArticle() {
      var lineList = document.getElementById(this.itemAll.id).querySelectorAll(".line");
      for(let i = 0; i<lineList.length; i++) {
        lineList[i].innerHTML = (i+1);
      }
    },
    viewAnswer () {
      if(this.isShow){
        var lineList = document.getElementById(this.itemAll.id).querySelectorAll(".line");
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
}
.language5 {
  margin-top: 20px;
}
.language5-options{
  border:1px rgba(217,217,217,1) solid;
  border-bottom: 0;
  clear: both;
  overflow: hidden;
  width:602px;
  padding:0;
  border-collapse: collapse;
  margin-bottom: 24px;
  td{
    width:120px;
    min-height:38px;
    padding: 9px 16px;
    line-height: 20px;
    font-weight:400;
    color:rgba(0,0,0,0.85);
    font-size: 14px;
    border:1px rgba(217,217,217,1) solid;
  }
}
.language5-article{
  width:700px;
  font-size:14px;
  font-weight:400;
  color:rgba(0,0,0,0.85);
  line-height:28px;
  .language5-para{
    margin-bottom:15px;
  }
}
</style>


