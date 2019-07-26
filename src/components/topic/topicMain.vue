<template>
  <div>
    <template v-if="list.part == '听力'">
      <listen2 v-if="list.type == '填空'" :itemList="list"></listen2>
      <listen5 v-else-if="list.type == '匹配'" :itemList="list"></listen5>
    </template>
    <template v-else-if="list.patr == '语言知识运用'">
      <language3 v-if="list.type == '改写'" :itemList="list"></language3>
      <language6 v-else-if="list.type == '提示填空'" :itemList="list"></language6>
    </template>
    <template v-else-if="list.part == '阅读'">
      <read1 v-if="list.type == '提示填空'" :itemList="list"></read1>
      <read4 v-else-if="list.type == '简答'" :itemList="list"></read4>
    </template>
    
    <!-- <div v-else>添加中</div> -->
  </div>
</template>

<script>
import { listen2, listen5, language3, language6, read1, read4} from './topictype'
// import listen2 from './listen-2'
// import listen5 from './listen-5'
// import language3 from './language-3'
// import language6 from './language-6'
// import read1 from './read-1'
// import read4 from './read-4'

export default {
  name: 'topic',
  props:{
    allitem: {
      type: Object,
    },
    isShow: {
      type: boolean
    }
  },
  data() {
    return {
      list: this.allitem,
    }
  },
  watch: {
    allitem:{
      handler(val) {
        this.list = val
      },
      deep: true
    }
  },
  components: {
    listen2,
    listen5,
    language3,
    language6,
    read1,
    read4
  },
  created() {
    
  },
  mounted() {
  },
  methods: {

    
  }
}
</script>

<style>

</style>

