<template>
    <div class="container">
        <LineChart :chartData="data" :options="options" />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import LineChart from "./LineChart.vue";

@Component({
    components: { LineChart }
})
export default class Card extends Vue {
    data = {
        labels: ["January", "February"],
        datasets: [
            {
                label: "M + 3SD",
                borderColor: "#ffeaa7",
                fill: false,
                borderDash: [8],
                data: [50, 39, 10, 40, 39, 80, 40]
            },
            {
                label: "M + 2SD",
                borderColor: "#fab1a0",
                fill: false,
                borderDash: [8],
                data: [40, 39, 10, 40, 39, 80, 40]
            },
            {
                label: "M + SD",
                borderColor: "#81ecec",
                fill: false,
                borderDash: [8],
                data: [30, 39, 10, 40, 39, 80, 40]
            },
            {
                label: "M",
                borderColor: "#a29bfe",
                fill: false,
                borderDash: [8],
                data: [20, 39, 10, 40, 39, 80, 40]
            },
            {
                label: "M - SD",
                borderColor: "#81ecec",
                fill: false,
                borderDash: [8],
                data: [10, 39, 10, 40, 39, 80, 40]
            },
            {
                label: "M - 2SD",
                borderColor: "#fab1a0",
                fill: false,
                borderDash: [8],
                data: [0, 39, 10, 40, 39, 80, 40]
            },
            {
                label: "M - 3SD",
                borderColor: "#ffeaa7",
                fill: false,
                borderDash: [8],
                data: [-10, 39, 10, 40, 39, 80, 40]
            },
            {
                label: "Lvl",
                borderColor: "#d63031",
                fill: false,
                borderWidth: 5,
                data: [0, 0]
            }
        ]
    };

    options = {
        responsive: true,
        maintainAspectRatio: false
    };
}
</script>
