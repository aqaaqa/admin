<template>
  <div class="listen1">
    <div class="listen1-detail" v-if="itemAll.detail">
      <ul v-for='(itm, index) in itemAll.detail' v-bind:key='index' class="listen1-steam">
        <li>
          <div class="listen1-tigan">
            <!-- <span class="listen1-num">{{index+1}}.</span> -->
            <p class="listen1-item" v-for="(steamItem, sIdx) in itm.steam" :key="sIdx">{{steamItem}}</p>
          </div>
          <div class="listen1-options">
            <p v-for='(option, idn) in itm.options' v-bind:key='idn' class="listen1-opt" :class="[itm.isFloat ? 'listen1-none' : 'listen1-fl']" :style="idn==itm.cpos ? styleObject : ''" >
              {{option}}
            </p>
          </div>
        </li>
      </ul>
    </div>

    <!--查看脚本-->
    <el-dialog
      title="脚本"
      :visible.sync="isScript"
      width="30%"
    >
      <span>这是一段音频脚本信息</span>
    </el-dialog>
    
  </div>
</template>

<script>

export default {
  name: 'Listening1',
  data() {
   return {
    isScript:false,
    show:this.item.isShow,
    styleObject:{ color:'black' }
   }
  },
  props:{
    item: Object,
  },
  watch: {
    item: {
      handler(val) {
        this.show = val.isShow
        this.$nextTick(() => {
          this.viewAnswer()
        })
        
      },
      deep: true
    }
  },
  computed:{
     itemAll: function(){
      var zm = 'ABCDEFG';
      this.item.detail.forEach((em, index) => {
        var legCount = 0;
        em.options.forEach((op)=>{
          var length = op.length;
          if(length > 80){
            legCount++
          }
        })
        if(legCount > 0){
          em.isFloat = true
        }else{
          em.isFloat = false
        }
        var correct = em.correct[0];
        var cpos = zm.indexOf(correct);
        em.cpos = cpos;
      })
      
	    return this.item;
    }
  },
  
  methods: {
    handleViewScript () {
      this.isScript = true;
    },
    //显示答案
    viewAnswer () {
      if(this.show){
        this.styleObject = { color :'blue'}
      }else{
        this.styleObject = { color : 'black'}
      }
    }
  },
  updated(){
    
  },
  mounted() {
    
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.fl{float: left;}
.fr{float: right}
ul{padding: 0;}
.listen1{
  ul{
    list-style: none
  }
  .listen1-detail{
    margin-top: 20px;
    font-size: 14px;
    .listen1-steam{
      margin:0;
      clear:both;
      overflow: hidden;
      margin-bottom: 24px;
      .listen1-tigan{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .listen1-num{
          width:24px;
          text-align: left;
          line-height: 20px;
        }
      }
      .listen1-item{
        margin:0;
        font-size:14px;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:20px;
        margin-bottom:16px;
      }
      .listen1-options{
        clear:both;
        overflow: hidden;
        padding-left: 24px;
        .listen1-opt{
          font-size:14px;

          font-weight:400;
          color:rgba(0,0,0,1);
          line-height:20px;
          min-width: 80px; 
          margin: 0;
        }
        .listen1-none{
          margin-bottom: 16px;
          float: none;
        }
        .listen1-fl{
          margin-right: 40px;
          float: left;
        }
        
      }
    }
    
  }
}
</style>
