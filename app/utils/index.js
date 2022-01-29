const _ = require('lodash');
const axios = require('axios');
const moment = require('moment');
const formidable = require('formidable');
const { genResponseObj } = require('./response');
const CONFIG = require('./../config');
const constants = require('../config/constants');
const { LEVEL, ACTIONS } = constants.logGas;

const request = {
    get: async (req = null, node, cmd = '') => {
      const property = {
        method: 'GET',
        url: req.url,
        headers: req.headers,
        timeout: req.timeout,
      };
    //   const option = generateDetailLogOptional(cmd, ACTIONS.REQUEST, CONFIG.NODE, node, { service: true })
    //   logger.detail.info(req, null, null, option);
      return await axios(property)
        .then(response => handleSuccess(node, response, req, cmd))
        .catch(error => handleError(node, error, req, cmd));
    },
  
    post: async (req = null, node, cmd = '') => {
      const property = {
        method: 'POST',
        url: req.url,
        headers: req.headers,
        data: req.body,
        timeout: req.timeout,
      };
    //   const option = generateDetailLogOptional(cmd, ACTIONS.REQUEST, CONFIG.NODE, node, { service: true })
    //   logger.detail.info(req, null, null, option);
      return await axios(property)
        .then(response => handleSuccess(node, response, req, cmd))
        .catch(error => handleError(node, error, req, cmd));
    },
  
    patch: async (req = null, node, cmd = '') => {
      const property = {
        method: 'PATCH',
        url: req.url,
        headers: req.headers,
        data: req.body,
        timeout: req.timeout
      };
    //   const option = generateDetailLogOptional(cmd, ACTIONS.REQUEST, CONFIG.NODE, node, { service: true })
    //   logger.detail.info(req, null, null, option);
      return await axios(property)
        .then(response => handleSuccess(node, response, req, cmd))
        .catch(error => handleError(node, error, req, cmd));
    },
  
    postFile: async (req, url, header, data, node) => {
      const property = {
        method: 'POST',
        url,
        headers: header,
        data: data,
        timeout: req.timeout
      };
      return await axios(property)
        .then(response => handleSuccess(node, response, property, logOption))
        .catch(error => handleError(node, error, url, req));
    },
  };

  function handleSuccess(node, result, req, cmd) {
    if (result.status !== 200 && result.status !== 201) {
      throw result;
    }
    const response = {
      resultData: (result.data !== undefined ? result.data: result) || {},
      headers: result.headers || {},
      httpStatus: result.status || {}
    }
    if (req) {
    //   const option = generateDetailLogOptional(cmd, ACTIONS.RESPONSE, node, CONFIG.NODE, { service: true })
    //   logger.detail.info(req, response, null, option);
    } else {
    //   logger.detail.console(LEVEL.INFO, result);
    }
    return response.resultData || response;
  }
  
  function handleError(node, error, req, cmd) {
    if (req) {
      if (error.response) {
        const dataError = {
          resultData: error.response.data || {},
          headers: error.response.headers || {},
          httpStatus: error.response.status || {}
        }
        // logger.detail.error(req, dataError, '', generateDetailLogOptional(cmd, ACTIONS.RESPONSE, node, CONFIG.NODE, { service: true }));
  
        if (error.response && error.response.data && error.response.data.resultCode) {
          throw genResponseObj(req.headers['x-language'] || 'en', error.response.data.resultCode, error.response.data.developerMessage, undefined, node);
        } else {
          throw genResponseObj(req.headers['x-language'] || 'en', '50000', error, undefined, node);
        }
  
      } else {
        const dataError = error.message ? error.message : error;
        // logger.detail.error(req, dataError, '', generateDetailLogOptional(cmd, ACTIONS.RESPONSE, node, CONFIG.NODE, { service: true }));
        throw genResponseObj(req.get('x-language') || 'en', '50000', error, undefined, node);
      }
  
    } else {
    //   logger.error(error);
      throw genResponseObj(null, '50000', error, undefined, node);
    }
  }

  module.exports = {
    request,
  };
  