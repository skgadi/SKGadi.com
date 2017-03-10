function reset() {
	$("select").each(function () {
	  localStorage.setItem($(this).attr("id"),"");
	  $(this).val("");
	}); 
	$("#searchbar").val("");
	$("#searchbar").trigger('change');
}
function DisplayItem(id) {
	$('#ArticleModalContent').empty();
	$('#ArticleModalContent').html($('#' + id).html());
	document.getElementById('ArticleModal').style.display='block'
}

function OpenDOI(DOI) {
	window.open('http://dx.doi.org/' + $(DOI).text(), '_blank');
}

function OpenURL(URL) {
	window.open($(URL).text(), '_blank');
}

function OpenFile(BIBKey, Loc) {
	if (Loc == 1)
		window.open("https://mega.nz/#fm/search/" + BIBKey, '_blank');
	else if (Loc == 2)
		window.open("https://drive.google.com/drive/search?q=" + BIBKey, '_blank');
}

function SelectTheText(Code) {
	SelectText(Code);
}

function CopyTheText(Code) {
	copyTextofDOMToClipboard(Code);
	$.notify("This BibTeX code is coppied to your clipboard", "success");
}

function CopyThePrevText(Code) {
	code1 = $(Code).prev().get(0);
	console.log(code1);
	copyTextofDOMToClipboard(code1);
	$.notify("This BibTeX code is coppied to your clipboard", "success");
}




