<template>
  <div class="role-box">
    <el-table :data="listData" border size="mini" v-loading = 'loading'>
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column prop="role" label="角色">
      </el-table-column>
      <el-table-column label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="toEdit(scope.row)">
            <svg-icon :icon-class="'form'" />
            编辑
          </el-button>
        </template>
      </el-table-column>

    </el-table>


    <div class="pageinat">
      <el-pagination background size="mini" layout="prev, pager, next" @current-change="choosePage" :page-size="10"
        :total="Number(total)" :current-page.sync="page">
      </el-pagination>
    </div>


    <el-dialog :title="username" :visible.sync="dialogFormVisible">
      <el-checkbox-group v-model="checked" @change="checkedChange">
        <el-checkbox v-for="option in options" :label="option.roleName" :key="option.roleId" :value="option.roleId">

        </el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="Submit()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import {
    getAllUser,
    getAllRole,
    modify
  } from '@/api/role'
  import {
    mapGetters
  } from 'vuex'

  export default {
    data() {
      return {
        username: '',
        //修改角色的入参
        objParams: {
          userId: '',
          roleArr: [],
        },
        loading: false,
        isChange: false,//判断用户是否编辑过角色的变量
        checked: [],//当前用户拥有的角色
        options: [],//所有用户的所有角色
        listData: [],
        dialogFormVisible: false,
        total: 0,
        page: 1,
      }
    },
    computed: {

    },
    created() {
      this.myList();
      getAllRole().then(res => {
        var roleList = res.data.roles;
        this.options = [];
        roleList.forEach(element => {
          this.options.push({
            "roleId": element.roleId,
            "roleName": element.roleName
          });
        });
      });
    },
    methods: {
      /**
       * 查询所有用户角色信息
       */
      myList(val) {
        val = val == undefined ? 1 : val
        this.loading = true
        getAllUser({
          "pageNumber": val,
          "pageSize": 10
        }).then(res => {
          this.listData = res.data.list
          this.total = res.data.total;
          this.loading = false
        })
      },
      /**
       * 分页 页码改变
       */
      choosePage(current) {
        this.myList(current);
      },
      /**
       * 点击编辑按钮 查询所有用户的所有角色
       */
      toEdit(row) {
        this.username = row.username
        this.objParams.userId = row.userId
        this.dialogFormVisible = true
        //如果用户没有角色 赋值为空数组
        if (row.roleIdArr === null) {
          this.checked = [];
        } else {
          this.checked = row.role.split(",")
        }
        // 查询所有用户的所有角色
        
      },
      /**
       * 编辑角色
       */
      checkedChange(val) {
        this.isChange = true;  //为ture证明修改过角色 
        this.objParams.roleArr = [];
        var flag;
        // console.log(val); //val:是roleName的数组  ["All","specail"] 
         //两个for循环 替换成了对应的roleId的数组 保存在 this.objParams.roleArr
        for (let i = 0; i < val.length; i++) {
          flag = true;
          for (let j = 0; j < this.options.length; j++) {
            if (val[i] == this.options[j].roleName) {
              flag = false;
              this.objParams.roleArr.push(this.options[j].roleId)
              break;
            }
          }
        }
        // console.log(this.objParams.roleArr);
      },
      /**
       * 确定 修改当前用户角色
       */
      Submit() {
        //编辑过角色 isChange为true的时候 才掉修改角色的接口
        if (this.isChange) {
          modify(this.objParams).then(res => {
            if (res.status == 1) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.page = 1;
              this.myList();

            } else {
              this.$message({
                message: '修改失败',
                type: 'error'
              })
            }
          })
          this.isChange = false;
          this.dialogFormVisible = false;
        } else {
          //如果用户没有改变过角色 就不需要掉修改角色的接口
          this.dialogFormVisible = false;
          //alert('我没有掉接口');
        }
      },
    }
  }

</script>

<style lang="scss">
.role-box {
  padding: 10px;
}
.pageinat {
  margin: 20px 0;
}

</style>
