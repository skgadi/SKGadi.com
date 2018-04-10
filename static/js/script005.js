var x_0; // Data from UTM
var y_0;
var x_1; // Engineering stress strain curve
var y_1;
var x_2; // Real stress strain curve
var y_2;
var x_3; // LinearRange curve
var y_3;
var x_4; // %0.2 line
var y_4;
var x_5; // Ln curve
var y_5;
var x_6; // line approx of Ln Curve
var y_6;

var n;
var A_0;
var L_0;
var Chart_0;
var Chart_1;
var Chart_2;
var TempData;
var TempVars;
var TempResult;
var RSquaredTestForSize=25;
var RSquaredHistory;
var RSquaredHistorySize;
var LinearUpto=0;
var PercentDot2Value=0;
var Data_0, Data_1, Data_2, Data_3, Data_4, Data_5;
var IntersectionPoint;
var IntersectionPointIndex;
var ProportinalLineParameters;

$( document ).ready(function() {
	ResetView();
	$("#InText").focusin(function () {
		$("#InText").select();
	});
	//Chart.defaults.global.defaultColor = 'rgba(0,0,0,0.1)';
	Chart.defaults.global.defaultFontColor = '#000';
	//Chart.defaults.scale.gridLines.color = "#000";
});

function PerformCalculations() {
	SetViewAsCalculating();
	setTimeout(function(){
		if (PrepareDataForCharts()) {
			MakeCharts();
			SetViewAsCalculated();
			$.notify("Processed the information successfully", "success");
		} else {
			$.notify("Error in the input text, unable to process.", "error");
			ResetView();
		}
	}, 0);
}

function Reset() {
	if (confirm('You selected to rest the application. All the data will be lost.\n\nAre you sure?'))
		ResetView();
}

function ResetView() {
	$("#InText").val("Copy the two columns (Load and Elongation) from an excel sheet and paste it here.");
	$(".ProgressBar").css('display', 'none');
	$(".UserInput").css('display', 'block');
	$(".Report").css('display', 'none');
	$(".HideWhenLoaded").css('display', 'none');
	$(".UserInputItem0").prop('disabled', false);
	$(".UserInputItem1").prop('disabled', true);
	$("html, body").delay(2000).animate({scrollTop: $('#UserInputDiv').offset().top - 60}, "slow");
	$('#InText').focus().select();
	//$("html, body").animate({ scrollTop: 0 }, "slow");
}

function SetViewAsCalculating() {
	$(".ProgressBar").css('display', 'block');
	$(".UserInput").css('display', 'none');
	$(".Report").css('display', 'none');
}

function SetViewAsCalculated() {
	$(".ProgressBar").css('display', 'none');
	$(".UserInput").css('display', 'block');
	$(".Report").css('display', 'block');
	$(".UserInputItem0").prop('disabled', true);
	$(".UserInputItem1").prop('disabled', false);
	$("html, body").delay(2000).animate({scrollTop: $('#Chart0Div').offset().top - 60}, "slow");
}

function MakeCharts() {
	Data_0 = CombineToChartData (x_0, y_0);
	Data_1 = CombineToChartData (x_1, y_1);
	Data_2 = CombineToChartData (x_2, y_2);
	Data_3 = CombineToChartData (x_3, y_3);
	Data_4 = CombineToChartData (x_4, y_4);
	Data_5 = CombineToChartData (x_5, y_5);
	Data_6 = CombineToChartData (x_6, y_6);
	Point_0 = CombineToChartData ([IntersectionPoint[0]], [IntersectionPoint[1]]);
	Chart_0 = new Chart(document.getElementById("Chart_0").getContext('2d'), {
		type: 'scatter',
		data: {
			datasets: [{
				label: 'Data obtained from the UTM',
				"borderColor":"rgb(0, 148, 135)",
				showLine: true,
				fill: false,
				data: Data_0
			}]
		},
		options: {
			animation: false,
			elements: {
				point: {
					radius: 0
				}
			},
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Stress'
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Strain'
					}
				}]
			}     
		}
    });
	Chart_1 = new Chart(document.getElementById("Chart_1").getContext('2d'), {
		type: 'scatter',
		data: {
			datasets: [{
				label: 'Engineering curve',
				"borderColor":"rgb(0, 148, 135)",
				showLine: true,
				fill: false,
				data: Data_1
			},{
				label: 'Real curve',
				"borderColor":"rgb(255, 101, 80)",
				showLine: true,
				fill: false,
				data: Data_2
			},{
				label: 'Proportional line',
				"borderColor":"rgb(200, 200, 200)",
				showLine: true,
				fill: false,
				//borderDash: [4, 2],
				borderWidth: 1,
				data: Data_3
			},{
				label: '0.2% offset of the proportional line',
				"borderColor":"rgb(0, 132, 255)",
				showLine: true,
				fill: false,
				//borderDash: [4, 2],
				borderWidth: 1,
				data: Data_4
			},{
				label: 'IntersectionPoint',
				"borderColor":"rgb(0, 132, 255)",
				showLine: true,
				fill: false,
				pointBackgroundColor: "rgb(255, 101, 80)",
				//borderDash: [4, 2],
				borderWidth: 2,
				radius: 5,
				data: Point_0
			}]
		},
		options: {
			scaleFontColor: "#000000",
			animation: false,
			elements: {
				point: {
					radius: 0
				}
			},
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Normalized Stress'
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Normalized Strain'
					}
				}]
			}     
		}
    });
	Chart_2 = PrepareChart002(document.getElementById("Chart_2"))
}

