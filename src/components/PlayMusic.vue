<template>
    <div :class="['playmusic',{pause:isPlay}]">
        <audio 
            v-if="musicObj"
            :src="`https://music.163.com/song/media/outer/url?id=${musicObj.id}.mp3`" 
            autoplay
            @timeupdate="timeUpdate"
            @play="play"
            @pause="pause"
            ref="player"
            @ended="next"
        >
        </audio>
        <transition 
            enter-active-class="animate__animated animate__backInLeft"
            leave-active-class="animate__animated animate__backOutRight"
        >
            <div class="music_control" v-if="musicObj" @click="isShowFull=true">
                <div class="left">
                    <img :src="musicObj.picUrl" alt="">
                    <div class="mes">
                        <p class="music_name">{{musicObj.name}}</p>
                        <p class="music_mes">{{musicObj.song.album.name}} - {{musicObj.song.artists[0].name}}</p>
                    </div>
                </div>
                <div class="right">
                    <div class="btn">
                        <i class="iconfont icon-1_music83 prev" @click.stop="prev"></i>
                        <div class="is_play" @click.stop="togglePlay">
                            <i v-if="isPlay" class="iconfont icon-bofang1 play"></i>
                            <i v-else class="iconfont icon-zantingtingzhi1 pause"></i>
                        </div>
                        <i class="iconfont icon-1_music82 next" @click.stop="next"></i>
                    </div>
                    <div class="more">
                        <i class="iconfont icon-gengduo moreIcon"></i>
                       
                    </div>
                </div>
            </div>
        </transition>
       
        <!-- 全屏 -->
        <transition 
            enter-active-class="animate__animated animate__slideInUp"
            leave-active-class="animate__animated animate__slideOutDown"
        >
            <full-page 
                v-show="isShowFull"
                @close="isShowFull=false"
                :musicObj="musicObj"
                :isPlay="isPlay"
                :lyric="lyric"
                :duration="duration"
                :currentTime="currentTime"
                @ctime="ctime($event)"
                @togglePlay="togglePlay"
                :playList="playList"
                @toggleMusicId="$emit('toggleMusicId',$event)"
                ref="fullPage"
                :playMode="playMode"
                @changePlayMode="changePlayMode($event)"
            ></full-page>
        </transition>
    </div>
</template>

<script>
import FullPage from '@/components/FullPage'
export default {
    props:['musicObj','playList'],
    components:{
        FullPage,
    },
    created(){
        // console.log(this.musicObj);
        // console.log(this.playList);
        
    },
    // mounted(){
    //     if(this.playList.length > 0){
    //         console.log(this.playList);
    //     }
    // },
    data(){
        return{
            // 记录是否播放 一开始就是自动播放
            isPlay:false,
            duration:0,
            currentTime:0,
            // 显示更多
            isShowMore:false,
            // 显示全屏
            isShowFull:false,
            // 歌词
            lyric:null,
            // 播放模式 1.顺序播放 2.随机播放 3.单曲循环 4.歌单循环
            playMode:1,
            playControl:true,
        }
    },
    watch:{
        // 侦听歌曲信息的变化
        musicObj(newMusic){
            // 获取当前播放的音乐, 获取歌词
            this.lyric = this.axios.get('/lyric',{
                params:{
                    id:newMusic.id
                }
            }).then(d => {
                // console.log(d);
                if(d.data && d.data.lrc && d.data.lrc.lyric){
                    this.lyric = d.data.lrc.lyric;
                }
            })
        },
    },
    methods:{
        timeUpdate(event){
            // 总时长
            // console.log(event.target.duration);
            this.duration = event.target.duration;
            // 当前播放时长
            // console.log(event.target.currentTime);
            this.currentTime = event.target.currentTime;
        },
        togglePlay(){
            // 如果是 暂停状态 改为 播放状态, 同时真正播放
            if(this.isPlay){
                // 暂停
                // this.isPlay = false;
                this.$refs.player.play();
            }else{
                // 播放
                // this.isPlay = true;
                this.$refs.player.pause();
            }
        },
        play(){
            this.$nextTick(()=>{
				this.$refs.player.play()
			})
            this.isPlay = false;
        },
        pause(){
            this.isPlay = true;
        },
        showMore(){
            this.isShowMore = !this.isShowMore;
        },
        // 改变播放的时间
        ctime(event){
            // console.log(event);
            let t = event*this.duration;
            this.$refs.player.currentTime = t;
        },
        // 上一曲
        prev(){
            this.$refs.fullPage.prev();
        },
        // 下一曲
        next(){
            this.$refs.fullPage.next();
        },
        changePlayMode(event){
            this.playMode = event;
            // console.log(event);
        }
    },
}
</script>

<style lang="less" scoped>
@bgcolor: #fafafa;
@color:#29d399;
.text-hidden{
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.playmusic{
    background-color: #fff;
    // background-color: #fafafa;
    // height: 6.25rem;
    height: 2.6rem;
    position: relative;
    audio{
        padding: 0px;
        // margin-top: 35px;
        height: 30px;
    }
    .music_control{
        // border: solid 1px red;
        position: fixed;
        bottom: 0px;
        height: 3rem;
        width: 100%;
        background-color: #fff;
        z-index: 99;
        display: flex;
        padding: 0 10px;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        .left{
            display: flex;
            img{
                height: 2.4rem;
                width: 2.4rem;
                border-radius: 50%;
                margin-right: .625rem;
                animation: round 5s 0s linear infinite;
            }
            .mes{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                p{
                    .text-hidden;
                }
                .music_name{
                    font-size: 14px;
                }
                .music_mes{
                    font-size: 12px;
                    color:darken(#ccc,10%);
                }
            }
        }
        .right{
            display: flex;
            align-items: center;
            // border: solid 1px red;
            width: 30vw;
            height: 3rem;
            justify-content: space-around;
            .btn{
                width: 20vw;
                display: flex;
                align-items: center;
                // border: springgreen 1px solid;
                justify-content: space-evenly;
                i{
                    font-size: 1.6rem;
                }
                .play{
                    font-size: 2rem;
                    color:darken(#ccc,20%);
                }
                .pause{
                    font-size: 2rem;
                    color: #37e1c1;
                }
                .prev,.next{
                    color:darken(#ccc,20%);
                }
            }
            .more{
                position: relative;
                // border: solid 1px red;
                .moreIcon{
                    font-size: 1.4rem;
                    color:darken(#ccc,20%);
                }
               
            }
        }
    }
}
// 暂停
.pause{
    .music_control{
        .left{
            img{
                animation-play-state: paused;
            }
        }
    }
}
// 动画
@keyframes round {
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
</style>