// This file contains material which is the pre-existing property of Psycle Interactive Limited.
// Copyright (c) 2017 Psycle Interactive. All rights reserved.

/**
 * psycle-vault
 * David Blakemore <david.blakemore@psycle.com>
 */
 'use strict';

 /* globals require, process, exports */

 const colors = require('colors/safe');
 const prompt = require('prompt');
 const fs = require('fs');
 const util = require('util');
 const request = require('request-promise-native');
 const url = require('url');
 const open = require('open');
 const http = require('http');
 const port = 8250;

 const getPrompt = util.promisify(prompt.get)
 const readFile = util.promisify(fs.readFile);
 const writeFile = util.promisify(fs.writeFile);

 const requestHandler = (request, response) => {
   // console.log(request.url);
   if (/^\/oidc\/callback/.test(request.url)) {
     let theURL = url.parse(request.url, true);
     get_token_oidc_callback(theURL.query);
   }
   response.setHeader('Content-Type', 'text/html; charset=UTF-8');
   response.end('<p style="font-family: Arial;">Received. Closing...<br />If this doesn\'t close automatically, please now close this window/tab.</p><script>window.close();</script>');
 }

 const httpServer = http.createServer(requestHandler);
 let nonce = null;
 let tokenfile = null;

 function _get_prompt(properties) {
   let defaults = [];
   for (let key in properties) {
     if (properties.hasOwnProperty(key)) {
       let property = properties[key];
       if (property.value) {
         let label = (property.description) ? property.description : key;
         console.log(colors.grey(label + prompt.delimeter + ' ') + property.value);
         defaults.push({key: key, value: property.value})
         delete properties[key];
       }
     }
   }
   const schema = {properties: properties};
   prompt.message = '';
   prompt.delimiter = ':';
   prompt.start();
   let promise = getPrompt(schema).then(result => {
     for (let d of defaults) {
       result[d.key] = d.value;
     }
     return result;
   }).catch(err => {
     throw err;
   });
   return promise;
 }

 function _get_token_approle(role_id, secret_id) {
  return request({
    method: 'POST',
    uri: 'https://vault.psycle.com:8200/v1/auth/approle/login',
    body: {"role_id": role_id, "secret_id": secret_id},
    json: true
  }).promise();
 }

 function _get_token_oidc() {
   httpServer.listen(port, (err) => {
     if (err) {
       _output_error('Unexpected error creating http server.', err)
       process.exit(1);
     }
     console.log('Listening for callbacks...');
   })
   return request({
     method: 'POST',
     uri: 'https://vault.psycle.com:8200/v1/auth/oidc/oidc/auth_url',
     body: {'redirect_uri': 'http://localhost:8250/oidc/callback'},
     json: true
   }).promise();
 }

 function _get_token_google(auth_url) {
   // return open(auth_url);
   let theURL = url.parse(auth_url, true);
   nonce = theURL.query.nonce;
   return open(auth_url);
   // return open(auth_url, {app: 'google chrome'});
 }

 function _get_token_google_callback(query) {
   return request({
     method: 'GET',
     uri: 'https://vault.psycle.com:8200/v1/auth/oidc/oidc/callback?state=' + encodeURIComponent(query.state) + '&nonce=' + encodeURIComponent(nonce) + '&code=' + encodeURIComponent(query.code),
     json: true
   }).promise();
 }

 function _renew_token(token) {
   return request({
     method: 'POST',
     uri: 'https://vault.psycle.com:8200/v1/auth/token/renew-self',
     headers: {'X-Vault-Token': token},
     json: true
   }).promise();
 }

 function _get_secrets(token, path) {
   return request({
     method: 'GET',
     uri: 'https://vault.psycle.com:8200/v1/' + path,
     headers: {'X-Vault-Token': token},
     json: true
   }).promise();
 }

 function _output_error(message, err) {
   console.log(message);
   if (err) {
     if (err.response && err.response.body && err.response.body.errors) {
       for (let error of err.response.body.errors) {
         console.log(' * ' + error);
       }
     } else {
       console.log(err.message);
     }
   }
 }

 function get_token(args) {
   return get_token_oidc(args);
 }

 function get_token_approle(args) {
  _get_token_approle(args.role_id, args.secret_id).then(parsedBody => {
    const token = parsedBody.auth.client_token;
    writeFile(args.tokenfile, token, {'encoding': 'utf8'}).then(() => {
      console.log('Successfully written client token to token file.');
    }).catch(err => {
      _output_error('Error writing client_token to token file.', err)
      process.exit(1);
    });
  }).catch(err => {
    _output_error('Error logging into Psycle Vault.', err)
    process.exit(1);
  });
 }

 function get_token_oidc(args) {
   _get_token_oidc().then(parsedBody => {
     if (parsedBody.data && parsedBody.data.auth_url) {
       console.log('If your browser doesn\'t automatically open, please open this URL yourself.');
       console.log(parsedBody.data.auth_url);
       _get_token_google(parsedBody.data.auth_url).then(googleBody => {
         console.log('Waiting for callback...');
         tokenfile = args.tokenfile;
       });
     } else {
       console.log(parsedBody);
       _output_error('Could not talk to Google to get the token.')
       process.exit(1);
     }
   });
 }

 function get_token_oidc_callback(query) {
   _get_token_google_callback(query).then(parsedBody => {
     if (parsedBody && parsedBody.auth && parsedBody.auth.client_token) {
       const token = parsedBody.auth.client_token;
       writeFile(tokenfile, token, {'encoding': 'utf8'}).then(() => {
         console.log('Successfully written client token to token file.');
         httpServer.close(function() {
           console.log('Callback complete.');
           process.exit();
         });
       }).catch(err => {
         _output_error('Error writing client_token to token file.', err)
         process.exit(1);
       });
     } else {
       _output_error('Error in oidc callback - no client_token was found.');
       process.exit(1);
     }
   }).catch(err => {
     _output_error('Error in oidc callback request.', err)
     process.exit(1);
   });
 }

 function renew_token(args) {
   readFile(args.tokenfile, {encoding: 'utf8'}).then(token => {
     _renew_token(token).then(parsedBody => {
       console.log('Sucessfully renewed lease of client token in token file.');
     }).catch(err => {
       _output_error('Error renewing token in Psycle Vault.', err)
       process.exit(1);
     });
   }).catch(err => {
     _output_error('Error reading client_token from token file.', err)
     process.exit(1);
   });
 }

 function get_secrets(args) {
   readFile(args.tokenfile, {encoding: 'utf8'}).then(token => {
     _get_secrets(token, args.path).then(parsedBody => {
       let response = JSON.stringify(parsedBody.data, null, 4);
       if (args.format) {
         response = args.format.replace(args.placeholder, response);
       }
       if (args.secretsfile) {
         writeFile(args.secretsfile, response).then(() => {
           console.log(`Successfully written secrets to ${args.secretsfile}.`);
         }).catch(err => {
           _output_error(`Error writing secrets to ${args.secretsfile}.`, err);
           process.exit(1);
         });
       } else {
         console.log('Response from vault:\n');
         console.log(response);
         console.log('');
       }
       if (args.renew) {
         _renew_token(token).then(parsedBody => {
           console.log('Sucessfully renewed lease of client token in token file.');
         }).catch(err => {
           _output_error('Error renewing token in Psycle Vault.', err);
           process.exit(1);
         });
       }
     }).catch(err => {
       _output_error('Error getting secrets from Psycle Vault.', err);
       process.exit(1);
     });
   }).catch(err => {
     _output_error('Error reading client_token from token file.', err)
     process.exit(1);
   });
 }

 exports.get_token = get_token;
 exports.get_token_approle = get_token_approle;
 exports.renew_token = renew_token;
 exports.get_secrets = get_secrets;
