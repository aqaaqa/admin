<template>
  <div>
    <el-button type="primary" @click="addUnit" size="mini">添加激活码</el-button>
    <el-table
      :data="list"
      v-loading="loading"
      border
      size="mini"
      style="width: 100%; margin-top: 10px;">
      <el-table-column
        prop="activeKey"
        label="激活码"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        min-width="140">
      </el-table-column>
      <el-table-column
        prop="school"
        label="状态">
        <template slot-scope="scope">
          {{scope.row.status | filterStatus}}
        </template>
      </el-table-column>
      <el-table-column
        min-width="200"
        label="操作">
        <div slot-scope="scope">
          <el-button type="text" size="mini" @click="toEdit(scope.row)">
            编辑
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

    <el-dialog :title="icon == 1 ? '添加激活码' : '编辑激活码'" :visible.sync="inner" append-to-body>
      <template v-if="icon ==1">
        <el-form :model="code" size="mini">
          <el-form-item label="数量" :label-width="formLabelWidth">
            <el-input-number v-model="code.count" :min="1" label=""></el-input-number>
          </el-form-item>
        </el-form>
        <p style="color: red; font-size:14px; margin-bottom: 10px; text-align:left;">
          注：根据输入的数值，生成对应个数激活码
        </p>
      </template>
      <template v-else-if="icon == 0">
        <el-form :model="edit" size="mini">
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-radio v-model="edit.status" label="0">未发售</el-radio>
            <el-radio v-model="edit.status" label="1">发售中</el-radio>
            <el-radio v-model="edit.status" label="2">已激活</el-radio>
            <el-radio v-model="edit.status" label="3">禁用</el-radio>
          </el-form-item>
        </el-form>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="inner = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addCode()" size="mini" :loading="loading1">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { codeList, addCode, editUnit, deleteUnit, codeEdit } from '@/api/ajax'
export default {
  props:['base'],
  data() {
    return {
      code: {
        m_baseId: '',
        count: 1
      },
      edit: {
        codeId: '',
        status: '0'
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
        this.page = 1
        this.unitList()
      },
      deep: true
      
    }
  },
  filters: {
    filterStatus(val) {
      let text
      switch (val) {
        case '1':
          text = "发售中";
          break; 
        case '2':
          text = "已激活";
          break; 
        case '3':
          text = "禁用";
          break; 
        default: 
            text = "未发售";
      } 
      return text
    }
  },
  created() {
    this.unitList()
  },
  methods: {
    addCode() {
      if(this.icon == 1) {
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
          this.inner = false
          this.loading1 = false
          this.page = 1
          this.unitList()
        }).catch(() => {
          this.$notify({
            title: '提示信息',
            message: '激活码添加失败',
            type: 'error'
          })
          this.loading1 = false
        })
      } else {
        codeEdit(this.edit).then(res=> {
          this.$notify({
            title: '提示信息',
            message: '激活码状态修改成功',
            type: 'success'
          })
          this.inner = false
          this.loading1 = false
          this.unitList()
        }).catch(() => {
          this.$notify({
            title: '提示信息',
            message: '激活码状态修改失败',
            type: 'error'
          })
          this.loading1 = false
        })
      }
      
    },
    addUnit() {
      this.icon = 1
      this.inner = true
       this.code = {
        m_baseId: this.bases.baseId,
        count: ''
      }
    },
    toEdit(row) {
      let rows = JSON.parse(JSON.stringify(row))
      this.edit = {
        codeId: rows.codeId,
        status: rows.status
      }
      this.icon = 0
      this.inner = true
    },
    delUnit(row) {
      deleteUnit({baseId: row.u_baseId, bankId: row.u_bankId}).then(res=> {
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
			codeList({m_baseId: this.bases.baseId, pageNumber: this.page, pageSize: 5}).then( res=> {
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
