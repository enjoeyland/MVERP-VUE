<template>
    <div class="login">
        <div class="login-form">
            <div class="form">
                <img src="../../assets/images/logo.jpg" />
                <p>환영합니다, <br/>계정으로 로그인해주세요.</p>
                <label style="margin-bottom:5px;">아이디</br>
                    <a-input class="input-form" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.username">
                      <a-icon slot="prefix" type="user" />
                    </a-input>
                </label>
                <label>비밀번호</br>
                    <a-input type="password" @keyup.enter.native="handleLogin"  v-model="loginForm.password">
                    <a-icon slot="prefix" type="lock" />
                    </a-input>
                </label>
                <a-button  @click.native.prevent="handleLogin">로그인</a-button>
            </div>
            <div class="bg-image"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              loginForm:{
                  username:"",
                  password:""
              },
              userToken:''
            }
        },
        methods: {
            handleLogin(){
                if(this.loginForm.username === '' || this.loginForm.password === '' ){
                    this.$alert.error("아디디 또는 비밀번호 입력하세요.");
                }
                else{
                this.$store.dispatch('Login', this.loginForm).then(res => {
                  this.$router.push({ path: '/admin' })

                })
                }
            }
        },
    };
</script>

<style scoped lang="less">
    label,
    input {
        width: 100%;
    }

    .ant-input {
        border: none;
        outline: none;
        font-weight: bold;
        font-size: 16px;
        color: #000;
    }

    label {
        font-weight: normal;
        font-size: 12px;
        color: #666;
    }

    .login {
        position: relative;
        width: 100%;
        height: 100%;
        background: #f9fafc;
    }
    .login-form {
        position: absolute;
        width: 50%;
        max-width: 1000px;
        min-width: 500px;
        max-height: 500px;
        min-height: 300px;
        height: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 30px 40px 0 rgba(0,0,0,.1);
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-form > div {
        height: 100%;
    }
    .login-form > div.form {
        width: 60%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }
    .login-form div.form img {
        width: 66px;
        height: 20px;
    }

    .login-form > div.bg-image {
        width: 40%;
        background: url("../../assets/images/login-bg.png") no-repeat center / cover;
    }

    button {
        width: 100%;
        background: @light-tealish;
        color: #fff;
    }
    button:hover {
        background: @tealish;
        color: #fff;
    }

    p {
        font-size: 18px;
        font-weight: bold;
    }
</style>
