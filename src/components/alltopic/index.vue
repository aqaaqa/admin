<template>
  <div class="alltopic-box" v-loading.fullscreen.lock="loading">
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import TopicMain from '../topic/index'
// import { questList, cacheAdd, questTypes, cacheRep } from '@/api/topic'

export default {
  name: 'alltopic',
  data() {
    return {
      // search: {
      //   input: '',
      //   radio: '1',
      //   name: '',
      //   difficulty: ''
      // },
      list: [],
      total: 0,
      page: 1,
      types: [],
      radio: '全部',
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'pageId',
      'changeTopic'
    ])
  },
  watch: {
    radio(val) {
      this.page = 1
      if(val == '全部') {
        this.pageList('')
      } else {
        this.pageList(val)
      }
    }
  },
  components: {
    TopicMain
  },
  methods: {
    searchBtn() {
    },
    lookAnswer(index) {
      let keys = JSON.parse(JSON.stringify(this.list[index]))
      keys.isShow = !keys.isShow
      this.$set(this.list,[index],keys)
    },
    openTopic(index) {
      this.list[index].opentopic = !this.list[index].opentopic
      this.list = [...this.list] 
    },

		choosePage(current) {
			this.page = current
			this.pageList()
		},
		pageList(types) {
      // this.loading = true
			// questList({id: this.pageId,pageNumber: this.page,pageSize: 10, type: types}).then( res=> {
      //   this.total = res.data.totalRow
      //   this.list = [] = res.data.qests
      //   this.$store.dispatch('page/setCount', res.data.count)
      //   this.list.forEach(e=> {
      //     e.isShow = false;
      //     e.opentopic = false;
      //   })
      //   this.loading = false
      // }).catch(()=> {
      //   this.loading = false
      // })
    },
    addTopic(id) {
    //   if(this.changeTopic) {
    //     cacheRep({did: this.changeTopic, rid: id}).then(res=> {
    //       this.$message({
    //         message: '替换成功',
    //         type: 'success'
    //       })
    //       this.$store.dispatch('page/setTopic', '')
    //       this.$emit('changeTab')
    //     })
    //   } else {
    //     cacheAdd({id:id}).then( res => {
    //       this.$store.dispatch('page/setCount', res.data.count)
    //       this.$message({
    //         message: '添加成功',
    //         type: 'success'
    //       })
    //       this.pageList()
    //     })
    //   } 
      
    }
  },
  created() {
    // this.pageList()
    // questTypes().then( res=> {
    //   this.types = res.data
    //   this.types.unshift('全部')

    // })
  },
  mounted() {
    
  }
}
</script>
<style lang="scss" scoped>
.alltopic-box {
  // background: #fff;
  margin-top: 15px;
  height: 100%;
}

.check-title {
  font-size: 14px;
  font-weight: normal;
  margin-right: 20px;
  width: 60px;
  vertical-align: top;
}
.check-center {
  line-height: 36px;
}

.check-right {
  width: calc(100% - 85px);
  display: inline-block;
  vertical-align: top;
}
.check-main {
  border-top: 1px dashed #ccc;
  border-bottom: 1px dashed #ccc;
  padding: 20px 20px 0 0;
}
.select-check {
  margin-top: 20px;
  .select-right {
    display: inline-block;
    width: calc(100% - 100px);
    > div {
      display: inline-block;
      
    }
    >div:nth-child(1) {
      margin-right: 30px;
    }
  }
  .select-title {
    color: #606266;
    font-weight: normal;
    font-size: 14px;
    margin-right: 15px;
  }
}

.pageinat {
  margin: 30px 0;

}
.items-height {
  max-height: 200px;
  overflow: hidden;
}

.show-allheight{
  height: 100%;
  max-height: 100%;
  overflow: auto;
}
.show-topic-btn {
  float: right;
} 

.all-main {
  .all-main-list {
    position: relative;
  }
  .add-btn {
    position: absolute;
    top: 10px;
    right: 15px;
  }
  &-list {
    background:rgba(255,255,255,1);
    border-radius:2px;
    margin-top: 20px;
    padding: 15px 15px 0;
  }
  &-btn1 {
    float: right
  }
  &-bottom {
    height: 40px;
    line-height: 40px;
    border-top: 1px dashed #D9D9D9;
    font-size:14px;
    font-weight:400;
    color:rgba(0,0,0,1);
    margin-top: 20px;
    span {
      margin-right: 40px;
    }
  }
}
.null-topic {
  width: 100%;
  border: 1px solid #D9D9D9;
  padding: 30px 0;
  text-align: center;
  background: #fff;
  margin-top: 30px;
  font-size:14px;
  font-weight:500;
  color:rgba(0,0,0,0.85);
}
</style>
<style lang="scss">
  .search-input{
  width: 70%;
  margin: 20px auto;
  text-align: center;
  .el-input {
    width: 80%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    input {
      border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    }
  }
  .el-button {
    margin-left: -5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

.search-check {
  background: #fff;
  padding: 20px;
  .el-radio {
    // margin-right: 0px;
    margin-bottom: 18px;
    margin-right: 15px;
  }
  .el-radio__inner {
    display: none;
  }
}
</style>


