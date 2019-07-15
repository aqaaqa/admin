<template>
  <div class="language5">
    <div class="language5-detail">
      <div v-for="(item, index) in list" :key='index'>
        <table class="language5-options">
          <tr v-for="(wgItem,wgIndex) in item.wordsGroup" :key="wgIndex"><td v-for="(wItem,wIde) in wgItem" :key="wIde">{{wItem}}</td></tr>
        </table>
        <div>
          <p class="fonts" v-for="(items, index) in item.steam" :key="index" v-html="items"></p>
        </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Language4',
  data () {
    return {
      wordsAll:[],
      id:0,
      showAnswer:this.item.isShow,
      listFilter: [],
      list: this.item.detail
    }
  },
  props:{
    item:Object
  },
  watch: {
    item:{
      handler(val) {
        this.showAnswer = val.isShow
        this.$nextTick(function() {
          this.viewAnswer()
        })
        
      },
      deep:true
    }
  },
  computed: {
    itemAll () {
      return this.item
    }
  },
  created() {
    this.item.detail.forEach(ele => {
      var words = ele.select_words;
      var count = 5;
      var leg = words.length;
      var n = 0;
      this.wordsAll = []
      this.words_Group(words,n);
      ele.wordsGroup = this.wordsAll;
    });

    let list = JSON.parse(JSON.stringify(this.item.detail))
    let listFilter = list.map(e=> {
      let replauceList = e.steam.map((j,index) => {
        let c = j.replace(/_+/g,`<i class='listen2-answer'>${e.correct[index]}</i>`)
        j = c
        return j
      })
      e.steam = replauceList
      return e
    })
    this.listFilter = listFilter
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
    viewAnswer() {
      if(!this.showAnswer) {
        this.list = this.item.detail
      } else {
        this.list = this.listFilter
      }
    }
    
  },
  updated () {
  },
  mounted () {
  }

}
</script>

<style lang="scss" scoped>
ul{
  list-style: none;
}
.language5 {
  margin-top: 20px;
  .fonts {
    font-size:14px;
    font-weight:400;
    color:rgba(0,0,0,0.85);
    line-height: 36px;
  }
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


