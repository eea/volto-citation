# volto-citation

[![Releases](https://img.shields.io/github/v/release/eea/volto-citation)](https://github.com/eea/volto-citation/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-citation%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-citation/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-citation&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-citation)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-citation&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-citation)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-citation&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-citation)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-citation&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-citation)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-citation%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-citation/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-citation&branch=develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-citation&branch=develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-citation&branch=develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-citation&branch=develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-citation&branch=develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-citation&branch=develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-citation&branch=develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-citation&branch=develop)


[Volto](https://github.com/plone/volto) Citation add-on

## Features

![screen-capture](https://raw.githubusercontent.com/eea/volto-citation/master/docs/volto-citation.gif)

Volto Citation shows users how to cite an article. It supports four types of citation: HTML, TEXT, RIS and BibTeX. On top of that you can copy the citation by pressing on the copy button

## Getting started

### Try volto-citation with Docker

      git clone https://github.com/eea/volto-citation.git
      cd volto-citation
      make
      make start

Go to http://localhost:3000

`make start` now defaults to Volto 18. To run the same setup against Volto 17, use:

      VOLTO_VERSION=17 make
      VOLTO_VERSION=17 make start

### Add volto-citation to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "dependencies": {
       "@eeacms/volto-citation": "*"
   }
   ```

   and `volto.config.js`:

   ```JavaScript
   const addons = ['@eeacms/volto-citation'];
   ```

* If not, create one with Cookieplone, as recommended by the official Plone documentation for Volto 18+:

   ```
   uvx cookieplone project
   cd project-title
   ```

1. Install or update dependencies, then start the project:

   ```
   make install
   ```

   For a Cookieplone project, start the backend and frontend in separate terminals:

   ```
   make backend-start
   make frontend-start
   ```

   For a legacy Volto 17 project, install the package with `yarn` and restart the frontend as usual.

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-citation/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-citation/blob/master/DEVELOP.md).

## Secret Scanning

This repository uses the Betterleaks GitHub Action to scan the current
repository content on every push and pull request. The scan uses the rules in
`.gitleaks.toml` and uploads a `betterleaks-report` artifact when a finding is
detected.

If the optional SMTP secrets are configured, failed scans also send an email to
the last commit committer. The workflow expects these repository or
organization secrets:

- `SMTP_URL`
- `SMTP_PORT` (optional, defaults to `25`)
- `SMTP_EMAIL`
- `SMTP_PASSWORD` (optional if the SMTP server does not require authentication)

Port `465` is sent with direct TLS; other ports use the default SMTP handshake.
The email includes a short finding summary from the redacted Betterleaks report,
including the redacted matched line from each finding.

There are three common outcomes:

1. **Everything is OK.** The `Betterleaks / Scan for secrets` check is green and
   no action is needed. Regular references to runtime values are OK, for example:

   ```js
   const tokenFromCookie = req.universalCookies.get('auth_token');
   ```

2. **A real secret was found.** The check is red and the workflow log asks you to
   download the `betterleaks-report` artifact. Open the artifact from the GitHub
   Actions run and check the reported file, line and rule. Remove the committed
   value, move it to the proper secret store, and rotate it if it was exposed.
   A report entry looks like this:

   ```json
   {
     "RuleID": "secret-literal-assignment",
     "File": "src/config.js",
     "StartLine": 12,
     "Secret": "[REDACTED]"
   }
   ```

3. **The finding is a false positive.** Keep the value only if it is clearly not
   sensitive, such as a test fixture, placeholder, or public example. Add
   `betterleaks:allow` on the same line and include a short explanation in the
   pull request.

   ```js
   const testPassword = 'admin'; //betterleaks:allow
   ```

   ```yaml
   password: "admin" #betterleaks:allow
   ```

Do not add `betterleaks:allow` to real credentials.

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-citation/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
