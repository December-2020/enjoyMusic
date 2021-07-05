<template>
    <div class="search">
        <head-line>搜索</head-line>
        <form @submit.prevent.stop="search" class="searchfrom">
            <div class="search_input">
                <div class="searchIcon iconfont icon-sousuo" @click="search"></div>
                <input type="text" placeholder="那英    从前那个少年" v-model="keywords" @input="inputIng">
                <i class="iconfont icon-shanchu icon" v-show="isDel" @click.stop.prevent="del"></i>
            </div>
        </form>
        <component 
            :is="showcomponent" 
            @search="search" 
            :keywords="keywords"
            @play="$emit('play',$event)"
            :musicObj="musicObj"
        ></component>
    </div>
</template>

<script>
import HeadLine from '@/components/HeadLine'
import SearchResult from '@/components/SearchResult'
import SearchSuggest from '@/components/SearchSuggest'
import SearchHotComponent from '@/components/SearchHotComponent'
export default {
    name:'Search',
    props:['musicObj'],
    components:{
        HeadLine,
        SearchResult,
        SearchSuggest,
        SearchHotComponent,
    },
    data(){
        return{
            showcomponent:SearchHotComponent,
            keywords:'',
            isDel:false,
        }
    },
    methods:{
        search(event){
            // 如果组件式传值需要取出关键词
            if(event.keywords){
                this.keywords = event.keywords;
                this.isDel = true;
            }
            if(this.keywords.trim() == '' || this.keywords.length<=0){
                this.showcomponent = SearchHotComponent;
                this.isDel = false;
            }else{
                this.showcomponent = SearchResult;
                this.isDel = true;
            }
        },
        inputIng(){
            if(this.keywords.trim() == '' || this.keywords.length<=0){
                this.showcomponent = SearchHotComponent;
                this.isDel = false;
            }else{
                this.showcomponent = SearchSuggest;
                this.isDel = true;
            }
        },
        // 删除
        del(){
            this.keywords = '';
            this.showcomponent = SearchHotComponent;
        },
    },
}
</script>

<style lang="less" scoped>
.search{
    @bgcolor:#fafafa;
    background-color: @bgcolor;
    margin-top: 30px;
    .searchfrom{
        .search_input{
            position: relative;
            padding: 6px;
            background-color: darken(@bgcolor,2%);
            box-sizing: border-box;
            .searchIcon{
                position: absolute;
                // border: solid 1px red;
                line-height: 1.5rem;
                left: 1rem;
            }
            input{
                width: 97vw;
                border-radius: .625rem;
                outline: none;
                border: none;
                height: 1.5rem;
                box-sizing: border-box;
                padding-left: 2rem;
                margin: 0 auto;
                padding-right: 1.8rem;
            }
            .icon{
                color: darken(@bgcolor,40%);
                position: absolute;
                right: 1.1rem;
                top: .71875rem;
            }
        }
    }
}
</style>