var devapplication = (function () {
  var self = new nModule();
  var essenses = {};

  var Essense = function (p) {
    var primary = deep(p, "history");
    var el, applicationId;
    var currentStatus = "view";

    var actions = {
      toggleEdit: function () {
        currentStatus = currentStatus === "edit" ? "view" : "edit";
        loadMiniApp();
      },
      save: function () {
        clearErrors();

        var updatedData = {
          version: el.c.find("#app-version").val(),
          scope: el.c.find("#app-scope").val(),
          name: el.c.find("#app-name").val(),
        };

        const validationRules = getValidationRules(updatedData);
        const hasErrors = validationRules.some(validateField);

        if (hasErrors) return;

        currentStatus = "view";
        app.apps.editAppInConfig({
          id: applicationId,
          ...updatedData
        });
        loadMiniApp();
      },
      cancel: function () {
        currentStatus = "view";
        loadMiniApp();
      },
      publish: function () {
        alert(self.app.localization.e("miniApp_publishMessage").replace("{0}", applicationId));
      },
      goToApp: function () {
        navigateToApp();
      },
      delete: function () {
        confirmDeletion();
      },
    };

    var validateField = function ({
      value,
      selector,
      message,
      condition = (v) => !!v
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

    var getValidationRules = function (updatedData) {
      return [{
          value: updatedData.name,
          selector: "#app-name",
          message: self.app.localization.e("miniApp_nameRequiredMessage"),
        },
        {
          value: updatedData.version,
          selector: "#app-version",
          message: self.app.localization.e("miniApp_versionRequiredMessage"),
        },
        {
          value: updatedData.scope,
          selector: "#app-scope",
          message: self.app.localization.e("miniApp_scopeUrlErrorMessage"),
          condition: function (value) {
            var urlPattern = /^https:\/\/\S+$/;
            return !value || urlPattern.test(value);
          },
        },
      ];
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
          app.apps.removeAppFromConfig(applicationId);
          this.sitemessage(self.app.localization.e("miniApp_deleteSuccessMessage"));
          self.nav.api.go({
            open: true,
            href: "index",
            inWnd: true,
            history: true
          });
        },
      });
    };

    var renders = {
      miniAppDetail: function (application) {
        el.c.find(".content").html("");

        if (currentStatus === "edit") {
          renderEditForm(application);
        } else {
          renderDetails(application);
        }
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
          _p.el.find(".save-btn").on("click", actions.save);
          _p.el.find(".cancel-btn").on("click", actions.cancel);

          ["#app-name", "#app-version", "#app-scope"].forEach((selector) =>
            _p.el.find(selector).on("input", () => clearErrors(selector))
          );
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
            author: application.manifest?.author,
            appStatus: app.apps.get.appStatusById(applicationId),
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

    var loadMiniApp = function () {
      if (!applicationId) {
        console.error("Отсутствует ID приложения");
        return;
      }

      app.apps.get
        .application(applicationId)
        .then(function ({
          application
        }) {
          var userAddress = self.app.user.address.value;

          if (application.manifest.author !== userAddress) {
            el.c.find(".content").html(`<p>${self.app.localization.e("miniApp_loadErrorMessage")}</p>`);
            return;
          }

          renders.miniAppDetail(application);
        })
        .catch(function (e) {
          el.c.find(".content").html(`<p>${self.app.localization.e("miniApp_loadErrorMessage")}</p>`);
        });
    };

    var make = function () {
      loadMiniApp();
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
    self.eachModule(function (essense) {
      essense.destroy();
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
