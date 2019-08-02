<template>
  <div v-loading.fullscreen.lock="loading">
    <div class="titles">
      <div>
        <label class="lable1">选择单元：</label>
        <el-cascader
          size="mini"
          :options="options"
          :show-all-levels="false"
          v-model="value1"
          value = 'id'
          placeholder="选择单元"
          @change="handleChange"
        ></el-cascader>
      </div>
      <div>
        <label class="lable1">选择类型：</label>
        <el-select v-model="value3" size="mini" clearable placeholder="请选择" @change="handleChange">
          <el-option
            v-for="item in options3"
            :key="item.label"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </div>
      <div>
        <label class="lable1">选择题型：</label>
        <el-select size="mini" v-model="value7" clearable placeholder="请选择" @change="handleChange">
          <el-option-group
            v-for="group in options3"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-option-group>
        </el-select>
      </div>
    </div>
    <div class="topic-main">
      <div v-for="(item,index) in list" :key = "index" class="topic-main-box">
        <div class="topic-top">
          <el-button type="primary" size="mini" @click="editqest(item)">编辑</el-button>
          <el-button type="danger" size="mini" @click="delBtn(item.id)">删除</el-button>
        </div>
        <div class="items-height" :class="item.opentopic ? 'show-allheight' : ''">
          <topic :allitem = 'item'/>
        </div>
        <div class="show-topic-btn">
          <el-button v-if="item.opentopic" type="text" size="mini" @click="openTopic(index)">收起<i class="el-icon-arrow-up el-icon--right"></i></el-button>
          <el-button v-else type="text" size="mini" @click="openTopic(index)">展开<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        </div>
      </div>
    </div>

    <div class="pageinat">
      <el-pagination background
        size="mini"
        :current-page="page"
        layout="prev, pager, next"
        @current-change="choosePage"
        :total="total"
        :page-size="10">
      </el-pagination>
    </div>
    <el-dialog
      title="编辑试题"
      :visible.sync="dialogVisible"
      :fullscreen = true
      :before-close="handleClose">
      <qestedit ref="qest" :lists = "part"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini">取 消</el-button>
        <el-button type="primary" @click="submits" size="mini">提 交</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
import { partType, mulMenu, qestList, qestDel, qestEdit } from '@/api/ajax'
import topic from '../../components/topic/index'
import qestedit from '../../components/qestedit'

export default {
  data() {
    return {
      loading: false,
      list: [],
      options3: [],
      options:[],
      value7: '',
      value3: '',
      value1: [],
      qest: {},
      ids: '',
      page: 1,
      total: 0,
      part:{},
      dialogVisible: false
    }
  },
  components: {
    topic,
    qestedit
  },
  created() {
    partType().then(res=> {
      let list = res.data
      for(let e in list) {
        this.options3.unshift({
          label: e,
          options: list[e]
        })
      }
    })
    mulMenu().then(res=> {
      this.options = res.data.options
      
      this.value1.push(this.options[0].value)
      this.value1.push(this.options[0].children[0].value)
      this.qestList()
    })
  },
  mounted() {
    
  },
  methods:{
    handleClose() {
      this.part = ''
      this.dialogVisible = false
    },
    submits() {
      let datas = this.$refs.qest.submits()
      if(datas) {
        qestEdit({data: datas}).then(res => {
          this.$message.success('修改成功')
          this.handleClose()
          this.qestList()
        })
      }
      
    },
    editqest(list) {
      this.part = list
      this.dialogVisible = true
    },
    delBtn(id) {
      qestDel({id: id}).then(res=> {
        this.$message.success('删除成功')
        this.qestList()
      })
    },
    handleChange(value) {
      this.page = 1
      this.qestList()
    },
    choosePage(current) {
			this.page = current
			this.qestList()
    },
    openTopic(index) {
      this.list[index].opentopic = !this.list[index].opentopic
      this.list = [...this.list] 
    },
    qestList() {
      if(this.value1.length > 0) {
        let a = this.options.filter(e=> { return e.value == this.value1[0]})
        let b = a[0].children.filter(e => { return e.value == this.value1[1] })
        this.ids = b[0].id
      } else {
        this.ids = ''
      }
      this.qest = {
        id: this.ids,
        part: this.value3,
        type: this.value7,
        pageNumber: this.page,
        pageSize: 10
      }
      this.loading = true
			qestList(this.qest).then( res=> {
        if(!res.data.qests.length && this.page > 1) {
          this.page = Number(this.page) -1
          this.qestList()
        } else {
          this.total = res.data.totalRow
          this.list = res.data.qests
          this.list.forEach(e=> {
          e.opentopic = false;
        })
          this.loading = false
        } 
      }).catch(()=> {
        this.loading = false
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
.topic-main-box {
  background: #fff;
  border: 1px solid #ccc;
  margin: 20px;
}
.topic-top, .show-topic-btn {
  text-align: right;
  background: rgb(240, 240, 240);
  padding: 10px;
} 
.show-topic-btn {
  padding: 5px 10px;
}
.items-height {
  max-height: 200px;
  overflow: hidden;
  padding: 10px 30px;
}

.show-allheight{
  height: 100%;
  max-height: 100%;
  overflow: auto;
}
</style>
