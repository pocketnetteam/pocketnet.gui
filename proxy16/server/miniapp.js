const Datastore = require('@seald-io/nedb');
const f = require('../functions');

class ValidationError extends Error {
  constructor(message, details) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}



const MiniApp = function (p) {
  const self = this;

  const db = new Datastore({
    filename: f.path(p.dbpath)
  });
  db.loadDatabase(error => {
    if (error) throw error;
    db.ensureIndex({
      fieldName: 'key',
      unique: true
    });
  });

  const validateParameters = (params, requiredFields = []) => {
    const errors = {};

    requiredFields.forEach(field => {
      if (!params[field]) {
        errors[field] = 'Required field is missing';
      }
    });

    if (Object.keys(errors).length > 0) {
      throw new ValidationError('Invalid parameters', errors);
    }
  };

  self.createToken = async function ({
    appId,
    address
  }) {
    try {
      validateParameters({
        appId,
        address
      }, ['appId', 'address']);

      const existingToken = await self.getToken({
        appId,
        address
      });

      if (existingToken) return existingToken;


      const tokenValue = f.hash(`${appId}:${address}:${f.makeid()}`);

      const creationDate = new Date().toISOString();

      return new Promise((resolve, reject) => {
        db.insert({
          token: tokenValue,
          appId,
          address,
          date: creationDate,
          key: f.randomString(16)
        }, (error, newTokenDocument) => {
          if (error) return reject(error);
          resolve(newTokenDocument);
        });
      });
    } catch (error) {
      return Promise.reject({
        message: 'Token creation failed'
      });
    }
  };

  self.deleteTokens = function ({
    address,
    appId
  }) {
    validateParameters({
      appId,
      address
    }, ['appId', 'address']);


    return new Promise((resolve, reject) => {
      db.remove({
          address,
          appId
        }, {
          multi: true
        },
        (error, removalCount) => {
          if (error) return reject(error);
          resolve(removalCount);
        }
      );
    });
  };

  self.getToken = function ({
    address,
    appId
  }) {
    validateParameters({
      appId,
      address
    }, ['appId', 'address']);


    return new Promise((resolve, reject) => {
      db.findOne({
          address,
          appId
        },
        (error, tokenDocument) => {
          if (error) return reject(error);
          resolve(tokenDocument || null);
        }
      );
    });
  };

  self.fetchApplicationDetails = async function (appId) {
    try {
      const response = await self.proxy.api.node.rpc.action({
        method: 'getapps',
        parameters: {
          id: appId,
          pageStart: 0,
          pageSize: 1
        }
      });

      if (!response?.data?.length) {
        throw new Error('Application not found');
      }

      const [applicationInfo] = response.data;
      const parsedSettings = applicationInfo.p?.s1 ?
        JSON.parse(applicationInfo.p.s1) : {};

      return {
        scope: parsedSettings.s || '',
        name: parsedSettings.n || '',
        description: parsedSettings.d || ''
      };
    } catch (error) {
      p.logger.warn('Failed to fetch application details', error);
      throw error;
    }
  };

  self.sendNotification = async function (notificationPayload = {
    url: '',
    header: 'New Offer'
  }) {
    try {
      const tokenData = await self.getToken({
        address: notificationPayload.address,
        appId: notificationPayload.appId
      });

      if (!tokenData) {
        throw new Error('Authentication token not found');
      }

      const appDetails = await self.fetchApplicationDetails(notificationPayload.appId);
      const encodedUrl = f.hexEncode(notificationPayload.url);

      const notificationEvent = {
        type: 'miniapp',
        index: 0,
        notification: {
          image: `https://${appDetails.scope}/b_icon.png`,
          url: `application?id=${notificationPayload.appId}&p=${encodedUrl}`,
          header: {
            body: `${appDetails.name}: ${notificationPayload.header}`
          }
        },
        addresses: [tokenData.address]
      };

      return self.firebase.sendEvents([notificationEvent], {
        pushStatus: [],
        pushEvents: []
      });
    } catch (error) {
      p.logger.error('Notification sending failed', error);
      throw error;
    }
  };

  return self;
};

module.exports = MiniApp;
