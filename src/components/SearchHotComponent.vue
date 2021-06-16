<template>
    <div class="search_hot_component">
        <p>搜索热词</p>
        <ul class="hot_words">
            <li 
                v-for="(item,index) in hotSearch" 
                :key="index"
                @click.stop="$emit('search',{keywords:item.first})"
            >{{item.first}}</li>
        </ul>
        <!-- <p>搜索历史</p>
        <div class="history">
            <h1>11111</h1>
        </div> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            hotSearch:[],
        }
    },
    created(){
        this.axios('/search/hot').then(d => {
            // console.log(d.data.result.hots);
            this.hotSearch = d.data.result.hots;
        })
    },
}
</script>

<style lang="less" scoped>
.search_hot_component{
    padding: .375rem;
    padding-bottom: 1.25rem;
    background-color: #fff;
    p{
        margin: 14px;
        color: lihten(#000,30%);
    }
    .hot_words{
        // border: solid 1px red;
        padding: .375rem;
        box-sizing: border-box;
        padding-top: 0px;
        &::after{
            content: '';
            display: block;
            clear: both;
        }
        li{
            padding: 6px;
            border: solid 1px #ccc;
            float: left;
            margin: 4px;
            border-radius: 10px;
            background-color: #fafafa;
            font-size: 14px;
            color: lighten(#000,30%);
        }
    }
}
</style>