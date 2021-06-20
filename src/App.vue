<template>
  <div id="app">
    <nav-bar v-show="!$route.meta.hideNav"></nav-bar>
    <search-input  v-show="!$route.meta.hideSearch"></search-input>
    <!-- tab切换动画 -->
    <!-- <transition 
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    > -->
      <keep-alive>
        <router-view 
          @play="play"
          @playMenu="playMenu"
          @addPlayList="addPlayList"
          :musicObj="musicObj"
        ></router-view>
      </keep-alive>
    <!-- </transition> -->
    <!-- <keep-alive>
      <router-view @play="play"></router-view>
    </keep-alive> -->
    <!-- 播放器 -->
    <play-music 
      :musicObj="musicObj"
      :playList="playList"
      @toggleMusicId="toggleMusicId"
    ></play-music>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import SearchInput from '@/components/SearchInput'
import PlayMusic from '@/components/PlayMusic'
import  defaultPic from '@/assets/image/album.jpeg'
export default {
  components:{
    NavBar,
    SearchInput,
    PlayMusic,
  },
  data(){
    return{
      // musicID:0,
      musicObj:null,
      // 播放列表
      playList:[],
    }
  },
  
  methods:{
    play(event){
      // 判断歌曲对象是否有对象, 没有就拿专辑
      if(!event.picUrl && event.song && event.song.album){
        event.picUrl = event.song.album.picUrl;
      }
      // console.log('需要的歌曲信息',event);
      // 默认图片
      if(!event.picUrl){
        event.picUrl = defaultPic;
      }
      
      this.musicObj = event;
      // 加入歌单
      let isPush = true;
      this.playList.map(d => {
        // 歌曲已存在
        if(d.id == event.id){
          isPush = false;
        }
      });
      if(isPush){
        this.playList.push(event);
      }
      // console.log(this.playList);
    },
    toggleMusicId(event){
      // console.log(event);
      this.play(event);
    },

    playMenu(event){
      // console.log(event);
      if(this.playList.length == 0){
        this.play(event[0]);
      }
      // 去重
      let arr = this.playList.concat(event);
      let newArr = [];
      for(let i = 0; i < arr.length; i++){
        if(newArr.indexOf(arr[i]) == -1){
          newArr.push(arr[i]);
        }
      }
      this.playList = newArr;
      // this.play(newArr[0]);
    },
    addPlayList(event){
      // console.log(event);
      if(this.playList.length == 0){
        this.play(event[0]);
      }
      let arr = this.playList.concat(event);
      let newArr = [];
      // console.log(arr);
      // 去重
      for(let i = 0; i < arr.length; i++){
        // console.log(arr[i]);
        if(newArr.indexOf(arr[i]) == -1){
          newArr.push(arr[i]);
        }
      }
      this.playList = newArr;
      // this.play
      console.log(newArr);
    }
  },
}
</script>

