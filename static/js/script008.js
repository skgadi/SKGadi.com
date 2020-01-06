var app = new Vue({
	el: "#pubs",
	delimiters: ["{[{", "}]}"],
	data: {
		updateCounter: 0,
		pubs: {},
		sFOptions: false,
		filters:[],
		showAbstract: true,
		fields: {
			year: {
				disp: "Year",
				key: "year",
				dType: "number"
			}
		},
		pubTypes: {
			"artJCR": "Articles published in the indexed journals",
			"bChapter": "Book chapters",
			"artNJCR": "Other articles",
			"iCProceedings": "International conference proceedings",
			"nCProceedings": "National conference proceedings",
			"pThesis": "Ph.D. Thesis",
			"mThesis": "Master's thesis"
		},	
		operators: {
			ge: {
				disp: ">=",
				func: function (a, b) {
					return a >= b;
				}
			},
			g: {
				disp: ">",
				func: function (a, b) {
					return a > b;
				}
			},
			le: {
				disp: "<=",
				func: function (a, b) {
					return a <= b;
				}
			},
			l: {
				disp: "<",
				func: function (a, b) {
					return a < b;
				}
			},
			
		}
	},
	updated: function () {
	},
	mounted: function () {
		loadDoc(location.origin + '/js/publications.json', (data) => {
			app.$set(app.$data, 'pubs', JSON.parse(data));
		})		
	},
	computed: {
	},
	methods: {
		addAFilterOption: function () {
			this.filters.push({key: 'year', opr: "=", val: ""});
			this.updateCounter++;
		},
		getSortedItems: function (key) {
			return Object.values(this.pubs.entries).filter(function (data) {
				return data.gsktype === key;
			}).sort(function (d1, d2) {
				var y1, y2;
				try {
					y1 = parseInt(d1.year);
					y2 = parseInt(d2.year);
				} catch(e) {
					if (!!y1) y1 = 0;
					if (!!y2) y2 = 0;
				}
				return y2-y1;
			});
		}
	}
});

function toggleAbstract() {
	app.$set(app.$data, "showAbstract", !app.$data.showAbstract);
}