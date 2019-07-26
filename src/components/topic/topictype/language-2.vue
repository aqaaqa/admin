<template>
  <div class="listen5">
    <div class="listen5-main" style="margin-top:20px;">
      <div style="width: 200px;">
        <el-table
          :data = list.steam
          :show-header = false
          size= 'small'
          border>
          <el-table-column>
          <template slot-scope="scope">
            <span class="fonts">{{scope.row}}</span>
          </template>
          </el-table-column>
          <!-- <el-table-column
            style="text-align:center"
            align="center"
            width="50">
          <template v-if="showAnswer" slot-scope="scope">
            <span class="fonts">{{list.correct[scope.$index]}}</span>
          </template>
          </el-table-column> -->
        </el-table>
      </div>

      
      <div >
        <el-table
          size="small"
          :data = list.options
          :show-header = false
          border
          style="">
          <el-table-column>
          <template slot-scope="scope">
            <span class="fonts">{{scope.row}}</span>
          </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>

<script>
import {letterArr} from '@/utils/auth'
export default {
  name: 'listen5',
  props:{
    itemList: {
      type: Object,
    }
  },
  data() {
    return {
      item: this.itemList,
      list: this.itemList.detail[0],
      answer: this.itemList.detail[0].correct,
      showAnswer: this.itemList.isShow,
      change: letterArr()
    }
  },
  watch: {
    itemList: {
      handler(val) {
        this.item = val
        this.list = val.detail[0],
        this.answer = val.detail[0].correct
        this.showAnswer = val.isShow
        // this.lookAnswer()
      },
      deep: true
      
    },
    
  },
  computed: {
   
  },
  created() {
    // let list = JSON.parse(JSON.stringify(this.list))
    // let answerList = JSON.parse(JSON.stringify(this.answer))
    // let aList = []
    // for(let i =0 ; i < answerList.length; i++) {
    //   let str = answerList[i]
    //   let index = str.lastIndexOf("R");
    //   let result = str.substr(index + 1,str.length);
    //   aList.push(this.change[result-1])
    // }
    // let arr = []
    // if(list) {
    //   for( let i = 0; i < list.length/2 ;i++){
    //     arr[i] = {
    //       left: list[i],
    //       answer: aList[i],
    //       right: list[list.length/2+i]
    //     }
    //   }
    //   this.listArr = arr
    // }
  },
  mounted() {
    
    
  },
  methods: {
    lookAnswer() {
      this.showAnswer = !this.showAnswer
    }
  }
}
</script>

<style lang="scss" scoped>
.listen5 {
  background: #fff;
}
.video-box {
  margin-top: 10px;
}

.gap-box {
  margin: 20px auto 0;
  p {
    font-size: 14px;
    font-weight:400;
    color:rgba(0,0,0,0.85);
    line-height:36px;
  }
}
.fonts {
  font-size: 14px;
  font-weight:400;
  color:rgba(0,0,0,0.85);
  line-height:24px;
}

.listen5-main {
  > div {
    p {
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 10px;
    }
    display: inline-block; 
    vertical-align: top;
    &:nth-child(1) {
      width: 200px
    }
    &:nth-child(2) {
      margin-left: 30px;
      width: 400px;
    }
  }
}


</style>

