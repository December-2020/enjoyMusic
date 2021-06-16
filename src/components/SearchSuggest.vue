<template>
    <div class="search_suggest">
        <p>搜索提示</p>
        <ul class="mes">
            <li 
                v-for="val in suggestList" :key="val.id"
                @click.stop="$emit('search',{keywords:val.name})"
            >
            <i class="iconfont icon-sousuo"></i>
            <span>{{val.name}}</span>
            </li>
            <li v-show="suggestList.length<=0">暂无结果</li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        keywords:String,
    },
    data(){
        return{
            suggestList:[],
        }
    },
    created(){
        // console.log(this.keywords);
        this.initiationRequest(this.keywords);
    },
    watch:{
        keywords(newVal){
            this.initiationRequest(newVal);
        }
    },
    methods:{
        //发起请求
        initiationRequest(keywords){
            // console.log(keywords,1);
            //搜索结果包含 歌曲 专辑 歌手 歌单
            // order搜结果字段
            this.axios.get('/search/suggest?keywords='+keywords).then(d => {
                // console.log(d.data.result.songs);
                if(d.data.result&&d.data.result.songs){
                    this.suggestList=d.data.result.songs;
                    // console.log(this.suggestList);
                }
            })
        }
    },
    
}
</script>

<style lang="less" scoped>
.search_suggest{
    background-color: #fff;
    padding: .375rem;
    padding-bottom: 1.25rem;
    p{
        margin: 14px;
        color: lihten(#000,30%);
    }
    .mes{
        padding: .375rem;
        box-sizing: border-box;
        padding-top: 0px;
        li{
            margin: 10px;
            color: lighten(#000,30%);
            font-size: 14px;
            i{
                margin-right: .625rem;
                color: darken(#fafafa,30%);
            }
        }
    }
}
</style>