function PrepareChart002 (Canvas) {
	return new Chart(Canvas.getContext('2d'), {
		type: 'scatter',
		data: {
			datasets: [{
				label: 'Selected region of the real curve',
				"borderColor":"rgb(0, 148, 135)",
				showLine: true,
				fill: false,
				data: Data_5
			},{
				label: 'Line approximation of the selected region of the real curve',
				"borderColor":"rgb(255, 101, 80)",
				showLine: true,
				fill: false,
				data: Data_6
			}]
		},
		options: {
			animation: false,
			elements: {
				point: {
					radius: 0
				}
			},
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'ln(Normalized Stress)'
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'ln(Normalized Strain)'
					}
				}]
			}     
		}
    });
}

function CombineToChartData (x, y) {
		return x.map((x, i) => {
		return {
			x: x,
			y: y[i]
		};
	});
}

function PrepareDataForCharts () {
	A_0 = parseFloat($( "#A_0").val(), 10);
	L_0 = parseFloat($( "#L_0").val(), 10);
	RSquaredTestForSize = parseFloat($( "#RSquaredTestForSize").val(), 10);
	if (isNaN(A_0)) $( "#A_0").val(A_0 = 30.7483);
	if (isNaN(L_0)) $( "#L_0").val(L_0 = 25.4);
	if (isNaN(RSquaredTestForSize)) $( "#RSquaredTestForSize").val(RSquaredTestForSize = 100);
	
	Lines = $("#InText").val().split('\n');
	x_0 = [];
	y_0 = [];
	var TempX_0;
	var TempY_0;
	var TempIndex=0;
	for (var i = 0; i < Lines.length; i++) {
		InputVars = Lines[i].split('\t');
		TempX_0 = parseFloat(InputVars[0]);
		TempY_0 = parseFloat(InputVars[1]);
		if (!isNaN(TempX_0) && !isNaN(TempY_0)) {
			x_0[TempIndex] = TempX_0;
			y_0[TempIndex] = TempY_0;
			TempIndex++;
		}
	}
	n=x_0.length;
	if ((n<=RSquaredTestForSize) && (RSquaredTestForSize>1)) return false;
	x_1 = new Array(n);
	y_1 = new Array(n);
	x_2 = new Array(n);
	y_2 = new Array(n);
	RSquaredHistory = [];
	for (var i = 0; i < n; i++) {
		x_1[i] = x_0[i]/L_0;
		y_1[i] = y_0[i]/A_0;
		x_2[i] = Math.log(1+x_1[i]);
		y_2[i] = y_1[i]*(1+x_1[i]);
	}
	FindingLinearRegion:
	for (var i=0; i<n; i++) {
		TempData = new Array(i);
		for (var j=0; j<i; j++) {
			TempData[j] = new Array(2);
			TempData[j][0] = x_2[j];
			TempData[j][1] = y_2[j];
		}
		/*TempVars = ss.linearRegression(TempData);
		TempResult = ss.linearRegressionLine(TempVars);*/
		TempVars = regression('linearThroughOrigin', TempData);
		TempResult = ss.linearRegressionLine({m: TempVars.equation, b:0});
		RSquaredHistory.push(ss.rSquared(TempData, TempResult));
		if (i>RSquaredTestForSize) {
			var SetBreak = true;
			for (var k=0; k<RSquaredTestForSize; k++) {
				if ((i-k) >0) {
					if (RSquaredHistory[i-k] >= RSquaredHistory[i-k-1])
						SetBreak = false;
				}
			}
		}
		if (SetBreak==true)
			break FindingLinearRegion;
	}
	//Find the exact point of linear
	RSquaredHistorySize = RSquaredHistory.length;
	if (RSquaredHistorySize > RSquaredTestForSize) {
		for (var i=0; i<RSquaredTestForSize; i++) {
			if (RSquaredHistory[RSquaredHistorySize-i-1]>RSquaredHistory[RSquaredHistorySize-i])
				LinearUpto = RSquaredHistorySize-i-1;
		}
	}
	TempData = new Array(LinearUpto+1);
	for (var i=0; i<=LinearUpto; i++) {
		TempData[i] = new Array(2);
		TempData[i][0] = x_2[i];
		TempData[i][1] = y_2[i];
	}
	var MaxRealCurve = ss.max(y_2);
	TempVars = ss.linearRegression(TempData);
	ProportinalLineParameters = ss.linearRegressionLine(TempVars);
	x_3 = [];
	y_3 = [];
	x_3[0] = 0;
	y_3[0] = 0;
	for (var i=0; i<n; i++) {
		if (ProportinalLineParameters(x_2[i]) > 1.1*MaxRealCurve) {
			x_3[1] = x_2[i];
			y_3[1] = ProportinalLineParameters(x_3[1]);
			break;
		}
	}
	/*for (var i=0; i<n; i++) {
		x_3[i] = x_2[i];
		y_3[i] = TempResult(x_3[i]);
		if (y_3[i]>1.1*MaxRealCurve)
			break;
	}*/
	x_4 = [];
	y_4 = [];
	PercentDot2Value = 0.002;//*ss.max(x_2);
	for (var i=0; i<x_3.length; i++) {
		x_4[i] = x_3[i] + PercentDot2Value;
		y_4[i] = y_3[i];//TempResult(x_3[i]);
	}
	for (var i=1; i<n; i++) {
		if (
			(y_2[i-1] <= ProportinalLineParameters(x_2[i]-PercentDot2Value))
			&&
			(y_2[i] >= ProportinalLineParameters(x_2[i]-PercentDot2Value))
		) { 
			FindIntersectionPoint(
				[[x_2[i-1], ProportinalLineParameters(x_2[i-1]-PercentDot2Value)],
				[x_2[i], ProportinalLineParameters(x_2[i]-PercentDot2Value)]],
				[[x_2[i-2], y_2[i-2]],
				[x_2[i-1], y_2[i-1]],
				[x_2[i], y_2[i]]]
			);
			IntersectionPointIndex = i;
			break;
		}
	}
	TempIndex=0;
	x_5 = [];
	y_5 = [];
	for (var i=IntersectionPointIndex; i<n; i++) {
		x_5[TempIndex] = Math.log(x_2[i]);
		y_5[TempIndex] = Math.log(y_2[i]);
		if (y_2[i]==MaxRealCurve) break;
		TempIndex++;
	}
	
	TempData = new Array(x_5.length);
	for (var i=0; i<x_5.length; i++) {
		TempData[i] = new Array(2);
		TempData[i][0] = x_5[i];
		TempData[i][1] = y_5[i];
	}
	TempVars = ss.linearRegression(TempData);
	TempResult = ss.linearRegressionLine(TempVars);
	x_6 = new Array(2);
	y_6 = new Array(2);
	x_6[0] = x_5[0];
	y_6[0] = TempResult(x_6[0]);
	x_6[1] = (1+0.1*Math.sign(x_5[x_5.length-1]))*x_5[x_5.length-1];
	y_6[1] = TempResult(x_6[1]);
	return true;
}

