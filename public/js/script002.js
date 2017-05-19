//console.log(z);
var x = [];
var alpha = 0.2;
var beta = 0.2;
var a;
var F_L = 100;
var F_U = 600;
var K_D = 5;
var K_R = 0.1;
var F_I = F_U - F_L;
var F_1 = F_L + alpha*F_I*Math.random();
var F_2 = (1-2*alpha)*F_I*Math.random();
var x_M = [];
var x_I = [];
var n;

$(document).ready(function () {
	$("#Next000").click(function () {
		Next000();
	});
	$("#FactorDeclaration").css("display", "none");
	$("#PerformExperiment").css("display", "none");
	$("#PerformBulkExperiment").css("display", "none");
	$("#BtnBulkCalculationsToClip").click(function () {
		PerformBulkCalcNSaveToClip()
	});
	$("#BtnBulkCalculationsToFile").click(function () {
		PerformBulkCalcNSaveToFile()
	});
	$("#BulkText").focusin(function () {
		$("#BulkText").select();
	});
	$("#NumOfFactors").focus();
	setFocusToText();
});
function Next000() {
	NumOfFactors = parseInt($('#NumOfFactors').val());
	n = parseInt($('#NumOfFactors').val());
	a = 1/n*0.95;
	$('#NumOfFactors').val(n);
	if (n > 0) {
		$("#NumOfFactors").prop('disabled', true);
		$("#Next000").text("Reset");
		$("#Next000").attr('onclick', '').unbind('click');
		$("#Next000").click(function () {
			ResetAll()
		});
		for (var i = 0; i < n; i++) {
			$("#FactorLimits").append("<div class='w3-col m4 l4 s4'><input id='FactorLabel" + i + "' class='w3-input w3-border w3-border-theme' type='text' value='Factor " + i + "'></div>");
			$("#FactorLimits").append("<div class='w3-col m4 l4 s4'><input id='FactorLLimit" + i + "' class='w3-input w3-border w3-border-theme w3-right-align' type='text' value='0'></div>");
			$("#FactorLimits").append("<div class='w3-col m4 l4 s4'><input id='FactorULimit" + i + "' class='w3-input w3-border w3-border-theme w3-right-align' type='text' value='100'></div>");
		}
		$("#FactorLimits").append("<button id='Next001' class='w3-button w3-theme w3-block w3-ripple'>Confirm limits</button>");
		$("#FactorDeclaration").css("display", "block");
		$("#Next001").click(function () {
			Next001()
		});
		setFocusToText();
	} else
		$.notify("Enter a positive integer. Number of factors cannot be less than 1.", "info");
}
function ResetAll() {
	if (confirm('This will reset the limits and the experiment.')) {
		ResetLimitsDeclarationAuthorized();
		$("#Next000").attr('onclick', '').unbind('click');
		$("#Next000").click(function () {
			Next000()
		});
		$("#NumOfFactors").prop('disabled', false);
		$("#Next000").text("Next");
		$("#FactorLimits").empty();
		$("#FactorDeclaration").css("display", "none");
	}
}
function Next001() {
	var ElementsCount = $("#FactorLimits").children().length;
	var x_L;
	var x_U;
	var AllGood = true;
	x_M = [];
	for (var i = 0; i < n; i++) {
		x_L = parseFloat($("#FactorLLimit" + i).val());
		x_U = parseFloat($("#FactorULimit" + i).val());
		$("#FactorLLimit" + i).val(x_L);
		$("#FactorULimit" + i).val(x_U);
		x_I[i] = x_U - x_L;
		if (x_I[i] > 0 && $("#FactorLabel" + i).val()) {
			x_M[i] = x_L + beta*x_I[i] + (1-2*beta)*x_I[i]*Math.random();
		} else {
			AllGood = false;
			$("#FactorLLimit" + i).focus();
			$("#FactorLLimit" + i).select();
			$.notify("Label cannot be balnk. Also, make sure the limits are numeric values, where the upper limit is grater than the lower limit.", "info");
			break;
		}
	}
	if (AllGood) {
		DisableTheLimitsDeclaration(true);
		$("#Next001").attr('onclick', '').unbind('click');
		$("#Next001").click(function () {
			ResetLimitsDeclaration()
		});
		$("#Next001").text("Modify factors/limits");
		for (var i = 0; i < n; i++) {
			$("#FactorValues").append("<div class='w3-col m6 l6 s6'><input class='w3-input w3-border w3-border-theme' type='text' value='" + $("#FactorLabel" + i).val() + "' disabled></div>");
			$("#FactorValues").append("<div class='w3-col m6 l6 s6'><input id='FValue" + i + "' class='w3-input w3-border w3-border-theme w3-right-align' type='text'></div>");
		}
		$("#FactorValues").append("<div class='w3-col m6 l6 s12'><button id='Next002' class='w3-button w3-theme w3-border w3-border-theme w3-block w3-ripple'>Calculate response</button></div>");
		$("#FactorValues").append("<div class='w3-col m6 l6 s12'><button id='Next003' class='w3-button w3-theme w3-border w3-border-theme w3-block w3-ripple'>Is optimum</button></div>");
		$("#FactorValues").append("<div class='w3-col m12 l12 s12'><input id='ResponseValue' class='w3-input w3-border w3-border-theme w3-center w3-xlarge' type='text' value='Press Calculate reponse button' disabled></div>");
		$("#PerformExperiment").css("display", "block");
		$("#PerformBulkExperiment").css("display", "block");
		$("#Next002").click(function () {
			Next002()
		});
		$("#Next003").click(function () {
			Next003()
		});
		F_1 = F_L + alpha*F_I*Math.random();
		F_2 = (1-2*alpha)*F_I*Math.random();
		setFocusToText();
	}

}
function ResetLimitsDeclaration() {
	if (confirm('This will reset the current experiment.')) {
		ResetLimitsDeclarationAuthorized()
	}
}
function ResetLimitsDeclarationAuthorized() {
	$("#Next001").attr('onclick', '').unbind('click');
	$("#Next001").click(function () {
		Next001()
	});
	$("#Next001").text("Confirm limits");
	DisableTheLimitsDeclaration(false);
	$("#FactorValues").empty();
	$("#PerformExperiment").css("display", "none");
	$("#PerformBulkExperiment").css("display", "none");
}
function DisableTheLimitsDeclaration(Disable) {
	for (var i = 0; i < n; i++) {
		$("#FactorLabel" + i).prop('disabled', Disable);
		$("#FactorLLimit" + i).prop('disabled', Disable);
		$("#FactorULimit" + i).prop('disabled', Disable);
	}
}
function Next002() {
	//Validate input values
	var AllGood = AreInputValuesValidForX();
	if (AllGood) {
		Y = GetTheYValue();
		$("#ResponseValue").val("Response= " + Y);
		copyTextToClipboard(Y);
		$.notify("Response copied to the clipboard.", "success");
	}
}
function GetTheYValue() {
	var Sigma_z = 0
	var F = 0;
	var z = [];
	for (var i = 0; i < n; i++) {
		z[i] = K_D*(x[i] - x_M[i])/x_I[i];
		Sigma_z = Sigma_z + z[i];
	}
	F = F_1;
	for (var i = 0; i < n; i++) {
		F = F + F_2*Math.exp(-(Math.pow(z[i] + a*Math.sin(Sigma_z), 2))) / n;
	}
	F = F + F_2/n * K_R * 2 * (Math.random() - 0.5);
	//console.log(z);
	return F
}
function Next003() {
	var error = 0;
	var x_L;
	var x_U;
	var AllGood = AreInputValuesValidForX();
	if (AllGood) {
		for (var i = 0; i < n; i++) {
			x_L = parseFloat($("#FactorLLimit" + i).val());
			x_U = parseFloat($("#FactorULimit" + i).val());
			error = error + Math.abs(x[i] - x_M[i]) / x_I[i];
		}
		error = error / n;
		$("#ResponseValue").val("Your input is " + error * 100 + "% away from the optimum value.");
	}
}
function AreInputValuesValidForX() {
	var AllGood = true;
	x = [];
	var x_L;
	var x_U;
	for (var i = 0; i < n; i++) {
		x[i] = parseFloat($("#FValue" + i).val());
		$("#FValue" + i).val(x[i]);
		x_L = parseFloat($("#FactorLLimit" + i).val());
		x_U = parseFloat($("#FactorULimit" + i).val());
		if (x[i] < x_L || x[i] > x_U) {
			AllGood = false;
			$("#FValue" + i).focus();
			$("#FValue" + i).select();
			$.notify("Enter a value with in the upper and lower limits.", "info");
			break;
		}
	}
	return AllGood;
}
function PerformBulkCalc() {
	var Lines;
	var InputVars;
	var YOutPut = "";
	var FoundLimitError;
	var x_L;
	var x_U;
	Lines = $("#BulkText").val().split('\n');
	for (var i = 0; i < Lines.length; i++) {
		InputVars = Lines[i].split('\t');
		if (InputVars.length == n) {
			FoundLimitError = false;
			for (var j = 0; j < InputVars.length; j++) {
				x[j] = parseFloat(InputVars[j]);
				x_L = parseFloat($("#FactorLLimit" + j).val());
				x_U = parseFloat($("#FactorULimit" + j).val());
				if (x[j] < x_L || x[j] > x_U) {
					if (!FoundLimitError) {
						YOutPut += 'NaN\t Error(s):';
						FoundLimitError = true;
					}
					YOutPut += ' \"' + $("#FactorLabel" + j).val() + '\" is out of limit;';
				}
			}
			if (!FoundLimitError) {
				YOutPut += GetTheYValue() + '\tGood';
			}
			YOutPut += '\n';
		} else
			YOutPut += 'NaN\tError(s): Number of factors do not match\n';
	}
	return YOutPut;
}

function PerformBulkCalcNSaveToClip() {
	var YOutPut = PerformBulkCalc();
	copyTextToClipboard(YOutPut);
	$.notify("Results/response to the bulk experiments are copied to the clipboard.", "success");
}

function PerformBulkCalcNSaveToFile() {
	var YOutPut = PerformBulkCalc();
	download('response.txt', YOutPut);
	$.notify("A file will be downloaded shortly with the results/response.", "success");
}

function setFocusToText() {
	$("input[type='text']").focusin(function () {
		$(this).select();
	});
}
