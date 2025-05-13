var devapplication = (function () {
  var self = new nModule();
  var essenses = {},
    userAddress = null;

  var Essense = function (p) {
    var primary = deep(p, "history");
    var el, applicationId, application;
    var currentStatus = "manager";

    var handleAppError = function (error) {
      if (error && error.message) {
        const localizationKey = `miniApp_${error.message.replace(
          /[:\-_](.)/g,
          (_, char) => char.toUpperCase()
        )}Error`;
        const errorMessage = self.app.localization.e(localizationKey);
        this.sitemessage(errorMessage);
      } else {
        this.sitemessage(self.app.localization.e("miniApp_loadErrorMessage"));
      }
    };

    var actions = {
      toggleEdit: function () {
        currentStatus = currentStatus === "edit" ? "view" : "edit";
        loadMiniApp();
      },
      editApp: function () {
        globalpreloader(true);
        clearErrors();

        const updatedData = prepareAppData();

        const hasValidatedAppData = validateAppData({
          ...updatedData,
          scope: updatedData.scope || (application.hash && "Not Filled"),
        });

        if (!hasValidatedAppData) {
          currentStatus = "view";
          return globalpreloader(false);
        }

        const onEditComplete = (newAppData) => {
          currentStatus = "view";
          loadMiniApp(newAppData);
        };

        const newAppData = {
          ...application,
          ...updatedData,
        };
        app.apps
          .validateResources(newAppData)
          .then(() => {
            if (application.hash) {
              return new Promise((resolve, reject) => {
                self.app.platform.api.actions.miniapp(newAppData, (_, err) => {
                  if (err) {
                    return reject(err);
                  }
                  self.app.apps.syncInstalledAppData({
                    ...newAppData,
                    develop: true,
                  });
                  resolve();
                });
              });
            } else {
              return app.apps.editAppInConfig({
                id: applicationId,
                ...updatedData,
              });
            }
          })
          .then(() => {
            onEditComplete(newAppData);
          })
          .catch((err) => {
            handleAppError(err);
          })
          .finally(() => globalpreloader(false));
      },
      createApp: function () {
        globalpreloader(true);
        clearErrors();

        const newData = prepareAppData();
        if (!validateAppData(newData)) {
          return globalpreloader(false);
        }

        app.apps
          .validateResources(newData)
          .then(() => app.apps.addAppToConfig(newData))
          .then(() => {
            applicationId = newData.id;
            loadMiniApp();
          })
          .catch(handleAppError)
          .finally(() => globalpreloader(false));
      },
      cancelEdit: function () {
        currentStatus = "view";
        loadMiniApp();
      },
      publish: function () {
        if (!self.app.test) {
          return sitemessage(
            self.app.localization.e("miniApp_publishOnlyTestNetworkMessage")
          );
        }

        if (!application.scope || application.scope.includes("localhost")) {
          return sitemessage(
            self.app.localization.e("miniApp_localhostScopeWarningMessage")
          );
        }

        globalpreloader(true);

        const publishData = {
          id: application.id,
          hash: "",
          address: application.manifest?.author,
          name: application?.name || application.manifest?.name,
          scope: application.scope,
          tscope: application.tscope ?? "",
          description:
            application.manifest?.description ||
            application.manifest.descriptions?.["en"],
          tags: application.tags,
        };

        self.app.platform.api.actions.miniapp(publishData, async (_, err) => {
          globalpreloader(false);

          if (!err) {
            sitemessage(
              self.app.localization.e("miniApp_publishSuccessMessage")
            );
            await app.apps.removeAppFromLocalhost(applicationId);
            loadMiniApp();
          } else {
            sitemessage(self.app.localization.e("miniApp_publishErrorMessage"));
          }
        });
      },
      goToApp: function () {
        navigateToApp();
      },
      confirmDeletion: function () {
        new dialog({
          class: "zindex",
          html: self.app.localization.e("miniApp_deleteConfirmation"),
          btn1text: self.app.localization.e("miniApp_yesButton"),
          btn2text: self.app.localization.e("miniApp_noButton"),
          success: actions.delete,
        });
      },
      confirmPublish: function () {
        new dialog({
          class: "zindex",
          html: self.app.localization.e("miniApp_publishConfirmation"),
          btn1text: self.app.localization.e("miniApp_yesButton"),
          btn2text: self.app.localization.e("miniApp_noButton"),
          success: actions.publish,
        });
      },
      goToIndex: function () {
        self.nav.api.go({
          open: true,
          href: "devapplications",
          history: true,
        });
      },
      openSupport: function () {
        app.platform.ui.support("common", {
          error: "",
          additionalData: {},
        });
      },
      delete: function () {
        app.apps
          .deleteApp({
            id: applicationId,
            hash: application?.hash,
          })
          .then(() => {
            this.sitemessage(
              self.app.localization.e("miniApp_deleteSuccessMessage")
            );
            actions.goToIndex();
          })
          .catch(() => {
            this.sitemessage(
              self.app.localization.e("miniApp_deleteErrorMessage")
            );
          });
      },
    };

    function prepareAppData() {
      return {
        id: el.c.find("#app-id").val(),
        version: el.c.find("#app-version").val(),
        scope: el.c.find("#app-scope").val(),
        tscope: el.c.find("#app-tscope").val(),
        name: el.c.find("#app-name").val(),
        tags: el.c
          .find(".tag")
          .map((_, tag) => $(tag).attr("tag"))
          .get(),
        address: userAddress,
      };
    }

    function validateAppData(appData) {
      clearErrors();
      var validationRules = [
        {
          value: appData.name,
          selector: "#app-name",
          message: self.app.localization.e("miniApp_requiredMessage"),
        },
        {
          value: appData.scope,
          selector: "#app-scope",
          message: self.app.localization.e("miniApp_scopeInvalidMessage"),
          condition: (value) => {
            if (!value) return true;
            const domainPattern = /^[a-zA-Z0-9.-]+$/;
            return domainPattern.test(value) && value.indexOf("https") === -1;
          },
        },
        {
          value: appData.tags,
          selector: ".tag-input-container",
          message: self.app.localization.e("miniApp_tagsRequiredMessage"),
          condition: (value) => Array.isArray(value) && value.length == 2,
        },
        {
          value: appData.id,
          selector: "#app-id",
          message: self.app.localization.e("miniApp_idInvalidMessage"),
          condition: (value) => /^[a-z0-9]+(\.[a-z0-9]+)+$/.test(value),
        },
        {
          value: appData.tscope,
          selector: "#app-tscope",
          message: self.app.localization.e("miniApp_tScopeInvalidMessage"),
          condition: (value) => {
            if (!value) return true;
            const localhostPattern = /^localhost:\d+$/;
            const domainPattern = /^[a-zA-Z0-9.-]+$/;
            return (
              localhostPattern.test(value) ||
              (domainPattern.test(value) && value.indexOf("https") === -1)
            );
          },
        },
      ];

      var hasErrors = validationRules.some(validateField);
      return !hasErrors;
    }

    function addAssetsLoadHandler(_p, selector) {
      _p.el.find(selector).on("blur", function () {
        if (!this.value) return;
        renders.appIconPreview(this.value);
        renders.showManifestButton(this.value);
      });
    }

    var validateField = function ({
      value,
      selector,
      message,
      condition = (v) => !!v,
    }) {
      if (!condition(value)) {
        showFieldError(selector, message);
        return true;
      }
      return false;
    };

    var showFieldError = function (selector, message) {
      el.c.find(selector).addClass("error");
      el.c.find(selector).siblings(".field-error").text(message).show();
    };

    var clearErrors = function () {
      el.c.find(".form-input").removeClass("error");
      el.c.find(".field-error").hide().text("");
    };

    var navigateToApp = function () {
      self.nav.api.go({
        open: true,
        href: "application?id=" + applicationId,
        inWnd: true,
        history: true,
      });
    };

    var renders = {
      miniAppDocsLink: function () {
        self.shell(
          {
            name: "miniAppDocsLink",
            el: el.c.find("#miniAppDocsLink"),
          },
          function (_p) {
            _p.el.find("#navigateToMiniAppDocs").on("click", () => {
              self.app.apps.openInWndById(
                "app.pocketnet.docs",
                null,
                "6465762f617070732f6d696e69617070732f6765742d737461727465642e68746d6c"
              );
            });
          }
        );
      },
      supportLink: function () {
        self.shell(
          {
            name: "supportLink",
            el: el.c.find("#supportLink"),
          },
          function (_p) {
            _p.el.find("#openSupport").on("click", actions.openSupport);
          }
        );
      },
      appIconPreview: function (scope) {
        self.shell(
          {
            name: "appIconPreview",
            el: el.c.find(".icon-preview-container"),
            data: {
              icon: `https://${scope}/b_icon.png`,
            },
          },
          function (_p) {
            _p.el.find(".app-icon-preview").on("error", function () {
              $(this).replaceWith(
                `<span class="icon-error-message" style="color: red;">${self.app.localization.e(
                  "miniApp_iconErrorMessage"
                )}: <code>b_icon.png</code></span>`
              );
            });
          }
        );
      },
      createForm: function () {
        self.shell(
          {
            name: "miniAppCreateForm",
            el: el.c.find(".content"),
            data: {},
          },
          function (_p) {
            _p.el.find(".save-btn").on("click", actions.createApp);
            _p.el.find(".cancel-btn").on("click", actions.goToIndex);

            ["#app-name", "#app-scope", "#app-id", "#app-tscope"].forEach(
              (selector) =>
                _p.el.find(selector).on("input", () => clearErrors(selector))
            );
            addAssetsLoadHandler(_p, "#app-scope");
            addAssetsLoadHandler(_p, "#app-tscope");
            renders.miniAppDocsLink();
            renders.deploymentInstructions();
            renders.supportLink();
            renders.tagInput({
              tags: [],
              _p,
            });
          }
        );
      },
      showManifestButton: function (scope) {
        simpleRequest(`https://${scope}/b_manifest.json`, "b_manifest.json")
          .then((manifest) => {
            self.shell(
              {
                name: "showManifestButton",
                el: el.c.find("#manifestButtonContainer"),
                data: {},
              },
              function (_p) {
                _p.el.find("#showManifestBtn").click(function () {
                  alert(JSON.stringify(JSON.parse(manifest), null, 2));
                });
              }
            );
          })
          .catch(() => {
            el.c.find("#manifestButtonContainer").empty();
            handleAppError({
              message: "import:manifest",
            });
          });
      },
      deploymentInstructions: function () {
        self.shell(
          {
            name: "deploymentInstructions",
            el: el.c.find("#deploymentInstructions"),
            data: {},
          },
          function (_p) {
            const header = _p.el.find(".accordion-header");
            const content = _p.el.find(".accordion-content");
            const icon = _p.el.find(".accordion-icon");

            header.on("click", function () {
              if (content.hasClass("show")) {
                content.removeClass("show");
                content.css("max-height", "0px");
                icon.text("+");
              } else {
                const scrollHeight = content[0].scrollHeight;
                const padding = 40;
                const totalHeight = scrollHeight + padding;
                content.addClass("show");
                content.css("max-height", `${totalHeight}px`);
                icon.text("-");
              }
            });
          }
        );
      },
      miniAppView: function (application) {
        el.c.find(".content").html("");

        const renderActions = {
          manager: renders.miniAppManager,
          edit: renders.editForm,
          default: renders.miniAppManager,
        };

        const renderFunction =
          renderActions[currentStatus] || renderActions.default;

        renderFunction(application);
      },
      tagInput: function ({ tags, _p }) {
        let _tags = [...tags];
        const refreshTagInput = () => {
          renders.tagInput({
            tags: _tags,
            _p,
          });
        };
        self.nav.api.load({
          open: true,
          id: "taginput",
          el: _p.el.find(".tag-input-container"),
          eid: "editTags",
          animation: false,
          insertimmediately: true,
          essenseData: {
            addonlytags: true,
            tags: function () {
              return tags || [];
            },
            addTag: function (tag) {
              const maxlength = 2;
              if (_tags.length >= maxlength)
                return sitemessage(
                  self.app.localization.e("miniApp_extendedTags") + maxlength
                );

              _tags.push(tag);
              refreshTagInput();
              clearErrors();
            },
            removeTag: function (tag) {
              if (tags) {
                _tags = _tags.filter((t) => t !== tag);
                refreshTagInput();
              }
            },
            language: function () {
              return self.app.localization.key;
            },
          },
        });
      },
      editForm: function (application) {
        self.shell(
          {
            name: "miniAppEditForm",
            el: el.c.find(".content"),
            data: {
              id: application?.id,
              name: application?.name,
              version: application?.version,
              scope: application?.scope?.replace(/^https?:\/\//, ""),
              tscope: application?.tscope?.replace(/^https?:\/\//, ""),
            },
          },
          function (_p) {
            renders.appIconPreview(application.scope);
            _p.el.find(".save-btn").on("click", actions.editApp);
            _p.el.find(".cancel-btn").on("click", actions.cancelEdit);
            addAssetsLoadHandler(_p, "#app-scope");
            addAssetsLoadHandler(_p, "#app-tscope");
            renders.deploymentInstructions();
            renders.miniAppDocsLink();
            renders.supportLink();
            ["#app-name", "#app-version", "#app-scope", "#app-tscope"].forEach(
              (selector) =>
                _p.el.find(selector).on("input", () => clearErrors(selector))
            );
            renders.tagInput({
              tags: application.tags || [],
              _p,
            });
          }
        );
      },
      miniAppManager: function (application) {
        const description =
          application.manifest?.description ||
          application.manifest.descriptions;
        const localizedDescription =
          typeof description === "string"
            ? description
            : description?.[app.localization.key] ?? description?.["en"];

        self.shell(
          {
            name: "miniAppDetail",
            el: el.c.find(".content"),
            data: {
              icon: application?.icon,
              id: application.manifest?.id,
              name: application?.name || application.manifest?.name,
              appStatus: app.apps.get.appStatusById(applicationId),
              author: application.manifest?.author,
              tags: application.tags?.join(", ") || [],
              permissions: application.manifest?.permissions?.join(", "),
              version: application.manifest?.versiontxt,
              scope: application.manifest.scope,
              description: localizedDescription,
            },
          },
          function (_p) {
            _p.el.find(".edit-app-btn").on("click", actions.toggleEdit);
            _p.el.find(".publish-app-btn").on("click", actions.confirmPublish);
            _p.el.find(".delete-app-btn").on("click", actions.confirmDeletion);
            _p.el.find("#goToApp").on("click", actions.goToApp);
          }
        );
      },
    };

    var loadMiniApp = function (targetApplication) {
      userAddress = self.app.user.address.value;
      
      if (targetApplication) return renders.miniAppView(targetApplication);

      if (!applicationId) {
        renders.createForm();
        return;
      }

      globalpreloader(true);
      app.apps.get
        .application(applicationId)
        .then(function (response) {
          application = response.application || response.appdata?.data;
          
          if (
            !application ||
            (application.installing && !application.installed)
          ) {
            return self.app.apps
              .install({
                ...response.application,
                develop: true,
              })
              .then(() => {
                loadMiniApp();
              });
          }

          if (
            (application.manifest?.author || application.address) !==
            userAddress
          ) {
            el.c
              .find(".content")
              .html(
                `<p>${self.app.localization.e("miniApp_loadErrorMessage")}</p>`
              );
            return;
          }

          renders.miniAppView(application);
        })
        .catch(function (e) {
          console.error(e);
          el.c
            .find(".content")
            .html(
              `<p>${self.app.localization.e("miniApp_loadErrorMessage")}</p>`
            );
        })
        .finally(() => globalpreloader(false));
    };

    var make = function () {
      app.platform.sdk.user.stateAction(() => {
        loadMiniApp();
      });
    };

    return {
      primary: primary,
      getdata: function (clbk, p) {
        applicationId = parameters().id || null;
        clbk({});
      },
      destroy: function () {
        el = {};
      },
      init: function (p) {
        el = {};
        el.c = p.el.find("#" + self.map.id);

        make();
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
  module.exports = devapplication;
} else {
  app.modules.devapplication = {};
  app.modules.devapplication.module = devapplication;
}
