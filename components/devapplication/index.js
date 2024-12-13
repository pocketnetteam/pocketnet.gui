var devapplication = (function () {
  var self = new nModule();
  var essenses = {},
    userAddress = null;

  var Essense = function (p) {
    var primary = deep(p, "history");
    var el, applicationId, application;
    var currentStatus = "view";

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

        const updatedData = {
          tags: el.c
            .find(".tag")
            .map((_, tag) => $(tag).attr("tag"))
            .get(),
        };

        const validationRules = [{
          value: updatedData.tags,
          selector: ".tag-input-container",
          message: self.app.localization.e("miniApp_tagsRequiredMessage"),
          condition: (value) => Array.isArray(value) && value.length > 0,
        }, ];

        if (validationRules.some(validateField)) {
          globalpreloader(false);
          return;
        }

        const onEditComplete = (newAppData) => {
          currentStatus = "view";
          loadMiniApp(newAppData);
        };

        if (application.hash) {
          const newAppData = {
            ...application,
            ...updatedData,
            author: userAddress,
          };

          app.apps
            .validateResources(newAppData)
            .then(() => {
              return self.app.platform.api.actions.miniapp(
                newAppData,
                (_, err) => {
                  globalpreloader(false);
                  if (err) {
                    return sitemessage(
                      self.app.localization.e("miniApp_editErrorMessage")
                    );
                  }
                  onEditComplete(newAppData);
                  self.app.apps.syncInstalledAppData({
                    ...newAppData,
                    develop: true,
                  });
                }
              );
            })
            .catch(handleAppError);
        } else {
          app.apps
            .editAppInConfig({
              id: applicationId,
              ...updatedData,
            })
            .then(onEditComplete)
            .catch(handleAppError)
            .finally(() => globalpreloader(false));
        }
      },
      createApp: function () {
        globalpreloader(true);
        clearErrors();

        var newData = {
          id: el.c.find("#app-id").val(),
          version: el.c.find("#app-version").val(),
          scope: el.c.find("#app-scope").val(),
          name: el.c.find("#app-name").val(),
          tags: el.c
            .find(".tag")
            .map((_, tag) => $(tag).attr("tag"))
            .get(),
          author: userAddress,
        };

        const validationRules = [{
            value: newData.name,
            selector: "#app-name",
            message: self.app.localization.e("miniApp_requiredMessage"),
          },
          {
            value: newData.scope,
            selector: "#app-scope",
            message: self.app.localization.e("miniApp_scopeInvalidMessage"),
            condition: (value) =>
              /^[a-zA-Z0-9.-]+$/.test(value) && value.indexOf("https") === -1,
          },
          {
            value: newData.tags,
            selector: ".tag-input-container",
            message: self.app.localization.e("miniApp_tagsRequiredMessage"),
            condition: (value) => Array.isArray(value) && value.length > 0,
          },
          {
            value: newData.id,
            selector: "#app-id",
            message: self.app.localization.e("miniApp_idInvalidMessage"),
            condition: (value) => /^[a-z0-9]+(\.[a-z0-9]+)+$/.test(value),
          },
        ];

        const hasErrors = validationRules.some(validateField);

        if (hasErrors) {
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

        globalpreloader(true);

        const publishData = {
          id: application.id,
          hash: "",
          address: application.manifest?.author,
          name: application.manifest?.name,
          scope: application.scope,
          description: application.manifest.descriptions?. ["en"],
          tags: application.tags,
        };

        self.app.platform.api.actions.miniapp(publishData, async (_, err) => {
          globalpreloader(false);

          if (!err) {
            sitemessage(
              self.app.localization.e("miniApp_publishSuccessMessage")
            );
            await app.apps.removeAppFromConfig(applicationId);
            loadMiniApp();
          } else {
            sitemessage(self.app.localization.e("miniApp_publishErrorMessage"));
          }
        });
      },
      goToApp: function () {
        navigateToApp();
      },
      goToIndex: function () {
        self.nav.api.go({
          open: true,
          href: "index",
          inWnd: true,
          history: true,
        });
      },
      delete: function () {
        confirmDeletion();
      },
    };

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

    var confirmDeletion = function () {
      new dialog({
        class: "zindex",
        html: self.app.localization.e("miniApp_deleteConfirmation"),
        btn1text: self.app.localization.e("miniApp_yesButton"),
        btn2text: self.app.localization.e("miniApp_noButton"),
        success: function () {
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
      });
    };

    var renders = {
      createForm: function () {
        self.shell({
            name: "miniAppCreateForm",
            el: el.c.find(".content"),
            data: {},
          },
          function (_p) {
            _p.el.find(".save-btn").on("click", actions.createApp);
            _p.el.find(".cancel-btn").on("click", actions.goToIndex);

            ["#app-name", "#app-scope", "#app-id"].forEach((selector) =>
              _p.el.find(selector).on("input", () => clearErrors(selector))
            );
            renders.tagInput({
              tags: [],
              _p,
            });
          }
        );
      },
      miniAppDetail: function (application) {
        el.c.find(".content").html("");

        if (currentStatus === "edit") {
          renderEditForm(application);
        } else {
          renderDetails(application);
        }
      },
      tagInput: function ({
        tags,
        _p
      }) {
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
              const maxlength = 2
              if (_tags.length > maxlength) return sitemessage(self.app.localization.e('miniApp_extendedTags') + maxlength);

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
    };

    var renderEditForm = function (application) {
      self.shell({
          name: "miniAppEditForm",
          el: el.c.find(".content"),
          data: {
            id: application?.id,
            name: application?.name,
            version: application?.version,
            scope: application?.scope,
          },
        },
        function (_p) {
          _p.el.find(".save-btn").on("click", actions.editApp);
          _p.el.find(".cancel-btn").on("click", actions.cancelEdit);

          ["#app-name", "#app-version", "#app-scope"].forEach((selector) =>
            _p.el.find(selector).on("input", () => clearErrors(selector))
          );
          renders.tagInput({
            tags: application.tags || [],
            _p,
          });
        }
      );
    };

    var renderDetails = function (application) {
      const description = application.manifest.descriptions;

      self.shell({
          name: "miniAppDetail",
          el: el.c.find(".content"),
          data: {
            icon: application?.icon,
            id: application.manifest?.id,
            name: application.manifest?.name,
            appStatus: app.apps.get.appStatusById(applicationId),
            author: application.manifest?.author,
            tags: application.tags?.join(", ") || [],
            permissions: application.manifest?.permissions?.join(", "),
            version: application.manifest?.versiontxt,
            scope: application.manifest.scope,
            description: description?. [app.localization.key] ?? description?. ["en"],
          },
        },
        function (_p) {
          _p.el.find(".edit-app-btn").on("click", actions.toggleEdit);
          _p.el.find(".publish-app-btn").on("click", actions.publish);
          _p.el.find(".delete-app-btn").on("click", actions.delete);
          _p.el.find("#goToApp").on("click", actions.goToApp);
        }
      );
    };

    var loadMiniApp = function (targetApplication) {
      userAddress = self.app.user.address.value;


      if (targetApplication) return renders.miniAppDetail(targetApplication);

      if (!applicationId) {
        renders.createForm();
        return;
      }
      
      globalpreloader(true);
      app.apps.get
        .application(applicationId)
        .then(function (response) {

          application = response.appdata?.data

          if (!application || application.installing && !application.installed) {
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

          renders.miniAppDetail(application);
        })
        .catch(function (e) {
          console.error(e);
          el.c
            .find(".content")
            .html(
              `<p>${self.app.localization.e("miniApp_loadErrorMessage")}</p>`
            );
        }).finally(() => globalpreloader(false));
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
