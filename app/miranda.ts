import {MddUtils} from "./utils";
import {AjaxRequestSettings, DownloadResult, FileMetaData} from "./types";
import {Settings} from "./settings";
import * as JSZip from "jszip";
import  {createWriteStream} from "streamsaver"
import {LocalStorageMdd} from "./local-storage";


export interface DownloadDocumentResult {
    response: Promise<ArrayBuffer>;
    xhr: XMLHttpRequest;
}

export interface TempType {
    ddr: DownloadDocumentResult;
    finished: Promise<string>;
}

export class Miranda {

    constructor() {
        console.info('Miranda Constructor Called. Opening Modal.');
        this.openModal();

    }
    private openModal = () => {
        console.log(`Create the modal div and its content`);
        const modal = document.createElement("div");
        modal.setAttribute("id", "myModal");
        modal.style.display = "block";
        modal.style.position = "fixed";
        modal.style.zIndex = "1";
        modal.style.left = "0";
        modal.style.top = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

        const modalContent = document.createElement("div");
        modalContent.setAttribute("class", "modal-content");
        modalContent.style.position = "absolute";
        modalContent.style.top = "50%";
        modalContent.style.left = "50%";
        modalContent.style.transform = "translate(-50%, -50%)";
        modalContent.style.backgroundColor = "#fff";
        modalContent.style.padding = "20px";
        modalContent.style.borderRadius = "5px";

        console.log(`Create the form elements`);
        const nameLabel = document.createElement("label");
        nameLabel.setAttribute("for", "name");
        nameLabel.innerText = "Zip File Name Prefix: ";
        const nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("id", "name");


        const submitBtn = document.createElement("button");
        submitBtn.setAttribute("id", "submitBtn");
        submitBtn.innerText = "Download All";

        console.log(`Append the form elements to the modal content`);
        modalContent.appendChild(nameLabel);
        modalContent.appendChild(nameInput);
        modalContent.appendChild(submitBtn);

        console.log(`Append the modal content to the modal`);
        modal.appendChild(modalContent);

        console.log(`Append the modal to the body`);
        document.body.appendChild(modal);

        console.log(`Function to close the modal`);

        function closeModal() {
            modal.style.display = "none";
            console.log(`Remove the modal from the DOM after closing`);
            document.body.removeChild(modal);
        }

        console.log(`Close the modal if the user clicks outside of it`);
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        console.log(`Function to handle form submission`);
        submitBtn.addEventListener("click", async () => {
            await this.downLoadAll(nameInput);
        });
    }


    private async downLoadAll(nameInput: HTMLInputElement): Promise<void> {
        console.log(`downLoadAll`);
        let zipFileName = nameInput.value;
        const dateStr = MddUtils.generateDateString();
        const docListKey = Settings.localStorageKeys.fileMetaData;
        if (zipFileName) {
            zipFileName = zipFileName.replace(' ', '_');
        }

        console.log("zipFileName: ", zipFileName);
        console.log("clientCode: ", Settings.clientCode);

        // Get the filenames, download url and isDownload status either fresh from server or localstorage
        let fileNameDownloadUrlList: FileMetaData[] = [];
        try {
            fileNameDownloadUrlList = await this.getAllFileMetaData();
        } catch (e){
            // check if its one of our errors as they are predicted
            if(Object.keys(Settings.errorMessages).map(k => Settings.errorMessages[k]).some(m => m == e.message)){
                console.warn(e.message);
            } else {
                console.error(e);
                alert(`Error while getting file metadata list ${e.message}`);
            }
            return;
        }

        while (fileNameDownloadUrlList.some(fds => !fds.isDownloaded)) {
            console.info(`Starting download....`);
            debugger;
            const unDownloadedFiles = fileNameDownloadUrlList.filter(f => !f.isDownloaded);
            let downloadedUrls = await this.downloadData(unDownloadedFiles);
            console.info(`Downloaded files`, downloadedUrls);
            fileNameDownloadUrlList = fileNameDownloadUrlList.map(f => {
                if(downloadedUrls.some(url => url === f.downloadUrl)){
                    f.isDownloaded = true;
                }
                return f;
            });
            LocalStorageMdd.setFileMetaDataInLocalStorage(fileNameDownloadUrlList);
        }

        // const zip = new JSZip();
        // console.log('Downloading each document and placing it in a zip file for download.');
        //
        //
        // let fileNameUrlObj = fileNameDownloadUrlList[0];
        // let fileName = fileNameUrlObj.fileName;
        //
        // const result = this.downloadDocument(fileNameUrlObj.downloadUrl);
        //
        //
        // // tsc-ignore
        // zip.file(fileName, result.response);
        // console.log(`Finished`);
        //
        // console.log(`Saving Zip File`);
        // const zipFile = await zip.generateAsync({type: "blob"});
        // saveAs(zipFile, `${zipFileName}_${dateStr}.zip`);


        console.log(`Finished all`);
        if (confirm(`Finished! Can I clean up local storage?`)) {
            LocalStorageMdd.clearAll();
        }
    }


