<template>
  <div>
    <template v-if="list.part == '听力题'">
      <listen1 v-if='list.type == "单选"' :item='list' />
      <listen2 v-else-if="list.type == '填空'" :itemList="list"  />
      <listen3 v-else-if='list.type == "填表格"'  :itemList='list' />
      <listen4 v-else-if='list.type == "判断"'  :item='list'/>
      <listen5 v-else-if="list.type == '匹配'" :itemList="list" />
    </template>
    <template v-else-if="list.part == '语言知识运用'">
      <language1 v-if="list.type == '单选'" :itemList="list" />
      <language2 v-else-if='list.type == "匹配"' :item="list"  />
      <language3 v-else-if="list.type == '改写'" :itemList="list" />
      <language4 v-else-if='list.type == "填空"' :item="list" />
      <language5 v-else-if='list.type == "选词填空"' :item="list" />
      <language6 v-else-if="list.type == '提示填空'" :itemList="list" />
      <language7 v-else-if="list.type == '网格填空'" :itemList="list" />
      <language8 v-else-if='list.type == "完形填空"' :item="list" />
    </template>
    
    <template v-else-if="list.part == '阅读'">
      <read1 v-if="list.type == '阅读单选'" :itemList="list" />
      <read2 v-else-if="list.type == '选句填空'" :itemList="list" />
      <read3 v-else-if="list.type == '判断'" :item="list" />
      <read4 v-else-if="list.type == '简答'" :itemList="list" />
    </template>
  </div>
</template>

<script>
import { listen1, listen3, listen4, listen2, listen5, language1, language2, language3, language4, language5, language6, language7, language8, read1, read2, read3, read4} from './topictype'

export default {
  name: 'topic',
  props:{
    allitem: {
      type: Object,
    },
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
    listen1,
    listen3,
    listen4,
    listen5,
    language1,
    language2,
    language3,
    language4,
    language5,
    language8,
    language6,
    language7,
    read1,
    read2,
    read3,
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

