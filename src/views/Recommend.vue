<template>
    <div class="recommend">
        <roll-banner :imgUrl="url"></roll-banner>
        <div class="floor1">
            <border-title>歌单传送门</border-title>
            <p
                @click="changeRecSongs"
            >换一换<i
                :class="[
                'iconfont',
                'icon-huanyihuan',
                isChange?'anim':'',
                ]"
                ref="changeAnim"
            >
            </i></p>
        </div>
        <loading v-if="recommendSongs.length==0"></loading>
        <div class="recommend_songs" v-if="recommendSongs">
            <picture-item v-for="item in recommendSongs" :key="item.id" :item="item"></picture-item>
        </div>
        <div class="floor2">
            <border-title>大家都在听</border-title>
            <button @click="playMenu">
                <i class="iconfont icon-bofang"></i>播放
            </button>
        </div>
        <loading v-if="recentHotPlay.length==0"></loading>
        <div class="recent_hot_play">
            <all-listen v-for="item in recentHotPlay" :key="item.id" :item="item"></all-listen>
        </div>
        <div class="floor3">
            <border-title>猜你喜欢</border-title>
        </div>
        <loading v-if="guessLike.length==0"></loading>
        <div class="guess_like">
            <music-list 
                v-for="item in guessLike" 
                :key="item.id" 
                :item="item"
                @play="$emit('play',$event)"
                :musicObj="musicObj"
            ></music-list>
        </div>
        <div class="floor4">
            <border-title>热播MV</border-title>
            <loading v-if="isLoading"></loading>
            <ul>
                <li v-for="item in mvList" :key="item.id">
                    <mv-item :item="item"></mv-item>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import RollBanner from '@/components/RollBanner'
import BorderTitle from '@/components/BorderTitle'
import PictureItem from '@/components/PictureItem'
import AllListen from '@/components/AllListen'
import MusicList from '@/components/MusicList'
import Loading from '@/components/Loading'
import MvItem from '@/components/MvItem'
export default {
    name:'Recommend',
    props:['musicObj'],
    data(){
        return{
            url:[
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3095430657,2956461193&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=964576981,2386618949&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1539367743,1839014179&fm=26&gp=0.jpg'
            ],
            // 推荐歌单
            recommendSongs:[],
            allRecommendSongs:[],
            start:0,
            // 最近热播
            recentHotPlayAll:[],
            recentHotPlay:[],
            // banner:[],
            // 猜你喜欢
            guessLike:[],
            isChange:false,
            // mv
            mvList:[],
            isLoading:true,
        }
    },
    components:{
        RollBanner,
        BorderTitle,
        PictureItem,
        AllListen,
        MusicList,
        Loading,
        MvItem,
    },
    created(){
        // 歌单传送门
        this.axios.get('/personalized').then(d => {
            // console.log(d);
            this.allRecommendSongs = d.data.result;
            this.recommendSongs = this.allRecommendSongs.slice(this.start,6);
            this.start = 6;
        });
        // 大家都在听 id=3778678
        this.axios.get('/playlist/detail?id=3778678').then(d => {
            // console.log(d.data.playlist.tracks);
            this.recentHotPlayAll = d.data.playlist.tracks.map((data,index) => {
                // console.log(index);
                data.song={
                    privilege:d.data.privileges[index],
                    artists:data.ar,
                    album:data.al,
                }
                return data;
            })
            this.recentHotPlay = this.recentHotPlayAll.slice(1,4)
        });
        // banner
        // this.axios.get('/banner?type=3').then(d => {
        //     // console.log(d.data.banners.slice(0,4));
        //     this.banner = d.data.banners.slice(0,4);
        // });
        // 猜你喜欢
        this.axios.get('/personalized/newsong').then(d => {
            // console.log(d.data.result.slice(0,6));
            this.guessLike = d.data.result.slice(1,7);
        });
        // this.axios.get('').then(d => {
        //     console.log(d);
        // });
        this.axios.get('/personalized/mv').then(d => {
            // console.log(d.data.result);
            this.mvList = d.data.result;
            this.isLoading = false;
        });
    },
    // beforeRouteEnter(to,from,next){
    //     // 每次切换tab都会更新数据
    //     next((vm)=>{
    //         vm.axios.get('/personalized').then(d => {
    //         console.log(d);
    //         })
    //     });
    // },
    mounted(){
        // 谷歌浏览器专属 添加监听事件
        this.$refs.changeAnim.addEventListener('webkitAnimationEnd',this.animatEnd)
    },
    methods:{
        changeRecSongs(){
            // 刷新的数据的限制
            if(this.allRecommendSongs.length == this.start) return;
            this.isChange = true;
            // let start = 6;
            let end = this.start + 6;
            this.recommendSongs = this.allRecommendSongs.slice(this.start,end);
            this.start = end;
        },
        // 动画结束
        animatEnd(){
            this.isChange = false;
        },
        playMenu(){
            let menu = this. recentHotPlay;
            // console.log(menu);
            this.$emit('playMenu',menu);
        }
    },
    
    beforeRouteLeave(to,from,next){
        this.$refs.changeAnim.removeEventListener('webkitAnimationEnd',this.animatEnd);
        // console.log('监听事件已销毁');
        next();
    },
}
</script>

<style lang="less" scoped>
.recommend{
    background-color: #fafafa;
    .floor1{
        display: flex;
        justify-content: space-between;
        padding: .625rem;
        padding-top: 0px;
        padding-left: 0px;
        p{
            margin: .625rem 0;
            // border: solid 1px blue;
            display: flex;
            i{
                margin-left: .425rem;
                color: #6c6c6c;
                display: block;
            }
           
        }
    }
    .recommend_songs{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        div{
            width: 33%;
        }
    }
    .floor2{
        display: flex;
        padding-bottom: .625rem;
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
    .floor4{
        border-radius: 10px;
        ul{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li{
                width: 50%;
            }
        }
    }
}
.anim{
    animation: round 1s  0s linear;
    transform-origin: center;
}
@keyframes round {
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
</style>