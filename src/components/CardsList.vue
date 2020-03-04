<template>
    <div><Card></Card></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store";
import Card from "./Card.vue";

@Component({
    components: { Card }
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

<style lang="scss" scoped></style>