function FindIntersectionPoint (LineData, CurveData) {
	IntersectionPoint = [];
	var LineDataRegression = regression('polynomial', LineData, 1);
	var CurveDataRegression = regression('polynomial', CurveData, 2);
	Temp_A = LineDataRegression.equation[1];
	Temp_B = LineDataRegression.equation[0];
	Temp_C = CurveDataRegression.equation[2];
	Temp_D = CurveDataRegression.equation[1];
	Temp_E = CurveDataRegression.equation[0];
	TempDescriminate = Math.sqrt (Math.pow(Temp_D-Temp_A, 2) - 4*Temp_C*(Temp_E-Temp_B));
	TempIntersectionPointX1 = ( (Temp_A - Temp_D) - TempDescriminate)/(2*Temp_C);
	TempIntersectionPointX2 = ( (Temp_A - Temp_D) + TempDescriminate)/(2*Temp_C);
	if (Math.abs(LineData[0][0]-TempIntersectionPointX1) < (Math.abs(LineData[0][0]-TempIntersectionPointX2)))
		IntersectionPoint[0] = TempIntersectionPointX1;
	else IntersectionPoint[0] = TempIntersectionPointX2;
	IntersectionPoint[1] = ProportinalLineParameters(IntersectionPoint[0]-PercentDot2Value);
}

function LoadSampleData(sample) {
	//$.notify("Please wait while the data is being loaded ...", "info");
	$.ajax({
            url : "../../misc/sample-utm-data00"+sample+".txt",
            dataType: "text",
            success : function (data) {
                $("#InText").val(data);
				$.notify("Data successfully loaded", "success");
            }
        });
	$('#GenerateBtn').focus();
}

function GenerateReport(Language) {
	$('#CompleteReport').html('\
	<h1>Complete report</h1>\
	<p>When `a != 0`, there are two solutions to `ax^2 + bx + c = 0` and \
	they are</p>\
	<p style="text-align:center">\
  `x = (-b +- sqrt(b^2-4ac))/(2a) .`\
</p>\
<div style="width: 750px; height:500px"><canvas id="ReportCanvas001"></canvas></div>\
	');
	//ReportCanvas001 = PrepareChart002("ReportCanvas001");
	mywindow = PrintElem('CompleteReport', [
		'/css/report.css'
		], [
		'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/latest.js?config=TeX-MML-AM_CHTML'
		]);
	$(mywindow).bind('load', function(){
		setTimeout(function(){
			mywindow.focus();
			PrepareChart002(mywindow.document.getElementById("ReportCanvas001"));
			//mywindow.document.getElementById("ReportCanvas001")..width = 400;
			mywindow.print();
			//mywindow.close();			
		}, 1000);

	})
}

