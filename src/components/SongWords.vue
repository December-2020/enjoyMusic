<template>
    <div class="song_words" v-if="lyric">
        <ul :style="{
            transform:`translateY(-${lyricIndex*29-29.6*5.5}px)`,
        }">
            <li
                v-for="(item,index) in lyricArray"
                :key="index"
                :class="{heighlight:index==lyricIndex}"
            >
            {{item.lyric}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    // props:['lyric','musicObj','duration','currentTime'],
    props:['lyric','musicObj','duration','currentTime'],
    created(){
        // console.log(this.lyric);
        // console.log(this.duration,this.currentTime);
    },
    computed:{
        // 根据字符串歌词转化为数组
        lyricArray(){
            // 没有歌词返回空数组
            if(!this.lyric) return;
            let lyric = this.lyric+'';
            let arr = lyric.split('\n');
            arr.pop();
            let reg = /\[(\d+):(\d+\.\d+)\](.*)/;
            let lyricArr = arr.map(item => {
                if(reg.test(item)){
                    let lyricObj={
                        time:parseInt(RegExp.$1)*60 + parseFloat(RegExp.$2),
                        lyric:RegExp.$3,
                    }
                    // console.log(lyricObj);
                    return lyricObj;
                }
            });
            // console.log(lyricArr);
            return lyricArr;
        },
        // 当前歌词的下标
        lyricIndex(){
            let ctime = this.currentTime;
            let lyric = this.lyricArray;
            let index = 0;
            for(let i=0; i < lyric.length; i++){
                if(i >= lyric.length - 1){
                    // 最后一条歌词
                    index = i;
                    break;
                }
                if(lyric[i].time <= ctime && ctime < lyric[i+1].time){
                    index = i;
                    break;
                }
            }
            return index;
        },
    },
}
</script>

<style lang="less" scoped>
.song_words{
    // border: solid 1px green;
    height: 18rem;
    width: 90vw;
    overflow: hidden;
    ul{
        li{
            line-height: 30px;
            box-sizing: border-box;
            text-align: center;
            color: darken(#ccc,30%);
            font-weight: 300;
            &.heighlight{
                color: lighten(#2ed2a2,10%);
                font-weight: normal;
                font-size: 20px;
            }
        }
    }
}
</style>