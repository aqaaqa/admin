<template>
  <div class="main-box">
    <sticky :z-index="10">
      <div class="title-box">
        <el-button v-if="saves.paperId" type="primary" icon="el-icon-back" size="mini" @click="backPaper"></el-button>
        <el-radio-group size="mini" v-model="postion">
          <el-radio-button label="all">全部试题</el-radio-button>
          <el-badge v-if="count > 0" :value="count" class="item">
            <el-radio-button label="change">已选试题</el-radio-button>
          </el-badge>
          <el-radio-button v-else label="change">已选试题</el-radio-button>
        </el-radio-group>
        <div style="display:inline-block" v-show="postion == 'change'">
          <el-button v-show= '!saves.paperId' style="margin-left: 12px;" v-popover:popover2 type="primary" size = "mini" plain>
            <svg-icon :icon-class="'word'" />
            导出为word文档
          </el-button>
          <el-button v-show= 'saves.paperId' style="margin-left: 12px;" v-popover:popover type="primary" size = "mini" plain>
            <svg-icon :icon-class="'word'" />
            保存
          </el-button>
          <el-button type="danger" size = "mini" plain @click="removeAll()">
            <svg-icon :icon-class="'remove'" />
            移除全部
          </el-button>

          <el-tag style="margin-left: 20px;"  type="warning">当前试卷总分：{{score}}</el-tag>
        </div>
      </div>
    </sticky>

    <!-- 导出保存试卷 -->
    <el-popover
      ref="popover2"
      placement="bottom-start"
      width="320"
      trigger="click"
      v-model="visible2">
      <div class="saveCache">
        <p>试卷名称</p>
        <el-input style="margin: 10px 0;" v-model.trim="topicName" size="mini" placeholder="请输入试卷名称"></el-input>
        <!-- <el-checkbox v-model="checked">同时保存在我的试卷中</el-checkbox> -->
        <div style="text-align: right; margin-top: 10px">
          <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
          <el-button type="primary" size="mini" @click="exportPaper" :loading="loading">确定</el-button>
        </div>
      </div>
    </el-popover>

    <!-- 修改保存试卷 -->
    <el-popover
      ref="popover"
      placement="bottom-start"
      width="320"
      trigger="click"
      v-model="visible">
      <div class="saveCache">
        <div class="radios">
          <el-radio v-model="radio" label="1">保存为新试卷</el-radio>
          <el-radio v-model="radio" label="2">覆盖当前试卷</el-radio>
        </div>
        <p>试卷名称</p>
        <el-input v-if= 'radio == 2' style="margin: 10px 0;" :disabled="radio == 2" v-model.trim="saves.paperName" size="mini" placeholder="请输入试卷名称"></el-input>
        <el-input v-else style="margin: 10px 0;" v-model.trim="name" size="mini" placeholder="请输入试卷名称"></el-input>
        <div style="text-align: right; margin-top: 10px">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="savePaper" :loading="loading1">确定</el-button>
        </div>
      </div>
    </el-popover>
    <template>
      <alltopic v-if=" postion == 'all'" @changeTab="changeTabs"></alltopic>
      <changetopic v-else-if="postion == 'change'" @changeTab="changeTabs" @savepapers='papers' :clear = "clear"></changetopic>
    </template>

  </div>
</template>

<script>
import Alltopic from '@/components/alltopic'
import changetopic from '@/components/changetopic'
import { mapGetters } from 'vuex'
import Sticky from '@/components/Sticky' // 粘性header组件
import { cacheDelall, paprerWord } from '@/api/topic'
import { paperSave } from '@/api/mytopic'

export default {
  filters: {
    
  },
  data() {
    return {
      loading: false,
      loading1: false,
      postion: 'all',
      clear: false,
      topicName: '',
      name: this.radio == 2 ? this.saves.paperName : '',
      visible2: false,
      visible: false,
      checked: true,
      radio: '1',
      saves: {
        paperName: '',
        count: '',
        paperId: ''
      }
    }
  },
  components: {
    Alltopic,
    changetopic,
    Sticky
  },
  computed: {
    ...mapGetters([
      'count',
      'score',
      'changeTab',
      'paper'
    ]) 
  },
  created() {
    // this.$store.dispatch('page/setTab', 'all')
    if(this.paper) {
      this.postion = 'change'
    }
    
  },
  methods: {
    backPaper(){
      this.$router.push('/paper/index')
    },
    papers(data) {
      this.saves = data
    },
    changeTabs() {
      this.postion == 'all' ? this.postion = 'change' : this.postion = 'all'
      // console.log(this.postion)
    },
    //保存或者生成新的
    savePaper() {
      
      let data = {}
      //1 保存   2覆盖
      if(this.radio == 1) {
        if(!this.name) {
          this.$message({
            message: '请输入文件名',
            type: 'error'
          })
          return false
        }
        data.name = this.name
      } else {
        data.name = this.saves.paperName
        data.paperId = this.saves.paperId
      }
      this.loading1 = true
      paperSave(data).then(res=> {
        this.$notify({
          message: '保存成功',
          type: 'success'
        })
        this.loading1 = false
        this.visible = false
        this.$store.dispatch('page/setPaper', '')
        this.$router.push('/paper/index')
      }).catch(() => {
        this.$message({
          message: '试卷保存失败',
          type: 'error'
        })
        this.loading1 = false
      })
      
      
    },
    //转成word
    exportPaper() {
      if(!this.topicName) {
        this.$message({
          message: '请输入文件名',
          type: 'error'
        })
        return false
      }
      this.loading = true
      paperSave({name: this.topicName}).then(res=>{
        const { port, ip, addr, paperId } = res.data
        this.$message({
          message: '试题成功保存到我的试卷',
          type: 'success'
        })
        this.loading = false
        this.visible2 = false
        let url = window.location.href
        let ports = url.substring(0, url.indexOf('/#'))
        // 'http://' + ip + ':' + ip + addr + '?paperId = ' + paperId
        let a = document.createElement('a')
        a.href =`${ports}${addr}?paperId=${paperId}`
        a.click();
      }).catch(() => {
        this.$message({
          message: '试卷保存失败',
          type: 'error'
        })
        this.loading = false
      })
    },
    removeAll() {
      cacheDelall().then( res=> {
        this.clear = true
        this.$store.dispatch('page/setCount', res.data.count)
        this.$store.dispatch('page/setScore', 0)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .main-box {
    min-width: 800px;
    min-height: 100%;
    margin: 0 auto;
    padding: 10px;
    
  }
  .saveCache {
    .radios {
      margin: 10px 0;
    }
    > p:nth-child(1) {
      font-size:14px;
      font-weight:400;
      color:rgba(19,20,21,1);
    }
  }
</style>
<style lang="scss">
.title-box {
  background: rgb(240,242,245);
  padding: 10px 0;
  .el-radio-button:first-child .el-radio-button__inner {
    border-radius: 0;
  }
}
</style>



