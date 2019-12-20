<template>
    <div v-if="selectedMenus.length !== 0" class="toolbar">
        <span v-for="menu in selectedMenus"
              :class="{ bar: true, current: menu.name === currentMenu.name }">
            <router-link :to="menu.path" @click.native="$emit('openMenu', menu)">{{ menu.name }}</router-link>
            <i class="close" @click="$emit('closeMenu', menu)"></i>
        </span>
    </div>
</template>

<script>
    export default {
        name: "Toolbar",
        props: [ 'selectedMenus', 'currentMenu' ],
    }
</script>

<style scoped lang="less">
    .toolbar {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-end;
        flex-wrap: nowrap;
        border-bottom: 1px solid @light-grey;
        width: 100%;
        height: @toolbar-height;
        background-color: #fff;
        font-family: NotoSansCJKkr-Bold, sans-serif;
        font-size: 12px;
        color: #000;
        overflow: hidden;
    }

    .toolbar .bar {
        position: relative;
        background-color: #fff;
        color: #000;
        display: inline-block;
        border-radius: 10px 10px 0 0;
        border: 1px solid @light-grey;
        border-bottom: none;
        height: 38px;
        max-width: 150px;
        margin: 0 4px;
        padding: 10px 30px 10px 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        transition: all .2s ease-out;

    &:hover {
         box-shadow: 0 0 4px -1px rgba(0,0,0,.3);
     }

    &.current {
         background: @tealish;
         border-color: @tealish;
         color: #fff;
     }
    }

    .toolbar .bar a {
        position: relative;
        text-decoration: none;
        color: inherit;

        &:before {
            position: absolute;
            content: '';
            top: -10px;
            left: -10px;
            bottom: -10px;
            right: -1px;
        }
    }

    .toolbar .bar i.close {
        position: absolute;
        right: 6px;
        top: 50%;
        width: 12px;
        height: 12px;
        transform: translateY(-50%);
        color: currentColor;
        cursor: pointer;

    &:hover::before,
    &:hover::after {
         background: currentColor;
     }

    &::before,
    &::after{
         content: "";
         position: absolute;
         height: 100%;
         width: 2px;
         background: #d4dadf;
         transition: all .1s ease-in-out;
     }
    &::before{
         transform: rotate(45deg);
     }
    &::after{
         transform: rotate(-45deg);
     }
    }
</style>