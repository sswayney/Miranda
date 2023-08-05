https://www.paycomonline.net/v4/cl/web.php/Doc/Download/index?srctype=1&folderid=99359&eecode=A002&docid=2243691&fhsh=fl64ce9a20230805135354&doc_dash=1&downloadfile=1




    const settings = {
        "responseType": 'arraybuffer',

        "async": true,
        "crossDomain": true,
        "url": `https://www.paycomonline.net/v4/cl/web.php/Doc/Download/index?srctype=1&folderid=99359&eecode=A002&docid=2243691&fhsh=fl64ce9a20230805135354&doc_dash=1&downloadfile=1`,
        "method": "GET",
        "headers": {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Language": "en-US,en;q=0.9",
            "Upgrade-Insecure-Requests": "1"
        },
        success: function (response, textStatus, xhr) {


            const contentDispositionHeader = xhr.getResponseHeader('Content-Disposition');
            const match = contentDispositionHeader.match(/filename="(.+)"/);
            const fileName = match && match[1] ? match[1] : 'download.pdf';

            // function convertToByteArray(input) {
            //     var sliceSize = 512;
            //     var bytes = [];
            //
            //     for (var offset = 0; offset < input.length; offset += sliceSize) {
            //         var slice = input.slice(offset, offset + sliceSize);
            //
            //         var byteNumbers = new Array(slice.length);
            //
            //         for (var i = 0; i < slice.length; i++) {
            //             byteNumbers[i] = slice.charCodeAt(i);
            //         }
            //
            //         const byteArray = new Uint8Array(byteNumbers);
            //
            //         bytes.push(byteArray);
            //     }
            //
            //     return bytes;
            // }

            debugger;
            const blob = new Blob(response, {type: "application/pdf"});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();

        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(textStatus + ": " + jqXHR.status + " " + errorThrown);
        }
    };
$.ajax(settings);















const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.responseType = 'arraybuffer';
xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        var blob=new Blob([this.response], {type:"application/pdf"});
        var link=document.createElement('a');
        link.href=window.URL.createObjectURL(blob);
        link.download="Report_"+new Date()+".pdf";
        link.click();
    }
});

xhr.open("GET", "https://www.paycomonline.net/v4/cl/web.php/Doc/Download/index?srctype=1&folderid=99359&eecode=A003&docid=2247560&fhsh=fl64ce9a20230805135355&doc_dash=1&downloadfile=1");
xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7");
xhr.setRequestHeader("Accept-Language", "en-US,en;q=0.9");
xhr.setRequestHeader("Upgrade-Insecure-Requests", "1");


xhr.send();