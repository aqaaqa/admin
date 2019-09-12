<template>
  <div class="lang6">
    <div class="gap-box">
      <p style="line-height: 24px;" v-html="item.article"></p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'lang6',
  props:{
    itemList: {
      type: Object,
    }
  },
  data() {
    return {
      item: this.itemList,
      list: this.itemList.detail,
      listFilter: [],
      showAnswer: this.itemList.isShow,
    }
  },
  watch: {
    itemList: {
      handler(val) {
        this.item = val
        this.list = val.detail
        this.showAnswer = val.isShow
        this.$nextTick(()=> {
          this.lookAnswer()
        })
        
      },
      deep:true
    }
  },
  computed: {
   
  },
  created() {
    
  },
  mounted() {
    
    
  },
  methods: {
    lookAnswer() {
      if(!this.showAnswer) {
        this.list = this.item.detail
      } else {
        this.list = this.listFilter
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/topic/listen2.scss";
.lang6 {
  width: 500px;
}
</style>
<style lang="scss">
.lang6-answer {
  min-width: 56px;
  display:inline-block;
  padding: 0 4px;
  text-align: center;
  border-bottom: 1px solid #000;
  font-style: normal;
  line-height: 14px;
}
</style>
