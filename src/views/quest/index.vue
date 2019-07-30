<template>
  <div>
    <div class="titles">
      <div>
        <label class="lable1"><i class='hint-text'>必选项*</i>选择添加单元：</label>
        <el-cascader
          size="mini"
          :options="options"
          :show-all-levels="false"
          v-model="value1"
        ></el-cascader>
      </div>
      <div>
        <label class="lable1">选择题型：</label>
        <el-select size="mini" v-model="value7" placeholder="请选择" @change="handleChange">
          <el-option-group
            v-for="group in options3"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item"
              :label="item"
              :value="item+'|'+group.label">
            </el-option>
          </el-option-group>
        </el-select>
      </div>
    </div>

    <!-- 添加题目模块 -->
    <div class="main-boxs">
      <div v-show='value7' class="topic-module">
        <span slot="title" class="topic-title">
          {{partObj.part ? `${partObj.part}—${partObj.type}` : ''}}
        </span>
        <!-- 题型 -->
        <template v-if="partObj.part == '听力题'">
          <listen1 v-if="partObj.type == '单选'" ref="child" />
          <listen2 v-else-if="partObj.type == '判断'" ref="child" />
          <listen3 v-else-if="partObj.type == '填空'" ref="child" />
          <listen4 v-else-if="partObj.type == '匹配'" ref="child" />
          <listen5 v-else-if="partObj.type == '填表格'" ref="child" />
        </template>
        <template v-else-if="partObj.part == '语言知识运用'">
          <language1 v-if="partObj.type == '单选'" ref="child" />
          <language2 v-else-if="partObj.type == '匹配'" ref="child" />
          <language3 v-else-if="partObj.type == '改写'" ref="child" />
          <language4 v-else-if="partObj.type == '提示填空'" ref="child" />
          <language5 v-else-if="partObj.type == '短文填空'" ref="child" />
          <language6 v-else-if="partObj.type == '完形填空'" ref="child" />
          <language7 v-else-if="partObj.type == '单句填空'" ref="child" />
          <language8 v-else-if="partObj.type == '网格填空'" ref="child" />
        </template>
        <template v-else-if="partObj.part == '阅读题'">
          <read1 v-if="partObj.type == '阅读单选'" ref="child" />
          <read2 v-else-if="partObj.type == '选句填空'" ref="child" />
          <read3 v-else-if="partObj.type == '判断'" ref="child" />
          <read4 v-else-if="partObj.type == '简答'" ref="child" v-model="value7"/>
        </template>
        <template v-else-if="partObj.part == '写作题'">
          <write2 v-if="partObj.type == '作文'" ref="child"/>
          <read4 v-else-if="partObj.type == '简答'" ref="child" v-model="value7"/>
        </template>
        <template v-else-if="partObj.part == '口语题'">
          <read4 v-if="partObj.type == '简答'" ref="child" v-model="value7"/>
          <speak2 v-else-if="partObj.type == '朗读'" ref="child"/>
          <speak3 v-else-if="partObj.type == '讨论'" ref="child"/>
          <speak4 v-else-if="partObj.type == '对话'" ref="child"/>
          <speak5 v-else-if="partObj.type == '辩论'" ref="child"/>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="opeaArr" size="mini">查 看</el-button>
        </div>
      </div>
      <div class="show-topic" v-show="value7">
        <span slot="title" class="topic-title">
          {{partObj.part ? `${partObj.part}—${partObj.type}展示` : ''}}
        </span>
        <div class="topic-main">
          <topic ref= 'shows' :allitem = 'partObj' />
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submits" size="mini">提 交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { titleOper } from '@/utils/arr'
import { listen1, listen2, listen3, listen4, listen5, language1, language2, language3, language4, language5, 
language6, language7, language8, read1, read2, read3, read4, write2, speak2, speak3, speak4, speak5 } from '../../components/EditTopic'
import { partType, mulMenu, qestUp } from '@/api/ajax'
import topic from '../../components/topic/index'
export default {
  data() {
    return {
      textarea: '',
      list: [],
      options3: [],
      options:[],
      value7: '',
      value1: [],
      partObj: {},
      dialogFormVisible: false,
    }
  },
  components: {
    topic,
    listen1,
    listen2,
    listen3,
    listen4,
    listen5,
    language1,
    language2,
    language3,
    language4,
    language5,
    language6,
    language7,
    language8,
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
    partType().then(res=> {
      let list = res.data
      for(let e in list) {
        this.options3.push({
          label: e,
          options: list[e]
        })
      }
    })
    mulMenu().then(res=> {
      this.options = res.data.options
    })
  },
  methods: {
    handleClose() {
      this.dialogFormVisible = false; 
      this.value7= ''
      this.partObj.part= ''
    },
    submits() {
      this.opeaArr('show')
      qestUp({data: this.partObj}).then(res => {
        this.$message.success('添加成功')
        this.value7 = ''
      })
    },
    opeaArr(val) {
      let obj = this.$refs.child.lists()
      if(obj) {
        let form = this.$refs.child.form
        let title = titleOper(form.desc)
        this.partObj.name = title[0]
        this.partObj.directions = {
          en: title[1],
          zh: title[2]
        }
        this.partObj = Object.assign(this.partObj, obj)
        if(val != 'show') {
          this.$refs.shows.passVal(this.partObj)
        }
      }
      
    },
    handleChange(value) {
      let arr = value.split('|')
      if(this.value1.length < 1) {
        this.value7= ''
        this.$message.error('请选择要添加题目的单元')
        return  false
      }

      this.partObj = {
        type: arr[0],
        part: arr[1],
        qestBase: this.value1[1]
      }
      this.$nextTick(() => {
        this.opeaArr()
      })
      
      
    },
    show() {
      this.list = this.textarea.split('#')
      let a = this.list.map(e=> {
        let b = {
          text: e,
          change: e.split('\n')
        }
        
        return b
      })
    }
  }

  
}
</script>

<style lang="scss" scoped>
.titles {
  font-size: 14px;
  margin: 10px;
  > div {
    display: inline-block;
    margin-right: 30px;
  }
  
  .lable1{
    font-weight: normal;
    margin-right: 5px;
    i {
      margin-right: 10px;
    }
  }
} 
.text {
  width: 700px;
  padding: 10px;
  p {
    padding:10px 0;
    line-height: 28px;
  }
}
.main-boxs {
  min-width: 1000px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.topic-module, .show-topic {
  width: 48%;
  min-width: 500px;
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 0 10px;
  vertical-align: top;
  .topic-title {
    height: 14px;
    line-height: 28px;
    color: rgb(79, 192, 141);
  }
}
.show-topic {
  width: 50%;
  margin:0 10px 0 0px;
  min-height: 200px;
}
.topic-main {
  width: 98%;
  margin: auto;
  word-wrap:break-word;

}
.dialog-footer {
  text-align: right;
}
</style>


