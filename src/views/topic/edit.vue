<template>
  <div class="main-box">
    <sticky :z-index="10">
      <div class="title-box">
        <el-button style="margin-left: 12px;" v-popover:popover2 type="primary" size = "mini" plain>
          <svg-icon :icon-class="'word'" />
          导出为word文档
        </el-button>
        <el-button type="danger" size = "mini" plain @click="removeAll()">
          <svg-icon :icon-class="'remove'" />
          移除全部
        </el-button>
        <el-tag style="margin-left: 20px;"  type="warning">当前试卷总分：{{score}}</el-tag>
      </div>
    </sticky>

    <!-- 保存试卷 -->
    <el-popover
      ref="popover2"
      placement="bottom-start"
      width="320"
      trigger="click"
      v-model="visible2">
      <div class="saveCache">
        <p>试卷名称</p>
        <el-input style="margin: 10px 0;" v-model.trim="topicName" size="mini" placeholder="请输入试卷名称"></el-input>
        <el-checkbox v-model="checked">同时保存在我的试卷中</el-checkbox>
        <div style="text-align: right; margin-top: 10px">
          <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
          <el-button type="primary" size="mini" @click="exportPaper">确定</el-button>
        </div>
      </div>
    </el-popover>
    <paper :clear = "clear" />
  </div>
</template>

<script>
import Alltopic from '@/components/alltopic'
import paper from '@/components/paper'
import { mapGetters } from 'vuex'
import Sticky from '@/components/Sticky' // 粘性header组件
import { paprerWord } from '@/api/topic'
import { paperDelall } from '@/api/mytopic'


export default {
  filters: {
    
  },
  data() {
    return {
      postion: 'all',
      clear: false,
      topicName: '',
      visible2: false,
      checked: true
    }
  },
  components: {
    Alltopic,
    paper,
    Sticky
  },
  computed: {
    ...mapGetters([
      'count',
      'score',
      'paper'
    ]) 
  },
  created() {
  },
  methods: {
    //转成word
    exportPaper() {
      if(!this.topicName) {
        this.$message({
          message: '请输入文件名',
          type: 'error'
        })
        return false
      }
      window.open('http://192.168.0.3/paper/download')
      // paprerWord().then(res=>{
      //   // this.$message({
      //   //   message: '保存成功',
      //   //   type: 'success'
      //   // })
      //   // this.visible2 = false
      //   console.log(res)
      // })
    },
    removeAll() {
      paperDelall({paperId: this.paper}).then( res=> {
        this.clear = true
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



