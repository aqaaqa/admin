<template>
  <div class="activate">
    <div class="act-box">
      <div class="act-left">
        <img class="" src="@/assets/activates/activates.jpg">
      </div>
      <div class="act-right">
        <p>抱歉您！无权限访问此题库</p>
        <p>输入激活码，立刻获取权限</p>
        <div class="act-input">
          <el-input size="small" v-for="(item,index) in codes" :key="index" :isnull = 'item.isnull' ref="input" type="text" v-model.trim="item.input" maxlength="1" 
          @keyup.native="getCode(item.input, index, $event)" 
          @keydown.native="valueIsNull(item.input, index, $event)">
          </el-input>
        </div>
        <el-button class="btns" size="small" type="primary" @click="submitAct()">激 活</el-button>
        
      </div>
    </div>
  </div>
</template>

<script>
import { validCode } from '@/utils/validate'
import router from '@/router'
import store from '@/store'
import { resetRouter } from '@/router'

export default {
  name: 'activate',
  data() {
    return {
      codes: [
        {input:'',isnull: true},
        {input:'',isnull: true},
        {input:'',isnull: true},
        {input:'',isnull: true},
        {input:'',isnull: true},
        {input:'',isnull: true},
        {input:'',isnull: true},
        {input:'',isnull: true}
      ],
      redirect: undefined,
      base: ''
    }
  },
  created() {
    
  },
  computed: {
      
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
        this.base = route.query.base
      },
      immediate: true
    }
  },
  methods: {
    submitAct() {
      var codeStr = ''
      for(var code of this.codes) {
        if(!code.input) {
          this.$notify({
            title: '提示信息',
            message: '请输入激活码',
            type: 'error'
          })
          return false
        }
        codeStr = codeStr + code.input
      }

      
      store.dispatch('user/getNewRole', { id: this.base ,code: codeStr}).then(res=> {
        // console.log(res)
        this.$notify({
          title: '提示信息',
          message: '激活成功',
          type: 'success'
        })
        resetRouter()
        router.addRoutes(res) //动态添加路由
        router.replace(this.redirect)

        // this.$nextTick(() => {
        // })
      })
    },
    valueIsNull(value, index, event) {
      if(event) {
        if(event.keyCode == 8) {
          if(value) {
            this.codes[index].isnull = false
          }  else {
            this.codes[index].isnull = true
          }
        }
      }
    },
    getCode(value, index, event) {
      if(event) {
        if(event.keyCode == 8 && this.codes[index].isnull && index > 0) {
          this.$refs.input[index-1].focus()
          this.codes[index-1].input = ''
        } 
        // else if (event.keyCode == 37 && index > 0) {
        //   this.$refs.input[index-1].focus()
        // } else if(event.keyCode == 39 && value && index < 7) {
        //   this.$refs.input[index+1].focus()
        // }
      }
      if(value && validCode(value)) {
        if(index < 7) {
          this.$refs.input[index+1].focus()
        }
      } else {
        this.codes[index].input = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.activate {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(240,242,245)
}
.act-box {
  .act-left, .act-right{
    display: inline-block;
    vertical-align: middle;
  }
  
}
.act-left {
  width: 180px;
  margin-right: 20px;
  img {
    width: 100%;
  }
}
.act-right {
  font-size: 14px;
  color: rgb(67,78,89);

  p:nth-child(1) {
    font-size: 20px;
  }
  p:nth-child(2) {
    line-height: 40px;
  }
  .btns {
    margin-top: 16px;
  }
}
</style>

<style lang="scss">
.act-input {
  .el-input {
    width: 32px;
    float: left;
    height: 32px;
    margin-right: 10px;
    input {
      padding: 0px;
      text-align: center;
    }
  }
  // input {
  //   width: 20px;
  //   float: left;
  // }
}
</style>
