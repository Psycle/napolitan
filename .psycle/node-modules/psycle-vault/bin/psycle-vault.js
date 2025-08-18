#! /usr/bin/env node

// This file contains material which is the pre-existing property of Psycle Interactive Limited.
// Copyright (c) 2017 Psycle Interactive. All rights reserved.

'use strict';

/* globals require */

const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const index = require('../src/index');

const commandsDefinitions = [
  {name: '{bold get-token}', summary: 'Get an access token from Vault.'},
  {name: '{bold get-token-approle}', summary: 'Get an access token from Vault (automated applications only).'},
  {name: '{bold renew-token}', summary: 'Renew the lease of a current access token.'},
  {name: '{bold get-secrets}', summary: 'Get specific secrets from Vault.'}
];

const optionDefinitions = [
  {name: 'command', defaultOption: true},
  {name: 'help', alias: 'h', description: 'Display the help information for the command.\nDisplay\'s global help if no command specified.', type: Boolean }
];

let headerSection = {header: 'Psycle Vault', content: 'Utility for accessing secrets from Psycle Vault.'};
let usageSection = {header: 'Usage', content: '$ psycle-vault <command> [options]'};
let commandsSection = {header: 'Commands', content: commandsDefinitions};
let optionsSection = {header: 'Global Options', optionList: optionDefinitions, hide: ['command']};
let usage = commandLineUsage([headerSection, usageSection, commandsSection, optionsSection]);

const options = commandLineArgs(optionDefinitions, { stopAtFirstUnknown: true });
const argv = options._unknown || []

let args = null;
let commandDefinitions = []

