

// Get dashboard exact from browser
const options = {
    method: 'POST',
    headers: {
        cookie: 'online_httpRequestToken=8cc3c10b6c0f780cb35ecfabad6887c9d3675a477d639de84436758ea9d3dc17---1690339830; TS01ad0fe2=014586c95ab95945fc372764bd6700dac7767c7331c9f58472b818ec77c45c662cbecf27cba9f5eb12e1433ea0b4bf0949857054d9; usage_timestamp=Tuesday%252C%252025-Jul-2023%252021%253A50%253A30%2520CDT; Secure=!pwd9VmuY1KjiL5J4Qqv2hq%2FeWCmsVFb9ePIa6OsPEO4DPs0pP3%2FbIS6CxoHk3AAC3y1yEUIQbA%3D%3D',
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'en-US,en;q=0.9',
        Connection: 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Cookie: 'pcmClientSess=e0eb913e1bf0ddee91d7a60c0c264c07ea92591b; cl_lang=en; cl_date_format=MM%2FDD%2FYYYY; TS01dc40bf=014586c95aaf3f310f38498ee74a59974d6584ac96e5fb458989ee73fd938f51e9f7dc2662b3159ab7e12ce1b52bb00d4429443b56; date_format=MM%2FDD%2FYYYY; TS01c798be=014586c95aaf3f310f38498ee74a59974d6584ac96e5fb458989ee73fd938f51e9f7dc2662b3159ab7e12ce1b52bb00d4429443b56; pcmClientSess2=DB135; clSsoInitiated=false; pcm_aud_guid=a1a5e9357964bf10; pcm-device-token-2442bda9368b2a112dbc3ee9b50c5d9628f36b8331794219a9639ddfcae6c9f05=000448de07dca40ab1b7f36051f14790; i9RetentionPoclityEnabled=1; i9RetentionPolicyClientCode=0VR07; appv2ClientSess=1nrorljgim59dmndclkhcl6491; lastKnowURL=%2Fv4%2Fcl%2Fweb.php%2FDoc%2FDashboard; TS01ad0fe2=01ae05b12b69e690237f774abebfb651c3de05d059c71fe7ae772bc5f08c97f612c3ff987bb88bae5338e1f858cd8b36e1cb4c6564; online_httpRequestToken=cacbdc38216dfe7757ab7fe5a5bbb947a1a10a5806a22d654da56b28b3436ec0---1690337714; usage_timestamp=Tuesday%2C%2025-Jul-2023%2021%3A15%3A14%20CDT; Secure=\u0021feW7WBaXryZ1I3/EKVuQT6m4DOZWjWkzViPVmYmGxek4nrzJ0WtddvK99+v9QyEvr1YmsjyrtQ==; cookie_secure_5min=\u0021B+82flqVktIu3mrEKVuQT6m4DOZWjfbnQG/HQZ1H2uxiDkLhd8qa1960iZKqH1tV2wm+JSl8Ig==',
        Origin: 'https://www.paycomonline.net',
        Referer: 'https://www.paycomonline.net/v4/cl/web.php/Doc/Dashboard',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
    },
    body: new URLSearchParams({
        draw: '1',
        'columns[0][data]': 'select_eecode_docid',
        'columns[0][name]': 'select_eecode_docid',
        'columns[0][searchable]': 'true',
        'columns[0][orderable]': 'false',
        '': [
            'columns[0][search][value]=',
            'columns[1][search][value]=',
            'columns[2][search][value]=',
            'columns[3][search][value]=',
            'columns[4][search][value]=',
            'columns[5][search][value]=',
            'columns[6][search][value]=',
            'columns[7][search][value]=',
            'columns[8][search][value]=',
            'columns[9][search][value]=',
            'columns[10][search][value]=',
            'columns[11][search][value]=',
            'search[value]='
        ],
        'columns[0][search][regex]': 'false',
        'columns[1][data]': 'eename',
        'columns[1][name]': 'eename',
        'columns[1][searchable]': 'true',
        'columns[1][orderable]': 'true',
        'columns[1][search][regex]': 'false',
        'columns[2][data]': 'eestatus',
        'columns[2][name]': 'eestatus',
        'columns[2][searchable]': 'true',
        'columns[2][orderable]': 'true',
        'columns[2][search][regex]': 'false',
        'columns[3][data]': 'labor_allo',
        'columns[3][name]': 'labor_allo',
        'columns[3][searchable]': 'true',
        'columns[3][orderable]': 'true',
        'columns[3][search][regex]': 'false',
        'columns[4][data]': 'foldername',
        'columns[4][name]': 'foldername',
        'columns[4][searchable]': 'true',
        'columns[4][orderable]': 'true',
        'columns[4][search][regex]': 'false',
        'columns[5][data]': 'srcfile_desc',
        'columns[5][name]': 'srcfile_desc',
        'columns[5][searchable]': 'true',
        'columns[5][orderable]': 'true',
        'columns[5][search][regex]': 'false',
        'columns[6][data]': 'version_number',
        'columns[6][name]': 'version_number',
        'columns[6][searchable]': 'false',
        'columns[6][orderable]': 'true',
        'columns[6][search][regex]': 'false',
        'columns[7][data]': 'employeeAckSign',
        'columns[7][name]': 'employeeAckSign',
        'columns[7][searchable]': 'false',
        'columns[7][orderable]': 'true',
        'columns[7][search][regex]': 'false',
        'columns[8][data]': 'supervisorAckSign',
        'columns[8][name]': 'supervisorAckSign',
        'columns[8][searchable]': 'false',
        'columns[8][orderable]': 'true',
        'columns[8][search][regex]': 'false',
        'columns[9][data]': 'lastrmnddate',
        'columns[9][name]': 'lastrmnddate',
        'columns[9][searchable]': 'false',
        'columns[9][orderable]': 'true',
        'columns[9][search][regex]': 'false',
        'columns[10][data]': 'modified_date',
        'columns[10][name]': 'modified_date',
        'columns[10][searchable]': 'true',
        'columns[10][orderable]': 'true',
        'columns[10][search][regex]': 'false',
        'columns[11][data]': 'actions',
        'columns[11][name]': 'actions',
        'columns[11][searchable]': 'false',
        'columns[11][orderable]': 'false',
        'columns[11][search][regex]': 'false',
        start: '0',
        length: '25',
        'search[regex]': 'false',
        selected_directory: '-1',
        nFolderChanged: '0'
    })
};

