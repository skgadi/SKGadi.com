function Print() {
	mywindow = PrintElem('PrintContent', ['https://cdn.jsdelivr.net/gh/skgadi/wf@1.0/fonts/u57c.min.css', '/css/resume-print.css', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css'], []);
	$(mywindow).bind('load', function(){
		setTimeout(function(){
			mywindow.focus();
			mywindow.print();
			mywindow.close();
		}, 1000);

	})
	
}

$(document).bind('keydown', function(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 80) {
		Print();
		return false;
	}            
});
