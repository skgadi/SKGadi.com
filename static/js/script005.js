var x_in; // Data from UTM
var y_in;
var x_0; // Data from UTM after preprocessing
var y_0;
var x_1; // Engineering stress strain curve
var y_1;
var x_2; // Real/True stress strain curve
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
var isChartsReady=false;
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(ChartsReady);

var MaxRealCurve;
var P_Max;
var X; //Specific offset

function ChartsReady() {
	isChartsReady = true;
}

$( document ).ready(function() {
	ConfigureMathJax();
});

function ConfigureMathJax() {
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
	MathJax.Hub.Register.StartupHook("End",function () {
			ResetView();
			$("#InText").focusin(function () {
				$("#InText").select();
			});
	});
}

function PerformCalculations() {
	if (isChartsReady) {
	SetViewAsCalculating();
	setTimeout(function(){
		if (PrepareDataForCharts()) {
			//MakeCharts();
			SetViewAsCalculated();
			//GenerateCharts(document, 0);
			$.notify("Processed the information successfully.\nPlease wait for the graphs to load.\nIt may take few seconds for you to access the browser.", "success");
		} else {
			$.notify("Error in the input text, unable to process.", "error");
			ResetView();
		}
	}, 0);
	} else $.notify("Charts libraries are loading, please wait. If it is taking longer than expected, please verify your network connection.", "error");
}

function Reset() {
	if (confirm('You selected to rest the application. All the data will be lost.\n\nAre you sure?'))
		ResetView();
}

function ResetView() {
	$("#InText").val("");
	$(".ProgressBar").css('display', 'none');
	$(".UserInput").css('display', 'block');
	$(".Report").css('display', 'none');
	$(".HideWhenLoaded").css('display', 'none');
	$(".UserInputItem0").prop('disabled', false);
	$(".UserInputItem1").prop('disabled', true);
	$(".UserInputItem2").css('display', 'none');
	//$("html, body").delay(2000).animate({scrollTop: $('#UserInputDiv').offset().top - 60}, "slow");
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
	$(".UserInputItem2").css('display', 'block');
	$('#UTM_Brand').focus().select();
	//$("html, body").delay(2000).animate({scrollTop: $('#GenReportDiv').offset().top - 60}, "slow");
}

function GenerateCharts(ForDocument, chartWidth) {
	var chart;
	var data;
	chart = new google.visualization.LineChart(ForDocument.getElementById('ChartDiv_0'));
	data = GenerateDataForGraphs([[x_0, y_0]], ["P"]);
	chart.draw(data, GetProperties("Elongation in millimeter", "Force in newtons", 500, chartWidth));
	chart = new google.visualization.LineChart(ForDocument.getElementById('ChartDiv_1'));
	data = GenerateDataForGraphs([[x_1, y_1], [x_2, y_2], [x_3, y_3], [x_4, y_4]], ["Engineering curve", "Real/True curve", "Stress 3", "Stress 4"]);
	chart.draw(data, GetProperties("Strain in meter/meter", "Stress in megapascal", 500, chartWidth));
	chart = new google.visualization.LineChart(ForDocument.getElementById('ChartDiv_2'));
	data = GenerateDataForGraphs([[x_5, y_5], [x_6, y_6]], ["Stress 1", "Stress 2"]);
	chart.draw(data, GetProperties("Strain", "Stress", 500, chartWidth));
}
function GetProperties (xLabel, yLabel, CHeight, CWidth) {
	if (CWidth==0) {
		return {
			height: CHeight,
			curveType: 'function',
			curveType: 'function',
			fontName: "Times",
			hAxis: {
			  title: xLabel,
			  format: 'decimal'
			},
			vAxis: {
			  title: yLabel
			},
			legend: { position: 'right' }
		};		
	} else return {
			height: CHeight,
			width: CWidth,
			'chartArea':{left: 125,top: 30, right: 150, bottom: 50},
			curveType: 'function',
			fontName: "Times",
			hAxis: {
			  title: xLabel,
			  format: 'decimal'
			},
			vAxis: {
			  title: yLabel
			},
			legend: { position: 'right' }
		};
}
function GenerateDataForGraphs (Lines, Names) {
	var data = new google.visualization.DataTable();
	data.addColumn('number', "xAxis");
	if (Names.length == Lines.length) {
		for (var i=0; i< Names.length; i++)
			data.addColumn('number', Names[i]);
		for (var i=0; i< Names.length; i++) {
			var s = new Array(Names.length + 1);
			for (var j=0; j< Lines[i][0].length; j++) {
				s[0] = Lines[i][0][j];
				s[i+1] = Lines[i][1][j];
				data.addRow(s);
			}
		}
	}
	//console.log(Lines[0][0].length);
	return data;
}
function AddLineData (ExistingData, NewLine, Name){
	var result;
	if (ExistingData.length == 0) {
		result = [];
		result[0] = new Array(1);
		result[0][0] = Name;
		for ( var i = 0; i < NewLine.length; i++ ) {
			result[i+1] = new Array(1);
			result[i+1][0] = NewLine[i];	
		}
	} else {
		result = ExistingData;
		result[0][ExistingData[0].length] = Name;
		for ( var i = 0; i < NewLine.length; i++ ) {
			result[i+1][ExistingData[0].length-1] = NewLine[i];	
		}
	}
	return result;
}

