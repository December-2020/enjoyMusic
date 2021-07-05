<template>
    <div class="chart_item" @click="gotoChartSongList(item.id)">
        <div class="title">{{item.updateFrequency}}</div>
        <div class="mes">
            <div class="left">
                <h5>{{item.name}}</h5>
                <div class="img">
                    <img :src="item.coverImgUrl" alt="">
                </div>
            </div>
            <div class="right">
                <ul v-if="item.tracks">
                    <li v-for="(i,index) in item.tracks" :key="index">
                        {{index+1}}. {{i.first}} - <span>{{i.second}}</span>
                    </li>
                </ul>
            </div>
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
        gotoChartSongList(id){
            // console.log(id);
            this.$router.push(`/recommend_songs/:${id}`);
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
.chart_item{
    margin: 10px 0;
    border-radius: 10px;
    padding: 6px;
    height: 125.6px;
    .title{
        float:right;
        color: darken(#ccc,15%);
        font-size: 15px;
    }
    .mes{
        // border: solid 1px orange;
        margin-top: 16px;
        display: flex;
        align-items: center;
        .left{
            margin-right: 1.25rem;
            h5{
                font-size: 18px;
                margin: 6px 0;
                text-align: center;
                color: lighten(#000,30%);
                font-weight: normal;
            }
            .img{
                width: 5rem;
                border-radius: 10px;
                height: 5rem;
                overflow: hidden;
                img{
                    width: 100%;
                }
            }
        }
        .right{
            ul{
                // border: solid 1px red;
                li{
                    margin: 16px 0;
                    font-size: 15px;
                    .text-hidden;
                    span{
                        color: darken(#ccc,20%);
                    }
                }
            }
        }
    }
}
</style>