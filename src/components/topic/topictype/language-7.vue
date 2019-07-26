<template>
  <div>
    <!-- <el-button size="small" @click="look">查看答案</el-button> -->
    <div class="box">
      <div class="left">
        <table>
          <tbody v-html="html" class="danci" :id="item.id">

          </tbody>

        </table>
      </div>

      <div class="right">
        <p v-for="(itemO,index) in item.detail[0].options" :key="index">{{itemO}}</p>
      </div>
    </div>


  </div>
</template>


<script>
  export default {
    data() {
      return {
        isShow: this.itemList.isShow,
        html: '',
        item: this.itemList,
        // item: {
        //   id: 1,
        //   detail: [{
        //     "steam": [
        //        "2.5:8",
        //        "2.6:9",
        //        "3.5:D"
        //     ],
        //     "options": [
        //       "1 to agree with something that just been said ",
        //       "2 a very large number ",
        //       "3 a certain way of being or doing things",
        //       "4 to do something with a goal ",
        //       "5 something that happened before and is remembered ",
        //       "6 part of our body ",
        //       "7 to take something to be true ",
        //       "8 a small part of the whole or the entire thing ",
        //       "9 to end or solve the problem ",
        //       "10 country "
        //     ],
        //     "correct": [
        //       // "1.1:C",
        //       "1.2:(8)",
        //       "2.1:4",
        //       "2.2:p",
        //     ]
        //   }],
        // }

      }
    },
    props: ['itemList'],
    watch:{
      itemList: {
        handler(val) {
          this.item = val
          this.isShow = val.isShow
          this.$nextTick(()=> {
            this.look()
          })
          
        },
        deep: true
      }
    },
    mounted() {
      this.fnInit(this.item.detail[0].steam);
    },
    methods: {
      fnInit(obarr) {
        //document.getElementById(this.item.id).innerHTML = '';
        //var steam = ["2.2:8", "2.1:9", "3.5:D", "3.6:@", "4.3:(5)"];
        var map = {};
        var arr = [];
        var rowMax = 0;
        var colMax = 0;
        var Arr1 = [];
        var Arr2 = [];
        var html = "";
        //var arrLast = [];

        for (let i = 0; i < obarr.length; i++) {
          //key = value  生成map={"1.2":"4"}
          map[obarr[i].split(' ')[0]] = obarr[i].split(' ')[1] //["2.5","8"] ["2.6","9"] ["3.5","9"]
          arr.push(obarr[i].split(' ')[0]); // ["2.5","2.6","3.5"]
          // arrLast.push(steam[i].split(':')[1]); //["8","9","D","@"]
         // map[obarr[i].split(':')[0]] = obarr[i].split(':')[1]
          for (let j = 0; j < arr.length; j++) {
            Arr1.push(arr[j].split('.')[0]);  // rowArr
            Arr2.push(arr[j].split('.')[1]);  // colArr
          }
          var rowMax = Math.max(...Arr1); // 行最大值 4 取出最大值得方法...
          var colMax = Math.max(...Arr2); // 列最大值 6 



        }
        let num = /^[0-9]*$/
        for (let i = 1; i < rowMax + 1; i++) {
          var Tr = '<tr>'
          for (let j = 1; j < colMax + 1; j++) {

            var id = i + '.' + j;
            //有值(8) //有值 且值为数组 不给边框
            if (map[id] && '123456789'.indexOf(map[id].charAt(0)) > -1) {
              var Td = '<td>' + map[id] + '</td>';
            } else if (map[id] && map[id] === '@') {
              // 有值且是@ 放黑色边框 不放入值
              var Td = '<td class="danci view">' + '</td>';
            } else if (map[id] && '123456789'.indexOf(map[id].charAt(0)) > -1 ===false && map[id] !== '@') {

              //不是@ 不是数组 就放入值 加边框
              var Td = '<td class="danci">' + map[id] + '</td>';
            } else {
              //没有值 值拼td 
              var Td = '<td>' + '' + '</td>';
            }
            Tr += Td
          }
          Tr += '</tr>'
          html += Tr
        }
        this.html = html;


      },
      //
      look() {
        //this.fnTest("第二次赋值");
        //删除之前的表格
        if (this.isShow) {
          var newArr = [];
          for (let index = 0; index < this.item.detail[0].steam.length; index++) {
            if (this.item.detail[0].steam[index].indexOf('@') == -1) {
              newArr.push(this.item.detail[0].steam[index])
            }
          }
          this.fnInit(newArr.concat(this.item.detail[0].correct));
        }else{
          this.fnInit(this.item.detail[0].steam)
        }
      }
    }
  }

</script>
<style lange="scss" scoped>
  .wangGe {
    width: 792px;
    height: 80px;
    color: #000
  }

  table {
    border: 1px dashed #ccc;
    /* border-collapse:collapse; */
  }

  .box {
    margin-top: 20px;
  }

  .left {
    margin-bottom: 30px;
    display: inline-block;
    vertical-align: top;
  }

  .right {
   font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    margin-bottom: 10px;
    display:inline-block;
    vertical-align: top;
    margin-left: 30px;
  }

</style>

<style lang="scss">
.left {
  td {
    width: 38px;
    height: 38px;
    text-align: center;
  }
}
  
.radius {
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 50%;
}

.danci {
  border: 1px solid #000;
}

</style>
