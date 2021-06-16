<template>
    <div class="mv_item" @click="gotoChartMV(item.id)">
        <div class="fl">
            <img :src="item.picUrl" alt="">
        </div>
        <div class="f2">
            <p>
                <i class="iconfont icon-bofang1"></i>
                {{item.playCount|formatNum}}
            </p>
            <p>{{item.duration|formatTime}}</p>
        </div>
        <div class="f3">{{item.name}}</div>
        <div class="f4">
            <ul>
                <li v-for="(i,index) in item.artists" :key="index">{{i.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props:['item'],
    created(){
        // console.log(this.item);
    },
    methods:{
        gotoChartMV(id){
            // console.log(id);
            this.$router.push(`/chart_mv/${id}`);
        }
    },
    filters:{
        formatTime(val){
            let ctime = parseInt(val)/1000;
            let min = parseInt(ctime/60);
            let sec =parseInt(ctime) -  parseInt(min*60);
            min = min < 10?'0'+min:min;
            sec = sec < 10?'0'+sec:sec;
            return min+ ":" +sec
        },
        formatNum(val){
            if(val >= 10000){
                return (val/10000).toFixed(2) + '万';
            }
            return val;
        }
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
.mv_item{
    border: solid 1px lighten(#ccc,10%);
    margin: 6px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    .fl{
        // border: solid 1px red;
        img{
            width: 100%;
            margin: 0 auto;
            border-radius: 10px 10px 0 0;
        }
    }
    .f2{
        width: 100%;
        display: flex;
        // border: solid 1px blue;
        position: absolute;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 10;
        transform: translateY(-100%);
        background-color: rgba(0, 0, 0, 0.13);
        padding: 4px;
        box-sizing: border-box;
        // filter: blur(8px);
        p{
            font-size: 15px;
            color: snow;
        }
    }
    .f3{
        // padding: 6px;
        padding-left: 10px;
        margin: 6px 0;
        .text-hidden;
    }
    .f4{
        padding-left: 10px;
        padding-bottom: 10px;
        ul{
            display: flex;
            li{
                color: darken(#ccc,10%);
                font-size: 15px;
                .text-hidden;
            }
        }
    }
}
</style>