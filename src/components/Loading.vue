<template>
    <div class="loading">
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</template>

<style lang="less" scoped>
.loading{
    padding-bottom: 10px;
    ul{
        display: flex;
        justify-content: center;
        li{
            width: 3px;
            margin-left: 3px;
            height: 20px;
            background-color: #24d39c;
            animation: load .8s .1s infinite;
            transform-origin: bottom;
            &:nth-child(1){
                animation-delay: 0s;
            }
            &:nth-child(2){
                animation-delay: 0.4s;
            }
            &:nth-child(3){
                animation-delay: .2s;
            }
            &:nth-child(4){
                animation-delay: -0.2s;
            }
        }
    }
}
@keyframes load {
    from{
        transform: scaleY(0.1);
    }
    to{
        transform: scaleY(1.2);
    }
}
</style>