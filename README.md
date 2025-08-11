# {{ Project title }}

{{ Project brief description }}

## URLS

* Production: [TBD](TBD)
* Staging: [TBD](TBD)
* Development: [TBD](TBD)
* Slack Channel: [TBD](TBD)
* BaseCamp Project: [TBD](TBD)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes. See deployment for notes on how to deploy the project to a remote environment.

### Dependencies

> Specify the locally installed dependencies that a developer will need in order to run the project.

* Git: `brew install git`
* Docker: You can obtain the latest version of Docker from the Kandji Self Service store
* {{ Any additional dependencies following the same format }}

### Setup

> Add a point-by-point breakdown of _everything_ a new developer needs to do to get the project running locally, how it
> is done and which team members must be contacted for access/secrets/data/information. Most projects run within one of
> Docker. Indicate any additional configuration a developer may need to perform (such as updating a .env file) without
> assumptions to help save time when onboarding additional developers.

* Ensure that you have **Docker** installed on your local machine
* Link your Docker compose override file using `ln -s docker-compose.override.local.yml docker-compose.override.yml`
    * if you wish to make changes to this file, instead copy it by doing
      `cp docker-compose.override.local.yml docker-compose.override.yml`

# Vault
> If you require access to Vault for things such as keys/secrets, see the following Wiki article:
> {PLACEHOLDER}

> Detail post setup steps to get the project running locally and viewable in a browser. Include any processes that are
> needed to build files from a source.

* In a terminal tab, run `docker compose up -d` to start your development environment
* In a separate terminal tab, run `docker compose exec make build-assets`
* build/watch the local static files for the front-end.
* Navigate to `http://localhost:8080` once the initial front-end build is complete.

## Testing

> Detail any tests or checks that run on a project. Confirm if they run via CI and if they can be run locally.
* Run `yarn lint-static` to lint the static files locally on this project.
* Ensure all Vulnerability/License/Code Quality jobs are passing in CI

## Deployment

### Environment

> Details where the environments are, who maintains them and how access is granted.

* GCP / Appengine Standard / Python 3
* my-project.appspot.com
* Psycle owned
* Access grated via IAM

### Dependencies

> Detail any dependencies that are needed to allow deployment. Software, access tokens, etc.

* Google Cloud SDK: [Latest version](https://cloud.google.com/sdk/install)
* {{ Any additional dependencies following the same format }}

### Deploying

> Detail the commands that need to be run in order to deploy. Ideally deploys will be Scripted.

* Run `make deploy-staging` to begin the deployment process to staging
* Run `make deploy-production` to begin the deployment process to production

## Team members

* Project manager: [TBD](https://gitlab.psycle.com/tbd)
* Technical director: [TBD](https://gitlab.psycle.com/tbd)
* Technical team lead: [TBD](https://gitlab.psycle.com/tbd)
