<template>
    <div>
        <h1 class="headline">Please sign in to see the weather :</h1>
        <div class="inputs">
            <label>Please type your login</label>
            <input type="text" id="login-input"/>
            <label>Please type your password</label>
            <input type="password" id="password-input"/>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Authentification"
  }
</script>

<style scoped>
    .headline {
        margin: 0;
        color: #3460A4;
        font-size: 40px;
    }

    .inputs {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input {
        text-align: center;
        font-size: 32px;
        border: none;
        border-radius: 10px;
        margin-bottom: 20px;
        transition: box-shadow 0.4s;
        outline: none;
    }
</style>