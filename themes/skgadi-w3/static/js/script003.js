function PrintElem(elem) {
	var mywindow = window.open('', 'PRINT', 'height=' + screen.height + ',width=' + screen.width + ',resizable=yes,scrollbars=yes,toolbar=yes,menubar=yes,location=yes');

	mywindow.document.write('<html><head><title>' + document.title + '</title>');
	mywindow.document.write('<link rel="stylesheet" type="text/css" href="https://www.w3schools.com/lib/w3.css" media="all"><link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-teal.css">');
	mywindow.document.write('</head><body >');
	mywindow.document.write(document.getElementById(elem).innerHTML);
	mywindow.document.write('</body></html>');

	mywindow.document.close(); // necessary for IE >= 10
	mywindow.focus(); // necessary for IE >= 10*/

	$(mywindow).ready(function () {
		mywindow.focus();
		mywindow.print();
		mywindow.close();
	});
	return true;
}

/*
function printDiv(divId) {
	printDivCSS = new String('	<link rel="stylesheet" href="https://www.w3schools.com/lib/w3.css"><link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-teal.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">');
	window.frames["print_frame"].document.body.innerHTML = printDivCSS + document.getElementById(divId).innerHTML;
	$(window.frames["print_frame"]).ready(function () {
		window.frames["print_frame"].window.focus();
		window.frames["print_frame"].window.print();
	});
	<iframe name="print_frame" width="0" height="0" frameborder="0" src="about:blank"></iframe>
}

$.fn.extend({
	print: function () {
		var frameName = 'printIframe';
		var doc = window.frames[frameName];
		if (!doc) {
			$('<iframe>').hide().attr('name', frameName).appendTo(document.body);
			doc = window.frames[frameName];
		}
		doc.document.body.innerHTML = this.html();
		doc.window.print();
		return this;
	}
});

//<link rel="stylesheet" href="https://www.w3schools.com/lib/w3.css">
*/