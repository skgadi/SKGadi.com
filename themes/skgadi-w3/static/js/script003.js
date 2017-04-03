var dbFileName = "SKGadiDotComPrivateLibrary";
var TopicsFileName = "SKGadiReferenceManagerTopics";

var IsReadyToProceedToNext = false;

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
function handleAuthResult(authResult) {
	var authorizeDiv = document.getElementById('authorize-div');
	if (authResult && !authResult.error) {
		authorizeDiv.style.display = 'none';
		Step000();
	} else {
		authorizeDiv.style.display = 'block';
		$(".Authrozed").css('display', 'none');
	}
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

function loadSheetsApi() {
	var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
	gapi.client.load(discoveryUrl).then(function () {
		gapi.client.load('drive', 'v3', listFiles);
	});
}

function listFiles() {
	var request = gapi.client.drive.files.list({
			'q': 'name=\'' + dbFileName + '\'',
			'pageSize': 10,
			'fields': "nextPageToken, files(id, name)"
		});
	request.execute(function (resp) {
		var files = resp.files;
		if (files && files.length > 0) {
			$.notify("Please wait while we process your database. If it is taking longer than usual, please refresh.", "success");
			GetBibTexString(files[0].id);
			VerifyTopicsDb();
		} else {
			//appendPre('No files found.');
			$.notify("No database file is found. Please wait while we create one for you.", "error");
			//SpreadsheetCreate();
		}
	});
	//request.execute();
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
				console.log(row[1]);
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
				bibstring += '\n' + range.values[i + 1][0] + '\n';
			}
			(new BibtexDisplay()).displayBibtex(bibstring, $("#bibtex_display"));
			loadExtras();
		} else {
		}
		reset();
		console.log(bibstring);
		$(".Authrozed").css('display', 'block');
		$(".HideWhenLoaded").css("display", "none");
		$(".ShowWhenLoaded").css("display", "block");

	});
}

function isFileExist(filename) {
	var result = 'asf';
	var request = gapi.client.drive.files.list({
			'q': 'name=\'' + dbFileName + '\'',
			'pageSize': 10,
			'fields': "nextPageToken, files(id, name)"
		});
	IsReadyToProceedToNext = false;
	request.execute(function (resp) {
		var files = resp.files;
		if (files && files.length > 0)
			result = true;
		else
			result = false;
		IsReadyToProceedToNext = true;
	});
	console.log(result);
	console.log(IsReadyToProceedToNext);
	waitTillReadyToProceed();
	console.log(IsReadyToProceedToNext);
	return result;
}

function waitTillReadyToProceed() {
	if (IsReadyToProceedToNext == false) {
		window.setTimeout(waitTillReadyToProceed, 100); /* this checks the flag every 100 milliseconds*/
	} else {
		/* do something*/
	}
}

function VerifyTopicsDb() {
	var request = gapi.client.drive.files.list({
			'q': 'name=\'' + TopicsFileName + '\'',
			'pageSize': 10,
			'fields': "nextPageToken, files(id, name)"
		});
	request.execute(function (resp) {
		var files = resp.files;
		if (files && files.length > 0) {
			GetTopicsFromDB(files[0].id);
		} else {
			$.notify("No topics database is found.", "error");
			CreateTopicsDatabase()
		}
	});
}

function GetBibTexString(id) {
	gapi.client.sheets.spreadsheets.values.get({
		spreadsheetId: id,
		range: 'db!A1:A',
	}).then(function (response) {
		var range = response.result;
		if (range.values.length > 0) {
			//if ((range.values.length) > 1)
			for (i = 0; i < ((range.values.length) - 1); i++) {
				/*var row = range.values[i];
				appendPre(row[0] + ', ' + row[3]);*/
				bibstring += '\n' + range.values[i + 1][0] + '\n';
			}
			(new BibtexDisplay()).displayBibtex(bibstring, $("#bibtex_display"));
			loadExtras();
			//appendPre(bibstring);
		} else {
			//appendPre('No data found.');
		}
	});
	reset();
}
function GetTopicsFromDB(id) {
	//Setting the topics
	gapi.client.sheets.spreadsheets.values.get({
		spreadsheetId: id,
		range: 'topics!A1:B',
	}).then(function (response) {
		var range = response.result;
		$('#topicselect').html("");
		if (range.values.length > 0) {
			$('#topicselect').append("<option value=''>All topics</option>");
			for (i = 0; i < ((range.values.length) - 1); i++) {
				var row = range.values[i + 1];
				$('#topicselect').append("<option value='" + row[1] + "'>" + row[0] + "</option>");
			}
			reset();
			//appendPre(bibstring);
		} else {
			$('#topicselect').append("<option value=''>Topics: NA</option>");
			//appendPre('No data found.');
		}
	});
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

function CreateTopicsDatabase() {

	gapi.client.sheets.spreadsheets.create({
		"properties": {
			"title": TopicsFileName
		},
		sheets: [{
				"properties": {
					"sheetId": 0,
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
		$.notify("A databse is generated in your google drive.", "success");
		$.notify("Your page will refresh now.", "info");
		wait(2000);
		location.reload();
	}); ;
}

$(window).on('load', function () {

	checkAuth();
});