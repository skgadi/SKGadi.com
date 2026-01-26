var ChartHeight = 350;
var x, y;
var options = {
	height: ChartHeight,
	axes: {
		x: {
			0: {
				side: 'bottom'
			}
		}
	},
	legend: {
		position: 'none'
	},
	hAxis: {
		title: 'Time, t'
	},
	vAxis: {
		title: 'yAxis'
	},
};

window.onload = function () {
	MathJax.Hub.Config({
		extensions: ["tex2jax.js"],
		jax: ["input/TeX", "output/HTML-CSS"],
		tex2jax: {
			inlineMath: [['$', '$'], ["\\(", "\\)"]],
			displayMath: [['$$', '$$'], ["\\[", "\\]"]],
			processEscapes: true
		},
		"HTML-CSS": {
			fonts: ["TeX"]
		}
	});
	MathJax.Hub.Configured();
	google.charts.load('current', {
		'packages': ['corechart']
	});
	google.charts.setOnLoadCallback(drawChart);
}
function ValOf(ID) {
	return Number($('#' + ID).val());
}
function drawChart() {
	SetStepChart();
	SetSquareChart();
	SetRectChart();
	SetSineChart();
	SetSawtoothChart();
	SetTriangularChart();
}

function GetXAxis(Start, End, Samples) {
	if (Start < End && Samples > 0) {
		x = [];
		x[0] = Start;
		var step = (End - Start) / Samples;
		for (var i = 0; i < Samples; i++)
			x[i + 1] = x[i] + step;
		return true;
	} else {
		$.notify("Error in selection of start time, finish time or number of samples", "error");
		return false;
	}
}

function GenerateDataForGraphs(Lines, Names) {
	var GData = new google.visualization.DataTable();
	GData.addColumn('number', "Time (s)");
	if (Names.length == Lines.length) {
		for (var i = 0; i < Names.length; i++)
			GData.addColumn('number', Names[i]);
		for (var i = 0; i < Names.length; i++) {
			var s = new Array(Names.length + 1);
			for (var j = 0; j < Lines[i][0].length; j++) {
				s[0] = Lines[i][0][j];
				s[i + 1] = Lines[i][1][j];
				GData.addRow(s);
			}
		}
	}
	//console.log(Lines[0][0].length);
	return GData;
}

function SetStepChart() {
	if (GetXAxis(ValOf('Step_ST'), ValOf('Step_ET'), ValOf('Step_NOS'))) {
		y = [];
		for (var i = 0; i < x.length; i++) {
			if (x[i] < ValOf('Step_t_0'))
				y[i] = 0;
			else
				y[i] = 1;
			y[i] = ValOf('Step_A') * y[i] + ValOf('Step_O');
		}
		var data = GenerateDataForGraphs([[x, y]], ["Step"]);
		var chart = new google.visualization.LineChart(document.getElementById('StepChart'));
		options['vAxis']['title'] = 'Step, S0(t)';
		chart.draw(data, options);
	}
}

function SetSquareChart() {
	if (GetXAxis(ValOf('Square_ST'), ValOf('Square_ET'), ValOf('Square_NOS')) && ValOf('Square_f') > 0) {
		y = [];
		for (var i = 0; i < x.length; i++)
			y[i] = ValOf('Square_A') * Math.sign(Math.sin(2 * Math.PI * ValOf('Square_f') * x[i])) + ValOf('Square_O');
		var data = GenerateDataForGraphs([[x, y]], ["Square"]);
		var chart = new google.visualization.LineChart(document.getElementById('SquareChart'));
		options['vAxis']['title'] = 'Square, S1(t)';
		chart.draw(data, options);
	} else
		$.notify("inappropriate value for frequency.", "error");
}

function SetRectChart() {
	if (GetXAxis(ValOf('Rect_ST'), ValOf('Rect_ET'), ValOf('Rect_NOS')) && ValOf('Rect_f') > 0 && ValOf('Rect_D') >= 0 && ValOf('Rect_D') <= 1) {
		y = [];
		for (var i = 0; i < x.length; i++)
			y[i] = ValOf('Rect_A') * Math.sign(Math.sin(2 * Math.PI * ValOf('Rect_f') * (x[i] + 1.0 / (2 * ValOf('Rect_f')) * (0.5 - ValOf('Rect_D'))))
					 - Math.sin(Math.PI * (0.5 - ValOf('Rect_D')))) + ValOf('Rect_O');
		var data = GenerateDataForGraphs([[x, y]], ["Rectangular"]);
		var chart = new google.visualization.LineChart(document.getElementById('RectChart'));
		options['vAxis']['title'] = 'Rectangular, R(t)';
		chart.draw(data, options);
	} else
		$.notify("inappropriate value for frequency or duty cycle.", "error");
}

function SetSineChart() {
	if (GetXAxis(ValOf('Sine_ST'), ValOf('Sine_ET'), ValOf('Sine_NOS')) && ValOf('Sine_f') > 0) {
		y = [];
		for (var i = 0; i < x.length; i++)
			y[i] = ValOf('Sine_A') * Math.sin(2 * Math.PI * ValOf('Sine_f') * x[i]) + ValOf('Sine_O');
		var data = GenerateDataForGraphs([[x, y]], ["Sine"]);
		var chart = new google.visualization.LineChart(document.getElementById('SineChart'));
		options['vAxis']['title'] = 'Sine, S2(t)';
		chart.draw(data, options);
	} else
		$.notify("inappropriate value for frequency.", "error");
}

function SetSawtoothChart() {
	if (GetXAxis(ValOf('Sawtooth_ST'), ValOf('Sawtooth_ET'), ValOf('Sawtooth_NOS')) && ValOf('Sawtooth_f') > 0) {
		y = [];
		for (var i = 0; i < x.length; i++)
			y[i] = 2 * ValOf('Sawtooth_A') * (ValOf('Sawtooth_f') * (x[i] % (1.0 / ValOf('Sawtooth_f'))) - 0.5) + ValOf('Sawtooth_O');
		var data = GenerateDataForGraphs([[x, y]], ["Sawtooth"]);
		var chart = new google.visualization.LineChart(document.getElementById('SawtoothChart'));
		options['vAxis']['title'] = 'Sawtooth, S3(t)';
		chart.draw(data, options);
	} else
		$.notify("inappropriate value for frequency.", "error");
}

function SetTriangularChart() {
	if (GetXAxis(ValOf('Triangular_ST'), ValOf('Triangular_ET'), ValOf('Triangular_NOS')) && ValOf('Triangular_f') > 0) {
		y = [];
		for (var i = 0; i < x.length; i++)
			y[i] = 2 * ValOf('Triangular_A') / Math.PI * Math.asin(Math.sin(2 * Math.PI * ValOf('Triangular_f') * x[i])) + ValOf('Triangular_O');
		var data = GenerateDataForGraphs([[x, y]], ["Triangular"]);
		var chart = new google.visualization.LineChart(document.getElementById('TriangularChart'));
		options['vAxis']['title'] = 'Triangular, T(t)';
		chart.draw(data, options);
	} else
		$.notify("inappropriate value for frequency.", "error");
}
