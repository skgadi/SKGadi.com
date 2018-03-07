var Stress;
var Strain;
var n;
var Chart0;

$( document ).ready(function() {
	ResetView();
	$("#InText").focusin(function () {
		$("#InText").select();
	});
    console.log( "Ready" );
});


function PerformCalculations() {
	Lines = $("#InText").val().split('\n');
	n = Lines.length;
	Stress = new Array(n);
	Strain = new Array(n);
	for (var i = 0; i < n; i++) {
		InputVars = Lines[i].split('\t');
		Stress[i] = parseFloat(InputVars[0]);
		Strain[i] = parseFloat(InputVars[1]);
	}
	data = Stress.map((x, i) => {
		return {
			x: x,
			y: Strain[i]
		};
	});
	$("#StressStrainGraph").css("display", "block");
	Chart0 = new Chart(document.getElementById("Chart0").getContext('2d'), {
		type: 'scatter',
		data: {
			datasets: [{
				label: 'Data obtained from the UTM',
				"borderColor":"rgb(75, 192, 192)",
				showLine: true,
				fill: false,
				data: data
			}]
		},
		options: {
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Strain'
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Stress'
					}
				}]
			}     
		}
    });
}
function Reset() {
	if (confirm('You selected to rest the application. All the data will be lost.\n\nAre you sure?'))
		ResetView();
}
function ResetView() {
	$("#InText").val("Copy the two columns (Stress - Strain) from an excel sheet and paste it here.");
	$("#StressStrainGraph").css("display", "none");
}