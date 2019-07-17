<template>
  <div>
    <el-button type="primary" @click="addUnit" size="mini">添加单元</el-button>
    <el-table
      :data="list"
      v-loading="loading"
      border
      size="mini"
      style="width: 100%; margin-top: 10px;">
      <el-table-column
        prop="u_name"
        label="名称"
        min-width="160">
      </el-table-column>
      <el-table-column
        prop="u_baseCode"
        label="code码"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="school"
        label="状态">
        <template slot-scope="scope">
          {{scope.row.u_status == 1 ? '开启' : '关闭'}}
        </template>
      </el-table-column>
      <el-table-column
        min-width="200"
        label="操作">
        <div slot-scope="scope">
          <el-button type="text" size="mini" @click="toEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="text" size="mini" style="color: #ff3B30" @click="delUnit(scope.row)">
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
        :page-size="5">
      </el-pagination>
    </div>

    <el-dialog :title="icon == 1 ? '添加单元' : '修改单元'" :visible.sync="inner" append-to-body>
      <el-form :model="units" size="mini">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="units.u_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="code码" :label-width="formLabelWidth">
          <el-input maxlength="6" v-model="units.u_baseCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio v-model="units.u_status" label="1">开启</el-radio>
          <el-radio v-model="units.u_status" label="0">关闭</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="inner = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addUnits()" size="mini" :loading="loading1">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { unitList, addUnit, editUnit, deleteUnit } from '@/api/ajax'
export default {
  props:['base'],
  data() {
    return {
      units: {
        u_name: '',
        u_baseCode: '',
        m_baseCode: '',
        u_status: 1
      },
      icon: 1,
      formLabelWidth: '120px',
      inner: false,
      page: 1,
      total: 0,
      list: [],
      loading: false,
      loading1: false,
      bases: this.base,
    }
  },
  watch: {
    base: {
      handler(val) {
        this.bases = val
        this.unitList()
      }
      
    }
  },
  created() {
    this.unitList()
  },
  methods: {
    addUnits() {
      var msg = null
      for(var i in this.units) {
        if(i == 'u_name') {
          if(!this.units[i]) {
            msg = '名称不能为空'
          }
        }
        if( i == 'u_baseCode') {
          if(this.units[i].length < 6) {
            msg = '请输入6位code码'
          }
        }
      }
      if(msg) {
          this.$message.error(msg)
          return false
      }
      this.loading1 = true
      if(this.icon == 1) {
        addUnit(this.units).then(res => {
          this.$notify({
            title: '提示信息',
            message: '添加成功',
            type: 'success'
          })
          this.loading1 = false
          this.inner = false
          this.page = 1
          this.unitList()
        }).catch(() => {
          this.$notify({
            title: '提示信息',
            message: '添加失败',
            type: 'error'
          })
          this.loading1 = false
        })
      } else {
        editUnit(this.units).then(res => {
          this.$notify({
            title: '提示信息',
            message: '修改成功',
            type: 'success'
          })
          this.loading1 = false
          this.inner = false
          this.unitList()
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
    addUnit() {
      this.inner = true
      this.units = {
        u_name: '',
        u_baseCode: this.bases.baseCode,
        m_baseCode: this.bases.baseCode,
        u_status: '1'
      }
      this.icon = 1
    },
    toEdit(row) {
      this.units = JSON.parse(JSON.stringify(row))
      this.icon = 0
      this.inner = true
    },
    delUnit(row) {
      deleteUnit({baseId: row.u_baseId, bankId: row.u_bankId}).then(res=> {
        console.log(res)
        this.$notify({
          title: '提示信息',
          message: '删除成功',
          type: 'success'
        })
        this.unitList()
      })
    },
    choosePage(current) {
			this.page = current
			this.unitList()
		},
    unitList() {
      this.loading = true
			unitList({m_baseId: this.bases.baseId, pageNumber: this.page, pageSize: 5}).then( res=> {
        if(!res.data.list.length && this.page > 1) {
          this.page = Number(this.page) -1
          this.unitList()
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
.pageinat {
  margin-top: 20px;
}
</style>
<style>
.el-loading-mask {
  z-index: 100;
}
</style>
