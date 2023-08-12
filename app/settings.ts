import * as $ from 'jquery';

export class Settings {

    public static readonly version = '1.0.0';
    public static readonly bookmarkVer = '1.0.0';
    public static readonly siteName = 'paycomonline.net';
    public static readonly pageName = 'Dashboard';
    public static readonly fullUrl = 'https://www.paycomonline.net/v4/cl/web.php/Doc/Dashboard';
    public static readonly github = `https://github.com/sswayney/Miranda`;
    public static readonly pageBy = 50;
    public static readonly session_nonce = $(`#session_nonce`).val();
    public static readonly endpoints = {
        baseUrl: 'https://www.paycomonline.net',
        dashboard: '/v4/cl/web.php/Doc/Dashboard'
    };
}