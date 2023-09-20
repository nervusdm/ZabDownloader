let linkQueue = [];
let downloading = 0;
const MAX_DOWNLOADS = 5;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'download') {
    linkQueue = linkQueue.concat(message.links);
    processQueue();
  }
});

function processQueue() {
  while (downloading < MAX_DOWNLOADS && linkQueue.length > 0) {
    const link = linkQueue.shift();
    downloading += 1;
    chrome.downloads.download({ url: link }, () => {
      downloading -= 1;
      processQueue();
    });
  }
}
