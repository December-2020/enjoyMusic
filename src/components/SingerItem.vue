<template>
    <div class="singer_item" @click="gotosinger(item.id)">
        <div class="middle">
            <img :src="item.picUrl" alt="">
        </div>
        <div class="right">
            <p>{{item.name}}</p>
            <p>{{item.alias[0]}}</p>
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
        gotosinger(id){
            this.$router.push(`/chart_singer/${id}`)
        }
    }
}
</script>

<style lang="less" scoped>
.singer_item{
    // border: solid 1px red;
    margin: 10px 0;
    display: flex;
    align-items: center;
    border-radius: 10px;
    // background-color: #fff;
    .middle{
        margin-right: 1.25rem;
        img{
            width: 7rem;
            border-radius: 10px;
        }
    }
    .right{
        p{
            margin: 10px 0;
            &:last-child{
                color:darken(#ccc,20%);
                font-size: 15px;
            }
        }
    }
}
</style>