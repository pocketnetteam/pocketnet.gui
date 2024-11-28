var home = (function () {
	var self = new nModule();

	var essenses = {};

	var Essense = function (p) {
		var primary = deep(p, "history");

		var el, ed, applicationSearch, acsearch, userAddress = self.app?.user?.address?.value;

		var actions = {
			applicationSearchClear: function () {
				renders.applications();
			},
			applySearchFilter: function (searchConfig) {
				if (!searchConfig || !searchConfig.searchBy || !searchConfig.search) {
					console.warn('Invalid search configuration provided:', searchConfig);
					return;
				}

				const searchValue = `${searchConfig.searchBy}:${Array.isArray(searchConfig.search) 
        ? searchConfig.search.filter(Boolean).join(' ')  
        : String(searchConfig.search).trim()}`;

				if (!searchValue) {
					console.warn('Search value is empty:', searchValue);
					return;
				}

				if (acsearch && typeof acsearch.setvalue === 'function') {
					acsearch.setvalue(searchValue);
				} else {
					console.error('acsearch.setvalue is not a valid function or acsearch is undefined.');
				}

				try {
					renders.applications(searchConfig);
				} catch (error) {
					console.error('Error rendering applications:', error);
				}
			},
			applicationSearch: function () {
				if (acsearch) {
					acsearch.destroy();
					acsearch = null;
				}
				acsearch = new search(el.c.find(".applicationSearch"), {
					placeholder: self.app.localization.e("searchbyapplications"),

					clbk: function (_el) {},

					last: {
						get: function (d) {
							console.log(d, "||");

							return [];
						},

						tpl: function (result, clbk) {},
					},

					events: {
						fastsearch: async function (value, clbk) {
							if (value.length < 2) {
								el.c.find(".search").removeClass("validSearch");
								return clbk();
							}
							const applications = await self.app.apps.get.applicationsSearch(
								value
							);
							renders.searchResults(applications, value);
							clbk();
						},
						search: async function (value, clbk, e, helpers) {
							await renders.applications({
								search: value,
							});
							clbk();
						},
						active: function (isActive) {
							if (isActive) {
								el.c.addClass("search-active");
							} else {
								el.c.removeClass("search-active");
							}
						},
						clear: function (fs) {
							actions.applicationSearchClear();
							el.c.find(".searchFastResultWrapper").empty();
						},
					},
				});
			},
			hideSearchResultsMenu: function () {
				const searchResultsWrapper = el.c.find(".searchFastResultWrapper");
				searchResultsWrapper.addClass("hidden");
			},
			applicationClick: function (applicationId) {
				var applications = self.app.apps.get.installedAndInstalling({});

				var application = applications[applicationId];

				if (!application) {
					//// not installed application from search, to app page

					return;
				}

				if (application.installing) {
					//// not installed application, to app page with installing bar

					return;
				}

				if (application.installed) {
					//// not installed application, to app page with installing bar

					return;
				}
			},
		};

		var events = {};

		const applicationActions = {
			navigateToApplication: (applicationId) => {
				self.nav.api.go({
					href: `application?id=${applicationId}`,
					history: true,
					open: true,
				});
			},
			navigateToDevApplication: (applicationId) => {
				self.nav.api.go({
					href: `devapplication${applicationId ? "?id=" + applicationId : ''}`,
					history: true,
					open: true,
				});
			},
		};

		var renders = {
			searchResults: function (results, value) {
				el.c.find(".search").addClass("validSearch");
				self.shell({
						name: "searchResults",
						el: el.c.find(".searchFastResultWrapper"),
						data: {
							applications: results,
							value,
							hasSearchOptions: value.split(':').length <= 1,
						},
					},
					function (p) {
						p.el.find(".application").on("click", function (event) {
							const applicationId = $(this).data("id");
							applicationActions.navigateToApplication(applicationId);
						});
						p.el.find(".search-option").on("click", function (event) {
							const searchBy = $(this).data("searchby");

							const searchTransformers = {
								tags: (value) => value.split(' ').filter(Boolean),
								default: (value) => value
							};
							actions.applySearchFilter({
								searchBy,
								search: searchTransformers[searchBy || 'default'](value)
							});
							hideSearchResultsMenu()
						});
					}
				);
			},
			applications: async function (searchConfig, clbk) {
				if (!searchConfig?.applications) {
					applications = await self.app.apps.get.applicationsSearch(
						searchConfig?.search,
						searchConfig?.searchBy
					);
				}

				self.shell({
						name: "applications",
						el: el.c.find(".applicationsList"),
						data: {
							applications,
							userAddress,
						},
					},
					function (p) {
						p.el.find(".application").on("click", function (event) {
							const actionType = $(event.target).closest("[data-action]").data("action");
							const applicationId = event.currentTarget.dataset?.id;

							if (actionType && applicationActions[actionType]) {
								applicationActions[actionType](applicationId);
							} else {
								console.warn("Unknown action:", actionType);
							}
						});
						p.el.find(".tag").on("click", function (event) {
							actions.applySearchFilter({
								searchBy: 'tags',
								search: [$(this).text().trim()]
							})
						});
						el.c.on("click", "#createAppButton", function () {
							applicationActions.navigateToDevApplication();
						});

						el.c.on("click", "#myAppsButton", function () {
							actions.applySearchFilter({
								searchBy: "address",
								search: userAddress,
							});
						});
						if (clbk) clbk();
					}
				);

				_.each(applications, (ins) => {
					if (ins.installing) {
						ins.promise.then(() => {
							renders.applications();
						});
					}
				});
			},
		};

		var state = {
			save: function () {},
			load: function () {},
		};

		var initEvents = function () {
			const searchInput = el.c.find(".applicationSearch input");
			const searchResultsWrapper = el.c.find(".searchFastResultWrapper");

			searchInput.on("focus", function () {
				searchResultsWrapper.removeClass("hidden");
			});

			searchInput.on("blur", function () {
				setTimeout(actions.hideSearchResultsMenu, 200);
			});
		};

		var make = function () {
			applicationSearch = actions.applicationSearch();

			renders.applications();
		};

		return {
			primary: primary,

			getdata: function (clbk, p) {
				ed = p.settings.essenseData;

				var data = {
					ed,
					userAddress
				};

				clbk(data);
			},

			destroy: function () {
				ed = {};
				el = {};
			},

			init: function (p) {
				state.load();

				el = {};
				el.c = p.el.find("#" + self.map.id);

				make();
				initEvents();
				p.clbk(null, p);
			},
		};
	};

	self.run = function (p) {
		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);
	};

	self.stop = function () {
		_.each(essenses, function (essense) {
			window.rifticker.add(() => {
				essense.destroy();
			});
		});
	};

	return self;
})();

if (typeof module != "undefined") {
	module.exports = home;
} else {
	app.modules.home = {};
	app.modules.home.module = home;
}