    /**
     * Gets all file metadata either fresh from server of from local storage.
     * Contains confirm prompts
     * @throws {Error}
     * @private
     */
    private async getAllFileMetaData(): Promise<FileMetaData[]> | never {
        let fileNameDownloadUrlList: FileMetaData[] = [];

        if (LocalStorageMdd.getFileMetaDataFromLocalStorage()) {
            if (!confirm(`Saved downloaded file progress found in local storage. Do you want to continue were you left off?`)) {
                LocalStorageMdd.clearAll();
            }
        }

        if (!LocalStorageMdd.getFileMetaDataFromLocalStorage()) {
            let currentStart = 0;
            let currentRecordCount = 0;
            // Not sure what the response type is
            let response = await this.getDocumentList(currentStart, Settings.pageBy).promise();
            console.log(response);
            const recordsTotal = +response['recordsTotal'];

            if (recordsTotal < 1) {
                alert(Settings.errorMessages.NoFilesFound);
                throw new Error(Settings.errorMessages.NoFilesFound);
            } else {

                console.info(`Got document list
                        recordsTotal: ${recordsTotal},
                        currentRecordCount: ${currentRecordCount},
                        currentStart: ${currentStart}`);
                fileNameDownloadUrlList.unshift(...this.getFileNameUrlList(response));
                currentRecordCount += response['data'].length;

                while (recordsTotal > 0 && currentRecordCount < recordsTotal) {
                    currentStart += Settings.pageBy;
                    console.info(`Getting next page
                        recordsTotal: ${recordsTotal},
                        currentRecordCount: ${currentRecordCount},
                        currentStart: ${currentStart}`);
                    response = await this.getDocumentList(currentStart, Settings.pageBy).promise();
                    fileNameDownloadUrlList.unshift(...this.getFileNameUrlList(response));
                    currentRecordCount += response['data'].length;
                }

                console.info(`All document file data needed to download attained.`);
                console.log(fileNameDownloadUrlList);
                if (fileNameDownloadUrlList.length !== recordsTotal) {
                    alert(`Total record count doesn't match filesToDownload length`);
                }

                const hasNoDownload = fileNameDownloadUrlList.filter(d => !d.downloadUrl);
                if (hasNoDownload.length > 0) {
                    console.log(`has no download`, hasNoDownload);
                    alert(`${hasNoDownload.length} documents have no download, review in console`);
                    fileNameDownloadUrlList = fileNameDownloadUrlList.filter(d => d.downloadUrl);
                    if (!confirm(`Do you want to continue?`)) {
                        throw new Error(Settings.errorMessages.NoDownloadableFiles);
                    }
                }
                LocalStorageMdd.setFileMetaDataInLocalStorage(fileNameDownloadUrlList);
            }


        } else {
            fileNameDownloadUrlList = LocalStorageMdd.getFileMetaDataFromLocalStorage();
            console.info(`Document list found in local storage`, fileNameDownloadUrlList);
        }
        return fileNameDownloadUrlList;
    }

