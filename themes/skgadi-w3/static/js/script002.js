var Period = [];
var maxPoint = [];
var NumOfFactors;
var MaximumValueLimit;
var x = [];
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
	$('#NumOfFactors').val(NumOfFactors);
	if (NumOfFactors > 0) {
		$("#NumOfFactors").prop('disabled', true);
		$("#Next000").text("Reset");
		$("#Next000").attr('onclick', '').unbind('click');
		$("#Next000").click(function () {
			ResetAll()
		});
		for (var i = 0; i < NumOfFactors; i++) {
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
	var LLimit;
	var ULimit;
	var AllGood = true;
	var maxRange = 0.7;
	Period = [];
	maxPoint = [];
	for (var i = 0; i < NumOfFactors; i++) {
		LLimit = parseFloat($("#FactorLLimit" + i).val());
		ULimit = parseFloat($("#FactorULimit" + i).val());
		$("#FactorLLimit" + i).val(LLimit);
		$("#FactorULimit" + i).val(ULimit);
		Period[i] = ULimit - LLimit;
		if (Period[i] > 0 && $("#FactorLabel" + i).val())
			maxPoint[i] = LLimit + Period[i] * (maxRange) * Math.random() + Period[i] * (1 - maxRange) / 2;
		else {
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
		for (var i = 0; i < NumOfFactors; i++) {
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
		MaximumValueLimit = 100 + 600 * Math.random();
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
	for (var i = 0; i < NumOfFactors; i++) {
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
	var Y = 0;
	var sigmoidVal;
	for (var i = 0; i < NumOfFactors; i++) {
		sigmoidVal = 1 / (1 + Math.exp(3 / Period[i] * (-x[i] + maxPoint[i])));
		Y = Y + MaximumValueLimit / NumOfFactors * (4 * sigmoidVal * (1 - sigmoidVal) + 0.01 * 2 * (Math.random() - 0.5));
	}
	return Y
}
function Next003() {
	var error = 0;
	var LLimit;
	var ULimit;
	var AllGood = AreInputValuesValidForX();
	if (AllGood) {
		for (var i = 0; i < NumOfFactors; i++) {
			LLimit = parseFloat($("#FactorLLimit" + i).val());
			ULimit = parseFloat($("#FactorULimit" + i).val());
			error = error + Math.abs((x[i] - maxPoint[i]) / (ULimit - LLimit));
		}
		error = error / NumOfFactors;
		$("#ResponseValue").val("Your input is " + error * 100 + "% away from the optimum value.");
	}
}
function AreInputValuesValidForX() {
	var AllGood = true;
	x = [];
	var LLimit;
	var ULimit;
	for (var i = 0; i < NumOfFactors; i++) {
		x[i] = parseFloat($("#FValue" + i).val());
		$("#FValue" + i).val(x[i]);
		LLimit = parseFloat($("#FactorLLimit" + i).val());
		ULimit = parseFloat($("#FactorULimit" + i).val());
		if (x[i] < LLimit || x[i] > ULimit) {
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
	Lines = $("#BulkText").val().split('\n');
	for (var i = 0; i < Lines.length; i++) {
		InputVars = Lines[i].split('\t');
		if (InputVars.length == NumOfFactors) {
			FoundLimitError = false;
			for (var j = 0; j < InputVars.length; j++) {
				x[j] = parseFloat(InputVars[j]);
				LLimit = parseFloat($("#FactorLLimit" + j).val());
				ULimit = parseFloat($("#FactorULimit" + j).val());
				if (x[j] < LLimit || x[j] > ULimit) {
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
