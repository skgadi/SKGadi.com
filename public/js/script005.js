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
	SetBlocksViewAs("block");
	Chart0 = new Chart(document.getElementById("Chart0").getContext('2d'), {
		type: 'scatter',
		data: {
			datasets: [{
				label: 'Data obtained from the UTM',
				"borderColor":"rgb(0, 148, 135)",
				showLine: true,
				fill: false,
				data: data
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
						labelString: 'Load'
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Elongation'
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
	SetBlocksViewAs("none");
}

function SetBlocksViewAs(BlockCss) {
	$("#Chart0Div").css("display", BlockCss);
	$("#Chart1Div").css("display", BlockCss);	
}

//function MakeChart