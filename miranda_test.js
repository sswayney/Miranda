fetch("https://www.paycomonline.net/v4/cl/web.php/Doc/Dashboard?session_nonce=b59383ecc52673cf6fb66c5864f2da4c", {
    "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "cl_lang=en; cl_date_format=MM%2FDD%2FYYYY; TS01dc40bf=014586c95aaf3f310f38498ee74a59974d6584ac96e5fb458989ee73fd938f51e9f7dc2662b3159ab7e12ce1b52bb00d4429443b56; pcmClientSess=ca859853ec55c168ff4ef6cb63964c6b9e4cae6f; date_format=MM%2FDD%2FYYYY; TS01c798be=014586c95aaf3f310f38498ee74a59974d6584ac96e5fb458989ee73fd938f51e9f7dc2662b3159ab7e12ce1b52bb00d4429443b56; pcmClientSess2=DB135; clSsoInitiated=false; pcm-device-token-2442bda9368b2a112dbc3ee9b50c5d9628f36b8331794219a9639ddfcae6c9f05=000448de07dca40ab1b7f36051f14790; i9RetentionPolicyClientCode=0VR07; appv2ClientSess=1nrorljgim59dmndclkhcl6491; pcm_aud_guid=0b402587cccb2eac; i9RetentionPoclityEnabled=1; online_httpRequestToken=8902baa53750e227e1f2d7841afd656e3c3737a3c561b69e1e9d037e27ebec77---1690745709; usage_timestamp=Sunday%2C%2030-Jul-2023%2014%3A35%3A09%20CDT; lastKnowURL=%2Fv4%2Fcl%2Fweb.php%2FDoc%2FDashboard%3Fsession_nonce%3Db59383ecc52673cf6fb66c5864f2da4c; TS01ad0fe2=014586c95a3a47c64bdb5d6ec3d00a00fe23c9ce881a9164cac7b15ba094a6acc8958da61529aca6b4ba266a1970ac6edacf640352; Secure=!iA7Kmth7HE4VoPt4Qqv2hq/eWCmsVMi8cXg2QjKRJfBTco6w3EMWKpRJGVuJKKjvf++gittPNw==; cookie_secure_5min=!rWP4oqESxBefCCx4Qqv2hq/eWCmsVEy/qcuqWQFsTAzt7I7i9cm0B7emIbicKMurJxwajEupBA==",
        "Referer": "https://www.paycomonline.net/v4/cl/web.php/Doc/Dashboard?session_nonce=b59383ecc52673cf6fb66c5864f2da4c",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": "draw=1&columns%5B0%5D%5Bdata%5D=select_eecode_docid&columns%5B0%5D%5Bname%5D=select_eecode_docid&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=eename&columns%5B1%5D%5Bname%5D=eename&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=eestatus&columns%5B2%5D%5Bname%5D=eestatus&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=labor_allo&columns%5B3%5D%5Bname%5D=labor_allo&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=foldername&columns%5B4%5D%5Bname%5D=foldername&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=srcfile_desc&columns%5B5%5D%5Bname%5D=srcfile_desc&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=version_number&columns%5B6%5D%5Bname%5D=version_number&columns%5B6%5D%5Bsearchable%5D=false&columns%5B6%5D%5Borderable%5D=true&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=employeeAckSign&columns%5B7%5D%5Bname%5D=employeeAckSign&columns%5B7%5D%5Bsearchable%5D=false&columns%5B7%5D%5Borderable%5D=true&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B8%5D%5Bdata%5D=supervisorAckSign&columns%5B8%5D%5Bname%5D=supervisorAckSign&columns%5B8%5D%5Bsearchable%5D=false&columns%5B8%5D%5Borderable%5D=true&columns%5B8%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B8%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B9%5D%5Bdata%5D=lastrmnddate&columns%5B9%5D%5Bname%5D=lastrmnddate&columns%5B9%5D%5Bsearchable%5D=false&columns%5B9%5D%5Borderable%5D=true&columns%5B9%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B9%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B10%5D%5Bdata%5D=modified_date&columns%5B10%5D%5Bname%5D=modified_date&columns%5B10%5D%5Bsearchable%5D=true&columns%5B10%5D%5Borderable%5D=true&columns%5B10%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B10%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B11%5D%5Bdata%5D=actions&columns%5B11%5D%5Bname%5D=actions&columns%5B11%5D%5Bsearchable%5D=false&columns%5B11%5D%5Borderable%5D=false&columns%5B11%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B11%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=25&search%5Bvalue%5D=&search%5Bregex%5D=false&selected_directory=-1&nFolderChanged=0",
    "method": "POST"
});











