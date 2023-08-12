import {FileMetaData} from "./types";
import {Settings} from "./settings";

export class LocalStorageMdd {

    public static setFileMetaDataInLocalStorage = (fileNameDownloadUrlList: FileMetaData[]): void => {
        console.log('setFileMetaDataInLocalStorage');
        localStorage.setItem(Settings.localStorageKeys.fileMetaData, JSON.stringify(fileNameDownloadUrlList));
    }

    public static getFileMetaDataFromLocalStorage = (): FileMetaData[] | null => {
        console.log('getFileMetaDataFromLocalStorage');
        return JSON.parse(localStorage.getItem(Settings.localStorageKeys.fileMetaData));
    }

    public static clearAll(): void {
        console.log('Clearing all local storage');
        localStorage.removeItem(Settings.localStorageKeys.fileMetaData);
    }
}