function PreprocessingData () {
	Lines = $("#InText").val().split('\n');
	x_in = [];
	y_in = [];
	var TempX_0;
	var TempY_0;
	var TempIndex=0;
	P_Max = 0;
	for (var i = 0; i < Lines.length; i++) {
		InputVars = Lines[i].split('\t');
		TempX_0 = parseFloat(InputVars[0]);
		TempY_0 = parseFloat(InputVars[1]);
		if (!isNaN(TempX_0) && !isNaN(TempY_0)) {
			x_in[TempIndex] = TempX_0;
			y_in[TempIndex] = TempY_0;
			TempIndex++;
		}
		P_Max = (TempY_0>P_Max)?TempY_0:P_Max;
	}
	x_0 = [];
	y_0 = [];
	TempIndex=0;
	var TempSum;
	var TempCount;
	var Offset_x = 0;
	var Offset_y = 0;
	for (var i = 0; i < x_in.length;) {
		TempSum = 0;
		TempCount = 0;
		for (var j = 0; j <x_in.length; j++) {
			if ( x_in[i+j] == x_in[i] ) {
				TempSum += y_in[i+j];
				TempCount++;
			}else
				break;
		}
		/*console.log("Temp Count="+ TempCount);
		console.log("i="+ i);*/
		if (TempIndex == 0){
			Offset_x = x_in[i]
			Offset_y = TempSum/TempCount;
		}
		x_0[TempIndex] = x_in[i] - Offset_x;
		y_0[TempIndex] = TempSum/TempCount - Offset_y;
		TempIndex++;
		i = i+ TempCount;
	}
	n=x_0.length;
}

