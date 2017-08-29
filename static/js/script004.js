var data = [
	["Span", 0, 1, 2, 3, 4],
	[200, 0, 5, 10, 15, 20],
	[, 0, 5, 10, 15, 20],
	[200, 0, 5, 10, 15, 20],
	[, 0, 5, 10, 15, 20],
	[200, 0, 5, 10, 15, 20],
	[, 0, 5, 10, 15, 20],
	[200, 0, 5, 10, 15, 20],
	[, 0, 5, 10, 15, 20],
	[200, 0, 5, 10, 15, 20],
	[, 0, 5, 10, 15, 20],
];
var RowHeads = [
	"",
	"Sag",
	"Tension",
	"Sag",
	"Tension",
	"Sag",
	"Tension",
	"Sag",
	"Tension",
	"Sag",
	"Tension",
];
var container = document.getElementById('ReferenceInput');
var hot = new Handsontable(container, {
	rowHeaders: RowHeads,
	rowHeaderWidth: 75,
	data: data,
	className: "htMiddle htRight",
//	rowHeaders: true,
	colHeaders: false,
	dropdownMenu: true,
	stretchH: 'all',
	contextMenu: false,
	mergeCells: [
		{row:1, col: 0, rowspan: 2, colspan: 1},
		{row:3, col: 0, rowspan: 2, colspan: 1},
		{row:5, col: 0, rowspan: 2, colspan: 1},
		{row:7, col: 0, rowspan: 2, colspan: 1},
		{row:9, col: 0, rowspan: 2, colspan: 1},
	],
	cell: [
      {row: 0, col: 0, className: "htLeft"},
	],
});

function GenerateRefData() {
	alert('hey');
}

function Next000Click() {
	console.log( data );
}


$( document ).ready(function() {
    console.log( data );
});


