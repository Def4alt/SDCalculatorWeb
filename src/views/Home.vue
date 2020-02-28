<template>
    <div class="home">
        <img alt="Vue logo" :src="img" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld";
import logo from "assets/logo.png";

export default {
    name: "Home",
    components: {
        HelloWorld
    },
    data() {
        return {
            img: logo
        };
    }
};
</script>