fetch('https://www.paycomonline.net/v4/cl/web.php/Doc/Dashboard', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

// Get dashboard in console
const options = {
    method: 'POST',
    headers: {
        credentials: "same-origin",
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'en-US,en;q=0.9',
        Connection: 'keep-alive',

    },
    body: new URLSearchParams({
        draw: '1',
        'columns[0][data]': 'select_eecode_docid',
        'columns[0][name]': 'select_eecode_docid',
        'columns[0][searchable]': 'true',
        'columns[0][orderable]': 'false',
        '': [
            'columns[0][search][value]=',
            'columns[1][search][value]=',
            'columns[2][search][value]=',
            'columns[3][search][value]=',
            'columns[4][search][value]=',
            'columns[5][search][value]=',
            'columns[6][search][value]=',
            'columns[7][search][value]=',
            'columns[8][search][value]=',
            'columns[9][search][value]=',
            'columns[10][search][value]=',
            'columns[11][search][value]=',
            'search[value]='
        ],
        'columns[0][search][regex]': 'false',
        'columns[1][data]': 'eename',
        'columns[1][name]': 'eename',
        'columns[1][searchable]': 'true',
        'columns[1][orderable]': 'true',
        'columns[1][search][regex]': 'false',
        'columns[2][data]': 'eestatus',
        'columns[2][name]': 'eestatus',
        'columns[2][searchable]': 'true',
        'columns[2][orderable]': 'true',
        'columns[2][search][regex]': 'false',
        'columns[3][data]': 'labor_allo',
        'columns[3][name]': 'labor_allo',
        'columns[3][searchable]': 'true',
        'columns[3][orderable]': 'true',
        'columns[3][search][regex]': 'false',
        'columns[4][data]': 'foldername',
        'columns[4][name]': 'foldername',
        'columns[4][searchable]': 'true',
        'columns[4][orderable]': 'true',
        'columns[4][search][regex]': 'false',
        'columns[5][data]': 'srcfile_desc',
        'columns[5][name]': 'srcfile_desc',
        'columns[5][searchable]': 'true',
        'columns[5][orderable]': 'true',
        'columns[5][search][regex]': 'false',
        'columns[6][data]': 'version_number',
        'columns[6][name]': 'version_number',
        'columns[6][searchable]': 'false',
        'columns[6][orderable]': 'true',
        'columns[6][search][regex]': 'false',
        'columns[7][data]': 'employeeAckSign',
        'columns[7][name]': 'employeeAckSign',
        'columns[7][searchable]': 'false',
        'columns[7][orderable]': 'true',
        'columns[7][search][regex]': 'false',
        'columns[8][data]': 'supervisorAckSign',
        'columns[8][name]': 'supervisorAckSign',
        'columns[8][searchable]': 'false',
        'columns[8][orderable]': 'true',
        'columns[8][search][regex]': 'false',
        'columns[9][data]': 'lastrmnddate',
        'columns[9][name]': 'lastrmnddate',
        'columns[9][searchable]': 'false',
        'columns[9][orderable]': 'true',
        'columns[9][search][regex]': 'false',
        'columns[10][data]': 'modified_date',
        'columns[10][name]': 'modified_date',
        'columns[10][searchable]': 'true',
        'columns[10][orderable]': 'true',
        'columns[10][search][regex]': 'false',
        'columns[11][data]': 'actions',
        'columns[11][name]': 'actions',
        'columns[11][searchable]': 'false',
        'columns[11][orderable]': 'false',
        'columns[11][search][regex]': 'false',
        start: '0',
        length: '25',
        'search[regex]': 'false',
        selected_directory: '-1',
        nFolderChanged: '0'
    })
};

fetch('https://www.paycomonline.net/v4/cl/web.php/Doc/Dashboard', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));