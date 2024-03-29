# volto-citation

[![Releases](https://img.shields.io/github/v/release/eea/volto-citation)](https://github.com/eea/volto-citation/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-citation%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-citation/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-citation-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-citation-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-citation-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-citation-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-citation-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-citation-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-citation-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-citation-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-citation%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-citation/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-citation-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-citation-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-citation-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-citation-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-citation-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-citation-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-citation-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-citation-develop)


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

### Add volto-citation to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-citation"
   ],

   "dependencies": {
       "@eeacms/volto-citation": "*"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --canary --addon @eeacms/volto-citation
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-citation/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-citation/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-citation/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
