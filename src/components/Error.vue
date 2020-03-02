<template>
    <div class="error">
        <p>{{ error }}</p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Error extends Vue {
    @Prop()
    error = "Something went wrong!";
}
</script>

<style lang="scss" scoped>
@import "@/variables.scss";

.error {
    p {
        font-size: $font-size;
        margin-top: 40vh;
    }
}
</style>
