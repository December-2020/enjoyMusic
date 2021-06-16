<template>
    <div class="picitem" @click="gotoRecommendSongs(item.id)">
        <img :src="item.picUrl">
        <p>{{item.name}}</p>
        <div class="icon"><span class="iconfont icon-bofang"></span>{{item.playCount|formatNum}}</div>
    </div>
</template>

<script>
export default {
    props:{
        item:Object
    },
    filters:{
       formatNum(val){
            if(val>10000000){
                let str = '';
                str = (parseInt(val)/10000000).toFixed(1) + '千万'
                return str;
            }else if(val >= 10000){
                let str = '';
                str = (parseInt(val)/10000).toFixed(1) + '万'
                return str;
            }else{
                return val;
            }
        },
    },
    methods:{
        gotoRecommendSongs(id){
            this.$router.push(
                {
                    path:`/recommend_songs/:${id}`,
                }
            )
        }
    }
}
</script>

<style lang="less" scoped>
@color:#929cb7;
.text-hidden{
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.picitem{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-bottom: 16px;
    img{
        width: 25vw;
        border-radius: 1rem;
    }
    p{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        padding: 6px 2px 0 6px;
        min-height: 30px;
        line-height: 1.2;
        font-size: 13px;
        margin-top: .75rem;
    }
    .icon{
        // border: solid 1px red;
        .text-hidden;
        position: absolute;
        margin-top: 20.8vw;
        max-width: 18vw;
        // margin-left: -5vw;
        left: 4vw;
        color: white;
        padding: 0 6px;
        // height: 5vw;
        background-color: @color;
        line-height: 5vw;
        font-size: .6em;
        border-radius: 1.25rem;
        span{
            margin-right: .425rem;
            font-size: .6em;
        }
    }
}
</style>