    private getDocumentList = (start: number | string, length: number | string) => {
        console.info('getDocumentList');

        const settings: AjaxRequestSettings = {
            "async": true,
            "crossDomain": true,
            "url": `${Settings.endpoints.baseUrl}${Settings.endpoints.dashboard}?session_nonce=${Settings.session_nonce}`,
            "method": "POST",
            "headers": {
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Accept-Language": "en-US,en;q=0.9",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest"
            },
            "data": {
                "draw": "1",
                'columns[0][data]': 'select_eecode_docid',
                'columns[0][name]': 'select_eecode_docid',
                'columns[0][searchable]': 'true',
                'columns[0][orderable]': 'false',
                'columns[0][search][value]=': '',
                'columns[0][search][regex]': 'false',
                'columns[1][data]': 'eename',
                'columns[1][name]': 'eename',
                'columns[1][searchable]': 'true',
                'columns[1][orderable]': 'true',
                'columns[1][search][value]=': '',
                'columns[1][search][regex]': 'false',
                'columns[2][data]': 'eestatus',
                'columns[2][name]': 'eestatus',
                'columns[2][searchable]': 'true',
                'columns[2][orderable]': 'true',
                'columns[2][search][value]=': '',
                'columns[2][search][regex]': 'false',
                'columns[3][data]': 'labor_allo',
                'columns[3][name]': 'labor_allo',
                'columns[3][searchable]': 'true',
                'columns[3][orderable]': 'true',
                'columns[3][search][value]=': '',
                'columns[3][search][regex]': 'false',
                'columns[4][data]': 'foldername',
                'columns[4][name]': 'foldername',
                'columns[4][searchable]': 'true',
                'columns[4][orderable]': 'true',
                'columns[4][search][value]=': '',
                'columns[4][search][regex]': 'false',
                'columns[5][data]': 'srcfile_desc',
                'columns[5][name]': 'srcfile_desc',
                'columns[5][searchable]': 'true',
                'columns[5][orderable]': 'true',
                'columns[5][search][value]=': '',
                'columns[5][search][regex]': 'false',
                'columns[6][data]': 'version_number',
                'columns[6][name]': 'version_number',
                'columns[6][searchable]': 'false',
                'columns[6][orderable]': 'true',
                'columns[6][search][value]=': '',
                'columns[6][search][regex]': 'false',
                'columns[7][data]': 'employeeAckSign',
                'columns[7][name]': 'employeeAckSign',
                'columns[7][searchable]': 'false',
                'columns[7][orderable]': 'true',
                'columns[7][search][value]=': '',
                'columns[7][search][regex]': 'false',
                'columns[8][data]': 'supervisorAckSign',
                'columns[8][name]': 'supervisorAckSign',
                'columns[8][searchable]': 'false',
                'columns[8][orderable]': 'true',
                'columns[8][search][value]=': '',
                'columns[8][search][regex]': 'false',
                'columns[9][data]': 'lastrmnddate',
                'columns[9][name]': 'lastrmnddate',
                'columns[9][searchable]': 'false',
                'columns[9][orderable]': 'true',
                'columns[9][search][value]=': '',
                'columns[9][search][regex]': 'false',
                'columns[10][data]': 'modified_date',
                'columns[10][name]': 'modified_date',
                'columns[10][searchable]': 'true',
                'columns[10][orderable]': 'true',
                'columns[10][search][value]=': '',
                'columns[10][search][regex]': 'false',
                'columns[11][data]': 'actions',
                'columns[11][name]': 'actions',
                'columns[11][searchable]': 'false',
                'columns[11][orderable]': 'false',
                'columns[11][search][value]=': '',
                'columns[11][search][regex]': 'false',
                "start": '' + start,
                "length": '' + length,
                "search[regex]": "false",
                "selected_directory": "-1",
                'nFolderChanged': "0"
            }
        };

        return $.ajax(settings);

    }


    /**
     * Gets the file names and their download urls as FileMetaData Objects
     * @param response
     */
    private getFileNameUrlList = (response): FileMetaData[] => {
        const dataRay = response.data;
        const fileNameDownloadUrlList: FileMetaData[] = [];
        console.info(`getFileNameUrlList`);
        console.log(dataRay);
        for (let i = 0; dataRay.length > i; i++) {
            const userName: string = $(dataRay[i]['eename'])[0].innerText;
            const randStr: string = Math.random().toString(36).substring(7);
            let srcFileName: string = dataRay[i]['srcfile_desc'];
            if (srcFileName.includes('<div')) {
                // If the filename was too long, its html, and we need the title
                srcFileName = $(srcFileName)[0].title;
            }
            const downloadUrl: string = $(dataRay[i]['actions']).find("a:contains('Download Document')").attr("href");

            if (MddUtils.isHTML(userName)) {
                console.error(`Could not get user name - is html`);
            }
            if (MddUtils.isHTML(srcFileName)) {
                console.error(`Could not get source file name - is html`);
            }
            if (MddUtils.isHTML(downloadUrl)) {
                console.error(`Could not get download url - is html`);
            }
            console.log(userName, srcFileName, downloadUrl);

            // Looks like these aren't downloading correctly, I think its the spaces.
            let fileName = `${userName}_${randStr}_${srcFileName}`.replace(/[/\\?%*:|"<>]/g, '_');
            fileName = fileName.replace(/ /g, '_');

            fileNameDownloadUrlList.unshift({fileName: fileName, downloadUrl: downloadUrl, isDownloaded: false});
        }
        return fileNameDownloadUrlList;
    }

    /**
     * Downloads one document
     * @param downloadUrl
     */
    private downloadDocument = (downloadUrl: string): DownloadDocumentResult => {
        const xhr = new XMLHttpRequest();
        return {
            response: new Promise(function (resolve, reject) {

                // Attach the abort signal to the XHR instance
                xhr.withCredentials = true;
                xhr.responseType = 'arraybuffer';
                xhr.open("GET", `${Settings.endpoints.baseUrl}${downloadUrl}`);
                xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7");
                xhr.setRequestHeader("Accept-Language", "en-US,en;q=0.9");
                xhr.setRequestHeader("Upgrade-Insecure-Requests", "1");
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(xhr.response);
                    } else {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    }
                };
                xhr.onerror = function () {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                };
                xhr.send();
            }),
            xhr
        };
    }


