<template>
    <div class="chart_singer" v-if="list">
        <div v-if="ars">
            <head-line>{{ars}}</head-line>
        </div>
        <loading v-show="showLoading"></loading>
        <div class="singer_list">
            <ul>
                <li v-for="item in list" :key="item.id">
                    <div class="mes">
                        <div class="left">
                            <img :src="item.al.picUrl" alt="">
                        </div>
                        <div class="right">
                            <p class="songName">{{item.name}}</p>
                            <p class="songAlbum">{{item.al.name}}</p>
                        </div>
                    </div>
                    <div class="icon" @click="playMusic(item)">
                        <loading v-if="musicObj&&item.id == musicObj.id"></loading>
                        <i v-else class="iconfont icon-bofang1"></i>
                    </div>
                </li>
            </ul>
        </div>
        <div class="theend" v-if="isTheEnd">已经到底了,没有更多数据了</div>
    </div>
</template>

<script>
import HeadLine from '@/components/HeadLine';
import Loading from '@/components/Loading';
export default {
    props:{
        // ['id','musicObj']
        id:String,
        musicObj:[Object,null],
    },
    components:{HeadLine,Loading},
    data(){
        return{
            list:[],
            ars:'',
            allList:[],
            showLoading:true,
            isTheEnd:false,
            page:0,
            // 每页最多显示条数
            perpage:10,
        }
    },
    activated(){
        // console.log(this.id);
        this.showLoading = true;
        this.axios.get('/artist/top/song',{
            params:{
                id:this.id,
            }
        }).then(d=>{
            // console.log(d);
            // console.log(d.data.songs);
            // this.list = d.data.songs.slice(0,10);
            // console.log(this.list);
            this.allList = d.data.songs.map(data => {
                data.song = {
                    artists:data.ar,
                    album:data.al,
                }
                return data;
            })
            // console.log(this.allList);
            this.list = this.allList.slice(0,10);
            this.ars = this.list[0].ar[0].name;
            this.showLoading=false;
        });
        window.addEventListener('scroll',this.onScroll);
    },
    deactivated(){
        window.removeEventListener('scroll',this.onScroll);
    },
    methods:{
        playMusic(event){
            // console.log(event);
            this.$emit('play',event);
        },
        onScroll(){
            // 总高度
            let totalHeight = document.documentElement.scrollHeight;
            // 卷起来的高度
            let hideHeight = document.documentElement.scrollTop;
            // 视图高度
            let viewHeight = document.documentElement.clientHeight;
            if(totalHeight - 10 - hideHeight - viewHeight< 0){
                this.isLoading=true;
                this.page++; // 1  2
                let start=(this.page)*this.perpage;// 20   40
                let end=(this.page+1)*this.perpage;// 40   60
                this.list=this.list.concat(this.allList.slice(start,end));
                this.isLoading=false;
                if(this.list.length == this.allList.length){
                    this.isTheEnd = true;
                }else{
                    this.isTheEnd = false;
                }
            }
        },
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
.chart_singer{
    margin-top: 30px;
    .singer_list{
        ul{
            li{
                margin: 10px;
                border: solid 1px lighten(#ccc,12%);
                border-radius: 10px;
                overflow: hidden;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-right: 20px;
                &:nth-child(2n){
                    background-color: #fafafa;
                }
                .mes{
                    display: flex;
                    .left{
                        height: 80px;
                        overflow: hidden;
                        img{
                            height: 100%;
                        }
                    }
                    .right{
                        margin-left: 20px;
                        // border: solid 1px red;
                        .songName{
                            margin: 10px 0;
                            font-weight: bold;
                            color: lighten(#000,30%);
                            .text-hidden;
                        }
                        .songAlbum{
                            margin-top: 22px;
                            color: darken(#ccc,20%);
                            font-size: 14px;
                            .text-hidden;
                        }
                    }
                }
                .icon{
                    // border: solid 1px red;
                    i{
                        font-size: 22px;
                        color: lighten(#000,30%);
                    }
                }
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