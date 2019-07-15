<template>
<div>
  <el-table
    :data="list"
    v-loading="loading"
    border
    size="mini"
    style="width: 100%; margin:10px; ">
    <el-table-column
      prop="name"
      label="试卷名称"
      min-width="160">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      width="140">
    </el-table-column>
    <el-table-column
      prop="school"
      label="学校">
    </el-table-column>
    <el-table-column
      prop="username"
      label="创建者"
      min-width="200">
    </el-table-column>
    <el-table-column
      prop="paperType"
      min-width="100"
      label="题型">
    </el-table-column>
    <el-table-column
      prop="count"
      label="题目数">
    </el-table-column>
    <el-table-column
      prop="score"
      label="总分">
    </el-table-column>
    <el-table-column
      min-width="280"
      label="操作">
      <div slot-scope="scope">
        <el-button type="text" size="mini" @click="exportWord(scope.row.paperId)">
          <svg-icon :icon-class="'word'" />
          导出为word文档
        </el-button>
        <el-button type="text" size="mini" @click="toEdit(scope.row.paperId)">
          <svg-icon :icon-class="'form'" />
          编辑
        </el-button>
        <el-button type="text" size="mini" style="color: #ff3B30" @click="delPaper(scope.row.paperId)">
          <svg-icon :icon-class="'del'" />
          删除
        </el-button>
      </div>
    </el-table-column>
  </el-table>

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
</div>
  
</template>

<script>
import { myPaper, paperDel, paperInfo } from '@/api/mytopic'
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      loading: false,
      page: 1,
      total: 0,
      list : [],
      info: {}
    }
  },
  computed: {
    ...mapGetters([
      'role'
    ])
  },
  created() {
    this.myList()
    paperInfo().then(res=> {
      this.info = res.data
    })
  },
  methods: {
    exportWord(id) {
      const { ip, port, addr} = this.info
      let url = window.location.href
      let ports = url.substring(0, url.indexOf('/#'))
      let a = document.createElement('a')
      a.href =`${ports}${addr}?paperId=${id}`
      a.click();
    },
    delPaper(id) {
      paperDel({id:id}).then(res=> {
        this.$notify({
          title: '提示信息',
          message: '删除成功',
          type: 'success'
        })
        this.myList()
      })
    },
    toEdit(id) {
      this.$store.dispatch('page/setPaper', id).then(()=> {
        this.$router.push(this.role[0].children[0].path)
      })
    },
    choosePage(current) {
			this.page = current
			this.myList()
		},
    myList() {
      this.loading = true
			myPaper({pageNumber: this.page,pageSize: 10}).then( res=> {
        if(res.data.papers.length < 1 && this.page > 1) {
          this.page = this.page--
          this.myList()
        } else {
          this.total = res.data.totalRow
          this.list = [] = res.data.papers
          this.loading = false
        } 
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .pageinat {
    margin: 20px 0;
  }
</style>
