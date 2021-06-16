<template>
    <div class="headline">
        <div class="back" @click="backto">
            <i class="iconfont icon-huitui"></i>
        </div>
        <div class="title"><slot></slot></div>
    </div>
</template>

<script>
export default {
    methods:{
        backto(){
            this.$router.back();
        },
    }
}
</script>

<style lang="less" scoped>
@bgcolor:#fafafa;
.headline{
    display: flex;
    align-items: center;
    background-color: darken(@bgcolor,2%);
    .back{
        // border: solid 1px blue;
        color: darken(#ccc,20%);
        // border: solid 1px red;
        text-align: center;
        box-sizing: border-box;
        padding: 5px;
        i{
            font-size: 26px;
        }
    }
    .title{
        margin: 0 auto;
        // border: solid 1px red;
        padding: 10px 0;
        color: lighten(#000,40%);
        transform: translateX(-20px);
    }
}
</style>