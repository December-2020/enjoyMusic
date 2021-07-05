<template>
    <div class="chart_mv" v-if="mvUrl">
        <head-line>MV</head-line>
        <loading v-show="isLoading"></loading>
        <video :src="mvUrl" controls></video>
        <border-title>相似mv</border-title>
        <loading v-show="isLoading"></loading>
        <div class="mv_item">
            <ul>
                <li v-for="item in simiMV" :key="item.id" >
                    <mv-item :item="item"></mv-item>
                </li>
            </ul>
        </div>
        <border-title>评论<span>共有{{MVComments.length}}条数据</span></border-title>
        <div class="mv_comment">
            <loading v-show="isLoading"></loading>
            <ul>
                <li v-for="(item,index) in MVComments" :key="index">
                    <comment-item :item="item"></comment-item>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import HeadLine from '@/components/HeadLine';
import MvItem from '@/components/MvItem';
import BorderTitle from '@/components/BorderTitle';
import CommentItem from '@/components/CommentItem';
import Loading from '@/components/Loading'


export default {
    name:'ChartMV',
    props:['id'],
    components:{HeadLine,MvItem,BorderTitle,CommentItem,Loading},
    data(){
        return{
            mvUrl:'',
            // 相似mv
            simiMV:[],
            MVComments:[],
            isLoading:true,
        }
    },
    activated(){
        // mv
        this.axios.get('mv/url?id='+this.id).then(d => {
            // console.log(d);
            this.mvUrl = d.data.data.url;
            this.isLoading = false;
        });
        // 相似mv
        this.isLoading = true;
        this.axios.get('/simi/mv?mvid='+this.id).then(d => {
            let da = d.data.mvs.map(data => {
                data.picUrl=data.cover;
                return data;
            })
            this.simiMV = da.slice(0,4);
            // console.log(this.simiMV);
            this.isLoading = false;
        });
        // mv评论
        this.isLoading = true;
        this.axios.get('/comment/mv?id='+this.id).then(d => {
            // console.log(d.data.comments);
            this.MVComments = d.data.comments;
            this.isLoading = false;
        })
    },
    created(){
        
    },
    mounted(){
        document.documentElement.scrollTop = 0;
    },
}
</script>

<style lang="less" scoped>
.chart_mv{
    margin-top: 30px;
    video{
        width: 98vw;
        margin: 0 1vw;
    }
    h5{
        margin: 10px;
    }
    .mv_item{
        ul{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li{
                width: 50%;
            }
        }
    }
    .mv_comment{
        ul{
            padding:0 10px;
            li{
                border-radius: 10px;
                &:nth-child(2n){
                    background-color: #fafafa;
                }
            }
        }
    }
}
</style>