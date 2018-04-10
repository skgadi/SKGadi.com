function Print() {
	mywindow = PrintElem('PrintContent', ['/css/resume-print.css', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'], []);
	$(mywindow).bind('load', function(){
		setTimeout(function(){
			mywindow.focus();
			mywindow.print();
			mywindow.close();
		}, 1000);

	})
	
}