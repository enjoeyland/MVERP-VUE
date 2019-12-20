<template>
    <div class="sidebar">
        <div v-for="(menu, i) in menus" v-if="!menu.hidden&&menu.children" class="section" :key="'menu-' + i">
            <transition-expand>
                <div v-if="isExpanded(menu.meta.title)" :class="{ collapse: true, show: isExpanded(menu.meta.title) }">
                    <router-link @click.native="$emit('openMenu', subMenu)" v-for="(subMenu, j) in menu.children" :to="menu.path+'/'+subMenu.path" :key="'sub-menu-'+j">{{ subMenu.meta.title }}</router-link>
                </div>
            </transition-expand>
            <span @click="toggleCollapse(menu.meta.title)">{{menu.meta.title}}<i></i></span>
        </div>
    </div>
</template>

<script>
    import TransitionExpand from '../common/TransitionExpand'

    export default {
        name: "Sidebar",
        components: {
            TransitionExpand
        },
        data: function () {
            return {
                menus: this.$store.state.permission.routes,
                expandMenus: []
            }
        },

        created: function() {
            let hash = window.location.hash || '';
            hash = hash.replace('#', '');

            let currentMenu = this.menus.map(it => it.children).flat(Infinity).find(it => it.path === hash);
            if (currentMenu) {
                this.$emit('openMenu', currentMenu);
            }
        },

        methods: {
            toggleCollapse: function (menuName) {
                let index = this.expandMenus.findIndex(it => it === menuName);
                let newExpandMenus = [...this.expandMenus];

                if (index === -1) newExpandMenus.push(menuName);
                else newExpandMenus.splice(index, 1);

                this.expandMenus = newExpandMenus;
            },

            isExpanded: function (menuName) {
                return this.expandMenus.indexOf(menuName) !== -1;
            }
        }
    }
</script>

<style lang="less" scoped>
    .sidebar {
        width: 270px;
        height: 100%;
        border: solid 1px #e5e5e5;
        border-top: none;
        border-left: none;
        overflow-y: scroll;
    }

    .sidebar .section {
        display: flex;
        flex-direction: column-reverse;
        padding: 10px 30px;
        color: @grey;
        font-family: NotoSansCJKkr-Bold, sans-serif;
        overflow: hidden;
    }

    .sidebar .section span {
        height: 30px;
        line-height: 30px;
        position: relative;
        display: inline-block;
        width: 100%;
        font-size: 15px;
        cursor: pointer;

        &:hover {
            color: @tealish;
        }
    }

    .sidebar .section span i {
        position: absolute;
        right: 0;
        top: 7px;
        width: 16px;
        height: 16px;
        cursor: pointer;
        border: 2px solid currentColor;

        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 6px;
            height: 6px;
            border-top: 2px solid currentColor;
            border-right: 2px solid currentColor;
            transform: translate(-50%, -50%) rotate(135deg);
            transition: all .2s ease-in;
        }

        &::after {
            content: '';
            position: absolute;
            top: -10px;
            right: -10px;
            bottom: -10px;
            left: -10px;
        }
    }

    .sidebar .section .collapse {
        position: relative;
        /*opacity: 0;*/
        height: auto;
        /*max-height: 0;*/
        margin: 0 10px 10px;
        font-family: NotoSansCJKkr-Medium, sans-serif;
        transition: all .2s linear;
        overflow: hidden;

        /*&.show {*/
            /*opacity: 1;*/
            /*max-height: 200px;*/
        /*}*/
        &.show + span {
            color: @tealish;
            i {
                &::before {
                    transform: translate(-50%, -50%) rotate(-45deg);
                }
            }
        }
    }

    .sidebar .section .collapse a {
        position: relative;
        text-decoration: none;
        font-size: 13px;
        color: @grey;
        margin: 10px 4px;
        padding-left: 10px;

        &::before {
            content: '';
            position: absolute;
            height: 100%;
            width: 2px;
            bottom: 0;
            left: -4px;
            background: @tealish;
            transform: scaleY(0);
            transform-origin: top;
            transition: all 0.5s ease-out;
        }

        &::after {
            content: '\A';
            white-space: pre;
        }

        &:hover {
            color: @tealish;
            &::before {
                transform: scaleY(1);
                transform-origin: bottom;
            }
        }
    }
</style>
