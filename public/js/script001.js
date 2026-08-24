function reset() {
	$("select").each(function () {
		localStorage.setItem($(this).attr("id"), "");
		$(this).val("");
	});
	$("#searchbar").val("");
	$("#searchbar").trigger('change');
}

function DisplayItem(id) {
	$('#ArticleModalContent').empty();
	$('#ArticleModalContent').html($('#' + id).html());
	document.getElementById('ArticleModal').style.display = 'block';
}

function OpenDOI(DOI) {
	if (isUrlValid($(DOI).text()))
		window.open($(DOI).text(), '_blank');
	else
		window.open('https://doi.org/' + $(DOI).text(), '_blank');
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

function DisplayAddItem() {
	document.getElementById('AddItemModal').style.display = 'block'
}

var CLIENT_ID = '712680049905-tiu050phvviin484ngr26nij54e3lr2d.apps.googleusercontent.com';
var SCOPES = ["https://www.googleapis.com/auth/spreadsheets",
	"https://www.googleapis.com/auth/drive",
	"https://www.googleapis.com/auth/drive.appdata",
	"https://www.googleapis.com/auth/drive.file",
	"https://www.googleapis.com/auth/drive.metadata",
	//"https://www.googleapis.com/auth/drive.metadata.readonly",
	//"https://www.googleapis.com/auth/drive.photos.readonly",
	//"https://www.googleapis.com/auth/drive.readonly"
];
var bibstring = "";

function checkAuth() {
	gapi.auth.authorize({
		'client_id': CLIENT_ID,
		'scope': SCOPES.join(' '),
		'immediate': true
	}, handleAuthResult);
}

function handleAuthClick(event) {
	gapi.auth.authorize({
		client_id: CLIENT_ID,
		scope: SCOPES,
		immediate: false
	},
		handleAuthResult);
	return false;
}

function handleAuthResult(authResult) {
	if (authResult && !authResult.error) {
		Step000();
	} else {
		SetAutorizationRequiredView();
	}
}

function Step000() {
	var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
	gapi.client.load(discoveryUrl).then(function () {
		gapi.client.load('drive', 'v3', Step001);
	});
}

function Step001() {
	// Look for dbFileName
	var request = gapi.client.drive.files.list({
			'q': 'name=\'' + dbFileName + '\'',
			'pageSize': 10,
			'fields': "nextPageToken, files(id, name)"
		});
	request.execute(function (resp) {
		var files = resp.files;
		if (files && files.length > 0)
			Step002(files[0].id);
		else
			GenerateDatabase();
	});
}

function Step002(id) {
	gapi.client.sheets.spreadsheets.values.get({
		spreadsheetId: id,
		range: 'topics!A:B',
	}).then(function (response) {
		var range = response.result;
		$('#topicselect').html("");
		if (range.values.length > 0) {
			$('#topicselect').append("<option value=''>All topics</option>");
			for (i = 0; i < ((range.values.length) - 1); i++) {
				var row = range.values[i + 1];
				$('#topicselect').append("<option value='" + row[1] + "'>" + row[0] + "</option>");
				//console.log(row[1]);
			}
			Step003(id);
		} else {
			$('#topicselect').append("<option value=''>Topics: NA</option>");
		}
	});

}

function Step003(id) {
	gapi.client.sheets.spreadsheets.values.get({
		spreadsheetId: id,
		range: 'db!A:A',
	}).then(function (response) {
		var range = response.result;
		if (range.values.length > 0) {
			for (i = 0; i < ((range.values.length) - 1); i++) {
				//bibstring += '\n' + range.values[i + 1][0] + '\n';
				bibstring += range.values[i + 1][0];
			}
			RunBibtexJs();
		} else {}
		reset();
		//console.log(bibstring);
		SetAutorizedView();
	});
}

function RunBibtexJs() {
	(new BibtexDisplay()).displayBibtex(bibstring, $("#bibtex_display"));
	loadExtras();
}

function SetAutorizedView() {
	$(".Authrozed").css('display', 'block');
	$(".AuthorizationRequire").css('display', 'none');
	$(".HideWhenLoaded").css("display", "none");
	$(".ShowWhenLoaded").css("display", "block");
}
function SetAutorizationRequiredView() {
	$(".Authrozed").css('display', 'none');
	$(".AuthorizationRequire").css('display', 'block');
	$(".HideWhenLoaded").css("display", "none");
	$(".ShowWhenLoaded").css("display", "block");
}

function GenerateDatabase() {
	/*var URI = "https://www.googleapis.com/drive/v3/files?corpus=user&q=name%3D%22temp%22&key="+CLIENT_ID;
	$.post(URI, function (data) {

	alert(JSON.stringify(data, null, 4));
	});*/
	//$.notify("A databse will be generated.", "info");
	gapi.client.sheets.spreadsheets.create({
		"properties": {
			"title": dbFileName
		},
		sheets: [{
				"properties": {
					"sheetId": 0,
					"title": "db"
				},
				"data": [{
						"startRow": 0,
						"startColumn": 0,
						"rowData": [{
								"values": [{
										"userEnteredValue": {
											"stringValue": "bibtex"
										}
									}
								]
							}
						]
					}
				]
			}, {
				"properties": {
					"sheetId": 1,
					"title": "topics"
				},
				"data": [{
						"startRow": 0,
						"startColumn": 0,
						"rowData": [{
								"values": [{
										"userEnteredValue": {
											"stringValue": "head"
										}
									}
								]
							}
						]
					}, {
						"startRow": 0,
						"startColumn": 1,
						"rowData": [{
								"values": [{
										"userEnteredValue": {
											"stringValue": "values"
										}
									}
								]
							}
						]
					}, {
						"startRow": 1,
						"startColumn": 0,
						"rowData": [{
								"values": [{
										"userEnteredValue": {
											"stringValue": "Mathematics"
										}
									}
								]
							}
						]
					}, {
						"startRow": 1,
						"startColumn": 1,
						"rowData": [{
								"values": [{
										"userEnteredValue": {
											"stringValue": "stability|mathematics|Statistics"
										}
									}
								]
							}
						]
					}
				]
			}
		]
	}).then(function (response) {
		//$.notify("A databse is generated in your google drive.", "success");
		//$.notify("Your page will refresh now.", "info");
		location.reload();
	});
}

function AddNewBibTeXToDatabase() {
	if ($("#BibTeXCodeToAddDatabase").val() == '')
		$.notify("BibTeX can not be empty", "alert");
	else {
		if (confirm('Are you sure you want append this item to your database?')) {
			var request = gapi.client.drive.files.list({
					'q': 'name=\'' + dbFileName + '\'',
					'pageSize': 10,
					'fields': "nextPageToken, files(id, name)"
				});
			request.execute(function (resp) {
				var files = resp.files;
				if (files && files.length > 0) {
					gapi.client.sheets.spreadsheets.values.append({
						"spreadsheetId": files[0].id,
						"range": "db!A1",
						"valueInputOption": "USER_ENTERED",
						"insertDataOption": "INSERT_ROWS",
						"values": [[$("#BibTeXCodeToAddDatabase").val()]]
					}).then(function (response) {
						$.notify("The BibTeX is successfully added to your library.", "success");
						$("#BibTeXCodeToAddDatabase").val('');
						document.getElementById('AddItemModal').style.display = 'none';
						location.reload();
					});
				} else {
					$.notify("No database file is found. Refresh the page and try again.", "error");
				}
			});
		}
	}
}

function OpenDatabaseFile(InNewWind = true) {
	var request = gapi.client.drive.files.list({
			'q': 'name=\'' + dbFileName + '\'',
			'pageSize': 10,
			'fields': "nextPageToken, files(id, name)"
		});
	request.execute(function (resp) {
		var files = resp.files;
		if (files && files.length > 0) {
			if (InNewWind)
				window.open("https://docs.google.com/spreadsheets/d/" + files[0].id + "/edit", "_blank");
			else
				window.open("https://docs.google.com/spreadsheets/d/" + files[0].id + "/edit", "_self");
		} else {
			$.notify("No database file is found. You have to authorize to proceed. Press the authorize button.", "error");
		}
	});
}

function DownloadBdatabase() {
	download('database.bib', bibstring);
}

$(window).on('load', function () {
	if (typeof CheckAuthRequired !== 'undefined')
		checkAuth();
});
function GSKCloseModel() {
	document.getElementById('ArticleModal').style.display='none';
}

$(document).bind('keydown', function(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 27) {
		GSKCloseModel();
		return false;
	}            
});

$(document).click(function(event) {
  //if you click on anything except the modal itself or the "open modal" link, close the modal
  if (!$(event.target).closest("#ArticleModalContent").length) {
	  if ($("#ArticleModal").css ("visibility") == "visble") {
		GSKCloseModel();
	  }
  }
});