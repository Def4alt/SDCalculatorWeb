<script lang="ts">
import { Line } from "vue-chartjs-typescript";
import ChartJsPluginDataLabels from "chartjs-plugin-datalabels";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    extends: Line,
    props: {
        chartData: new Object(),
        options: new Object()
    }
})
export default class LineChart extends Vue {
    public renderChart!: (chartData: any, options: any) => void;
    public addPlugin!: (plugin: object) => void;

    @Prop()
    chartData: any;

    @Prop({
        default: function() {
            return {};
        }
    })
    options!: object;

    mounted() {
        this.addPlugin(ChartJsPluginDataLabels);
        this.renderChart(this.chartData, this.options);
    }
}
</script>
