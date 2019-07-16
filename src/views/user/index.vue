<template>
<div class="table-box">
  <el-button type="primary" @click="addSchoolBtn" size="mini">添加用户</el-button>
  <el-table
    :data="list"
    v-loading="loading"
    border
    size="mini"
    style="width: 100%; margin-top: 10px;">
    <el-table-column
      prop="username"
      label="用户名"
      min-width="180">
    </el-table-column>
    <el-table-column
      prop="fullName"
      label="全称"
      min-width="120">
    </el-table-column>
    <el-table-column
      prop="name"
      label="所属学校"
      min-width="120">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      min-width="200">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话"
      min-width="140">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
      <template slot-scope="scope">
        {{scope.row.status == 1 ? '开启' : '关闭'}}
      </template>
    </el-table-column>
    <el-table-column
      min-width="200"
      label="操作">
      <div slot-scope="scope">
        <el-button type="text" size="mini" @click="toEdit(scope.row)">
          <svg-icon :icon-class="'form'" />
          编辑
        </el-button>
        <el-button type="text" size="mini" style="color: #ff3B30" @click="delSchool(scope.row.userId)">
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


  <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
    <el-form :model="form" size="mini">
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model.trim="form.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input maxlength="11" v-model.trim="form.mobile" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属学校" :label-width="formLabelWidth">
        <el-select v-model="form.tenantId" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.tenantId"
            :label="item.fullName"
            :value="item.tenantId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model.trim="form.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" :label-width="formLabelWidth">
        <el-input v-model.trim="form.confirm" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible1 = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="addSchool()" size="mini" :loading="loading1">确 定</el-button>
    </div>
  </el-dialog>

  <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible1">
    <el-form :model="form1" size="mini">
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model.trim="form1.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input maxlength="11" v-model.trim="form1.mobile" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属学校" :label-width="formLabelWidth">
        <el-select v-model="form1.tenantId" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.tenantId"
            :label="item.fullName"
            :value="item.tenantId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model.trim="form1.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-radio v-model="form1.status" label="1">开启</el-radio>
        <el-radio v-model="form1.status" label="0">关闭</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible1 = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="editSchool()" size="mini" :loading="loading1">确 定</el-button>
    </div>
  </el-dialog>
</div>
  
</template>

<script>
import { validUsername, validPhone, validEmail, validPass } from '@/utils/validate'
import { userList, userAdd, userDel, userSchool, userEdit } from '@/api/ajax'
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      loading: false,
      loading1: false,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      page: 1,
      total: 0,
      list : [],
      info: {},
      form: {
        email: '',
        mobile: '',
        password:'',
        confirm: '',
        tenantId: ''
      },

      form1: {},
      options: [],
      formLabelWidth: '100px',
      
    }
  },
  computed: {
    
  },
  created() {
    this.myList()
    userSchool().then( res=> {
      this.options = res.data
    })
  },
  methods: {
    toEdit(row) {
      this.form1 = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible1 = true
    },
    addSchoolBtn() {
      this.dialogFormVisible = true
    },
    delSchool(id) {
      userDel({userId: id}).then(res => {
        this.$notify({
          title: '提示信息',
          message: '删除成功',
          type: 'success'
        })
        this.myList()
      })
    },
    editSchool() {
      var msg = null
      for(var i in this.form1) {
        if(i == 'tenantId') {
            if(this.form1[i] === '' ) {
              msg = '请填写完整信息'
            }
        }

        if(i == 'email') {
          if(!validEmail(this.form1[i])) {
              msg = '邮箱格式错误'
          }
        }

        if(i == 'mobile') {
          if(!validPhone(this.form1[i])) {
              msg = '号码格式错误'
          }
        }

        if(i == 'password') {
          if(!validPass(this.form1[i])) {
              msg = '请输入6-16位密码，可包含数字字母'
          }
        }
      }
      if(msg) {
          this.$message.error(msg)
          return false
      }
      userEdit(this.form1).then(res => {
        this.$notify({
          title: '提示信息',
          message: '修改成功',
          type: 'success'
        })
        this.loading1 = false
        this.dialogFormVisible = false
        this.myList()
        
      }).catch(() => {
        this.loading1 = false
        this.$notify({
          title: '提示信息',
          message: '修改失败',
          type: 'error'
        })
      })
    },
    addSchool() {
      var msg = null
      for(var i in this.form) {
        if(!this.form[i] && i != 'tenantId') {
            msg = '请填写完整信息'
        }

        if(i == 'tenantId') {
            if(this.form[i] === '' ) {
              msg = '请填写完整信息'
            }
        }

        if(i == 'email') {
          if(!validEmail(this.form[i])) {
              msg = '邮箱格式错误'
          }
        }

        if(i == 'mobile') {
          if(!validPhone(this.form[i])) {
              msg = '号码格式错误'
          }
        }

        if(i == 'password') {
          if(!validPass(this.form[i])) {
              msg = '请输入6-16位密码，可包含数字字母'
          } else if(this.form.password!= this.form.confirm) {
              msg = '密码不一致，请重新输入'
          }
        }
      }
      
      if(msg) {
          this.$message.error(msg)
          return false
      }
      this.loading1 = true
      userAdd(this.form).then(res => {
        this.$notify({
          title: '提示信息',
          message: '添加成功',
          type: 'success'
        })
        this.loading1 = false
        this.dialogFormVisible = false
        this.form = {}
        this.page =1 
        this.myList()
        
      }).catch(() => {
        this.loading1 = false
        this.$notify({
          title: '提示信息',
          message: '添加失败',
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
			userList({pageNumber: this.page,pageSize: 10}).then( res=> {
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
