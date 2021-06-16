<template>
    <div class="alllisten">
        <div class="left">
            <img :src="item.al.picUrl" alt="">
        </div>
        <div class="right">
            <p class="songName">{{item.name}}</p>
            <p class="songMes">{{item.ar[0].name}}-{{item.al.name}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        item:Object,
    },
    created(){
        // console.log(this.item);
    }
}
</script>

<style lang="less" scoped>
.text-hidden{
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.alllisten{
    padding: 10px;
    padding-top: 0;
    display: flex;
    // border: solid 1px red;
    // align-items: center;
    .left{
        margin-right: 1.25rem;
        img{
            height: 6.25rem;
            width: 6.25rem;
            border-radius: 10px;
        }
    }
    .right{
        margin-top: .625rem;
        p{
            margin: 15px 0;
        }
        .songName{
            font-size: 16px;
            // font-weight: 900;
            font-weight: 550;
            .text-hidden;
        }
        .songMes{
            color: #7a7a7a;
            font-size: 14px;
            .text-hidden;
        }
    }
}
</style>