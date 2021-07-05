<template>
    <div class="the_charts">
        <!-- 导航栏start -->
        <div class="title">
            <ul>
                <li :class="{active:activeIndex==0}" @click="gotoF1">精选</li>
                <li :class="{active:activeIndex==1}"  @click="gotoF2">歌手</li>
                <li :class="{active:activeIndex==2}"  @click="gotoF3">MV</li>
                <li :class="{active:activeIndex==3}" @click="gotoF4">热赞</li>
            </ul>
        </div>
        <!-- 导航栏end -->
        <!-- 楼层一start -->
        <div class="floor1" ref="floor1">
            <border-title>榜单推荐</border-title>
            <loading v-if="isLoading"></loading>
            <ul v-if="floor1List">
                <li v-for="(item,index) in floor1List" :key="index" @click="gotoList(item.id)">
                    <div class="t">
                        <div class="img">
                            <img :src="item.coverImgUrl" alt="">
                        </div>
                        <div class="ctime">{{item.updateFrequency}}</div>
                        <i class="iconfont icon-bofang"></i>
                    </div>
                    <div class="b">{{item.name}}</div>
                </li>
            </ul>
        </div>
        <!-- 楼层一end -->
        <!-- 楼层2 -->
        <div class="floor2" ref="floor2">
            <border-title>官方版</border-title>
            <loading v-if="isLoading"></loading>
            <ul>
               <li v-for="item in floor2List" :key="item.id">
                   <chart-item :item="item"></chart-item>
               </li>
            </ul>
        </div>
        <!-- 楼层2结束 -->
        <!-- 楼层三 -->
        <div class="floor3" ref="floor3">
            <border-title>热门歌手</border-title>
            <loading v-if="isLoading"></loading>
            <ul>
                <li v-for="item in artList" :key="item.id">
                    <singer-item :item="item"></singer-item>
                </li>
            </ul>
        </div>
        <!-- 楼层三结束 -->
        <!-- 楼层四开始 -->
        <div class="floor4" ref="floor4">
            <border-title>热播MV</border-title>
            <loading v-if="isLoading"></loading>
            <ul>
                <li v-for="item in mvList" :key="item.id">
                    <mv-item :item="item"></mv-item>
                </li>
            </ul>
            <ul>
                <li v-for="item in wyMvList" :key="item.id">
                    <mv-item :item="item"></mv-item>
                </li>
            </ul>
        </div>
        <!-- 楼层四结束 -->
        <!-- 楼层5 -->
        <div class="floor5" ref="floor5">
            <div class="t">
                <border-title>网络热赞歌曲</border-title>
                <button @click="playMenu">
                    <i class="iconfont icon-bofang"></i>播放
                </button>
            </div>
            <loading v-if="isLoading"></loading>
            <all-listen v-for="item in admireList" :key="item.id" :item="item"></all-listen>
        </div>
    </div>
</template>

