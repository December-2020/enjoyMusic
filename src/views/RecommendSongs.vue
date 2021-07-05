<template>
    <div class="recommendsongs" v-if="obj&&list">
        <head-line>歌单</head-line>
        <!-- 顶部 -->
        <div class="top">
            <div class="top_m">
                <div class="left">
                    <img :src="obj.coverImgUrl" alt="">
                </div>
                <div class="right">{{obj.name}}</div>
            </div>
            <div class="top_b">
                <ul class="icon">
                    <!-- 讨论数目 -->
                    <li @click="isShowDis">
                        <i class="iconfont icon-pinglun1"></i>
                        <span>{{obj.commentCount|formatNum}}</span>
                    </li>
                    <!-- 总播放 -->
                    <li>
                        <i class="iconfont icon-xingzhuangjiehe3"></i>
                        <span>{{obj.playCount|formatNum}}</span>
                    </li>
                    <!-- 下载 -->
                    <li>
                        <i class="iconfont icon-xiazai"></i>
                        <span>{{obj.subscribedCount|formatNum}}</span>
                    </li>
                    <!-- 分享 -->
                    <li>
                        <i class="iconfont icon-fenxiang"></i>
                        <span>{{obj.shareCount|formatNum}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 内容 -->
        <div class="bottom">
            <div class="title">
                <div class="l"
                    @click="$emit('addPlayList',list)"
                >
                    <i class="iconfont icon-bofang1"></i>
                    <p>播放全部<span>共{{this.list.length}}首</span></p>
                </div>
                <div class="r">
                    <i class="iconfont icon-gedan"></i>
                </div>
            </div>
            <!-- 歌曲列表 -->
            <div class="song_list">
                <music-list
                    v-for="(item,index) in list"
                    :key="item.id"
                    :item="item"
                    :musicObj="musicObj"
                    @play="$emit('play',$event)"

                >
                    <template v-slot:sortNum>
                        <b>{{(index+1) &lt; 10?'0'+(index+1):index+1}}</b>
                    </template>
                </music-list>
            </div>
            <loading v-show="isLoading"></loading>
            <!-- 评论 -->
            <transition
                enter-active-class="animate__animated animate__slideInUp"
                leave-active-class="animate__animated animate__slideOutDown"
            >
                <div class="song_dis" v-show="showDis">
                    <div class="head">
                        <border-title>评论</border-title>
                        <i class="iconfont icon-quxiao" @click="showDis=false"></i>
                    </div>
                    <ul>
                        <li v-for="(item,index) in dis" :key="index">
                            <div class="left">
                                <img :src="item.user.avatarUrl" alt="">
                            </div>
                            <div class="right">
                                <h6>{{item.user.nickname}}</h6>
                                <p class="mes">{{item.content}}</p>
                                <p class="t">{{item.time|formatTime}}</p>
                            </div>
                        </li>
                    </ul>
                    <div class="noData" v-show="isNoData">已经到底了,没有更多评论信息了</div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import HeadLine from '@/components/HeadLine.vue';
import MusicList from '@/components/MusicList.vue';
import Loading from '@/components/Loading';
import BorderTitle from '@/components/BorderTitle';

export default {
    components: { HeadLine,MusicList,Loading,BorderTitle,},
    name: 'RecommendSongs',
    props:['id','musicObj'],
    data(){
        return{
            obj:{},
            list:[],
            allList:[],
            dis:[],
            showDis:false,
            isLoading:true,
            page:0,
            perpage:20,
            isNoData:false,
        }
    },
    activated(){
        let Id = this.id.substr(1);
        // console.log(this.id.substr(1));
        this.axios.get('/playlist/detail?id='+Id).then(d => {
            // console.log(d.data.playlist.tracks);
            // console.log(d.data);
            this.obj = d.data.playlist;
            this.list = d.data.playlist.tracks.map((data,index) => {
                // console.log(index);
                data.song={
                    privilege:d.data.privileges[index],
                    artists:data.ar,
                    album:data.al,
                }
                return data;
            });
            // console.log(this.list);
        });
        // 评论
        this.getComment();
    },
    created(){
        window.addEventListener('scroll',this.onScroll);
    },
    filters:{
        formatNum(val){
            if(val>10000000){
                let str = '';
                str = (parseInt(val)/10000000).toFixed(1) + '千万'
                return str;
            }else if(val >= 10000){
                let str = '';
                str = (parseInt(val)/10000).toFixed(1) + '万'
                return str;
            }else{
                return val;
            }
        },
        formatTime(val){
            let date = new Date(val);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
            let D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate())+ ' ';
            let h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
            let m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
            let s = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
            return Y+M+D+h+m+s;
        }
    },
    deactivated(){
        this.list = [];
        this.obj = {};
        this.dis=[];
        window.removeEventListener('scroll',this.onScroll);
    },
    methods:{
        isShowDis(){
            this.showDis = !this.showDis;
        },
        getComment(){
            let Id = this.id.substr(1);
            this.axios.get('/comment/playlist',{
            params:{
                id:Id,
                limit:this.perpage,
                offset:this.perpage*this.page,
            }
            }).then(d => {
                // console.log(this.dis);
                if(d.data.comments.length == 0){
                    this.isLoading=false;
                    this.isNoData = true;
                    return;
                }
                // console.log(d.data.comments);
                this.dis = this.dis.concat(d.data.comments);
                this.isLoading = false;
            })
        },
        onScroll(){
            let totalHeight = document.documentElement.scrollHeight;
            // 卷起来的高度
            let hideHeight = document.documentElement.scrollTop;
            // 视图高度
            let viewHeight = document.documentElement.clientHeight;
            // console.log(totalHeight,hideHeight,viewHeight);
            if(this.showDis){
                if(totalHeight - 10 - hideHeight - viewHeight< 0){
                    this.isLoading=true;
                    this.page++;
                    this.getComment();
                }
            }
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
.recommendsongs{
    position: relative;
    margin-top: 30px;
    .top{
        background-color: #fafafa;
        // padding: 10px 20px;
        padding: 10px 20px;
        // padding-bottom: 0px;
        .top_m{
            display: flex;
            align-items: center;
            .left{
                margin-right: 20px;
                width: 120px;
                overflow: hidden;
                img{
                    width: 100%;
                }
            }
            .right{
                font-size: 15px;
                color: lighten(#000,30%);
                .text-hidden;
                -webkit-line-clamp: 2;
                line-height: 1.3;
            }
        }
        .top_b{
            margin: 10px 0;
            // border: solid 1px red;
            .icon{
                display: flex;
                // justify-content: space-evenly;
                li{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    // border: solid 1px red;
                    // text-align: center;
                    color: darken(#ccc,30%);
                    align-items: center;
                    i{
                        margin: 6px 0;
                        font-size: 20px;
                    }
                }
            }
        }
    }
    .bottom{
        background-color: #fff;
        .title{
            // border: solid 1px orange;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .l{
                // border: solid 1px red;
                // width: 8.75rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: bold;
                    line-height: 24px;
                    margin-left: 10px;
                    span{
                        font-weight: normal;
                        font-size: 14px;
                        color: darken(#ccc,10%);
                        margin-left: 4px;
                    }
                }
            }
            i{
                font-size: 22px;
            }
        }
        .song_list{
            padding: 0 10px;
        }
        .song_dis{
            position: fixed;
            bottom: 0;
            max-height: 80vh;
            overflow-y: auto;
            // padding-bottom: 40px;
            .head{
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: #f5f5f5;
                padding: 4px 14px 4px 0;
                i{
                    color: #86e6c5;
                }
            }
            ul{
                background-color: white;
                padding: 10px;
                li{
                    padding: 10px 0;
                    display: flex;
                    .left{
                        img{
                            height: 60px;
                            border-radius: 10px;
                        }
                    }
                    .right{
                        margin-left: 20px;
                        h6{
                            font-size: 14px;
                            // font-weight: normal;
                        }
                        .mes{
                            font-size: 14px;
                            margin: 10px 0;
                            line-height: 1.4;
                        }
                        .t{
                            font-size: 12px;
                            color: lighten(#000,30%);
                        }
                    }
                    &:nth-child(2n){
                        border-top: solid 1px #ccc;
                        border-bottom: 1px solid #ccc;
                    }
                }
            }
        }
        .noData{
            width: 100%;
            text-align: center;
            font-size: 13px;
            color: darken(#ccc,20%);
            padding-bottom: 50px;
            background-color: #fff;
        }
    }
}
</style>