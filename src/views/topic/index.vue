<template>
  <div class="topic-box">
    <el-table
      :data="list"
      size = 'mini'
      border
      style="width: 100%">
      <el-table-column
        prop="qestPart"
        label="类别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="qestType"
        label="题型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="qestName"
        min-width = '200'
        label="题目">
      </el-table-column>
      <el-table-column
        prop="count"
        label="总次数">
      </el-table-column>
      <el-table-column
        prop="username"
        label="使用人">
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
import { qlogList } from '@/api/ajax'

export default {
  data() {
    return {
      list: [],
      page: 1,
      total: 0,
      loading: false,
    }
  },
  created() {
    this.myList()
  },
  methods: {
    choosePage(current) {
			this.page = current
			this.myList()
		},
    myList() {
      this.loading = true
			qlogList({pageNumber: this.page,pageSize: 10}).then( res=> {
        if(!res.data.list.length && this.page > 1) {
          this.page = Number(this.page) -1
          this.myList()
        } else {
          this.total = res.data.totalRow
          this.list = res.data.list
          this.loading = false
        } 
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.topic-box {
  padding: 10px;
}
.pageinat {
  margin-top: 20px;
}
</style>
