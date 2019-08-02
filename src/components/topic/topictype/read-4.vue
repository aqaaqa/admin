<template>
  <div class="read4">
    <p v-if="item.part == '阅读题'" v-html="item.article" class="article-main"></p>
    <ul class="lang3-main">
      <li v-for= "(items, index) in list" :key="index">
        <p v-html="items.steam[0]"></p>
        <p>
          <span v-show="showAnswer" v-html="items.correct">
          </span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'read4',
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
    }
  },
  watch: {
    itemList: {
      handler(val) {
        this.item = val
        this.list = val.detail
        this.showAnswer = val.isShow
      },
      deep:true
      
    },
    
  },
  computed: {
   
  },
  created() {
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
  @import "~@/styles/topic/lang3.scss";
  .read4 {
    width: 100%;
  }
  .article-main {
    font-size: 14px;
    line-height: 26px;
  }
</style>

