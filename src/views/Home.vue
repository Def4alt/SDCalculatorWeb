<template>
    <div class="home">
        <Test msg="Welcome to Your Vue.js App" />

        <p id="lot">
            Lot <span id="lotNumber"> #{{ lot }}</span>
        </p>

        <div id="modeSelect">
            <p>Add average</p>
            <div class="toggle-button-cover">
                <div class="button-cover">
                    <div class="button r" id="button-3">
                        <input
                            type="checkbox"
                            ref="mode"
                            checked
                            class="checkbox"
                            @change="setColor"
                        />
                        <div class="knobs"></div>
                        <div class="layer"></div>
                    </div>
                </div>
            </div>
            <p>Build chart</p>
        </div>

        <div id="fileSelect">
            <p>Select files:</p>

            <label class="file">
                <input
                    type="file"
                    ref="calcFiles"
                    aria-label="File browser example"
                    @change="getFiles"
                    multiple
                />
                <span class="file-custom">{{
                    files != null
                        ? files.length == 0
                            ? "Select files..."
                            : files.length == 1
                            ? files[0].name
                            : files.length
                        : ""
                }}</span>
            </label>
        </div>

        <div class="buildDiv">
            <button
                class="buildButton"
                v-bind:style="{ backgroundColor: color }"
            >
                {{ SDMode ? "Build charts" : "Add Average" }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Test from "@/components/Test.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {
        Test
    }
})
export default class Home extends Vue {
    lot = 12454;
    color = "#0984e3";
    files = [] as File[];
    SDMode = true;

    getFiles() {
        this.files = [];

        const fileList: FileList =
            (this.$refs.calcFiles as HTMLInputElement).files == null
                ? new FileList()
                : ((this.$refs.calcFiles as HTMLInputElement)
                      .files as FileList);

        for (const file of fileList) {
            this.files.push(file);
        }
    }

    setColor() {
        if ((this.$refs.mode as HTMLInputElement).checked) {
            this.color = "#0984e3";
            this.SDMode = true;
        } else {
            this.color = "#00b894";
            this.SDMode = false;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/variables.scss";

$margin-left: calc(50vw - 160px);

.home {
    display: block;
    height: 100%;
}
#modeSelect {
    display: flex;
    margin-top: 40px;
    margin-left: $margin-left;
    width: 19rem;
    align-items: center;
    justify-content: space-between;

    p {
        font-size: $font-size;
    }
}

/* Button 3 */

.layer {
    width: 100%;
    background-color: rgba($green, 0.1);
    transition: 0.3s ease all;
    z-index: 1;
}

.buildButton {
    margin-top: 30px;
    width: 120px;
    height: 55px;
    font-size: $font-size;
    border-radius: 5px;

    color: $white;
    border: 0;
    background-color: rgba($blue, 1);

    transition: all 0.25s ease-in-out;

    text-align: center;
}

#button-3 {
    .knobs:before {
        content: "";
        position: absolute;
        top: 4px;
        left: 4px;
        width: 20px;
        height: 10px;
        color: $white;
        font-size: $font-size;
        font-weight: bold;
        text-align: center;
        line-height: 1;
        padding: 9px 4px;
        background-color: rgba($green, 1);

        border-radius: 50%;
        transition: 0.3s ease all,
            left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
    }

    .checkbox:active + .knobs:before {
        width: 46px;
        border-radius: 100px;
    }

    .checkbox:checked:active + .knobs:before {
        margin-left: -26px;
    }

    .checkbox:checked + .knobs:before {
        content: "";
        left: 42px;

        background-color: rgba($blue, 1);
    }

    .checkbox:checked ~ .layer {
        background-color: rgba($blue, 0.1);
    }
}

#lot {
    margin-left: $margin-left;
    margin-top: calc(50vh - 230px);
    text-align: start;
    font-size: $font-size;
}

#lotNumber {
    color: rgba($black, 0.4);
    margin-left: 10px;
}

#fileSelect {
    margin-left: $margin-left;
    text-align: start;
    margin-top: 40px;
    font-size: $font-size;
}

.buildDiv {
    text-align: start;
    margin-left: $margin-left;
}

.buildButton:hover {
    background-color: rgba($blue, 0.8);
    cursor: pointer;
}

.file {
    position: relative;
    display: inline-block;
    cursor: pointer;
    height: 46px;

    input {
        min-width: 18rem;
        margin: 0;
        filter: alpha(opacity=0);
        opacity: 0;
    }
}

.file-custom {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 5;
    height: 27px;
    width: 16rem;
    overflow: hidden;
    white-space: nowrap;
    padding: 0.5rem 1rem;
    line-height: 1.5;
    color: #555;
    background-color: $white;
    border: 0.075rem solid #ddd;
    border-radius: 0.25rem;
    box-shadow: inset 0 0.2rem 0.4rem rgba($black, 0.05);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.file-custom:before {
    position: absolute;
    top: -0.075rem;
    right: -0.075rem;
    bottom: -0.075rem;
    z-index: 6;
    display: block;
    content: "Browse";
    height: 27px;
    padding: 0.5rem 1rem;
    line-height: 1.5;
    color: #555;
    background-color: #eee;
    border: 0.075rem solid #ddd;
    border-radius: 0 0.25rem 0.25rem 0;
}

.row {
    display: table-row;
}

.toggle-button-cover {
    display: table-cell;
    position: relative;
    width: 74px;
    height: 50px;
    box-sizing: border-box;
}

.button-cover:before {
    position: absolute;
    right: 0;
    bottom: 0;
    color: #d7e3e3;
    font-size: $font-size;
    line-height: 1;
    padding: 5px;
}

.button-cover,
.knobs,
.layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.button {
    position: relative;
    top: 50%;
    width: 74px;
    height: 36px;
    margin: -20px auto 0 auto;
    overflow: hidden;
}

.button.r,
.button.r .layer {
    border-radius: 100px;
}

.button.b2 {
    border-radius: 2px;
}

.checkbox {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
}

.knobs {
    z-index: 2;
}
</style>