<script>
import BorderTitle from '@/components/BorderTitle';
import ChartItem from '@/components/ChartItem';
import SingerItem from '@/components/SingerItem';
import MvItem from '@/components/MvItem';
import AllListen from '@/components/AllListen';
import Loading from '@/components/Loading'
export default {
    name:'charts',
    components:{BorderTitle,ChartItem,SingerItem,MvItem,AllListen,Loading},
    data(){
        return{
            activeIndex:0,
            // 所有
            allList:[],
            // 歌手
            artList:[],
            // 网路热赞
            admireList:[],
            admireAllList:[],
            // floor1List
            floor1List:[],
            floor2List:[],
            // mv
            mvList:[],
            // 网易mv
            wyMvList:[],
            // 定时器
            timer:null,
            isLoading:true,
        }
    },
    created(){
        this.isLoading = true;
        this.axios.get('/toplist/detail').then(d => {
            // console.log(d.data);
            this.allList = d.data.list;
            this.floor1List = this.allList.slice(4,7);
            this.floor2List = this.allList.slice(0,4)
            // console.log(this.allList);
            this.isLoading = false;
        });
        this.isLoading = true;
        this.axios.get('/artist/list?cat=1001').then(d => {
            // console.log(d.data.artists);
            this.artList = d.data.artists.slice(0,6);
            this.isLoading = false;
        });
        this.isLoading = true;
        this.axios.get('/personalized/mv').then(d => {
            // console.log(d.data.result);
            this.mvList = d.data.result;
            this.isLoading = false;
        });
        this.isLoading = true;
        this.axios.get('/mv/exclusive/rcmd?limit=4').then(d => {
            // console.log(d.data.data);
            this.wyMvList = d.data.data.map(data => {
                data.picUrl = data.cover;
                return data;
            })
            this.isLoading = false;
        });
        this.isLoading = true;
        this.axios.get('/playlist/detail?id=3778678').then(d => {
            // this.admireList = d.data.playlist.tracks.slice(100,106);
            // console.log(d.data.playlist.tracks.slice(100,106));
            this.admireAllList = d.data.playlist.tracks.map(data => {
                data.song = {
                    artists:data.ar,
                    album:data.al,
                }
                return data;
            })
            this.admireList = this.admireAllList.slice(100,106);
            this.isLoading = false;
        });
    },
    methods:{
        onScroll(){
            clearTimeout(this.timer);
            // 总高度
            // let totalHeight = document.documentElement.scrollHeight;
            // 卷起来的高度
            let hideHeight = document.documentElement.scrollTop;
            // 视图高度
            // let viewHeight = document.documentElement.clientHeight;
            // console.log('总高度',totalHeight);
            // console.log('卷起来的高度',hideHeight);
            // console.log('视图高度',viewHeight);
            let f2Top = this.$refs.floor2.offsetTop;
            let f3Top = this.$refs.floor3.offsetTop;
            let f4Top = this.$refs.floor4.offsetTop;
            // console.log(f4Top);
            let f5Top = this.$refs.floor5.offsetTop;
            let floorTop = [];
            floorTop.push(f2Top,f3Top,f4Top,f5Top);
            // console.log(floorTop);
            this.timer = setTimeout(() => {
                for(let i = 0; i < floorTop.length; i++){
                    if(hideHeight+ 30 >= floorTop[i] ){
                        this.activeIndex = i;
                    }
                }
                if(hideHeight+30 < floorTop[1]){
                    this.activeIndex = 0;
                }
            },100);
        },
        // 跳转到1楼
        gotoF1(){
            document.documentElement.scrollTop = 0;
            // console.log(document.documentElement.scrollTop);
        },
        gotoF2(){
            document.documentElement.scrollTop = this.$refs.floor3.offsetTop;
        },
        gotoF3(){
            document.documentElement.scrollTop = this.$refs.floor4.offsetTop;
        },
        gotoF4(){
            document.documentElement.scrollTop = this.$refs.floor5.offsetTop;
        },
        gotoList(id){
            this.$router.push(`/recommend_songs/:${id}`);
        },
        playMenu(){
            let menu = this. admireList;
            // console.log(menu);
            this.$emit('playMenu',menu);
        }
    },
    activated(){
        // 页面滚动添加监听事件
        window.addEventListener('scroll',this.onScroll);
    },
    
    // beforeRouteLeave(to,from,next){
    //     //移除滚动的监听事件
    //     window.removeEventListener('scroll',this.onScroll);
    //     // 移除定时器
    //     clearTimeout(this.timer);
    //     next();
    // },
    deactivated(){
        //移除滚动的监听事件
        window.removeEventListener('scroll',this.onScroll);
        // 移除定时器
        clearTimeout(this.timer);
    }
}
</script>

