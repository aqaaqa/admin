<template>
  <div class="lang6">
    <div class="gap-box" v-for = "(list,index) in list" :key="index" >
      <p v-for="(gap,gapIndex) in list.steam" :key="gapIndex" v-html="gap"></p>
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
    let list = JSON.parse(JSON.stringify(this.item.detail))
    let listFilter = list.map(e=> {
      let replauceList = e.steam.map((j,index) => {
        let c = j.replace(/_+/g,`<i class='lang6-answer'>${e.correct[index]}</i>`)
        j = c
        return j
      })
      e.steam = replauceList
      return e
    })
    this.listFilter = listFilter
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
