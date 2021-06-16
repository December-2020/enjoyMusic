<template>
    <div :class="['song',{pause:isPlay}]" v-if="musicObj">
        <div class="album">
            <img :src="musicObj.picUrl" alt="" class="square">
            <img :src="musicObj.picUrl" alt="" class="circle">
        </div>
        <div class="mes">
            <div class="mes_m">
                <div class="song_name">{{musicObj.name}}</div>
                <div class="song_mes">{{musicObj.song.album.name}} - {{musicObj.song.artists[0].name}}</div>
            </div>
            <div class="mes_r" @click="liked">
                <i :class="['iconfont',isLike?'icon-1_music90':'icon-1_music89']"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        musicObj:Object,
        isPlay:Boolean
    },
    created(){
        // console.log(this.musicObj);
        // console.log(this.isPlay);
    },
    methods:{
        liked(){
            this.isLike = !this.isLike;
        },
    },
    data(){
        return{
            isLike:false,
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
.song{
    // border: sandybrown solid 1px;
    width: 90vw;
    height: 18rem;
    .album{
        margin: 2rem auto;
        position: relative;
        width: 14rem;
        margin-bottom: 2.8rem;
        .square{
            width: 10.5rem;
            height: 10.5rem;
            border-radius: 1.25rem;
            margin-left: -1rem;
            position: absolute;
            top:-20px;
            z-index: 9;
        }
        .circle{
            width: 4.25rem;
            height: 4.25rem;
            border-radius: 50%;
            margin-left: 5.5rem;
            border: solid 2rem lighten(#000,30%);
            animation: round 5s 0s linear infinite;
        }
    }
    .mes{
        height: 3.75rem;
        position: relative;
        .mes_m{
            // border: solid 1px red;
            text-align: center;
            height: 3.75rem;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            .song_name{
                font-size: 16px;
                color: lighten(#000,30%);
                .text-hidden;
            }
            .song_mes{
                font-size: 13px;
                color: darken(#fafafa,30%);
                .text-hidden;
            }
        }
        .mes_r{
            position: absolute;
            right: 1.25rem;
            transform: translateY(-50%);
            top: 50%;
            i{
                font-size: 24px;
            }
            .icon-1_music90{
                color: #f96046;
            }
        }
    }
}
@keyframes round {
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
.pause{
    .album{
        .circle{
            animation-play-state: paused;
        }
    }
}
</style>