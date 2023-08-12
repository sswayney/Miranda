import {MddUtils} from "./utils";
import {AjaxRequestSettings, FileMetaData} from "./types";
import {Settings} from "./settings";
import * as JSZip from "jszip";
import * as saveAs from "file-saver";


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
            let zipFileName = nameInput.value;
            const clientCode = window['ssoSessionInfo']['clientCode'];
            const docListKey = clientCode + '_mdd';
            const lastZipFileNumKey = clientCode + '_mdd_last_zip_num';
            if (zipFileName) {
                zipFileName = zipFileName.replace(' ', '_');
            }
            const now = new Date();
            const dateStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;

            console.log("zipFileName: ", name);
            console.log("clientCode: ", clientCode);

            let fileNameDownloadUrlList: FileMetaData[] = [];

            if (!localStorage.getItem(docListKey)) {
                let currentStart = 0;
                let currentRecordCount = 0;
                // Not sure what the response type is
                let response = await this.getDocumentList(currentStart, Settings.pageBy).promise();
                console.log(response);
                const recordsTotal = +response['recordsTotal'];

                if (recordsTotal < 1) {
                    alert('Zero documents found');
                    return;
                }

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
                        return;
                    }
                }

                localStorage.setItem(docListKey, JSON.stringify(fileNameDownloadUrlList));
            } else {
                fileNameDownloadUrlList = JSON.parse(localStorage.getItem(docListKey));
                console.info(`Document list found in local storage`, fileNameDownloadUrlList);
            }


            if (fileNameDownloadUrlList.some(fds => !fds.isDownloaded)) {

                const zip = new JSZip();
                console.log('Downloading each document and placing it in a zip file for download.');


                let fileNameUrlObj = fileNameDownloadUrlList[0];
                let fileName = fileNameUrlObj.fileName;

                const result = this.downloadDocument(fileNameUrlObj.downloadUrl) as unknown as Promise<JSZip.InputType>;


                // tsc-ignore
                zip.file(fileName, result);
                console.log(`Finished`);

                console.log(`Saving Zip File`);
                const zipFile = await zip.generateAsync({type: "blob"});
                saveAs(zipFile, `${zipFileName}_${dateStr}.zip`);
            }


            console.log(`Finished all`);
            if (confirm(`Finished! Can I clean up local storage?`)) {
                localStorage.removeItem(docListKey);
                localStorage.removeItem(lastZipFileNumKey);
            }


        });
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
    private downloadDocument = (downloadUrl) => {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
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
        });
    }

}