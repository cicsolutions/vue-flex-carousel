Image.prototype.load = function(url){
  var thisImg = this;
  var xmlHTTP = new XMLHttpRequest();
  xmlHTTP.open('GET', url, true);
  xmlHTTP.responseType = 'arraybuffer';
  xmlHTTP.onload = function(e) {
    var blob = new Blob([this.response]);
    thisImg.src = window.URL.createObjectURL(blob);
  };
  xmlHTTP.onprogress = function(e) {
    if (e.lengthComputable) {
      thisImg.completedPercentage = parseInt((e.loaded / e.total) * 100);
    }
  };
  xmlHTTP.onloadstart = function() {
    thisImg.completedPercentage = 0;
  };
  xmlHTTP.send();
};

Image.prototype.completedPercentage = 0;

// Large Image for load testing
// https://edmullen.net/test/rc.jpg
// http://blogs.adobe.com/webplatform/files/ImgProgressSample.html?file=ImgProgressSample.html
