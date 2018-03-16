function getOrientation(data) {
	var blob = atob(data.split(",")[1]);
//		console.log(blobSlice(blob));
	var sliced = blobSlice(blob);
	var index = sliced.indexOf('\x01\x12\x00\x03\x00\x00\x00\x01');
	var HexOrientation = sliced.slice(index + 8, index + 10);
	console.log(HEXtoDEC(HexOrientation));
	return HEXtoDEC(HexOrientation);
}

function blobSlice(blob) {
	if (blob.slice(0, 2) != '\xff\xd8') return;
	var mark = blob.slice(2, 4);
	if (!checkMark(mark)) return;
	if (mark == '\xff\xe0') {
		//app0代码块
		var markSize = blob.slice(4, 6);
		var index = 4 + HEXtoDEC(markSize);
		var mark2 = blob.slice(index, index + 2);
		if(!checkMark(mark2)) return;
		if(mark2 == '\xff\xe1') {
			//app1代码块
			var mark2Size = blob.slice(index + 2, index + 4);
			var index2 = index + 2 + HEXtoDEC(mark2Size);
			return blob.slice(index, index2);
		}
	} else if (mark == '\xff\xe1') {
		var markSize = blob.slice(4, 6);
		var index = 4 + HEXtoDEC(markSize);
		return blob.slice(2, index);
	}


	function checkMark(mark) {
		return ['\xff\xe0', '\xff\xe1'].includes(mark);
	}
}

function HEXtoDEC(hex) {
	return hex.charCodeAt(0) * 0x100 + hex.charCodeAt(1);
}
