<template>
  <div class="read1">
    <div class="read1-main">
      <div class="read1-article">{{item.article}}</div>
      <ul class="read1-topic">
        <li v-for="(items, index) in list" :key="index">
          <p>
            <span style="display:inline-block; vertical-align:top" :style="{marginLeft:(index > 0 ? '16px': '')}" v-for="(s,index) in items.steam" :key="index" v-html="s"></span>
            <!-- <span style="display:inline-block; vertical-align:top;">{{}}</span> -->
            <!-- <span style="display:inline-block; vertical-align:top" v-html="items.steam[0].replace(/\\n/g,'<br/>')"></span> -->
          </p>
          <p class="read1-changes" :class="items.line ? 'line' : ''">
            <span v-for="(change, indexs) in items.options" :key="indexs" :style="change.indexOf(items.correct[0]+'.') ==0 && showAnswer ? 'color: #409EFF' : ''">
              {{change}}
            </span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {letterArr} from '@/utils/auth'

export default {
  name: 'read1',
  props:{
    itemList: {
      type: Object,
    }
  },
  data() {
    return {
      item: this.itemList,
      list: this.itemList.detail,
      showAnswer: this.itemList.isShow,
      change: letterArr()
    }
  },
  watch: {
    itemList: {
      handler(val) {
        this.item = val
        this.list = val.detail
        this.showAnswer = val.isShow
        this.warps()
      },
      deep: true
      
    },
    
  },
  computed: {
   
  },
  created() {
    this.warps()
  },
  mounted() {
    
    
  },
  methods: {
    lookAnswer() {
      this.showAnswer = !this.showAnswer
    },
    warps() {
      let newArrs = this.list.map(e=> {
        for(let a of e.options){
          if(a.length > 40) {
            return e.line = true
          }
        }
        return e
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.read1-main {
  width: 600px;
  margin-top: 20px;
  font-size: 14px;
  font-weight:400;
  color:rgba(0,0,0,0.85);
  line-height:26px;
}

.read1-topic {
  li {
    padding: 4px 0;
  }
  .read1-changes {
    margin-left: 20px;
    span {
      margin-right: 10px;
    }
  }
  .line {
    span {
      display: block;
    }
  }
}


</style>

