<template>
    <div :class="['full_page',{pause:isPlay}]" style="overflow-y: hidden;">
        <div class="icon" @click="$emit('close')">
            <i class="iconfont icon-shouqi"></i>
        </div>
        <div class="song_mes">
            <p>
                <span
                    @click="songMesArtist"
                    :class="{active:spanIndex==1}"
                >歌曲</span>
                <span
                    @click="songMesLyric"
                    :class="{active:spanIndex==2}"
                >歌词</span>
            </p>
            <component
                :is="showComponent"
                :musicObj="musicObj"
                :isPlay="isPlay"
                :lyric="lyric"
                :duration="duration"
                :currentTime="currentTime"
            ></component>
        </div>
        <!-- 歌曲评论等开始 -->
        <div class="song_operate">
            <i class="iconfont icon-fufeixiazai"></i>
            <i class="iconfont icon-pinglun"
                @click="shwoComment"
            ></i>
            <i class="iconfont icon-yinliang"></i>
            <i class="iconfont icon-gengduo1"></i>
            <transition
                enter-active-class="animate__animated animate__backInUp"
                leave-active-class="animate__animated animate__backOutUp"
            >
                <ul class="comment" v-if="commentList" v-show="isShowComment">
                    <li v-for="(item,index) in commentList" :key="index">
                        <img :src="item.user.avatarUrl" alt="">
                        <div class="mes">
                            <h6>{{item.user.nickname}}</h6>
                            <p>{{item.content}}</p>
                        </div>
                    </li>
                </ul>
            </transition>
            <!-- 音量调节 -->
        </div>
        <!-- 歌曲评论等结束 -->
        <!-- 进度条开始 -->
        <div class="song_rate" >
            <div class="top"  
                @click.stop="changeProgress" 
                ref="totalLength"
                
            >
                <div class="linear"
                    :style="{
                        width:`${currentTime / duration*100}%`,
                    }"
                ></div>
            </div>
            <i class="iconfont icon-snowflake"
                :style="{
                    left:`${currentTime / duration*100}%`,
                }"
            ></i>
            <div class="bottom">
                <span>{{currentTime|formatTime}}</span>
                <span>{{duration|formatTime}}</span>
            </div>
        </div>
        <!-- 进度条结束 -->
        <!-- 控制层开始 -->
        <div class="song_control">
            <div class="left" @click="fullPlayMode">
                <!-- <i :class="['iconfont',isLoop?'icon-1_music84':'icon-1_music85']"></i> -->
                <!-- 1. 顺序播放 -->
                <i 
                    class="iconfont icon-shunxubofang"
                    v-if="playMode==1"
                ></i>
                <!-- 2. 随机播放 -->
                <i 
                    class="iconfont icon-1_music85"
                    v-else-if="playMode==2"
                ></i>
                <!-- 3. 单曲循环 -->
                <i 
                    class="iconfont icon-danquxunhuan"
                    v-else-if="playMode==3"
                ></i>
                <!-- 4. 歌单循环 -->
                <i 
                    class="iconfont icon-1_music84"
                    v-else-if="playMode==4"
                ></i>
            </div>
            <div class="middle">
                <ul>
                    <li>
                        <i class="iconfont icon-1_music83" @click="prev"></i>
                    </li>
                    <!-- $emit('togglePlay') -->
                    <li @click="togglePlaySong">
                        <i :class="['iconfont',isPlay?'icon-bofang':'icon-zantingtingzhi']"></i>
                    </li>
                    <li>
                        <i class="iconfont icon-1_music82" @click="next"></i>
                    </li>
                </ul>
            </div>
            <div class="right">
                <i class="iconfont icon-gedan"
                    @click.stop="playMusicList"
                ></i>
                <transition
                    enter-active-class="animate__animated animate__fadeInLeft"
                    leave-active-class="animate__animated animate__fadeOutDown"
                >
                    <ul v-show="showPlayList" class="play_list" v-if="playList&&musicObj">
                        <li 
                            v-for="(item,index) in playList" 
                            :key="item.id"
                            :class="{active:musicObj.id==item.id}"
                        >
                            <div class="left">
                                <div class="index">{{index + 1}}</div>
                                <div class="music_mes">
                                    <p class="title">{{item.name}}</p>
                                    <p class="mes">{{item.song.album.name}} - {{item.song.artists[0].name}}</p>
                                </div>
                            </div>
                            <div class="right">
                                <i
                                    :class="[
                                    'iconfont',
                                    musicObj.id==item.id?'icon-zantingtingzhi':'icon-bofang',
                                    isPlay?'icon-bofang':'icon-zantingtingzhi',
                                    ]"
                                    @click="playMusicId(item)"
                                >
                                </i>
                            </div>
                        </li>
                    </ul>
                </transition>
            </div>
        </div>
        <!-- 控制层结束 -->
    </div>
