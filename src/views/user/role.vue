<template>
<div class="table-box">
  <el-button type="primary" @click="addSchoolBtn" size="mini">添加学校</el-button>
  <el-table
    :data="list"
    v-loading="loading"
    border
    size="mini"
    style="width: 100%; margin-top: 10px;">
    <el-table-column
      prop="fullName"
      label="学校全称"
      min-width="160">
    </el-table-column>
    <el-table-column
      prop="name"
      label="学校简称"
      min-width="160">
    </el-table-column>
    <el-table-column
      prop="dsc"
      label="描述"
      width="140">
    </el-table-column>
    <el-table-column
      prop="school"
      label="状态">
      <template slot-scope="scope">
        {{scope.row.status == 1 ? '开启' : '关闭'}}
      </template>
    </el-table-column>
    <el-table-column
      min-width="280"
      label="操作">
      <div slot-scope="scope">
        <!-- <el-button type="text" size="mini" @click="exportWord(scope.row.paperId)">
          <svg-icon :icon-class="'word'" />
          导出为word文档
        </el-button> -->
        <el-button type="text" size="mini" @click="toEdit(scope.row)">
          <svg-icon :icon-class="'form'" />
          编辑
        </el-button>
        <el-button type="text" size="mini" style="color: #ff3B30" @click="delSchool(scope.row.tenantId)">
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


  <el-dialog title="添加学校" :visible.sync="dialogFormVisible">
    <el-form :model="form" size="mini">
      <el-form-item label="学校全称" :label-width="formLabelWidth">
        <el-input v-model="form.fullName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="学校缩写" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input v-model="form.desc" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-radio v-model="form.status" label="1">开启</el-radio>
        <el-radio v-model="form.status" label="0">关闭</el-radio>
      </el-form-item>
      
      
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="addSchool()" size="mini" :loading="loading1">确 定</el-button>
    </div>
  </el-dialog>
</div>
  
</template>

<script>
import { tantList, tantAdd, tantDel } from '@/api/ajax'
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      loading: false,
      loading1: false,
      dialogFormVisible: false,
      page: 1,
      total: 0,
      list : [],
      info: {},
      form: {
        name: '',
        desc: '',
        fullName:'',
        status: '1'
      },
      value: 1,
      formLabelWidth: '100px'
    }
  },
  computed: {
    
  },
  created() {
    this.myList()
  },
  methods: {
    toEdit(row) {
      this.value = 0
      this.form = JSON.parse(JSON.stringify(row))
      this.form.desc = row.dsc
      this.dialogFormVisible = true
    },
    addSchoolBtn() {
      this.dialogFormVisible = true
      this.value = 1
      this.form = {
        name: '',
        desc: '',
        fullName:'',
        status: '1'
      }
    },
    delSchool(id) {
      tantDel({tenantId: id}).then(res => {
        console.log(res)
        this.$notify({
          title: '提示信息',
          message: '删除成功',
          type: 'success'
        })
        this.myList()
      })
    },
    addSchool() {
      var msg = null
      for(var i in this.form) {
        if(!this.form[i]) {
            msg = '资料不能为空'
        }
      }
      if(msg) {
          this.$message.error(msg)
          return false
      }
      this.loading1 = true
      tantAdd(this.form).then(res => {
        this.$notify({
          title: '提示信息',
          message: this.value == 1 ? '添加成功' : '修改成功',
          type: 'success'
        })
        this.loading1 = false
        this.dialogFormVisible = false
        for(var i in this.form) {
          if(i == 'status') {
            i = 1
          }else {
            i = ''
          }
        }
        if(this.value == 1) {
          this.page =1 
        } 
        this.myList()
        
      }).catch(() => {
        this.$notify({
          title: '提示信息',
          message: this.value == 1 ? '添加失败' : '修改失败',
          type: 'error'
        })
      })
    },
    choosePage(current) {
			this.page = current
			this.myList()
		},
    myList() {
      this.loading = true
			tantList({pageNumber: this.page,pageSize: 10}).then( res=> {
        if(res.data.list.length < 1 && this.page > 1) {
          this.page = this.page--
          this.myList()
        } else {
          this.total = res.data.total
          this.list = [] = res.data.list
          this.loading = false
        } 
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-box {
    padding: 10px;
  }
  .pageinat {
    margin: 20px 0;
  }
</style>
