<template>
    <h3 class="bordertitle">
        <slot></slot>
    </h3>
</template>

<style lang="less" scoped>
.bordertitle{
    font-size: 1.0625rem;
    color: #333;
    padding-left: .625rem;
    position: relative;
    margin: .625rem 0;
    &::after{
        content: '';
        position: absolute;
        border-left: 2px solid #2ed2a2;
        height: 1.0625rem;
        top: 50%;
        left: .1rem;
        transform: translateY(-50%);
    }
    span{
        font-weight: normal;
        font-size: 13px;
        margin-left: 10px;
        color: darken(#ccc,10%);
    }
}
</style>
