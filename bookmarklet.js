javascript: (function() {
    window.bookmarkver = '0.0.1';
    const siteName = 'paycomonline.net';
    const pageName = 'Dashboard';
    const pageNameDisplay = 'Document Management Dashboard';
    var isCorrectSite = document.location.hostname.split('.').slice(-2).join('.') === siteName;
    var isCorrectPage = document.location.href.includes(pageName);
    if (isCorrectSite && isCorrectPage) {
        console.log('Init Miranda Document Downloader...');
        var cachBustUrl = 'https://raw.githubusercontent.com/sswayney/Miranda/dev/miranda.js?' + (new Date().getMilliseconds());
        fetch(cachBustUrl).then(function(response) {
            return response.text();
        }).then(function(data) {
            var script = document.createElement('script');
            script.id = 'mdd-script';
            script.innerHTML = data;
            document.getElementsByTagName('head')[0].appendChild(script);
        }).catch(function() {
            alert('Error retrieving miranda from github');
        });

    } else if (confirm(`This script can only be run from your own user ${pageNameDisplay} on ${siteName}. Would you like to go there now?`)) {
        document.location = 'https://www.paycomonline.net/v4/cl/web.php/Doc/Dashboard';
    } else {
        alert(`Please go to your ${pageNameDisplay} before running this script`);
    }
})();


