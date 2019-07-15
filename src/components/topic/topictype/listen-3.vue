<template>
  <div>
    <table cellspacing="0" cellspadding="0" border="0" :id='itemList.id'>
      <tbody v-html="html" class="listen-3-border"></tbody>
    </table>
  </div>
</template>



<script>
  export default {
    data() {
      return {
        isShow: this.itemList.isShow,
        detailW: JSON.parse(JSON.stringify(this.itemList.detail[0])),
        str: '',
        first: '',
        last: '',
        index: 0,
        html: '',
        arr: [],
        Arr: []
      }
    },
    props: ['itemList'],
    watch: {
      itemList: {
        handler(val) {
          this.detailW = JSON.parse(JSON.stringify(val.detail[0]))
          this.isShow = val.isShow
          this.$nextTick(() => {
            this.viewAnswer()
          })
          
        },
        deep: true
      }
    },
    mounted() {
      this.PinJie(this.Arr);
    },
    methods: {
      viewAnswer() {
        if (this.isShow) {
          let lineList = document.getElementById(this.itemList.id).querySelectorAll('.line');
          for (let index = 0; index < lineList.length; index++) {
            lineList[index].value = this.detailW.correct[index];
          }
        }else{
           let lineList = document.getElementById(this.itemList.id).querySelectorAll('.line');
          for (let index = 0; index < lineList.length; index++) {
            lineList[index].value = index+1
          }
        }

      },
      look() {

        let that = this
        let arr2 = [];
        for (let index = 0; index < this.arr.length; index++) {
          let a = this.arr[index].replace(/(_)+(\d)?(_)+/g, function (a) {
            return that.correct[0]
          });
          arr2.push(a);
        }

        that.Arr = arr2;
        this.PinJie(that.Arr);

      },
      //拼接html的方法
      PinJie(arr) {
        this.str = this.detailW.steam[this.detailW.steam.length - 1].split(" ")[0]
        this.first = this.str.split(".")[0] //最大行数
        this.last = this.str.split(".")[1] //最大列数

        this.detailW.steam.forEach(element => {
          arr.push(element.substring(element.indexOf(" ") + 1));
        });
        let f = 0;
        for (let i = 0; i < this.first; i++) { //3 6
          let tr = '<tr>'
          for (let j = 0; j < this.last; j++) {
            let td = '<td>' +
              arr[this.index].replace(/___\d+___/g, function (v) {
                f++
                return '<input type="text" class="line" value="' + f + '"/>'
              }) +
              '</td>'
            tr += td
            this.index++
          }
          tr += '</tr>'
          this.html += tr
        }
      },


    }
  }

</script>

<style lang="scss" scoped>
  .title {
    color: #000;
  }

  table {
    border-collapse: collapse;
    margin-top: 20px;
  }

</style>
<style lang="scss">
  .listen-3-border {
    font-size: 14px;
    font-weight:400;
    color:rgba(0,0,0,0.85);
    input {
      border: none;
      width: 80px;
      text-align: center;
      color: rgba(0,0,0,0.85);
      border-bottom: 1px solid rgba(0,0,0,0.85);
    }
    tr {
      td {
        border: 1px solid #ccc;
        width: 240px;
        height: 100px;
        padding-left: 5px;
      }
    }

    tr:first-child {
      td {
        width: 240px;
        height: 38px;

      }

    }

  }

</style>
