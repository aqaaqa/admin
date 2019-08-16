<template>
  <div class="main-wrap" v-loading="audio.waiting">
    <!-- 这里设置了ref属性后，在vue组件中，就可以用this.$refs.audio来访问该dom元素 -->
    <audio ref="audio" class="dn" 
    :src="theUrl" :preload="audio.preload"
    @play="onPlay" 
    @error="onError"
    @waiting="onWaiting"
    @pause="onPause" 
    @timeupdate="onTimeupdate" 
    @loadedmetadata="onLoadedmetadata"
    ></audio>
    <div class="audio-show">
      <el-button type="text" class="play-btn" @click="startPlayOrPause" >
        <svg-icon style="color:#fff;" :icon-class="audio.playing | transPlayPause" />
      </el-button>
      <el-slider v-model="sliderTime" :format-tooltip="formatProcessToolTip" @change="changeCurrentTime" class="slider"></el-slider>
      <div class="play-time">{{ audio.maxTime | formatSecond }}</div>
      <el-button type="text" class="play-speed" @click="changeSpeed">{{audio.speed | transSpeed}}</el-button>
    </div>
  </div>
</template>

<script>
  function realFormatSecond(second) {
    var secondType = typeof second

    if (secondType === 'number' || secondType === 'string') {
      second = parseInt(second)

      var hours = Math.floor(second / 3600)
      second = second - hours * 3600
      var mimute = Math.floor(second / 60)
      second = second - mimute * 60
      if(hours) {
        return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
      } else {
        return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
      }
      
    } else {
      return '00:00'
    }
  }

  export default {
    props: {
      theUrl: {
        type: String,
      },
      theSpeeds: {
        type: Array,
        default () {
          return [1, 2, 3, 4]
        }
      },
      theControlList: {
        type: String,
        default: ''
      }
    },
    name: 'VueAudio',
    data() {
      return {
        // http://freshly-ground.com/data/audio/sm2/water-drop.mp3
        url: this.theUrl || 'http://freshly-ground.com/data/audio/sm2/water-drop.mp3',
        audio: {
          currentTime: 0,
          maxTime: 0,
          playing: false,
          muted: false,
          speed: 1,
          waiting: true,
          preload: 'auto'
        },

        sliderTime: 0,
        volume: 100,
        speeds: this.theSpeeds,

        controlList: {
          // 不显示下载
          noDownload: false,
          // 不显示静音
          noMuted: false,
          // 不显示音量条
          noVolume: false,
          // 不显示进度条
          noProcess: false,
          // 只能播放一个
          onlyOnePlaying: true,
          // 不要快进按钮
          noSpeed: false
        }
      }
    },
    methods: {
      // setControlList () {
      //   // let controlList = this.theControlList.split(' ')
      //   // controlList.forEach((item) => {
      //   //   if(this.controlList[item] !== undefined){
      //   //     this.controlList[item] = true
      //   //   }
      //   // })
      // },
      changeSpeed() {
        let index = this.speeds.indexOf(this.audio.speed) + 1
        this.audio.speed = this.speeds[index % this.speeds.length]
        this.$refs.audio.playbackRate = this.audio.speed
      },
      startMutedOrNot() {
        this.$refs.audio.muted = !this.$refs.audio.muted
        this.audio.muted = this.$refs.audio.muted
      },
      // 音量条toolTip
      formatVolumeToolTip(index) {
        return '音量条: ' + index
      },
      // 进度条toolTip
      formatProcessToolTip(index = 0) {
        index = parseInt(this.audio.maxTime / 100 * index)
        return '进度条: ' + realFormatSecond(index)
      },
      // 音量改变
      changeVolume(index = 0) {
        this.$refs.audio.volume = index / 100
        this.volume = index
      },
      // 播放跳转
      changeCurrentTime(index) {
        this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
      },
      startPlayOrPause() {
        return this.audio.playing ? this.pausePlay() : this.startPlay()
      },
      // 开始播放
      startPlay() {
        this.$refs.audio.play()
      },
      // 暂停
      pausePlay() {
        this.$refs.audio.pause()
      },
      // 当音频暂停
      onPause () {
        this.audio.playing = false
      },
      // 当发生错误, 就出现loading状态
      onError () {
        this.audio.waiting = true
      },
      // 当音频开始等待
      onWaiting (res) {
        // console.log(res)
      },
      // 当音频开始播放
      onPlay (res) {
        // console.log(res)
        this.audio.playing = true
        this.audio.loading = false

        if(!this.controlList.onlyOnePlaying){
          return 
        }

        let target = res.target

        let audios = document.getElementsByTagName('audio');

        [...audios].forEach((item) => {
          if(item !== target){
            item.pause()
          }
        })
      },
      // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
      onTimeupdate(res) {
        // console.log('timeupdate')
        // console.log(res)
        this.audio.currentTime = res.target.currentTime
        this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
      },
      // 当加载语音流元数据完成后，会触发该事件的回调函数
      // 语音元数据主要是语音的长度之类的数据
      onLoadedmetadata(res) {
        // console.log('loadedmetadata')
        // console.log(res)
        this.audio.waiting = false
        this.audio.maxTime = parseInt(res.target.duration)
      }
    },
    filters: {
      formatSecond(second = 0) {
        return realFormatSecond(second)
      },
      transPlayPause(value) {
        return value ? 'pause' : 'play'
      },
      transMutedOrNot(value) {
        return value ? '放音' : '静音'
      },
      transSpeed(value) {
        return value + 'x'
      }
    },
    created() {
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  // .main-wrap{
    // padding: 10px 10px 10px 0;
  // }
  .audio-show {
    width:220px;
    height: 32px;
    line-height: 32px;
    background:rgba(150,29,255,1);
    box-shadow:0px 1px 0px 0px rgba(172,77,255,1);
    border-radius:4px;
  }
  .play-btn {
    vertical-align: middle;
    font-size: 20px;
    color:#fff;
    margin:0 10px;
    display: inline-block;
    padding: 0px;
    &:focus {
      color: #fff;
    }
  }
  .play-time {
    display: inline-block;
    font-size:12px;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
  .play-speed {
    display: inline-block;
    text-align: center;
    line-height: 24px;
    width:28px;
    height:24px;
    background:rgba(150,29,255,1);
    border-radius:3px;
    border:1px solid rgba(127,36,208,1);
    font-size:12px;
    font-weight:500;
    color:rgba(255,255,255,1);
    padding: 0px;
  }
  

  .di {
    display: inline-block;
  }
  .dn{
    display: none;
  }

  
</style>
<style lang="scss">
  .slider {
    display: inline-block;
    vertical-align: middle;
    width: 100px;
    .el-slider__runway {
      margin: 0;
      background: #510099;
    }
    .el-slider__button-wrapper {
      z-index: 0;
    }
    .el-slider__button {
      border:none;
      width: 4px;
      border-radius: 2px;
    }
    .el-slider__bar {
      background: #fff;
    }
  }
  .el-loading-mask {
    z-index: 10;
  }
</style>