switch(options.command) {

  case 'get-token':
    commandDefinitions.push({name: 'tokenfile', alias: 't', type: String, defaultValue: '.psycle/vault/.token', description: 'The file which the obtained client_token value will be written to.\nDefault value: .psycle/vault/.token'});
    if (options.help) {
      headerSection = {header: 'Psycle Vault - Get Token', content: 'Login to Psycle Vault and obtain an access token.'};
      usageSection = {header: 'Usage', content: '$ psycle-vault get-token [options]'};
      optionsSection = {header: 'Options', optionList: commandDefinitions};
      usage = commandLineUsage([headerSection, usageSection, optionsSection])
      console.log(usage);
    } else {
      try {
        args = commandLineArgs(commandDefinitions, { argv });
        index.get_token(args);
      } catch (error) {
        console.log('psycle-vault get-token: ' + error.message);
        if (error.name === 'UNKNOWN_OPTION') {
          let allowed_options = []
          for (let option of commandDefinitions) {
            let opt = '--' + option.name;
            if(option.alias) {
              opt += ' (' + opt.alias + ')';
            }
            allowed_options.push(opt);
          }
          optionsSection = {header: 'Allowed options', optionList: commandDefinitions};
          usage = commandLineUsage([optionsSection])
          console.log(usage);
        }
        process.exit(1);
      }
    }
    break;

  case 'get-token-approle':
    commandDefinitions.push({name: 'role_id', type: String, description: 'The app role we want to obtain the token for.'});
    commandDefinitions.push({name: 'secret_id', type: String, description: 'The app role\'s secret id to authenticate with.'});
    commandDefinitions.push({name: 'tokenfile', alias: 't', type: String, defaultValue: '.psycle/vault/.token', description: 'The file which the obtained client_token value will be written to.\nDefault value: .psycle/vault/.token'});
    if (options.help) {
      headerSection = {header: 'Psycle Vault - Get Token Approle', content: 'Automated application login to Psycle Vault (e.g. GitLab CI) to obtain an access token.'};
      usageSection = {header: 'Usage', content: '$ psycle-vault get-token-approle --role_id <role_id> --secret_id <secret_id>'};
      optionsSection = {header: 'Options', optionList: commandDefinitions};
      usage = commandLineUsage([headerSection, usageSection, optionsSection])
      console.log(usage);
    } else {
      try {
        args = commandLineArgs(commandDefinitions, { argv });
        if (!args.role_id || !args.secret_id) {
          const missing = (args.role_id) ? 'secret_id' : 'role_id';
          console.log(`psycle-vault get-token-approle: No ${missing} specified`);
          usageSection = {header: 'Usage', content: '$ psycle-vault get-token-approle <role_id> <secret_id>'};
          optionsSection = {header: 'Options', optionList: commandDefinitions, hide: ['path']};
          usage = commandLineUsage([usageSection, optionsSection]);
          console.log(usage);
          process.exit(1);
        }
        index.get_token_approle(args);
      } catch (error) {
        console.log('psycle-vault get-token-approle: ' + error.message);
        if (error.name === 'UNKNOWN_OPTION') {
          let allowed_options = []
          for (let option of commandDefinitions) {
            let opt = '--' + option.name;
            if(option.alias) {
              opt += ' (' + opt.alias + ')';
            }
            allowed_options.push(opt);
          }
          optionsSection = {header: 'Allowed options', optionList: commandDefinitions};
          usage = commandLineUsage([optionsSection])
          console.log(usage);
        }
        process.exit(1);
      }
    }
    break;

  case 'renew-token':
    commandDefinitions.push({name: 'tokenfile', alias: 't', type: String, defaultValue: '.psycle/vault/.token', description: 'The file which the client_token value will be read from.\nDefault value: .psycle/vault/.token'});
    if (options.help) {
      headerSection = {header: 'Psycle Vault - Renew Token', content: 'Renew the lease of an existing access token in Psycle Vault.'};
      usageSection = {header: 'Usage', content: '$ psycle-vault renew-token [options]'};
      optionsSection = {header: 'Options', optionList: commandDefinitions};
      usage = commandLineUsage([headerSection, usageSection, optionsSection])
      console.log(usage);
    } else {
      try {
        args = commandLineArgs(commandDefinitions, { argv });
        index.renew_token(args);
      } catch (error) {
        console.log('psycle-vault renew-token: ' + error.message);
        if (error.name === 'UNKNOWN_OPTION') {
          let allowed_options = []
          for (let option of commandDefinitions) {
            let opt = '--' + option.name;
            if(option.alias) {
              opt += ' (' + opt.alias + ')';
            }
            allowed_options.push(opt);
          }
          optionsSection = {header: 'Allowed options', optionList: commandDefinitions};
          usage = commandLineUsage([optionsSection])
          console.log(usage);
        }
        process.exit(1);
      }
    }
    break;

  case 'get-secrets':
    const defaultPlaceholder = '{{SECRETS}}';
    commandDefinitions.push({name: 'format', alias: 'f', type: String, defaultValue: null, description: 'Optionally add formatting to the secrets response from vault by passing a format string. When using the --format option, you must include the placeholder (either the default of \\{\\{SECRETS\\}\\} or a custom placeholder you defined using the --placeholder option) in the string.\nFor example: --format "export myVar = \\{\\{SECRETS\\}\\}; return myVar;".'});
    commandDefinitions.push({name: 'path', defaultOption: true, defaultValue: null, description: 'The path in PsycltVault containing the required secrets.'});
    commandDefinitions.push({name: 'placeholder', alias: 'p', type: String, defaultValue: defaultPlaceholder, description: 'Used with the --format option to change the string format placeholder.\n Default value: \\{\\{SECRETS\\}\\}.'});
    commandDefinitions.push({name: 'renew', alias: 'r', type: Boolean, defaultValue: false, description: 'Whether to automatically renew the lease on the current client token.'});
    commandDefinitions.push({name: 'secretsfile', alias: 's', type: String, defaultValue: null, description: 'A file path to optionally save the secrets to.'});
    commandDefinitions.push({name: 'tokenfile', alias: 't', type: String, defaultValue: '.psycle/vault/.token', description: 'The file which the client_token value will be read from.\nDefault value: .psycle/vault/.token'});
    if (options.help) {
      headerSection = {header: 'Psycle Vault - Get Secrets', content: 'Obtain secrets values from Psycle Vault using the specified vault path.'};
      usageSection = {header: 'Usage', content: '$ psycle-vault get-secrets <vault-path> [options]'};
      optionsSection = {header: 'Options', optionList: commandDefinitions, hide: ['path']};
      usage = commandLineUsage([headerSection, usageSection, optionsSection])
      console.log(usage);
    } else {
      try {
        args = commandLineArgs(commandDefinitions, { argv });
        if (!args.path) {
          console.log('psycle-vault get-secrets: No vault path specified');
          usageSection = {header: 'Usage', content: '$ psycle-vault get-secrets <vault-path> [options]'};
          optionsSection = {header: 'Options', optionList: commandDefinitions, hide: ['path']};
          usage = commandLineUsage([usageSection, optionsSection]);
          console.log(usage);
          process.exit(1);
        }
        if (args.format && !args.format.includes(args.placeholder)) {
          console.log(`psycle-vault get-secrets: The format placeholder ${args.placeholder} was not found in the format string you provided.`);
          console.log('');
          console.log(`If using the --format option, the string you provide MUST contain the default placeholder ${defaultPlaceholder}, or a custom placeholder that you specify.`);
          console.log('For example:');
          console.log('');
          console.log(`  $ psycle-vault get-secrets <vault-path> --format "export myVar = ${defaultPlaceholder};"`);
          console.log('  $ psycle-vault get-secrets <vault-path> --format "export myVar = {{RESPONSE}};" --placeholder "{{RESPONSE}}"');
          console.log('');
          process.exit(1);
        }
        index.get_secrets(args);
      } catch (error) {
        console.log('psycle-vault get-secrets: ' + error.message);
        if (error.name === 'UNKNOWN_OPTION') {
          let allowed_options = []
          for (let option of commandDefinitions) {
            let opt = '--' + option.name;
            if(option.alias) {
              opt += ' (' + opt.alias + ')';
            }
            allowed_options.push(opt);
          }
          optionsSection = {header: 'Allowed options', optionList: commandDefinitions};
          usage = commandLineUsage([optionsSection])
          console.log(usage);
        }
        process.exit(1);
      }
    }
    break;

  default:
    let sections = [usageSection, commandsSection, optionsSection];
    if (!options.command && options.help) {
      sections.unshift(headerSection)
    } else {
      let message = 'ERROR: ';
      message += (options.command) ? 'Unknown command "' + options.command + '"' : 'Missing command'
      console.log(message);
    }
    commandsSection = {header: 'Available commands', content: commandsDefinitions};
    usage = commandLineUsage(sections);
    console.log(usage);
    process.exit(1);
}