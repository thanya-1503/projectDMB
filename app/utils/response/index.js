var _ = require('underscore');
var MessageCode = require('../message');
const msgCode = new MessageCode();
// var code = require('../../config/message.properties');
var env = process.env.NODE_ENV || 'development';
const CONFIG = require('../../config')
var mime = require('mime-types');
const path = require("path");
const constants = require('../../config/constants');

const setHeader = (req, response = {}) => {
  let newHeader = {
    [CONFIG.HEADER.HEADER_TRANSACTION_ID]: req.get(CONFIG.HEADER.HEADER_TRANSACTION_ID.toLocaleLowerCase()),
    [CONFIG.HEADER.HEADER_PUBLIC_ID]: req.get(CONFIG.HEADER.HEADER_PUBLIC_ID.toLocaleLowerCase()),
    'Content-Type': 'application/json',
    'X-XSS-Protection': '1; mode=block',
    'X-Content-Type-Options': 'nosniff'
  };
  if (req.method === 'POST' && response && response._id) {
    const uri = req.baseUrl.split('/');
    newHeader['Location'] = `/${uri[uri.length - 1]}/${response._id}`;
  }
  return newHeader;
}

exports.response = (req, res, response = null, command = '', now = Date.now()) => {
    const language = req.get('x-language') || 'en';
  
    // set code
    let showBody = true
    let code = constants.resCode[20000];
  
    if (req.method == 'POST') {
      showBody = response
      code = constants.resCode[20100]
    }
    if (req.method == 'PATCH' || req.method == 'DELETE') {
      showBody = false
      code = constants.resCode[20000]
    }

    let ret = {
        responseCode: code.resultCode,
        developerMessage: code.developerMessage[language] || '',
        responseData: showBody ? response : {},
    }
    res.status(code.httpStatus);
    res.setHeader('http_status_code', code.httpStatus)

  
    if (req.method == 'POST' || req.method == 'PATCH' || req.method == 'DELETE')
      res.send(ret);
    else
      res.send(ret);
  }

  exports.responseError = (req, res, respObj, command = '', now = Date.now()) => {
    const codeList = constants.resCode;
    const language = req.get('x-language') || 'en';
    let code = constants.resCode[50000];
  
    if (respObj && respObj.resultCode && codeList[respObj.resultCode]) {
      code = codeList[respObj.resultCode]
    }
    switch(respObj[0]) {
      case 40101 : 
        code = constants.resCode[40101];
        break;
      default : code = constants.resCode[50000]; break;
      
    }
    if(respObj.name === 'JwtParseError') {
      code = constants.resCode[40102];
    }
    // logger
    const data = {
      httpStatus: code.httpStatus,
      resultCode: code.resultCode,
      userMessage: code.developerMessage[language] || '',
      developerMessage: `[${CONFIG.NODE}] ${code.developerMessage[language] || ''}`,
      transactionResult: 50000,
      transactionDesc: 'Failed',
      resultData: respObj
    }
  
    // response
    return res
      .status(code.httpStatus)
      .json({
        resultCode: data.resultCode,
        developerMessage: data.userMessage
      });
  }

exports.responseFile = function(fileName, filePath, res) {


    res.removeHeader('X-Powered-By');
    res.removeHeader('X-Hostname');
    res.removeHeader('Access-Control-Allow-Origin');
    res.removeHeader('Access-Control-Allow-Headers');
    res.removeHeader('Access-Control-Allow-Methods');
    res.removeHeader('Date');
    res.removeHeader('ETag');
    res.removeHeader('Connection');

    let file = filePath.split('.');
    // var contentType = mime.contentType(path.extname('upload' + filePath));
    var contentType = mime.contentType(filePath);
    let typeR = contentType.split(';');
    res.setHeader('Content-Type', typeR[0]);
    res.setHeader('http_status_code', 200);
    res.setHeader('Content-Disposition', 'inline;filename=' + fileName + '.' + file[1]);
    res.download(filePath, fileName + '.' + file[1]);
}

exports.mapCodeErrorDB = function(err, Header) {
    try {
        return [40300, err];
    } catch (error) {
      console.log(error);
        throw error;
    }
}