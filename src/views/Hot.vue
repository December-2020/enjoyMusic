<template>
    <div class="hot">
        <div class="title">
            <div class="titlemes">
                <div class="top"></div>
                <div class="middle"></div>
                <p v-if="listInfo">{{listInfo.trackUpdateTime|formatDate('y-m-d')}} 更新</p>
            </div>
        </div>
        <div class="hot_list">
            <music-list 
                v-for="(item,index) in hotList" 
                :key="item.id" 
                :item="item"
                @play="$emit('play',$event)"
                :musicObj="musicObj"
            >
                <template v-slot:sortNum>
                    <b>{{(index+1) &lt; 10?'0'+(index+1):index+1}}</b>
                </template>
            </music-list>
        </div>
        <loading v-if="isLoading"></loading>
        <div class="theend" v-if="isTheEnd">已经到底了,没有更多数据了</div>
    </div>
</template>

<script>
import MusicList from '@/components/MusicList'
import Loading from '@/components/Loading'
export default {
    name:'Hot',
    components:{
        MusicList,
        Loading,
    },
    props:['musicObj'],
    data(){
        return{
            listInfo:{},
            hotList:[],
            allList:[],
            isLoading:true,
            // 页码
            page:0,
            // 每页最多显示条数
            perpage:20,
            isTheEnd:false,
        }
    },
    created(){
        // 请求列表
        this.axios.get('/playlist/detail?id=3778678').then(d => {
            // console.log(d.data.playlist);
            this.listInfo = d.data.playlist;
            // console.log(d.data.playlist);
            // console.log(d);
            // if(!d.data && d.data.playlist && d.data.playlist.tracks) return;
            this.allList = d.data.playlist.tracks.map((data,index) => {
                // console.log(index);
                data.song={
                    privilege:d.data.privileges[index],
                    artists:data.ar,
                    album:data.al,
                }
                return data;
            });
            // 每页只显示20条
            this.hotList=this.allList.slice(0,20);
            // console.log(this.hotList);
        });
        // 页面滚动添加监听事件
        window.addEventListener('scroll',this.onScroll);
    },
    methods:{
        onScroll(){
            // console.log('scrollHeight',document.documentElement.scrollHeight)
            // console.log('scrollTop',document.documentElement.scrollTop)
            // console.log('clientHeight',document.documentElement.clientHeight)
            // 总高度
            let totalHeight = document.documentElement.scrollHeight;
            // 卷起来的高度
            let hideHeight = document.documentElement.scrollTop;
            // 视图高度
            let viewHeight = document.documentElement.clientHeight;
            // console.log(totalHeight,hideHeight,viewHeight);
            if(totalHeight - 10 - hideHeight - viewHeight< 0){
                this.isLoading=true;
                this.page++; // 1  2
                let start=(this.page)*this.perpage;// 20   40
                let end=(this.page+1)*this.perpage;// 40   60
                this.hotList=this.hotList.concat(this.allList.slice(start,end));
                this.isLoading=false;
                if(this.hotList.length == this.allList.length){
                    this.isTheEnd = true;
                }else{
                    this.isTheEnd = false;
                }
            }
        },
    },
    filters:{
        formatDate(val,str){
            let date = new Date(val);
            let formatObj = {
                'y':date.getFullYear(),
                'm':date.getMonth() + 1,
                'd':date.getDate(),
            };
            for(let k in formatObj){
                let reg = new RegExp(k);
                let value = formatObj[k];
                value = value<10?'0'+value:value;
                str = str.replace(reg,value);
            }
            return str;
        },
    },
    beforeRouteLeave(to,from,next){//移除滚动.
        window.removeEventListener('scroll',this.onScroll);
        next();
    },
}
</script>

<style lang="less" scoped>
.hot{
    background-color: #fafafa;
    .title{
        background: url(../assets/image/hot_music_bg.jpg) no-repeat;
        width: 100%;
        // margin: 0 auto;
        // border: solid 1px red;
        height: 39vw;
        display: flex;
        // align-items: center;
        justify-content: center;
        overflow: hidden;
        max-width: 750px;
        max-height: 292px;
        margin: 0 auto;
        .titlemes{
            border-radius: 50%;
            height: 50vw;
            width: 50vw;
            background: linear-gradient(to right,#d4826e 0%,#d27158 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            .top{
                background: url(../assets/image/index_icon_2x.png)  no-repeat 23.265% 36.145%;
                width: 5.4375rem;
                height: 1.75rem;
                margin-top: 3vh;
                transform: scale(0.6);
            }
            .middle{
                background: url(../assets/image/index_icon_2x.png)  no-repeat 97.959% 98.99%;
                width: 17.6875rem;
                height: 5.9375rem;
                transform: scale(0.5);
                margin-top: -3vh;
            }
            p{
                color: white;
                margin-top: -1vh;
                font-size: 14px;
            }
        }
    }
    .theend{
        font-size: 14px;
        color: #ccc;
        width: 100%;
        text-align: center;
        margin: 10px 0;
        padding-bottom: 20px;
    }
}
</style>