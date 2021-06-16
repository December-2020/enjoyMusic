<template>
    <div class="roll_banner">
        <transition-group
            tag="ul"
            enter-active-class="animate__animated animate__slideInLeft"
            leave-active-class="animate__animated animate__slideOutRight"
            class="pic"
        >
            <li 
                v-for="(item,index) in imgUrl" 
                :key="index"
                v-show="index==showIndex"
            >
                <img :src="item" alt="">
            </li>
        </transition-group>
        <ul class="circle">
            <li v-for="i in imgUrl.length" :key="i" :class="{active:(i-1)==showIndex}"></li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['imgUrl'],
    data(){
        return{
            timer:null,
            showIndex:0,
        }
    },
    created(){
        this.autoPlay();
    },
    
    
    methods:{
        autoPlay(){
            this.timer = setInterval(() => {
                this.next();
                // console.log('轮播图');
            },6000);
        },
        next(){
            this.showIndex = ++this.showIndex>this.imgUrl.length-1?0:this.showIndex;
        },
    },
    
    beforeRouteLeave(to,from,next){
        clearInterval(this.timer);
        next();
    },
    deactivated(){
        clearInterval(this.timer);
    },
}
</script>

<style lang="less" scoped>
.roll_banner{
    // 图片原本的宽度
    max-width: 658px;
    // 图片原本的高度
    max-height: 303px;
    margin: 0 auto;
    // 图片在视图中的宽度
    width: 96vw;
    // 图片在视图中的高度
    height: calc(~'96vw / 658 * 303');
    position: relative;
    margin-bottom: .625rem;
    overflow: hidden;
    .pic{
        position: relative;
        li{
            position: absolute;
            img{

                width: 100%;
                max-width: 658px;
            }
        }
    }
    .circle{
        position: absolute;
        // border: solid 1px red;
        bottom: 6%;
        left: 50%;
        transform: translateX(-50%);
        li{
            float: left;
            width: 3vw;
            height: 3vw;
            max-height: 20px;
            max-width: 20px;
            border-radius: 50%;
            background-color: #fafafa;
            &:nth-child(2n){
                margin: 0 10px;
            }
            &.active{
                background-color: #2ed2a2;
            }

        }
    }
}
</style>