<template>
  <div class="lang3">
    <ul class="lang3-main">
      <li v-for="(item,index) in list" :key="index">
        <p>{{item}}</p>
        <p>
          <span v-show="showAnswer">
            {{answer[index]}}
          </span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'lang3',
  props:{
    itemList: {
      type: Object,
    }
  },
  data() {
    return {
      item: this.itemList,
      list: this.itemList.detail[0].steam,
      answer: this.itemList.detail[0].correct,
      listArr: [],
      showAnswer: this.itemList.isShow
    }
  },
  watch: {
    itemList:{
      handler(val) {
        this.item = val
        this.list = val.detail[0].steam
        this.answer = val.detail[0].correct
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
 
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/topic/lang3.scss";
</style>
<style lang="scss">
</style>
