<template>
    <div class="container">
        <Card
            v-for="(model, index) in statModels"
            :key="index"
            :model="model"
            class="card"
        ></Card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store";

@Component({
    components: {
        Card: () => import("./Card.vue")
    }
})
export default class CardsList extends Vue {
    get statModels() {
        return store.state.globalStatModels;
    }

    mounted() {
        store.dispatch("calculateStatModels");
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-around;
}
</style>
