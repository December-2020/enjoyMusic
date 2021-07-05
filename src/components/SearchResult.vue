<template>
    <div class="search_result">
        <p>搜索结果: {{keywords}}</p>
        <p>最佳匹配</p>
        <div class="album">
            <div class="left">
                <div class="img">
                    <img :src="matchAlbum.picUrl" alt="">
                </div>
                <ul>
                    <li>专辑：{{matchAlbum.name}}</li>
                    <li>{{singerName}}</li>
                </ul>
            </div>
            <div class="right">
                <button><i class="iconfont icon-bofang"></i>播放</button>
            </div>
        </div>
        <ul v-if="searchResult">
            <music-list
                v-for="(item,index) in searchResult"
                :key="index"
                :item="item"
                :keywords="keywords"
                @play="$emit('play',$event)"
                :musicObj="musicObj"
            ></music-list>
        </ul>
        <loading v-show="isLoading"></loading>
    </div>
</template>

<script>
import Loading from './Loading.vue';
import MusicList from './MusicList.vue';
export default {
    components: { 
        MusicList,
        Loading,
    },
    props:{
        keywords:String,
        musicObj:[Object,null],
    },
    created(){
        // console.log(this.keywords);
        this.getResult();
        this.getAlbum();
        // 页面滚动添加监听事件
        window.addEventListener('scroll',this.onScroll);
    },
    data(){
        return{
            searchResult:[],
            page:0, // 默认第一页
            perpage:20, // 每页显示20条
            isLoading:true,
            matchAlbum:{}, // 匹配到的专辑
            singerName:'',// 歌手名字
        }
    },
    methods:{
        getResult(){
            this.axios.get('/search',{
                // axios get传值
                params:{
                    keywords:this.keywords,
                    limit:this.perpage,
                    offset:this.page*this.perpage,
                }
            }).then(d => {
                // console.log(d.data.result.songs);
                if(d.data.result.songs.length <= 0) return;
                let result = d.data.result.songs.map((data) => {
                    data.song={
                        artists:data.artists,
                        album:data.album,
                    }
                    return data;
                })
                this.isLoading=false;
                this.searchResult = this.searchResult.concat(result);
            })
        },
        // 搜索专辑
        getAlbum(){
            this.axios.get('/search',{
                params:{
                    keywords:this.keywords,
                    limit:1,
                    type:10,
                }
            }).then(d => {
                // console.log(d.data.result.albums[0]);
                if(!d.data && d.data.result && d.data.result.albums && d.data.result.albums.artists) return;
                this.matchAlbum = d.data.result.albums[0];
                this.singerName = this.matchAlbum.artists[0].name
            })
        },
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
                this.page++;
                this.getResult();
            }
        },
    },
    beforeRouteLeave(to,from,next){
        //移除滚动的监听事件
        window.removeEventListener('scroll',this.onScroll);
        next();
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
.search_result{
    background-color: #fff;
    padding: .375rem;
    padding-bottom: 1.25rem;
    p{
        margin: 14px;
        color: lihten(#000,30%);
    }
    .album{
        margin: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left{
            display: flex;
            align-items: center;
            .img{
                height: 4.75rem;
                border-radius: 10%;
                margin-right: 1.625rem;
                overflow: hidden;
                img{
                    height: 100%;
                }
            }
            ul{
                li{
                    margin: 10px 0;
                    .text-hidden;
                    &:first-child{
                        color: lighten(#000,30%);
                    }
                    &:last-child{
                        font-size: 14px;
                        color: darken(#fafafa,30%);
                    }
                }
            }
        }
        .right{
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