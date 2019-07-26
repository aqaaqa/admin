<template>
  <div class="write2">
    <ul class="write2-main">
      <li v-for= "(items, index) in list" :key="index">
        <p v-for= "(art, index1) in items.steam" :key="index1">{{art}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'write2',
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
  width: 600px;
  word-break:break-all;
  p {
    line-height: 28px;
    font-size:14px;
    font-weight:400;
    color:rgba(0,0,0,0.85);
  }
}
</style>

