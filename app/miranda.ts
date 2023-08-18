import {MddUtils} from "./utils";
import {AjaxRequestSettings, DataFilename, FileMetaData} from "./types";
import {Settings} from "./settings";
import * as JSZip from "jszip";
import * as fileSaver from "file-saver"
import {LocalStorageMdd} from "./local-storage";
import {Axios} from 'axios';
import {makeBufferedRequests} from "./buffered-request";


export class Miranda {

    // Used to keep the status of how many we download vs needed
    private statusOutput: HTMLParagraphElement;
    // General messages to keep user updated.
    private logOutput: HTMLParagraphElement;

    constructor() {
        console.info('Miranda Constructor Called. Opening Modal.');
        this.openModal();
    }

    private setStatusOutPut(text: string): void {
        this.statusOutput.innerText = text;
    }

    private setLogOutput(text: string): void {
        this.logOutput.innerText = text;
    }

    private openModal = () => {
        // CREATE MODAL AND UI ELEMENTS

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
        this.statusOutput = document.createElement("p");
        this.statusOutput.setAttribute("id", "statusOutput");

        this.logOutput = document.createElement("p");
        this.logOutput.setAttribute("id", "logOutput");

        // Use what we may have in local storage to set ui texts.
        const fileNameDownloadUrlList = LocalStorageMdd.getFileMetaDataFromLocalStorage();
        const hasDownloadInLocalStorage = fileNameDownloadUrlList?.length > 0;

        const submitBtn = document.createElement("button");
        submitBtn.setAttribute("id", "submitBtn");
        submitBtn.innerText = hasDownloadInLocalStorage ? "Download More" : "Start Downloading";

        const clearBtn = document.createElement("button");
        clearBtn.setAttribute("id", "clearBtn");
        clearBtn.setAttribute("title", `If you have saved progress, this will delete it and start you over.
        You should clear this when you are finished downloading everything.`);
        clearBtn.innerText = "Clear Local Storage History";
        clearBtn.disabled = !hasDownloadInLocalStorage;

        console.log(`Append the form elements to the modal content`);
        modalContent.appendChild(this.statusOutput);
        modalContent.appendChild(this.logOutput);
        modalContent.appendChild(document.createElement("br"));
        modalContent.appendChild(submitBtn);
        modalContent.appendChild(clearBtn);


        console.log(`Append the modal content to the modal`);
        modal.appendChild(modalContent);

        console.log(`Append the modal to the body`);
        document.body.appendChild(modal);

        // Set status output
        if(hasDownloadInLocalStorage) {
            this.setStatusOutPut(this.getDownloadStatusText(fileNameDownloadUrlList));
        } else {
            this.setStatusOutPut('No previous downloads to continue.');
        }

        //// SET UP EVENTS

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
            submitBtn.disabled = true;
            clearBtn.disabled = true;
            await this.downLoadAll();
            submitBtn.disabled = false;
            clearBtn.disabled = false;
        });

        console.log(`Function to clear storage`);
        clearBtn.addEventListener("click", async () => {
            if(confirm(`Are you sure you want to clear your current download status? You will start from the start.`)){
                LocalStorageMdd.clearAll();
                this.setStatusOutPut('No previous downloads to continue.');
                submitBtn.innerText = "Start Downloading";
            }
        });
    }


    private async downLoadAll(): Promise<void> {
        console.log(`downLoadAll`);

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

        const axiosClient = new Axios({
            responseType: 'arraybuffer',
            withCredentials: true,
            headers: {
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language': 'en-US,en;q=0.9',
                'Upgrade-Insecure-Requests': '1'
            }
        });


        if (fileNameDownloadUrlList.some(fds => !fds.isDownloaded)) {

            console.log('Downloading each document and placing it in a zip file for download. Max size 1 gigs');

            const results = await makeBufferedRequests(axiosClient, fileNameDownloadUrlList.filter(fds => !fds.isDownloaded), Settings.maxDownloadBufferSize, this.logOutput);

            this.setLogOutput(`Saving Zip...`);

            const zip = new JSZip();
            for (const dataFileName of results) {
                console.log(`Adding file to zip.`);
                zip.file(dataFileName.fileName, dataFileName.data);
            }
            console.log(`Finished adding files to zip`);

            console.log(`Saving Zip File`);
            const zipFile = await zip.generateAsync({type: "blob"});
            fileSaver(zipFile, `${Settings.clientCode}.zip`);

            //Update local storage with documents that have been downloaded.
            const downloadedDocumentUrls = results.map(r => r.downloadUrl);
            fileNameDownloadUrlList = fileNameDownloadUrlList.map(f => {
                if (downloadedDocumentUrls.some(ddurl => ddurl == f.downloadUrl)) {
                    f.isDownloaded = true;
                }
                return f;
            });
            LocalStorageMdd.setFileMetaDataInLocalStorage(fileNameDownloadUrlList);
        }

        console.log(`Finished download all in this batch`);
        this.setLogOutput('Finished, download more if needed.');
        const text = this.getDownloadStatusText(fileNameDownloadUrlList);
        console.log(text);
        this.setStatusOutPut(text);

        return;
    }


    /**
     * Gets all file metadata either fresh from server of from local storage.
     * Contains confirm prompts
     * @throws {Error}
     * @private
     */
    private async getAllFileMetaData(): Promise<FileMetaData[]> | never {
        let fileNameDownloadUrlList: FileMetaData[] = [];

        if (!LocalStorageMdd.getFileMetaDataFromLocalStorage()) {

            this.setLogOutput(`Getting full list of files so we can save progress.`);
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

                let logText = `Got document list
                        recordsTotal: ${recordsTotal},
                        currentRecordCount: ${currentRecordCount},
                        currentStart: ${currentStart}`;
                this.setLogOutput(logText);
                console.info(logText);
                fileNameDownloadUrlList.unshift(...this.getFileNameUrlList(response));
                currentRecordCount += response['data'].length;

                while (recordsTotal > 0 && currentRecordCount < recordsTotal) {
                    currentStart += Settings.pageBy;
                    logText = `Getting next page
                        recordsTotal: ${recordsTotal},
                        currentRecordCount: ${currentRecordCount},
                        currentStart: ${currentStart}`;
                    console.info(logText);
                    this.setLogOutput(logText);
                    response = await this.getDocumentList(currentStart, Settings.pageBy).promise();
                    fileNameDownloadUrlList.unshift(...this.getFileNameUrlList(response));
                    currentRecordCount += response['data'].length;
                }

                logText = `All document file data needed to download attained.`;
                console.info(logText);
                this.setLogOutput(logText);
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
     * @param axiosClient
     * @param downloadUrl
     * @param filename
     */

    private downloadDocument = (axiosClient, downloadUrl: string, filename: string): Promise<DataFilename> => {
        return axiosClient.get(`${Settings.endpoints.baseUrl}${downloadUrl}`).then(result => <DataFilename>{data: result.data, fileName: filename, downloadUrl: downloadUrl });
    }

    private getDownloadStatusText(fileNameDownloadUrlList: FileMetaData[]) {
        const downloadCount = fileNameDownloadUrlList.filter(f => f.isDownloaded).length;
        const notDownloadCount = fileNameDownloadUrlList.filter(f => !f.isDownloaded).length;
        const percentDone = (Math.abs(downloadCount / notDownloadCount) * 100).toFixed(2);
        return`Downloaded count: ${downloadCount}
         Not Downloaded count: ${notDownloadCount}
         Percent Finished ${percentDone}%`;
    }

}

const miranda = new Miranda();