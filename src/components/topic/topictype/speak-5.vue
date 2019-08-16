<template>
  <div class="write2">
    <div class="write2-main" v-for= "(items, index) in list" :key="index">
      <p v-for= "(art, index1) in items.steam" :key="index1" v-html="art"></p>
      <p v-for= "(option, index2) in items.options" :key="index2" v-html="option"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'speak4',
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
.write2 {
  width: 500px;
  word-break: keep-all;
  word-wrap: break-word;
  p {
    line-height: 28px;
    font-size:14px;
    font-weight:400;
    color:rgba(0,0,0,0.85);
  }
  .padd {
    padding-left: 10px;
  }
}
</style>

