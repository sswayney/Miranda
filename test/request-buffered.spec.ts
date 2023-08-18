import axios from "axios";
import {makeBufferedRequests} from "../app/buffered-request";
import {DataFilename} from "../app/types";

// Mock the axios module
jest.mock('axios');


// Mock axios responses
(axios.get as jest.Mock).mockImplementation((url) => {
    return url !== 'errorurl' ? Promise.resolve({ data: '0123456789' }) : Promise.reject('badurl')
});


describe('makeBufferedRequests', () => {
    it('makeBufferedRequests successfully gets data from an API', async () => {

        const bufferSize =  1000;
        const mockDataFileNames: DataFilename[] = Array.from({ length: 1000 }, (_, index) =>
            ({
                fileName: (index + 1).toString(),
                downloadUrl: (index + 1).toString()
            })
        );
        // Mocked resolved value
        const response = await makeBufferedRequests(axios, mockDataFileNames, bufferSize);
        expect(response.length).toEqual(100);
        expect(response.pop().fileName === '100').toBeTruthy();
    });

    it('makeBufferedRequests should skip some if their is an error', async () => {

        const bufferSize =  1000;
        const mockDataFileNames: DataFilename[] = Array.from({ length: 1000 }, (_, index) =>
            ({
                fileName: (index + 1).toString(),
                downloadUrl: index === 3 ? 'errorurl' : (index + 1).toString()
            })
        );

        const response = await makeBufferedRequests(axios, mockDataFileNames, bufferSize);
        expect(response.length).toEqual(100);
        expect(response.pop().fileName === '101').toBeTruthy();
    });
});