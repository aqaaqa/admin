<template>
  <div class="read4">
    <ul class="lang3-main">
      <li v-for= "(items, index) in list" :key="index">
        <p>{{items.steam}}</p>
        <p>
          <span v-show="showAnswer">
            {{items.correct}}
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
</style>

