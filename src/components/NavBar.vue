<template>
    <div class="navbar">
        <div class="top">
            <div class="top_l">
                <ul>
                    <li><span class="rec iconfont icon-recommend"></span><router-link to="/recommend">推荐</router-link></li>
                    <li><router-link to="/hot">热门</router-link><span class="hot iconfont icon-remen"></span></li>
                    <li><router-link to="/charts">排行</router-link><span class="new iconfont icon-paihang"></span></li>
                </ul>
            </div>
            <div class="top_r">
                <i class="iconListen iconfont icon-tubiaozhizuomobanyihuifu-"></i>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.navbar{
    height: 4.6rem;
    background-color: #fafafa;
    position: relative;
    margin-bottom: .625rem;
    .top{
        padding:6px;
        position: fixed;
        display: flex;
        justify-content: space-between;
        line-height: 2.2rem;
        background-color: #fafafa;
        width: 100%;
        z-index: 99;
        .top_l{
            width: 68%;
            margin-left: 2vw;
            ul{
                display: flex;
                li{
                    flex: 1;
                    position: relative;
                    .rec{
                        position: absolute;
                        top: -0.4125rem;
                        left: -0.625rem;
                        color: #2ed2a2;
                        font-size: 1.5em;
                    }
                    .hot{
                        position: absolute;
                        top: -.6rem;
                        left: 2rem;
                        color: #eb4450;
                    }
                    .new{
                        position: absolute;
                        top: -.6rem;
                        left: 1.85rem;
                        color: #fa8281;
                        font-size: 1.2em;
                    }
                    a{
                        color: black;
                        position: absolute;
                        z-index: 99;
                        display: inline-block;
                        &.router-link-exact-active{
                            font-weight: bolder;
                            &::after{
                                content: '';
                                display: block;
                                border: none;
                                width: calc(~"100% + 1.25rem");
                                margin-left: -0.625rem;
                                border-bottom: #2ed2a2 solid 3px;
                            }
                        }
                    }
                }
            }
        }
        .top_r{
            margin-right: 1.75rem;
            .iconListen{
                font-size: 1.2em;
                color: #0fdcb6;
            }
        }
    }
}
</style>

