<template>
     <div class="search" @click="goto">
        <div class="searchIcon iconfont icon-sousuo" @click.stop="gotosearch"></div>
        <input type="text" placeholder="那英    从前那个少年" value="">
        <!-- v-model="iptVal" @keyup.enter="enter" -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            // iptVal:'',
        }
    },
    methods:{
        gotosearch(){
            // if(this.iptVal.trim() == ''){
            //     this.iptVal = '';
            //     return;
            // }
            // console.log(this.iptVal);
            this.$router.push('Search');
        },
        goto(){
            this.gotosearch();
        },
        // enter(){
        //     this.search();
        // }
    },
}
</script>

<style lang="less" scoped>
.search{
    position: relative;
    // border: solid 1px red;
    margin-top: -2.2rem;
    padding: 6px;
    background-color: #fafafa;
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
    }
}
</style>