import {DataFilename} from "./types";

const Buffer = require('buffer/').Buffer


/**
 * Makes a request to fill out data in the DataFilename and returns a
 * copy of the DataFilename with the data filled out.
 * @param df
 * @param axiosClient
 */
const makeRequest = async (df: DataFilename, axiosClient): Promise<DataFilename> => {
    try {
        const response = await axiosClient.get(df.downloadUrl);
        return ({data: response.data, downloadUrl: df.downloadUrl, fileName: df.fileName});
    } catch (error) {
        console.error(`Error fetching ${df.downloadUrl}: ${error.message}`);
        return null;
    }
};

export const makeBufferedRequests = async (axiosClient, dataFileNames: DataFilename[], bufferSize: number, logOutput: HTMLParagraphElement = null): Promise<DataFilename[]> => {
    const buffer: DataFilename[] = [];
    let bufferSizeCounter = 0;
    const concurrentCount = 5;

    for (let i = 0; i < dataFileNames.length; i += concurrentCount) {
        console.log(`Downloading files...`);
        if (logOutput) {
            logOutput.innerText = `Downloading files...`;
        }

        const requests: DataFilename[] = dataFileNames.slice(i, i + concurrentCount);
        const dataFileNamesResults = await Promise.all(requests.map(df => makeRequest(df, axiosClient)));


        for(let df of dataFileNamesResults){
            if (df !== null) {
                bufferSizeCounter += Buffer.from(df.data).length;
                buffer.push(df);
                console.log(`Saving Files...`);
                if (logOutput) {
                    logOutput.innerText = `Saving files...`;
                }
                if (bufferSizeCounter >= bufferSize) {
                    console.log(`Limit Reached`);
                    console.log(`Current buffer size: ${bufferSizeCounter}`);
                    console.log(`Buffer Size Limit: ${bufferSize}`);
                    return buffer;
                }
            }
        }
    }
    return buffer;
};