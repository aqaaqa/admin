<template>
<div class="table-box">
  <el-button type="primary" @click="addSchoolBtn" size="mini">添加册</el-button>
  <el-table
    :data="list"
    v-loading="loading"
    border
    size="mini"
    style="width: 100%; margin-top: 10px;">
    <el-table-column
      prop="name"
      label="名称"
      min-width="160">
    </el-table-column>
    <el-table-column
      prop="baseCode"
      label="code码"
      min-width="100">
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
        <el-button type="text" size="mini" @click="toEdit(scope.row)">
          编辑
        </el-button>
        <!-- <el-button type="text" size="mini" style="color: #ff3B30" @click="delSchool(scope.row.tenantId)">
          删除
        </el-button> -->
        <el-button type="text" size="mini" style="color: #67C23A" @click="addUnitBtn(scope.row.baseCode)">
          添加单元
        </el-button>
        <el-button type="text" size="mini" style="color: #67C23A" @click="lookUnit(scope.row,scope.$index,0)">
          查看单元
        </el-button>
        <el-button type="text" size="mini" style="color: #ff3B30" @click="addCodeBtn(scope.row.baseId)">
          添加激活码
        </el-button>
        <el-button type="text" size="mini" style="color: #ff3B30" @click="lookUnit(scope.row,scope.$index,1)">
          查看激活码
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


  <el-dialog :title="value == 1 ? '添加' : '编辑'" :visible.sync="dialogFormVisible">
    <el-form :model="form" size="mini">
      <el-form-item label="名字" :label-width="formLabelWidth">
        <el-input v-model="form.m_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="code码" :label-width="formLabelWidth">
        <el-input maxlength="3" v-model="form.m_baseCode" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-radio v-model="form.m_status" label="1">开启</el-radio>
        <el-radio v-model="form.m_status" label="0">关闭</el-radio>
      </el-form-item>
    </el-form>
    <p style="color: red; font-size:14px; margin-bottom: 10px; text-align:left;">
      注：每册至少必须有一个单元，请尽快添加单元
    </p>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="addSchool()" size="mini" :loading="loading1">确 定</el-button>
    </div>
  </el-dialog>

  <el-dialog title="添加单元" :visible.sync="dialogFormVisible1">
    <el-form :model="unit" size="mini">
      <el-form-item label="名字" :label-width="formLabelWidth">
        <el-input v-model="unit.u_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="code码" :label-width="formLabelWidth">
        <el-input maxlength="6" v-model="unit.u_baseCode" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-radio v-model="unit.u_status" label="1">开启</el-radio>
        <el-radio v-model="unit.u_status" label="0">关闭</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible1 = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="addUnit()" size="mini" :loading="loading1">确 定</el-button>
    </div>
  </el-dialog>
  
  <el-dialog title="添加激活码" :visible.sync="dialogFormVisible3">
    <el-form :model="code" size="mini">
      <el-form-item label="数量" :label-width="formLabelWidth">
        <el-input-number v-model="code.count" :min="1" label=""></el-input-number>
      </el-form-item>
    </el-form>
    <p style="color: red; font-size:14px; margin-bottom: 10px; text-align:left;">
      注：根据输入的数值，生成对应个数激活码
    </p>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible3 = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="addCode()" size="mini" :loading="loading1">确 定</el-button>
    </div>
  </el-dialog>

  <el-dialog width="80%" :visible.sync="dialogTableVisible2">
    <span slot="title">
      {{this.dialogTableVisible2 ? `${this.list[index].name}　单元` : ''}}
    </span>
    <units :base="base" />
  </el-dialog>
  <el-dialog width="80%" :visible.sync="dialogTableVisible4">
    <span slot="title">
      {{this.dialogTableVisible4 ? `${this.list[index].name}　激活码` : ''}}
    </span>
    <codes :base="base" />
  </el-dialog>
</div>
  
</template>

<script>
import { bookList, addBook, editBook, addUnit, addCode } from '@/api/ajax'
import units from '@/components/unit'
import codes from '@/components/code'