<style lang="less" scoped>
.text-hidden{
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.the_charts{
    // 导航栏开始
    background-color: #fafafa;
    position: relative;
    .title{
        position: fixed;
        // border: solid 1px red;
        width: 100vw;
        margin-left: -10px;
        background-color: #fff;
        padding: 10px 0;
        box-sizing: border-box;
        z-index: 99;
        top: 75px;
        ul{
            width: 95vw;
            display: flex;
            justify-content: space-evenly;
            li{
                // flex: 1;
                color: darken(#ccc,20%);
                &.active{
                    position: relative;
                    color: #21debb;
                    &::after{
                        content: '';
                        position: absolute;
                        left: 50%;
                        bottom:-8px;
                        width: 40px;
                        height: 2px;
                        background-color: darken(#dff4ed,20%);
                        transform: translateX(-50%);
                    }
                }
            }
        }
    }
    // 导航栏结束
    // 楼层一
    .floor1{
        background-color: #ffff;
        border: solid 1px lighten(#ccc,15%);
        padding-top: 5px;
        border-radius: 10px;
        padding-bottom: 5px;
        ul{
            display: flex;
            justify-content: space-between;
            padding:0 10px;
            li{
                // border: solid 1px orange;
                width: 33.33%;
                .t{
                    display: flex;
                    justify-content: space-evenly;
                    position: relative;
                    .img{
                        width: 90%;
                        border-radius: 10px;
                        overflow: hidden;
                        height: 90%;
                        img{
                            width: 100%;
                        }
                    }
                    .ctime{
                        position: absolute;
                        top: 5px;
                        right: 12%;
                        font-size: 12px;
                        background-color: rgba(126, 126, 126, 0.4);
                        // padding: 4px;
                        line-height: 1.6;
                        border-radius: 6px;
                        // border: solid 1px red;
                        width: 60%;
                        color: #fff;
                        text-align: center;
                        .text-hidden;
                    }
                    i{
                        position: absolute;
                        bottom: 4px;
                        right: 12%;
                        color: rgba(255, 255, 255, 0.733);
                    }
                }
                .b{
                    text-align: center;
                    margin: 4px 0;
                }
            }
        }
    }
    // 楼层二
    .floor2{
        ul{
            padding:0 10px;
            li{
                border-radius: 10px;
                &:first-child{
                    background-color: lighten(#6393da,32%);
                }
                &:nth-child(2){
                    background-color: lighten(#55bdc4,32%);
                }
                &:nth-child(3){
                    background-color: lighten(#c9496c,35%);
                }
                &:nth-child(4){
                    background-color: lighten(#c67e5e,30%);
                }
            }
        }
    }
    // 楼层三
    .floor3{
        background-color: #fff;
        border-radius: 10px;
        padding-top: 1px;
        padding-bottom: 5px;
        ul{
            padding:0 10px;
            li{
                // background-color: #fafafa;
                border-radius: 10px;
                &:nth-child(1){
                    background-color: lighten(#373a39,70%);
                }
                &:nth-child(2){
                    background-color: darken(#e5e5e5,3%);
                }
                &:nth-child(3){
                    background-color: lighten(#ddc098,20%);
                }
                &:nth-child(4){
                    background-color: lighten(#e6c9c1,10%);
                }
                &:nth-child(5){
                    background-color: lighten(#b06c3b,45%);
                }
                &:nth-child(6){
                    background-color: lighten(#bfb7a9,20%);
                }
            }
        }
    }
    // 楼层四
    .floor4{
        border-radius: 10px;
        padding-top: 1px;
        background-color: #fafafa;
        padding-bottom: 5px;
        ul{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            
            li{
                width: 50%;
            }
        }
    }
    // 楼层五
    .floor5{
        background-color: white;
        border-radius: 10px;
        padding-top: 5px;
        .t{
            display: flex;
            align-items: center;
            button{
                outline: none;
                margin-left: 1.25rem;
                border: none;
                font-weight:bold;
                padding: 0 10px;
                letter-spacing: 1px;
                background-color: #dff4ed;
                border-radius: 20px;
                height: 25px;
                width: 80px;
                font-size: 14px;
                i{
                    font-size: 14px;
                    margin-right: .375rem;
                    color: #29d399;
                }

            }
        }
    }
}
</style>