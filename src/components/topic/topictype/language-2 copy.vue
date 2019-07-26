<template>
  <div class="language2">
    <div class="language2-detail" v-if='itemAll.detail && itemAll.detail.length != 0'>
      <div v-for='(item,index) in itemAll.detail' :key="index">
        <table class="language2-tab">
          <tr v-for='(dItem, dIdx) in item.steam' :key="dIdx">
            <td class="language2-border">
              <span class="language2-word">{{dItem}}</span>
              <span class="language2-ans">{{isShow && item.corArr ? item.corArr[dIdx].r : ''}}</span>
            </td>
            <td v-if="dIdx === 0" :rowspan='item.steam.length' class="language2-blank">
              <span class="language2-line"></span>
            </td>
            <td class="language2-border language2-padR">{{item.options[dIdx]}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Language2',
  data () {
    return {
      lData:[],
      rData:[],
      length:0,
      isShow:false
    }
  },
  props: {
    item: Object
  },
  watch: {
    item: {
      handler(val) {
        this.isShow = val.isShow
      },
      deep: true
    }
  },
  computed: {
    itemAll () {
      var zm = 'ABCDEFGHIJK';
      this.item.detail.forEach(ele => {
        var lData = [];
        var rData = [];
        var steam = ele.steam;
        var total = steam.length;
        var leg = total / 2;
        ele.length = leg;
        for(let i=0; i<leg; i++){
          lData.push(steam[i]);
        }
        for(let i=leg; i<total; i++){
          rData.push(steam[i]);
        }
        ele.lData = lData;
        ele.rData = rData;
        if(ele.correct.length) {
          var correct = ele.correct;
          var corArr = []
          correct.forEach(c=>{
            var rCatch = 0, lCatch =0;
            var rCatch = parseInt(c.split('-')[1]);
            rCatch = zm[rCatch];
            var lCatch = parseInt(c.split('-')[0]);
            corArr.push({l:lCatch,r:rCatch})
          })
          ele.corArr = corArr;
        }
        
      });
      return this.item;
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.language2 {
  margin-top: 20px;
}
.language2-tab{
  border-collapse: collapse;
  td{
    width:320px;
    height:38px;
    .language2-word{
     width:auto;
     line-height: 37px;
     float: left;
     padding-right: 10px
    }
    .language2-ans{
      width:37px;
      height:37px;
      line-height: 37px;
      float: right;
      color:blue;
      font-weight: bolder;
    }
  }
  td.language2-border{
    width:320px;
    border:1px #999 solid;
    padding: 0 0 0 16px;
    font-size:14px;
    font-weight:400;
    color:rgba(0,0,0,0.85);
    line-height:20px;
  }
  td.language2-padR{
    padding-right: 16px
  }
  td.language2-blank{
    width: 80px;
  }
  .language2-line{
    height:1px;
    background:#000
  }
}
</style>


