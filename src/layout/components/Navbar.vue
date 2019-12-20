<template>
    <div class="header">
        <div class="logo"></div>
        <div class="user">
            <a-avatar icon="user" />
            <a-dropdown :trigger="['click']">
                <span class="ant-dropdown-link">
                    {{ userName }}<a-icon type="down" />
                </span>
                <a-menu slot="overlay">
                    <a-menu-item key="0">
                        <span style="display:block;" @click="logout">로그아웃</span>
                    </a-menu-item>
                </a-menu>
            </a-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        data(){
            return{
                userName:'',
            }
        },
        methods: {
          async logout() {
            await this.$store.dispatch('LogOut')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          }
        },
        created(){
            this.userName = this.$store.state.user.name;
        }
    }
</script>

<style lang="less" scoped>
    .header {
        width: 100%;
        padding: 10px;
        height: @header-height;
        border-bottom: solid 1px #e5e5e5;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .user {
        margin-right: 30px;
    }

    .header .logo {
        width: 120px;
        height: 30px;
        background: url("../../assets/images/logo.jpg") no-repeat center / cover;
    }

    .ant-avatar {
        background-color: @tealish;
    }

    .ant-dropdown-link {
        cursor: pointer;
        margin-left: 10px;
        color: #000;
    }
</style>
