<template>
    <div id="app">
        <div id="nav">
            <button v-on:click="showSettings" id="settings">
                <p></p>
                <p></p>
                <p></p>
            </button>
            <p id="logo"><router-link to="/">SDCalculator</router-link></p>
        </div>
        <div class="topnav" id="myTopnav">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
        </div>

        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class App extends Vue {
    showSettings() {
        const x = document.getElementById("myTopnav") as HTMLElement;
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

#app {
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #000000;
}

#nav {
    display: block;
    width: 100%;

    a {
        font-weight: normal;
        color: #000000;

        height: 29px;
        text-decoration: none;
    }
}
</style>

<style lang="scss" scoped>
@import "@/variables.scss";

.topnav {
    overflow: hidden;
    width: 20rem;
    position: absolute;
    z-index: 10;
    background-color: $white;

    a {
        float: left;
        display: block;
        color: rgba($black, 0.5);
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: $font-size;
        display: none;
    }

    a:hover {
        background-color: $grey;
        color: $black;
    }

    a.router-link-exact-active {
        color: $black;
    }
}

.topnav.responsive {
    position: absolute;

    a {
        float: none;
        display: block;
        text-align: left;
    }
}
@media screen and (max-width: 600px) {
    .topnav.responsive {
        height: 90vh;
        width: 96vw;
    }
}

#settings {
    left: 20px;
    width: 39px;
    background-color: $white;
    border: $white;
    display: flex;
    outline: none;
    position: absolute;
    flex-flow: column;
    justify-content: space-around;
    height: 29px;
    p {
        width: 23px;
        margin-top: 0px;
        margin-bottom: 0px;
        height: 2px;

        background: #595f71;
    }
}

#settings:hover {
    background-color: rgba($black, 0.1);
    outline: none;
    cursor: pointer;
}

#logo {
    text-align: center;
    margin-top: 22px;
    margin-bottom: 15px;
    font-style: normal;
    font-weight: normal;
    font-size: 28px;
    line-height: 29px;
    color: $black;
}
</style>
