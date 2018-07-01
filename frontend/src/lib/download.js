const canvas = document.createElement('canvas');

export function download(imgRef, imageFormat) {
  const context = canvas.getContext('2d');
  imgRef.scale = 0.5;
  context.drawImage(imgRef, 0, 0);
  const link = document.createElement('a');

  var imgData = canvas.toDataURL({
    format: 'png',
    multiplier: 4,
  });
  var blob = dataURLtoBlob(imgData);
  var objurl = URL.createObjectURL(blob);

  link.download = 'helloWorld.jpg';

  link.href = objurl;

  link.click();
}

function dataURLtoBlob(dataurl) {
  var parts = dataurl.split(','),
    mime = parts[0].match(/:(.*?);/)[1];
  if (parts[0].indexOf('base64') !== -1) {
    var bstr = atob(parts[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  } else {
    var raw = decodeURIComponent(parts[1]);
    return new Blob([raw], { type: mime });
  }
}
