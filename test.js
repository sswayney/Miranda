function makeRequestsUntilSizeLimit(urls, maxSize, callback) {
    let totalSize = 0;
    let currentIndex = 0;
    let completedRequests = 0;
    const incompleteRequests = [];

    function sendNextRequest() {
        if (currentIndex >= urls.length) {
            // All requests completed
            callback(incompleteRequests);
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open("GET", urls[currentIndex], true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const responseSize = xhr.responseText.length;
                    totalSize += responseSize;

                    console.log(`Request ${currentIndex + 1} completed. Response size: ${responseSize}`);

                    if (totalSize <= maxSize) {
                        completedRequests++;
                        currentIndex++;
                        sendNextRequest();
                    } else {
                        console.log("Response size limit exceeded. Stopping requests.");
                        incompleteRequests.push(urls[currentIndex]);
                        currentIndex++;
                        sendNextRequest();
                    }
                } else {
                    console.error(`Request ${currentIndex + 1} failed with status ${xhr.status}`);
                    incompleteRequests.push(urls[currentIndex]);
                    currentIndex++;
                    sendNextRequest();
                }
            }
        };

        xhr.send();
    }

    // Start sending the requests
    sendNextRequest();
}

// Example usage:
const urls = [
    "https://example.com/api/data1",
    "https://example.com/api/data2",
    "https://example.com/api/data3",
    "https://example.com/api/data4",
    "https://example.com/api/data5",
];

const maxSize = 1024 * 1024; // 1 MB

function onRequestsComplete(incompleteRequests) {
    if (incompleteRequests.length > 0) {
        console.log("Requests that didn't complete:", incompleteRequests);
    } else {
        console.log("All requests completed.");
    }
}

makeRequestsUntilSizeLimit(urls, maxSize, onRequestsComplete);