fetch("https://www.paycomonline.net/v4/cl/web.php/Doc/Dashboard?session_nonce=b59383ecc52673cf6fb66c5864f2da4c", {
    "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://www.paycomonline.net/v4/cl/web.php/Doc/Dashboard?session_nonce=b59383ecc52673cf6fb66c5864f2da4c",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "draw=1&columns%5B0%5D%5Bdata%5D=select_eecode_docid&columns%5B0%5D%5Bname%5D=select_eecode_docid&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=eename&columns%5B1%5D%5Bname%5D=eename&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=eestatus&columns%5B2%5D%5Bname%5D=eestatus&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=labor_allo&columns%5B3%5D%5Bname%5D=labor_allo&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=foldername&columns%5B4%5D%5Bname%5D=foldername&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=srcfile_desc&columns%5B5%5D%5Bname%5D=srcfile_desc&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=version_number&columns%5B6%5D%5Bname%5D=version_number&columns%5B6%5D%5Bsearchable%5D=false&columns%5B6%5D%5Borderable%5D=true&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=employeeAckSign&columns%5B7%5D%5Bname%5D=employeeAckSign&columns%5B7%5D%5Bsearchable%5D=false&columns%5B7%5D%5Borderable%5D=true&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B8%5D%5Bdata%5D=supervisorAckSign&columns%5B8%5D%5Bname%5D=supervisorAckSign&columns%5B8%5D%5Bsearchable%5D=false&columns%5B8%5D%5Borderable%5D=true&columns%5B8%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B8%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B9%5D%5Bdata%5D=lastrmnddate&columns%5B9%5D%5Bname%5D=lastrmnddate&columns%5B9%5D%5Bsearchable%5D=false&columns%5B9%5D%5Borderable%5D=true&columns%5B9%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B9%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B10%5D%5Bdata%5D=modified_date&columns%5B10%5D%5Bname%5D=modified_date&columns%5B10%5D%5Bsearchable%5D=true&columns%5B10%5D%5Borderable%5D=true&columns%5B10%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B10%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B11%5D%5Bdata%5D=actions&columns%5B11%5D%5Bname%5D=actions&columns%5B11%5D%5Bsearchable%5D=false&columns%5B11%5D%5Borderable%5D=false&columns%5B11%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B11%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=25&search%5Bvalue%5D=&search%5Bregex%5D=false&selected_directory=-1&nFolderChanged=0",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
});

fetch("https://www.paycomonline.net/v4/cl/web.php/Doc/Dashboard?session_nonce=b59383ecc52673cf6fb66c5864f2da4c", {
    "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://www.paycomonline.net/v4/cl/web.php/Doc/Dashboard?session_nonce=b59383ecc52673cf6fb66c5864f2da4c",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "draw=1&columns%5B0%5D%5Bdata%5D=select_eecode_docid&columns%5B0%5D%5Bname%5D=select_eecode_docid&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=eename&columns%5B1%5D%5Bname%5D=eename&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=eestatus&columns%5B2%5D%5Bname%5D=eestatus&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=labor_allo&columns%5B3%5D%5Bname%5D=labor_allo&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=foldername&columns%5B4%5D%5Bname%5D=foldername&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=srcfile_desc&columns%5B5%5D%5Bname%5D=srcfile_desc&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=version_number&columns%5B6%5D%5Bname%5D=version_number&columns%5B6%5D%5Bsearchable%5D=false&columns%5B6%5D%5Borderable%5D=true&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=employeeAckSign&columns%5B7%5D%5Bname%5D=employeeAckSign&columns%5B7%5D%5Bsearchable%5D=false&columns%5B7%5D%5Borderable%5D=true&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B8%5D%5Bdata%5D=supervisorAckSign&columns%5B8%5D%5Bname%5D=supervisorAckSign&columns%5B8%5D%5Bsearchable%5D=false&columns%5B8%5D%5Borderable%5D=true&columns%5B8%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B8%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B9%5D%5Bdata%5D=lastrmnddate&columns%5B9%5D%5Bname%5D=lastrmnddate&columns%5B9%5D%5Bsearchable%5D=false&columns%5B9%5D%5Borderable%5D=true&columns%5B9%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B9%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B10%5D%5Bdata%5D=modified_date&columns%5B10%5D%5Bname%5D=modified_date&columns%5B10%5D%5Bsearchable%5D=true&columns%5B10%5D%5Borderable%5D=true&columns%5B10%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B10%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B11%5D%5Bdata%5D=actions&columns%5B11%5D%5Bname%5D=actions&columns%5B11%5D%5Bsearchable%5D=false&columns%5B11%5D%5Borderable%5D=false&columns%5B11%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B11%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=25&search%5Bvalue%5D=&search%5Bregex%5D=false&selected_directory=-1&nFolderChanged=0",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
});