<template>
    <div class="list">
        <slot name="sortNum"></slot>
        <div class="musicelist">
            <div class="left">
                <!-- <p class="songName">{{item.name}}</p> -->
                <p class="songName" v-html="$options.filters.filtKeyWord(item.name,keywords)"></p>
                <p class="songMes">
                    <i v-if="item.song.privilege&&item.song.privilege.maxbr>320000" class="iconfont icon-SQ"></i>
                    <span v-for="artists in item.song.artists" :key="artists.id" v-html="$options.filters.filtKeyWord(artists.name,keywords)"></span>
                     · 
                    <span v-html="$options.filters.filtKeyWord(item.song.album.name,keywords)"></span>
                </p>
            </div>
            <div class="right" @click.stop="$emit('play',item)">
                <loading v-if="musicObj&&item.id == musicObj.id"></loading>
                <i v-else class="iconfont icon-bofang1"></i>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/Loading'
export default {
    props:{
        item:Object,
        keywords:{
            type:String,
            default:'',
        },
        musicObj:{
            // 可能有两种类型
            type:[Object,null],
        },
    },
    components:{
        Loading,
    },
    created(){
        // console.log(this.item);
        // console.log(this.keywords);
    },
    filters:{
        filtKeyWord(value,k){
            return value.replace(k,'<span style="color:#29d399">' +k+ '</span>')
        }
    },
}
</script>

<style lang="less" scoped>
@color:#29d399;
.text-hidden{
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.list{
    position: relative;
    overflow: hidden;
    &>b{
        // border: solid 1px red;
        float: left;
        margin-top: 20px;
        font-weight: normal;
        font-size: 16px;
        margin-right: -6px;
        margin-left: 10px;
    }
    &:first-child,&:nth-child(2),&:nth-child(3){
        &>b{
            color:@color;
        }
    }
    
    .musicelist{
        padding: 5px 20px 5px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        padding-bottom: 10px;
        &::after{
            content: '';
            position: absolute;
            border-bottom: solid 1px rgb(235, 235, 235);
            width: 94vw;
            bottom: 0.35rem;
        }
        
        .left{
            .songName{
                line-height: 30px;
                font-weight: 540;
                .text-hidden;
            }
            .songMes{
                // border: solid 1px red;
                color: #878787;
                font-size: 12px;
                .text-hidden;
                i{
                    vertical-align:middle;
                    font-size: 20px;
                    margin-right: 4px;
                    color: #bea82a;
                }
            }
        }
        .right{
            margin-left: 60px;
            // border: solid 1px red;
            i{
                font-size: 24px;
                color: #c1c1c3;
            }
        }
        
    }
}
</style>