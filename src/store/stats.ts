import moment from "moment";
import { ReadModel, SampleType, StatModel } from "@/types";

function GetStatistics(models: Array<ReadModel>) {
    let lvlOneRows = models.filter(t => t.SampleType === SampleType.Lvl1);
    let lvlTwoRows = models.filter(t => t.SampleType === SampleType.Lvl2);

    const row = lvlOneRows[0];

    if (row === undefined) return undefined;

    const count = Object.keys(row.TestResults).length;

    const statisticsModels = [];
    for (let i = 0; i < count; i++) {
        const testName = Object.keys(lvlOneRows[0].TestResults)[i];

        if (testName == null) {
            continue;
        }

        if (lvlOneRows !== undefined) {
            const modelOne = GetModel(lvlOneRows, testName, SampleType.Lvl1);
            if (modelOne != null) {
                statisticsModels.push(modelOne);
            }
        }

        if (lvlTwoRows !== undefined) {
            const modelTwo = GetModel(lvlTwoRows, testName, SampleType.Lvl2);
            if (modelTwo != null) {
                statisticsModels.push(modelTwo);
            }
        }
    }

    return statisticsModels;
}

function GetModel(
    lvlRows: Array<ReadModel>,
    testName: string,
    sampleType: SampleType
) {
    let average = GetAverageFor(lvlRows, testName);
    if (isNaN(average)) average = 0;
    let standardDeviation = GetStandardDeviation(lvlRows, testName);
    if (isNaN(standardDeviation)) standardDeviation = 0;

    let date = new Date().toUTCString();
    if (lvlRows[0] !== undefined) date = lvlRows[0].Date[0];

    return {
        Average: [average],
        SD: standardDeviation,
        TestName: testName.trim(),
        SampleType: sampleType,
        Date: [date],
        Warnings: [""]
    };
}

function GetAverageFor(models: Array<ReadModel>, testName: string) {
    const nonFailedResults = GetNonFailedResults(models, testName).map(
        t => t.TestResults[testName]
    );

    return (
        nonFailedResults.reduce((s1, s2) => s1 + s2, 0.0) /
        nonFailedResults.length
    );
}

function GetStandardDeviation(models: Array<ReadModel>, testName: string) {
    const nonFailedResults = GetNonFailedResults(models, testName).map(
        t => t.TestResults[testName]
    );

    const average = GetAverageFor(models, testName);

    const count = nonFailedResults.length;
    const sqSum = nonFailedResults.reduce(
        (s1, s2) => s1 + ((s2 - average) * (s2 - average)) / count,
        0.0
    );

    return Math.sqrt(sqSum);
}

function GetNonFailedResults(models: Array<ReadModel>, testName: string) {
    return models
        .filter((t: ReadModel) => !t.FailedTests.includes(testName.trim()))
        .filter((t: ReadModel) => testName in t.TestResults);
}

export default GetStatistics;