</template>

<script>
import Song from '@/components/Song'
import SongWords from '@/components/SongWords'
export default {
    name:"FullPage",
    props:[
        // 播放的音乐项目
        'musicObj',
        // 是否播放
        'isPlay',
        // 歌词
        'lyric',
        // 总时间
        'duration',
        // 当前时间
        'currentTime',
        // 播放列表
        'playList',
        // 播放模式
        'playMode',
    ],
    data(){
        return{
            showComponent:Song,
            spanIndex:1,
            // isLoop:true,
            showPlayList:false,
            // playIndex:playList.length - 1,
            currentPlay:true,
            // 显示评论
            isShowComment:false,
            // 评论列表
            commentList:[],
        }
    },
    components:{
        SongWords,
        Song,
    },
    methods:{
        songMesLyric(){
            this.showComponent = SongWords;
            this.spanIndex = 2;
        },
        songMesArtist(){
            this.showComponent = Song;
            this.spanIndex = 1;
        },
        togglePlaySong(){
           this.$emit('togglePlay');
           this.currentPlay = !this.currentPlay; 
        },
        // 进度条点击事件
        changeProgress(event){
            // 组件宽度
            let clientWidth = this.$refs.totalLength.clientWidth;
            // console.log(this.$refs.totalLength.clientWidth);
            // console.log(event);
            // console.log(event.offsetX);
            // 鼠标点击组件中的位置
            let offsetX = event.offsetX;
            // 算出比例
            let ratio = offsetX/clientWidth;
            // 根据比例算出当前播放时长
            // let ctime = this.duration*ratio;
            // console.log(ctime);
            this.$emit('ctime',ratio);
        },
        playMusicList(){
            this.showPlayList = !this.showPlayList;
            this.isShowComment = false;
        },
        playMusicId(obj){
            this.currentPlay = !this.currentPlay;
            this.$emit('togglePlay');
            // console.log(id);
            this.$emit('toggleMusicId',obj)
        },
        prev(){
            let i = 0;
            this.playList.map((d,index) => {
                if(d.id == this.musicObj.id){
                    i = index;
                }
            });
            if(this.playMode == 1){
                i = --i <0?0:i;
            }else if(this.playMode == 2){
                i = Math.floor(Math.random()*this.playList.length);
            }else if(this.playMode == 4){
                i = --i <0?this.playList.length-1:i;
            }
            // console.log('前进',i);
            let pmusic = this.playList[i];
            this.$emit('toggleMusicId',pmusic)
        },
        next(){
            let i = 0;
            this.playList.map((d,index) => {
                if(d.id == this.musicObj.id){
                    i = index;
                }
            })
            if(this.playMode == 1){
                i = ++i >= this.playList.length?this.playList.length-1:i;
            }else if(this.playMode == 2){
                i = Math.floor(Math.random()*this.playList.length);
            }else if(this.playMode == 4){
                i =  ++i >= this.playList.length?0:i;
            }else{
                this.$emit('ctime',0);
            }
            // console.log('后退',i);
            let pmusic = this.playList[i];
            this.$emit('toggleMusicId',pmusic)
        },
        fullPlayMode(){
            let i = this.playMode;
            i = ++i > 4?1:i;
            this.$emit('changePlayMode',i);
        },
        // 获取评论
        getComments(id){
            // console.log(val.id);
            this.axios.get('/comment/music',{
                params:{
                    id:id,
                    limit:20,
                }
            }).then(d => {
                // console.log(d.data.comments);
                this.commentList = d.data.comments;
                // console.log(this.commentList);
            })
        },
        // 显示评论
        shwoComment(){
            this.isShowComment = !this.isShowComment;
            this.showPlayList = false;
        },
    },
    created(){
        // console.log(this.musicObj);
        //console.log(this.playList);
        // this.getComments(this.musicObj)
    },
    // updated(){
    //     if(this.playList.length > 0) {
    //         // console.log(this.playList);
    //         // 将需要播放音乐的第一项传递出去
    //         // this.musicObj = this.playList[0];
    //         this.$emit('toggleMusicId',this.playList[0])
    //     }
    // },
    
    watch:{
        musicObj(newVal){
            this.getComments(newVal.id);
        },
    },
    // computed:{
    //     changeMusicComment(){
    //         console.log(1);
    //         let obj = this.musicObj;
    //         return this.getComments(obj.id);
    //     }
    // },
    filters:{
        formatTime(val){
            let min = parseInt(val/60);
            let sec =parseInt(val) -  parseInt(min*60);
            min = min < 10?'0'+min:min;
            sec = sec < 10?'0'+sec:sec;
            return min+ ":" +sec
        },
    },
}
</script>

