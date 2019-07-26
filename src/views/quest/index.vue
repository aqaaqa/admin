<template>
  <div class="quest-box">
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
    <el-dialog :visible.sync="dialogFormVisible" width="80%">
      <span slot="title">
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
        <language4 v-else-if="partObj.type == '提示填空'" v-model="value7" ref="child" />
        <language5 v-else-if="partObj.type == '选词填空'" ref="child" />
        <language6 v-else-if="partObj.type == '完形填空'" ref="child" />
      </template>
      <template v-else-if="partObj.part == '阅读题'">
        <read1 v-if="partObj.type == '阅读单选'" ref="child" />
        <read2 v-else-if="partObj.type == '选句填空'" ref="child" />
        <read3 v-else-if="partObj.type == '判断'" ref="child" />
        <read4 v-else-if="partObj.type == '简答'" ref="child" />
      </template>
      <template v-else-if="partObj.part == '阅读题'">
        <read1 v-if="partObj.type == '阅读单选'" ref="child" />
        <read2 v-else-if="partObj.type == '选句填空'" ref="child" />
        <read3 v-else-if="partObj.type == '判断'" ref="child" />
        <read4 v-else-if="partObj.type == '简答'" ref="child" v-model="value7"/>
      </template>
      <template v-else-if="partObj.part == '写作题'">
        <read4 v-if="partObj.type == '简答'" ref="child" v-model="value7"/>
        <write2 v-else-if="partObj.type == '作文'" ref="child"/>
      </template>
      <template v-else-if="partObj.part == '口语题'">
        <read4 v-if="partObj.type == '简答'" ref="child" v-model="value7"/>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="opeaArr" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <div class="mian">
      <div v-if="partObj.part">
        <p>{{partObj.part+'—' +partObj.type}}</p>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="题目">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="答案">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div> -->
  </div>
</template>

<script>
import alltopic from '../../components/alltopic'
import { titleOper } from '@/utils/arr'
import { listen1, listen2, listen3, listen4, listen5, language1, language2, language3, language4
,language5, language6, read1, read2, read3, read4, write2 } from '../../components/EditTopic'
import { partType, mulMenu, qestUp } from '@/api/ajax'

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
    alltopic,
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
    read1,
    read2,
    read3,
    read4,
    write2
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
    opeaArr() {
      let obj = this.$refs.child.lists()
      let form = this.$refs.child.form
      let title = titleOper(form.desc)
      this.partObj.name = title[0]
      this.partObj.directions = {
        en: title[1],
        zn: title[2]
      }
      this.partObj = Object.assign(this.partObj, obj)
      console.log(this.partObj)
      // qestUp({data: this.partObj}).then(res => {
      //   console.log(res)
      // })
    },
    handleChange(value) {
      let arr = value.split('|')
      // if(this.value1.length < 1) {
      //   this.$message.error('请选择要添加题目的单元')
      //   return  false
      // }
      this.partObj = {
        type: arr[0],
        part: arr[1],
        qestBase: this.value1[1]
      }
      this.dialogFormVisible = true
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

      console.log(a)
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
</style>


