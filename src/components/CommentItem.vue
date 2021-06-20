<template>
    <div class="comment_item">
        <div class="pic">
            <img :src="item.user.avatarUrl" alt="">
        </div>
        <div class="mes">
            <div class="top">
                <p>{{item.user.nickname}}</p>
                <span>{{item.time|formatTime}}</span>
            </div>
            <p>{{item.content}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props:['item'],
    created(){
        // console.log(this.item);
    },
    filters:{
        formatTime(val){
            let date = new Date(val);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
            let D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate())+ ' ';
            let h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
            let m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
            let s = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
            return Y+M+D+h+m+s;
        }
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
.comment_item{
    // border: solid 1px red;
    display: flex;
    align-items: center;
    padding: 6px;
    .pic{
        img{
            height: 3.75rem;
            border-radius: 50%;
        }
    }
    .mes{
        margin-left: 10px;
        // border: solid 1px blue;
        flex: 1;
        p{
            line-height: 1.2;
            color: lighten(#000,30%);
        }
        .top{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 6px;
            p{
                color: lighten(#000,20%);
                font-size: 15px;
                overflow: hidden; /*自动隐藏文字*/
                text-overflow: ellipsis;/*文字隐藏后添加省略号*/
                white-space: nowrap;/*强制不换行*/
                width: 100px;
            }
            span{
                color: darken(#ccc,10%);
                font-size: 12px;
                .text-hidden;
            }
        }
    }
}
</style>