export default {
  data(){
    return{
      loading: false,
      loading1: false,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogTableVisible2: false,
      dialogFormVisible3: false,
      dialogTableVisible4: false,
      base: {},
      index: '',
      page: 1,
      total: 0,
      list : [],
      info: {},
      form: {
        m_name: '',
        m_baseCode: '',
        m_status: '1'
      },
      unit: {
        u_name: '',
        u_baseCode: '',
        m_baseCode: '',
        u_status: '1'
      },
      code: {
        m_baseId: '',
        count: 1
      },
      value: 1,
      formLabelWidth: '100px',
    }
  },
  components:{
    units,
    codes
  },
  created() {
    this.myList()
  },
  methods: {
    addCodeBtn(id) {
      this.code = {
        m_baseId: id,
        count: ''
      }
      this.dialogFormVisible3 = true
    },
    addCode() {
      let code = this.code
      if(!code.count) {
        this.$message.error('请输入大于0的值')
        return false
      }
      code.count = Number(code.count)
      this.loading1 = true
      addCode(code).then(res => {
        this.$notify({
          title: '提示信息',
          message: '激活码添加成功',
          type: 'success'
        })
        this.dialogFormVisible3 = false
        this.loading1 = false
      }).catch(() => {
        this.$notify({
          title: '提示信息',
          message: '激活码添加失败',
          type: 'error'
        })
        this.loading1 = false
      })
    },
    toEdit(row) {
      this.value = 0
      let list = JSON.parse(JSON.stringify(row))
      this.form.m_name = row.name
      this.form.m_baseCode = row.baseCode
      this.form.m_status = row.status == '1' ? '1' : '0'
      console.log(this.form.m_status)
      this.form.m_baseId = row.baseId
      this.dialogFormVisible = true
    },
    lookUnit(row, index,val) {
      this.index = index
      this.base = {
        baseId: row.baseId,
        baseCode: row.baseCode
      }
      if(val == 0) {
        this.dialogTableVisible2 = true
      } else {
        this.dialogTableVisible4 = true
      }
      
    },
    addUnitBtn(code) {
      this.dialogFormVisible1 = true
      this.unit = {
        u_name: '',
        u_baseCode: code,
        m_baseCode: code,
        u_status: '1'
      }
    },
    addSchoolBtn() {
      this.dialogFormVisible = true
      this.value = 1
      this.form = {
        m_name: '',
        m_baseCode: '',
        m_status: '1'
      }
    },
    // delSchool(id) {
    //   tantDel({tenantId: id}).then(res => {
    //     console.log(res)
    //     this.$notify({
    //       title: '提示信息',
    //       message: '删除成功',
    //       type: 'success'
    //     })
    //     this.myList()
    //   })
    // },

    addUnit() {
      var msg = null
      for(var i in this.unit) {
        if(!this.unit[i]) {
            msg = '资料不能为空'
        }
      }
      if(msg) {
          this.$message.error(msg)
          return false
      }
      this.loading1 = true
      addUnit(this.unit).then(res => {
        this.$notify({
          title: '提示信息',
          message: '添加成功',
          type: 'success'
        })
        this.loading1 = false
        this.dialogFormVisible1 = false
      }).catch(() => {
        this.$notify({
          title: '提示信息',
          message: '添加失败',
          type: 'error'
        })
        this.loading1 = false
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
      if(this.value == 1) {
        addBook(this.form).then(res => {
          this.$notify({
            title: '提示信息',
            message: '添加成功',
            type: 'success'
          })
          this.loading1 = false
          this.dialogFormVisible = false
          this.page =1 
          this.myList()
          
        }).catch(() => {
          this.$notify({
            title: '提示信息',
            message: '添加失败',
            type: 'error'
          })
          this.loading1 = false
        })
      } else {
        editBook(this.form).then(res => {
        this.$notify({
          title: '提示信息',
          message: '修改成功',
          type: 'success'
        })
        this.loading1 = false
        this.dialogFormVisible = false
        this.myList()
        
      }).catch(() => {
        this.$notify({
          title: '提示信息',
          message: '修改失败',
          type: 'error'
        })
        this.loading1 = false
      })
      }
      
    },
    choosePage(current) {
			this.page = current
			this.myList()
		},
    myList() {
      this.loading = true
			bookList({pageNumber: this.page,pageSize: 10}).then( res=> {
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
  .table-box {
    padding: 10px;
  }
  .pageinat {
    margin: 20px 0;
  }
</style>
