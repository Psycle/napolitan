# Psycle Vault

[![build status](https://gitlab.psycle.com/psycle/node-modules/dev-ops/psycle-vault/badges/develop/build.svg)](https://gitlab.psycle.com/psycle/node-modules/dev-ops/psycle-vault/commits/develop)
[![coverage report](https://gitlab.psycle.com/psycle/node-modules/dev-ops/psycle-vault/badges/develop/coverage.svg)](https://gitlab.psycle.com/psycle/node-modules/dev-ops/psycle-google-cloud-deploy/commits/develop)

Utility for accessing secrets from Psycle Vault.

## Installation and usage

Primiarily, this module is included in the [project template](https://gitlab.psycle.com/psycle-secure/project-template) project as a Git Subtree, allowing for local installation into new projects, however it can be installed directly using:

```bash
$ yarn add https://gitlab.psycle.com/psycle/node-modules/dev-ops/psycle-vault.git#master --dev
```

**NOTE: To use this module, you _must_ already have access to Psycle Vault. If you are unsure whether you have access, or can't remember your username / password, please speak to <a href="https://gitlab.psycle.com/jpartington">James Partington</a>.**

## Usage

Here is an example of the scripts you can add to your `package.json` file to take advantage of Psycle Vault:

```json
{
  ...
  "scripts": {
    ...
    "get-vault-token": "psycle-vault get-token",
    "renew-vault-token": "psycle-vault renew-token",
    "get-vault-secrets": "psycle-vault get-secrets /path/to/vault/secrets --secretsfile /path/to/secretsfile.json",
  }
  ...
}
```

With the above examples, you can run `yarn run get-vault-token` to obtain a vault token, `yarn run renew-vault-token` to renew a vault token and `yarn run get-vault-secrets` to obtain the secrets for your project. Authentication is handled using OIDC with a Google account.

Of course, you don't have to add scripts to your `package.json` file. As long as you have the module installed, you can invoke it directly (see **Advanced Usage** below)

## Advanced Usage

Running `yarn psycle-vault --help` will display the available commands

* **get-token** [options] - Get an access token from Psycle Vault
* **renew-token** [options] - Renew the lease of a current access token in Psycle Vault
* **get-secrets** <vault_path> [options] - Get specific secrets from Psycle Vault

### Get Token

```bash
$ yarn run psycle-vault get-token [options]
```

Available Options:
* **-t, --tokenfile** _String_ - (OPTIONAL) The path (absolute or relative) to where the Psycle Vault access token should be written. This should be a location that is outside of Git, or at lease ignored by Git. Default value is `.psycle/vault/.token`

Examples:
```bash
$ yarn run psycle-vault get-token

$ yarn run psycle-vault get-token --tokenfile ./path/to/vault/token
```

### Renew Token

```bash
$ yarn run psycle-vault renew-token [options]
```

Available Options:
* **-t, --tokenfile** _String_ - (OPTIONAL) The path (absolute or relative) to where the Psycle Vault access token should be read from. Default value is `.psycle/vault/.token`

Examples:
```bash
$ yarn run psycle-vault renew-token

$ yarn run psycle-vault renew-token --tokenfile ./path/to/vault/token
```

### Get Secrets

```bash
$ yarn run psycle-vault get-secrets <vault_path> [options]
```

Available Options:
* **-f, --format** _String_ - (OPTIONAL) Add formatting to the secrets response from vault. When using the --format option, you must include the placeholder (either the default of `{{SECRETS}}` or a custom placeholder you defined using the `--placeholder` option) in the string.
* **-p, --placeholder** _String_ - (OPTIONAL) Used with the `--format` option to change the string format placeholder. Default value: `{{SECRETS}}`.
* **-t, --tokenfile** _String_ - (OPTIONAL) The path (absolute or relative) to where the Psycle Vault access token should be read from. Default value is `.psycle/vault/.token`
* **-s, --secretsfile** _String_ - (OPTIONAL) The path (absolute or relative) to where the secrets obtained from Psycle Vault should be written to. If ommitted, the secrets will simple be printed out on the screen.
* **--renew** - (OPTIONAL) Whether to automatically renew the token at the same time

Examples:
```bash
$ yarn run psycle-vault get-secrets

$ yarn run psycle-vault get-secrets --format "myVar = {{SECRETS}};"

$ yarn run psycle-vault get-secrets --format "myVar = {{RESPONSE}};" --placeholder "{{RESPONSE}}"

$ yarn run psycle-vault get-secrets --tokenfile ./path/to/vault/token

$ yarn run psycle-vault get-secrets --tokenfile ./path/to/vault/token --secretsfile ./src/vault/secrets.json

$ yarn run psycle-vault get-secrets --tokenfile ./path/to/vault/token --format "export const environments = {{SECRETS}};" --secretsfile ./static/environments/environments.ts
```

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150" src="https://gitlab.psycle.com/uploads/-/system/user/avatar/30/avatar.png?width=400">
        <br />
        <a href="https://gitlab.psycle.com/david.blakemore">David Blakemore</a>
      </td>
      <td align="center">
        <img width="150" height="150" src="https://gitlab.psycle.com/uploads/-/system/user/avatar/4/ninjai.png?width=400">
        <br />
        <a href="https://gitlab.psycle.com/jpartington">James Partington</a>
      </td>
      <td align="center">
        <img width="150" height="150" src="https://secure.gravatar.com/avatar/4c2637761021dc4f8fb83f9a9274c209?s=180&d=identicon&width=400">
        <br />
        <a href="https://gitlab.psycle.com/stuart.messenger">Stuart Messenger</a>
      </td>
    </tr>
  </tbody>
</table>
