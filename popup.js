document.getElementById('downloadBtn').onclick = () => {
    const links = document.getElementById('linksArea').value.split('\n').filter(link => link);
    chrome.runtime.sendMessage({ action: 'download', links });
  };
  