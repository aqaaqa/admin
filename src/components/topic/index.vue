<template>
  <div style="width:500px;">
    <div class='topic-tit'>{{list.name}}</div>
    <div class="topic-des" v-if="list.directions && list.directions.en">
      <p>{{list.directions.en}}</p>
      <p>{{list.directions.zh}}</p>
    </div>
    <template v-if="list.part == '听力题'">
      <listen1 v-if='list.type == "单选"' :item='list' />
      <listen2 v-else-if="list.type == '填空'" :itemList="list"  />
      <listen3 v-else-if='list.type == "填表格"'  :itemList='list' />
      <listen4 v-else-if='list.type == "判断"'  :item='list'/>
      <listen5 v-else-if="list.type == '匹配'" :itemList="list" />
    </template>
    <template v-else-if="list.part == '语言知识运用'">
      <language1 v-if="list.type == '单选'" :itemList="list" />
      <language2 v-else-if="list.type == '匹配'" :itemList="list" />
      <language3 v-else-if="list.type == '改写'" :itemList="list" />
      <language4 v-else-if='list.type == "单句填空"' :item="list" />
      <language5 v-else-if='list.type == "短文填空"' :item="list" />
      <language6 v-else-if="list.type == '提示填空'" :itemList="list" />
      <language7 v-else-if="list.type == '网格填空'" :itemList="list" />
      <language8 v-else-if='list.type == "完形填空"' :item="list" />
    </template>
    
    <template v-else-if="list.part == '阅读题'">
      <read1 v-if="list.type == '阅读单选'" :itemList="list" />
      <read2 v-else-if="list.type == '选句填空'" :itemList="list" />
      <read3 v-else-if="list.type == '判断'" :item="list" />
      <read4 v-else-if="list.type == '简答'" :itemList="list" />
    </template>

    <template v-else-if="list.part == '写作题'">
      <read4 v-if="list.type == '简答'" :itemList="list" />
      <write2 v-else-if="list.type == '作文'" :itemList="list" />
    </template>

    <template v-else-if="list.part == '口语题'">
      <read4 v-if="list.type == '简答'" :itemList="list" />
      <speak3 v-else-if="list.type == '朗读'" :itemList="list" />
      <speak2 v-else-if="list.type == '讨论'" :itemList="list" />
      <speak4 v-else-if="'对话，辩论'.indexOf(list.type) > -1" :itemList="list" />
    </template>

    <div class="answer" v-if="list.type != '网格填空' && list.detail && list.detail[0].correct">
      答案： 
      <div v-for="(item, index) in list.detail" :key="index">
        <p v-for="(items, indexs) in item.correct" :key="indexs+'.'">{{items}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { listen1, listen3, listen4, listen2, listen5, language1, language2, language3, language4, language5, language6, language7, language8, read1, read2, read3, read4,
write2,speak2, speak3, speak4, speak5} from './topictype'

export default {
  name: 'topic',
  props:{
    allitem: {
      type: Object,
    },
  },
  data() {
    return {
      list: {},
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
    read4,
    write2,
    speak2,
    speak3,
    speak4,
    speak5
  },
  created() {
    
  },
  mounted() {
  },
  methods: {
    passVal(data) {
      this.list = Object.assign({}, data)
    }
    
  }
}
</script>

<style lang="scss" scoped>
.topic-tit {
  font-size: 14px;
  line-height: 28px;
}
.topic-des {
  font-size: 14px;
  width: 480px;
  padding: 10px;
  line-height: 24px;
  border: 1px solid rgb(247, 205, 18);
  background:rgb(233, 235, 142);
}
.answer {
  font-size: 14px;
  line-height: 26px;
}
</style>


