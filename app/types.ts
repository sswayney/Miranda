export interface FileMetaData {
    fileName: string;
    downloadUrl: string;
    isDownloaded: boolean;
}

export interface AjaxRequestSettings {
    async: boolean;
    headers: { Accept: string; "X-Requested-With": string; "Accept-Language": string; "Content-Type": string };
    method: string;
    data: {
        "columns[8][search][regex]": string; "columns[5][search][regex]": string; "columns[4][search][value]=": string; "columns[10][search][regex]": string; "columns[0][data]": string; "columns[1][data]": string; "columns[2][data]": string; "columns[3][data]": string; "columns[11][searchable]": string; "columns[2][search][regex]": string; "columns[6][search][value]=": string; "columns[8][name]": string; "columns[5][search][value]=": string; "columns[7][name]": string; "columns[9][name]": string; "columns[6][name]": string; "columns[9][searchable]": string; "columns[7][searchable]": string; "columns[8][searchable]": string; "columns[4][name]": string; "columns[6][searchable]": string; "columns[3][searchable]": string; "columns[2][searchable]": string; "columns[7][data]": string; "columns[11][search][value]=": string; "columns[5][data]": string; "columns[9][data]": string; "columns[4][searchable]": string; "columns[5][searchable]": string; "columns[3][search][value]=": string; "columns[11][data]": string; "columns[8][search][value]=": string; "search[regex]": string; "columns[0][searchable]": string; "columns[7][search][regex]": string; "columns[10][name]": string; "columns[1][searchable]": string; "columns[1][search][regex]": string; "columns[4][search][regex]": string; "columns[6][orderable]": string; "columns[7][orderable]": string; "columns[10][orderable]": string; "columns[11][orderable]": string; nFolderChanged: string; "columns[9][search][value]=": string; "columns[3][orderable]": string; "columns[0][search][regex]": string; "columns[3][search][regex]": string; "columns[0][search][value]=": string; "columns[4][orderable]": string; "columns[5][orderable]": string; selected_directory: string; "columns[1][search][value]=": string; "columns[6][search][regex]": string; "columns[0][name]": string; "columns[1][name]": string; "columns[2][name]": string; "columns[11][search][regex]": string; "columns[8][orderable]": string; "columns[9][orderable]": string; "columns[5][name]": string; "columns[10][search][value]=": string; "columns[2][search][value]=": string; "columns[3][name]": string; "columns[7][search][value]=": string; start: string; length: string; "columns[9][search][regex]": string; draw: string; "columns[4][data]": string; "columns[6][data]": string; "columns[8][data]": string; "columns[10][searchable]": string; "columns[2][orderable]": string; "columns[10][data]": string; "columns[11][name]": string; "columns[0][orderable]": string; "columns[1][orderable]": string
    };
    crossDomain: boolean;
    url: string;
}