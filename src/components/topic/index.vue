<template>
  <div>
    <div class='topic-tit'>{{list.name}}</div>
    <div class="topic-des" v-if="list.directions && list.directions.en">
      <p>{{list.directions.en}}</p>
      <p>{{list.directions.zh}}</p>
    </div>
    <p v-if="list.title" class="topic-title" v-html="list.title"></p>
    <template v-if="list.part == '听力'">
      <listen1 v-if='list.type == "选择题"' :item='list' />
      <listen2 v-else-if="list.type == '填空题>填空'" :itemList="list"/>
      <listen3 v-else-if='list.type == "填空题>填表格"'  :itemList='list' />
      <listen4 v-else-if='list.type == "判断题"'  :item='list'/>
      <listen5 v-else-if="list.type == '匹配题'" :itemList="list" />
    </template>
    <template v-else-if="list.part == '语言知识运用'">
      <language1 v-if="list.type == '选择题'" :itemList="list" />
      <language2 v-else-if="list.type == '匹配题'" :itemList="list" />
      <language3 v-else-if="list.type == '改写题'" :itemList="list" />
      <language4 v-else-if='list.type == "填空题>单句填空"' :item="list" />
      <language5 v-else-if='list.type == "填空题>短文填空"' :item="list" />
      <language6 v-else-if="list.type == '填空题>提示填空'" :itemList="list" />
      <language7 v-else-if="list.type == '纵横字谜'" :itemList="list" />
      <language8 v-else-if='list.type == "完形填空"' :item="list" />
      <language9 v-else-if='list.type == "排序题"' :itemList="list" />
    </template>
    
    <template v-else-if="list.part == '阅读'">
      <read1 v-if="list.type == '选择题'" :itemList="list" />
      <read2 v-else-if="list.type == '任务型阅读'" :itemList="list" />
      <read3 v-else-if="list.type == '判断题'" :item="list" />
      <read4 v-else-if="list.type == '简答题'" :itemList="list" />
    </template>

    <template v-else-if="list.part == '写作'">
      <read4 v-if="list.type == '翻译'" :itemList="list" />
      <write2 v-else-if="'书面表达,读写结合>读后续写,读写结合>概要写作'.indexOf(list.type) > -1" :itemList="list" />
    </template>

    <template v-else-if="list.part == '口语'">
      <read4 v-if="list.type == '口语简答题'" :itemList="list" />
      <speak3 v-else-if="list.type == '朗读题'" :itemList="list" />
      <speak2 v-else-if="list.type == '讨论题'" :itemList="list" />
      <speak4 v-else-if="'对话题，辩论题'.indexOf(list.type) > -1" :itemList="list" />
      <speak6 v-else-if='list.type == "复述题"'  :item='list'/>
    </template>
    <div class="answer" v-if="list.detail && list.detail[0].correct && list.detail[0].correct[0]">
      答案： 
      <div style="margin-top: 10px;" v-for="(item, index) in list.detail" :key="index">
        <p v-for="(items, indexs) in item.correct" :key="indexs+'.'" v-html="items"></p>
      </div>
    </div>
    <div class="answer" v-if="'听力,口语'.indexOf(list.part) > -1 && list.article">
      听力脚本：
      <p v-html="list.article"></p>
    </div>
  </div>
</template>

<script>
import { listen1, listen3, listen4, listen2, listen5, language1, language2, language3, language4, language5, 
language6, language7, language8, language9, read1, read2, read3, read4, write2,speak2, speak3, speak4, speak5, speak6} from './topictype'

export default {
  name: 'topic',
  props:['allitem'],
  data() {
    return {
      list: {},
    }
  },
  watch: {
    allitem:{
      handler(val) {
        if(val != 1) {
          this.list = val
        }
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
    language9,
    read1,
    read2,
    read3,
    read4,
    write2,
    speak2,
    speak3,
    speak4,
    speak5,
    speak6
  },
  created() {
    if(this.allitem != 1) {
      this.list = this.allitem
    }
  },
  mounted() {
  },
  methods: {
    passVal(data) {
      console.log(data)
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
  width: 480px;
}
.topic-title {
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
  margin-top: 20px;
}
</style>