<style lang="less" scoped>
.text-hidden{
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.full_page{
    padding: .625rem;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 999;
    background-color: #fafafa;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .icon{
        // border: solid 1px red;
        height: 20px;
        i{
            font-size: 1.4rem;
        }
    }
    .song_mes{
        // border: solid 1px skyblue;
        height: 20rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px 0;
        p{
            // border: solid 1px orange;
            width: 140px;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            span{
                color: #ccc;
                line-height: 30px;
                font-size: 14px;
            }
            .active{
                color: lighten(#000,30%);
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
    .song_operate{
        display: flex;
        // box-sizing: border-box;
        padding: 6px;
        align-items: center;
        justify-content: space-evenly;
        // border: solid 1px red;
        line-height: 26px;
        margin: 10px 0;
        position: relative;
        i{
            font-size: 22px;
            color: lighten(#000,30%);
            &:nth-child(3){
                font-size: 24px;
            }
        }
        .comment{
            position: absolute;
            border: solid 1px darken(#ccc,20%);
            transform: translateY(-100%);
            width: 100%;
            left: 0;
            top: 0;
            z-index: 9;
            background-color: #fff;
            // display: flex;
            // flex-direction: ;
            max-height: 60vh;
            overflow-y: auto;
            border-radius: 10px;
            li{
                // border: solid 1px blue;
                height: 40px;
                display: flex;
                // justify-content: space-between;
                align-items: center;
                padding: 0 10px;
                margin: 4px 0;
                // margin-right: 40px;
                &:nth-child(2n){
                    border-bottom: solid .5px rgba(204, 204, 204, 0.788);
                    border-top: solid .5px rgba(204, 204, 204, 0.788);
                }
                img{
                    height: 38px;
                    border-radius: 50%;
                }
                .mes{
                    margin-left: 20px;
                    h6{
                        font-weight: normal;
                        font-size: 15px;
                        line-height: 15px;
                        .text-hidden;
                    }
                    p{
                        font-size: 12px;
                        line-height: 20px;
                        color: lighten(#000,30%);
                        .text-hidden;
                    }
                }
                
            }
        }
        
    }
    .song_rate{
        // border: solid 1px blue;
        margin: 10px 0;
        width: 90vw;
        margin: 1.25rem auto;
        margin-bottom: 10px;
        position: relative;
        .top{
            position: relative;
            width: 100%;
            height: 10px;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 6px;
            background-color: darken(#fafafa,10%);
            .linear{
                // width: 0%;
                height: 100%;
                background-color: lighten(#19ddb9,10%);
                position: absolute;
                left: 0;
                top: 0;
            }
            
        }
        i{
            position: absolute;
            // border: solid 1px red;
            top: -2.5px;
            font-size: 16px;
            color: #19ddb9;
            transform: translateX(-50%);
        }
        .bottom{
            display: flex;
            justify-content: space-between;
            padding: 0 2px;
            span{
                color: darken(#ccc,30%);
                font-size: 15px;
            }
        }
    }
    .song_control{
        display: flex;
        // align-items: center;
        justify-content: space-around;
        // border: solid 1px red;
        position: relative;
        i{
            line-height: 26px;
            font-size: 22px;
        }
        .middle{
            ul{
                display: flex;
                li{
                    margin: 0 10px;
                    .icon-zantingtingzhi{
                        color: #19ddb9;
                    }
                }
            }
        }
        .right{
            // border: solid 1px springgreen;
            // position: relative;
            .play_list{
                position: absolute;
                z-index: 9;
                transform: translateY(-100%);
                top: -2px;
                left: 0;
                border: solid .4px darken(#fafafa,20%);
                border-radius: .375rem;
                width: 100%;
                // overflow: hidden;
                background-color: #fafafa;
                // border: solid 1px red;
                max-height: 60vh;
                overflow-y: auto;
                li{
                    height: 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 6px;
                    padding-right: 20px;
                    &.active{
                        color: #19ddb9;
                    }
                    .left{
                        display: flex;
                        align-items: center;
                        .index{
                            margin-right: 1.25rem;
                        }
                        .music_mes{
                            display: flex;
                            justify-content: space-between;
                            flex-direction: column;
                            // border: solid 1px red;
                            .title{
                                // color: red;
                                color: lighten(#000,30%);
                                font-size: 15px;
                                font-weight: normal;
                                // margin: 2px 0;
                            }
                            .mes{
                                // color: orange;
                                font-size: 13px;
                                color: darken(#ccc,10%);
                                font-weight: normal;
                                margin-top: 4px;
                            }
                        }
                    }
                    .right{
                        i{
                            font-size: 14px;
                        }
                        .icon-zantingtingzhi{
                            color: #19ddb9;
                        }
                        .icon-bofang{
                            color: lighten(#000,30%);
                        }
                    }
                }
            }
        }
    }
}
</style>