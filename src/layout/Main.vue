<template>
    <div class="container">
        <Navbar />
        <div class="main">
            <Sidebar @openMenu="openMenu" />
            <div class="content">
                <Toolbar :selectedMenus="selectedMenus" :currentMenu="currentMenu" @openMenu="openMenu" @closeMenu="closeMenu"/>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from './components/Navbar'
    import Sidebar from './components/Sidebar'
    import Toolbar from './components/Toolbar'

    export default {
        name: "Layout",
        components: {
            Navbar,
            Sidebar,
            Toolbar,
        },
        data: function() {
            
            return {
                selectedMenus: [],
                currentMenu: {}
            }
        },

        methods: {
            openMenu(menu) {
                if (!menu) return;

                let index = this.selectedMenus.findIndex(it => it.name === menu.name);
                if (index === -1) {
                    this.selectedMenus.push(menu);
                    this.selectedMenus = this.selectedMenus.slice(-10);
                }
                this.currentMenu = menu;
            },

            closeMenu(menu) {
                if (this.selectedMenus.length === 1) return;
                let index = this.selectedMenus.findIndex(it => it.name === menu.name);
                if (index === -1) return;

                this.selectedMenus.splice(index, 1);
                if (this.currentMenu.name === menu.name) {
                    if (this.selectedMenus.length === 0) {
                        return;
                    }
                    if (this.selectedMenus.length === index) {
                        this.currentMenu = this.selectedMenus[index - 1];
                        this.$router.push(this.currentMenu.path);
                    } else {
                        this.currentMenu = this.selectedMenus[index];
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .container {
        height: 100%;
        min-height: 100%;
        margin: 0;
        padding: 0;
        background: white;
        color: white;
        overflow: hidden;
        border: 1px solid @grey;
    }

    .main {
        width: 100%;
        height: calc(~"100% - @{header-height}");
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .content {
        position: relative;
        height: 100%;
        background: #f9fafc;
        width: calc(~"100% - @{sidebar-width}");
    }
</style>