    /**
     * Downloads the list and returns the urls to the files it was able to download
     * It will stop downloaded once the file is 2 gigs. So you will need to handle
     * the remaining files.
     * @param fileMetaDataList
     */
    private downloadData = async (fileMetaDataList: FileMetaData[]): Promise<string[]> => {
        debugger;
        const maxConcurrentRequests = 6;
        const maxDataSize = (1 * 1024 * 1024 * 1024)/4; // 1 gigabytes in bytes
        let totalDownloaded = 0;
        const downloadedData: DownloadResult[] = [];

        const downloadPromises: TempType[] = [];

        for (let i = 0; i < fileMetaDataList.length; i++) {
            const fileMetaData = fileMetaDataList[i];
            if (totalDownloaded >= maxDataSize) {
                console.log(`Reached max size of data. ${totalDownloaded} not downloading any more.`);
                break;
            }

            if (downloadPromises.length >= maxConcurrentRequests) {
                console.log(`Reached max requests ${downloadPromises.length}. Waiting for one to finish.`);
                const url = await Promise.race(downloadPromises.map(x => x.finished));
                const downloadUrl = `${Settings.endpoints.baseUrl}${url}`;
                const index = downloadPromises.map(d => d.ddr.xhr.responseURL.toLowerCase()).indexOf(downloadUrl.toLowerCase());
                downloadPromises.slice(index, 1);
                // Do we need to remove it?
                console.log(`Finished waiting, max requests now at ${downloadPromises.length}`);
            }


            const downloadPromise = this.downloadDocument(fileMetaData.downloadUrl);
            const promise = downloadPromise.response
                .then((data) => {
                    const _url = fileMetaData.downloadUrl;
                    totalDownloaded += data.byteLength;
                    console.log(`totalDownloaded data ${totalDownloaded}`);
                    // Todo: not sure about the data type here.
                    downloadedData.push(<DownloadResult>{url: fileMetaData.downloadUrl, data});

                    if (totalDownloaded >= maxDataSize) {
                        console.log(`Reached max size. Starting to cancel what ever is left.`);
                        for (const remainingPromise of downloadPromises) {
                            console.log(`Canceling...`);
                            // Assuming a way to cancel requests
                            remainingPromise.ddr.xhr.abort();
                        }
                    }
                    return _url;
                })
                .catch((error) => {
                    console.error(`Error fetching ${fileMetaData.downloadUrl}:`, error);
                    return 'error';
                });

            downloadPromises.push({ddr: downloadPromise, finished: promise});
        }

        await Promise.all(downloadPromises.map(dp => dp.finished));
        debugger;
        console.log(`Preparing to zip ${downloadedData.length} files`);

        // Create a zip file using jszip
        const zip = new JSZip();
        downloadedData.forEach(({ url, data }) => {
            zip.file(url, data);
        });

        // StreamSaver.js to save the zip file
        const fileStream = createWriteStream(`downloaded_data.zip`);
        const writer = fileStream.getWriter();
        const blob = await zip.generateAsync({ type: 'blob' });

        await writer.write(blob);
        await writer.close();

        return downloadedData.map(d => d.url);
    }

}

const miranda = new Miranda();
