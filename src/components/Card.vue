<template>
    <div class="card 1">
        <div class="card_image">
            <LineChart :chartData="data" :options="options" />
        </div>
        <div class="card_title title-black">
            <p>{{ title }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import LineChart from "./LineChart.vue";
import { StatModel, SampleType } from "@/types";

@Component({
    components: { LineChart },
    props: {
        model: Object
    }
})
export default class Card extends Vue {
    @Prop()
    model: any;

    get statModel() {
        return this.model as StatModel;
    }

    getLevelText(level: SampleType) {
        return level == SampleType.Lvl1 ? "Lvl1" : "Lvl2";
    }

    title: string =
        this.statModel.TestName +
        " " +
        this.getLevelText(this.statModel.SampleType);

    data = {
        labels:
            this.statModel.Date.length == 1
                ? Array(2).fill(this.statModel.Date[0])
                : this.statModel.Date,
        datasets: [
            {
                label: "M + 3SD",
                borderColor: "#ffeaa7",
                fill: false,
                borderDash: [8],
                data: Array(this.statModel.Average.length + 1).fill(
                    this.statModel.Average[0] + 3 * this.statModel.SD
                )
            },
            {
                label: "M + 2SD",
                borderColor: "#fab1a0",
                fill: false,
                borderDash: [8],
                data: Array(this.statModel.Average.length + 1).fill(
                    this.statModel.Average[0] + 2 * this.statModel.SD
                )
            },
            {
                label: "M + SD",
                borderColor: "#81ecec",
                fill: false,
                borderDash: [8],
                data: Array(this.statModel.Average.length + 1).fill(
                    this.statModel.Average[0] + this.statModel.SD
                )
            },
            {
                label: "M",
                borderColor: "#a29bfe",
                fill: false,
                borderDash: [8],
                data: Array(this.statModel.Average.length + 1).fill(
                    this.statModel.Average[0]
                )
            },
            {
                label: "M - SD",
                borderColor: "#81ecec",
                fill: false,
                borderDash: [8],
                data: Array(this.statModel.Average.length + 1).fill(
                    this.statModel.Average[0] - this.statModel.SD
                )
            },
            {
                label: "M - 2SD",
                borderColor: "#fab1a0",
                fill: false,
                borderDash: [8],
                data: Array(this.statModel.Average.length + 1).fill(
                    this.statModel.Average[0] - 2 * this.statModel.SD
                )
            },
            {
                label: "M - 3SD",
                borderColor: "#ffeaa7",
                fill: false,
                borderDash: [8],
                data: Array(this.statModel.Average.length + 1).fill(
                    this.statModel.Average[0] - 3 * this.statModel.SD
                )
            },
            {
                label: "Lvl",
                borderColor: "#d63031",
                fill: false,
                borderWidth: 5,
                data:
                    this.statModel.Average.length == 1
                        ? Array(2).fill(this.statModel.Average[0])
                        : this.statModel.Average
            }
        ]
    };

    options = {
        legend: {
            display: false
        },
        height: 360,
        width: 500,
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 10,
                right: 15,
                top: 20,
                bottom: 20
            }
        }
    };
}
</script>

<style lang="scss" scoped>
@import "@/variables.scss";

.card {
    margin: 30px auto;
    width: 520px;
    height: 380px;
    border-radius: 20px;
    background: #ffffff;
    box-shadow: 33px 33px 67px #dbdbdb, -33px -33px 67px #ffffff;
    cursor: pointer;
    transition: 0.4s;
}

.card .card_image {
    width: inherit;
    height: inherit;
    border-color: #000000;
    border-width: 2px;
}

.card .card_image img {
    width: inherit;
    height: inherit;
    border-radius: 40px;
    object-fit: cover;
}

.card .card_title {
    text-align: center;
    border-radius: 0px 0px 40px 40px;
    font-family: sans-serif;
    font-size: 25px;
    margin-top: -390px;
    height: 40px;
}

.card:hover {
    transform: scale(0.9, 0.9);
    box-shadow: 23px 23px 46px #d9d9d9, -23px -23px 46px #ffffff;
}

.title-white {
    color: white;
}

.title-black {
    color: black;
}

@media all and (max-width: 500px) {
    .card-list {
        /* On small screens, we are no longer using row direction but column */
        flex-direction: column;
    }
}
</style>
