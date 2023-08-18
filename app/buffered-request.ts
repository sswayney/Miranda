import {DataFilename} from "./types";
const Buffer = require('buffer/').Buffer


const makeRequest = async (url: string, axiosClient) => {
    try {
        const response = await axiosClient.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${url}: ${error.message}`);
        return null;
    }
};

export const makeBufferedRequests = async (axiosClient, dataFileNames: DataFilename[], bufferSize: number): Promise<DataFilename[]> => {
    const buffer: DataFilename[] = [];
    let bufferSizeCounter = 0;

    for (const df of dataFileNames) {
        console.log(`Downloading ${df.fileName}`);
        const data = await makeRequest(df.downloadUrl, axiosClient);

        if (data !== null) {
            bufferSizeCounter += Buffer.from(data).length;


            buffer.push({
                fileName: df.fileName,
                downloadUrl: df.downloadUrl,
                data: data
            });

            if (bufferSizeCounter >= bufferSize) {
                console.log(`Limit Reached`);
                console.log(`Current buffer size: ${bufferSizeCounter}`);
                console.log(`Buffer Size Limit: ${bufferSize}`);
                break;
            }
        }
    }
    return buffer;

};