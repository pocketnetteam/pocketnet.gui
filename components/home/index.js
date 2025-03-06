var home = (function () {
	var self = new nModule();

	var essenses = {};

	var Essense = function (p) {
		var primary = deep(p, "history");

		var el,
			ed,
			applicationSearch,
			acsearch,
			userAddress = null;

		var actions = {
			applicationSearchClear: function () {
				renders.applications();
			},
			applySearchFilter: function (search) {
				if (!search) {
					console.warn("Invalid search configuration provided:", search);
					return;
				}

				if (!search) {
					console.warn("Search value is empty:", searchValue);
					return;
				}

				if (acsearch && typeof acsearch.setvalue === "function") {
					acsearch.setvalue(search);
				} else {
					console.error(
						"acsearch.setvalue is not a valid function or acsearch is undefined."
					);
				}

				try {
					renders.applications({
						search,
					});
				} catch (error) {
					console.error("Error rendering applications:", error);
				}
			},
			removeValidSearchClass: function () {
				el.c.find(".search").removeClass("validSearch");
			},
			applicationSearch: function (searchValue) {
				if (acsearch) {
					acsearch.destroy();
					acsearch = null;
				}
				acsearch = new search(el.c.find(".applicationSearch"), {
					placeholder: self.app.localization.e("searchbyapplications"),

					clbk: function (_el) { },

					last: {
						get: function (d) {

							return [];
						},

						tpl: function (result, clbk) { },
					},

					events: {
						fastsearch: async function (value, clbk) {
							if (value.length < 2) {
								actions.removeValidSearchClass();
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
							actions.hideSearchResultsMenu();
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
							actions.removeValidSearchClass();
							el.c.find(".searchFastResultWrapper").empty();
						},
					},
				});

				if (searchValue) {
					acsearch.setvalue(searchValue);
				}
			},
			hideSearchResultsMenu: function () {
				const searchResultsWrapper = el.c.find(".searchFastResultWrapper");
				searchResultsWrapper.addClass("hidden");
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
					href: `devapplication${applicationId ? "?id=" + applicationId : ""}`,
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
						hasSearchOptions: value.split(":").length <= 1,
					},
				},
					function (p) {
						p.el.find(".application").on("click", function (event) {
							const applicationId = $(this).data("id");
							applicationActions.navigateToApplication(applicationId);
						});
						p.el.find(".search-option").on("click", function (event) {
							const searchBy = $(this).data("searchby");

							actions.applySearchFilter(`${searchBy}:${value}`);
							actions.hideSearchResultsMenu();
						});
						p.el.find(".app-tag").on("click", function (event) {
							event.stopPropagation();
							actions.applySearchFilter(`tags:${$(this).text().trim()}`);
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

				console.log('applications', applications)

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
							const actionType = $(event.target)
								.closest("[data-action]")
								.data("action");
							const applicationId = event.currentTarget.dataset?.id;

							if (actionType && applicationActions[actionType]) {
								applicationActions[actionType](applicationId);
							} else {
								console.warn("Unknown action:", actionType);
							}
						});

						el.c.on("click", "#createAppButton", function () {
							applicationActions.navigateToDevApplication();
						});

						el.c.on("click", "#myAppsButton", function () {
							actions.applySearchFilter(`address:${userAddress}`);
						});

						if (clbk) clbk();
					}
				);
			},
		};

		var state = {
			save: function () { },
			load: function () { },
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
			const searchValue = parameters().search;
			applicationSearch = actions.applicationSearch(searchValue);

			renders.applications({
				search: searchValue,
			});
		};

		return {
			primary: primary,

			getdata: function (clbk, p) {
				ed = p.settings.essenseData;

				userAddress = self.app?.user?.address?.value || null;
				var data = {
					ed,
					userAddress,
				};

				pretry(() => {
					return self.app.apps.inited
				}, 100, 3000).then(() => {
	
					clbk(data);
				})

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