function PrepareDataForCharts () {
	A_0 = parseFloat($( "#A_0").val());
	L_0 = parseFloat($( "#L_0").val());
	X = parseFloat($( "#X").val());
	RSquaredTestForSize = parseFloat($( "#RSquaredTestForSize").val());
	if (isNaN(A_0)) $( "#A_0").val(A_0 = 30.7483);
	if (isNaN(L_0)) $( "#L_0").val(L_0 = 25.4);
	if (isNaN(X)) $( "#X").val(X = 0.2);
	if (isNaN(RSquaredTestForSize)) $( "#RSquaredTestForSize").val(RSquaredTestForSize = 100);
	
	PreprocessingData();
	//Tobetested settings
	RSquaredTestForSize = Math.round(n/3);
	
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
	//Find the exact point of linear relationship
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
	//console.log(TempData);
	MaxRealCurve = ss.max(y_2);
	TempVars = regression('linearThroughOrigin', TempData);
	ProportinalLineParameters = ss.linearRegressionLine({m: TempVars.equation, b:0});
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
	PercentDot2Value = X/100.0;//offset;
	for (var i=0; i<x_3.length; i++) {
		x_4[i] = x_3[i] + PercentDot2Value;
		y_4[i] = y_3[i];//TempResult(x_3[i]);
	}
	for (var i=1; i<n; i++) {
		if (
			(y_2[i-1] >= ProportinalLineParameters(x_2[i-1]-PercentDot2Value))
			&&
			(y_2[i] <= ProportinalLineParameters(x_2[i]-PercentDot2Value))
		) {
			console.log("Found a intersection point");
			FindIntersectionPoint(
				[[x_2[i-1], ProportinalLineParameters(x_2[i-1]-PercentDot2Value)],
				[x_2[i], ProportinalLineParameters(x_2[i]-PercentDot2Value)]],
				[[x_2[i-1], y_2[i-1]],
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
	var CurveDataRegression = regression('polynomial', CurveData, 1);
	//console.log(LineDataRegression);
	//console.log(CurveDataRegression);
	Temp_A = LineDataRegression.equation[1];
	Temp_B = LineDataRegression.equation[0];
	Temp_C = CurveDataRegression.equation[1];
	Temp_D = CurveDataRegression.equation[0];
	//Temp_E = CurveDataRegression.equation[0];
	IntersectionPoint[0] = (Temp_D - Temp_B)/(Temp_A - Temp_C);
	IntersectionPoint[1] = ProportinalLineParameters(IntersectionPoint[0]-PercentDot2Value);
}

function LoadSampleData(sample) {
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
	//mywindow = PrintElem('curve_chart', [],[]);
	
	$('#CompleteReport').html('\
		<div class="ShowWhenLoading"><p>Generating report ...</p><p>If it takes more than 1 minute, close this window and try again.</p></div>\
		<div class="HideWhenLoading" style="display: none">\
		<h1>Stress strain analysis report</h1>\
		<p>This report analyze the data obtained from a Universal Testing Machine (UTM) to extract the following information.</p>\
		<ul><li>Engineering curve</li><li>Real/true curve</li><li></li><li></li></ul>\
		<p>In the next section a figure is plotted with the information obtained from the UTM. The later section provides engineering and real curves along with the proportionality line and the specific offset.</p>\
		<h2>1. Data obtained from the Universal Testing Machine (UTM)</h2>\
		<p>A specimen of an initial area $A_0 = '+A_0+'~\\mbox{mm}^2$ and initial length $L_0 = '+L_0+'~\\mbox{mm}$ is put under a '+$("#TestType").val().toLowerCase()+' stress with the help of a <b>'+$("#UTM_Brand").val()+'\'s '+$("#UTM_Model").val()+'</b> Universal Testing Machine (UTM) with the serial number <b>'+$("#UTM_SerialNo").val()+'</b>. Figure 1 shows the relation between the load, $P$, applied on the specimen and its change in longitude, $\\delta$, which are the data obtained from the UTM. The maximum load applied on the specimen is $P_{M}='+P_Max+'~\\mbox{N}$.<\p>\
		<div style="text-align:center; width: 100%;">\
		<div id="ChartDiv_0" style="display: inline-block;"></div>\
		<p class="Figure">Figure 1: `P` vs `\\delta` obtained from the UTM.</p></div>\
		<h2>2. Engineering and true curve</h2>\
		<p>The engineering stress-strain curve is shown by the first curve of Figure 2, which plots $$\\sigma_E :=\\frac{P}{A_0}\\mbox{ and }\\epsilon_E:=\\frac{\\delta}{L_0}.$$ This figure also shows the real or true stress-strain curve which is obtained by $$\\epsilon_T := \\ln{\\left( 1 + \\epsilon_E \\right)} \\mbox{ and } \\sigma_T := \\sigma_E \\left( 1 + \\epsilon_E \\right).$$</p>\
		<div style="text-align:center; width: 100%;">\
		<div id="ChartDiv_1" style="display: inline-block;"></div>\
		<p class="Figure">Figure 2: Engineering, and real curves along with the slope .</p>\
		</div>\
		<p>The Young\'s modulus, $E = '+Math.round(ProportinalLineParameters(1)*1000)/1000+'~\\mbox{MPa}$, the ultimate stress, $\\sigma_U = '+Math.round(MaxRealCurve*1000)/1000+'~\\mbox{MPa}$, the fracture strain, $\\sigma_F = '+Math.round(y_2[n-1]*1000)/1000+'~\\mbox{MPa}$, the yield point, ($'+Math.round(x_2[LinearUpto]*1000)/1000+', '+Math.round(y_2[LinearUpto]*1000)/1000+'$), the offset yeild point, ($'+Math.round(IntersectionPoint[0]*1000)/1000+', '+Math.round(IntersectionPoint[1]*1000)/1000+'$), the modulus of resiliance, $U_r = '+Math.round(x_2[LinearUpto]*y_2[LinearUpto]/2*1000)/1000+'~\\mbox{MPa}$ are obtained from the Figure 2.</p>\
		<div style="margin: 200;"></div>\
		<div id="ChartDiv_2"></div>\
		<div id="IMGDIV" style="width: 750px; height:500px"><img id="IMG000" style="width: 100%;"/><canvas id="ReportCanvas001"></canvas></div>\
		</div>\
	');
	//ReportCanvas001 = PrepareChart002("ReportCanvas001");
	mywindow = PrintElem('CompleteReport', [
		'/css/report-print.css'
		], [
		'https://code.jquery.com/jquery-3.3.1.slim.min.js'
		]);
	$(mywindow).bind('load', function(){
		setTimeout(function(){
			GenerateCharts(mywindow.document, 750);
			var head = mywindow.document.getElementsByTagName("head")[0], script;
			script = mywindow.document.createElement("script");
			script.type = "text/x-mathjax-config";
			script[(mywindow.opera ? "innerHTML" : "text")] = "\
			MathJax.Hub.Config({\n\
			  tex2jax: { inlineMath: [['$','$'], ['\\\\(','\\\\)']] },\n\
			  jax: ['input/TeX','output/HTML-CSS'],\
			});\
			MathJax.Hub.Register.StartupHook('End',function () {\
				$('.ShowWhenLoading').css('display', 'none');\
				$('.HideWhenLoading').css('display', 'block');\
			});\
			";
			head.appendChild(script);
			script = mywindow.document.createElement("script");
			script.type = "text/javascript";
			script.src  = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/latest.js?config=TeX-MML-AM_CHTML";
			head.appendChild(script);
			mywindow.moveTo(0, 0);
			mywindow.resizeTo(screen.width, screen.height);

			//mywindow.print();
			//mywindow.close();			
		}, 1000);

	})
}