# @eeacms/volto-citation

[![Releases](https://img.shields.io/github/v/release/eea/volto-citation)](https://github.com/eea/volto-citation/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-citation%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-citation/job/master/display/redirect)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-citation&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-citation)

[Volto](https://github.com/plone/volto) Citation add-on

## Features

![screen-capture](https://raw.githubusercontent.com/eea/volto-citation/master/docs/volto-citation.gif)

Volto Citation shows users how to cite an article. It supports four types of citation: HTML, TEXT, RIS and BibTeX. On top of that you can copy the citation by pressing on the copy button

## Upgrade

### Upgrading to 3.x

> This version requires `Volto 18` or `Volto 19` and Node.js 22.

No API or behaviour change: the block ids, the schema fields and the stored block data are the same
as 2.x, so citations written with 2.x keep rendering unchanged. The release adds Volto 19 support and
moves the repository to the Volto 19 layout, where the published package lives in
`packages/volto-citation`.

#### Breaking changes

- **Node.js 22 or newer is required** (`engines.node >= 22`), 2.x declared no engine.
- **React 18 is required.** The package declares `react` and `react-dom` as `^18.2.0` peers, 2.x
  declared no peers.
- **The package no longer ships the repository tooling.** The Cypress specs and the Jest setup are
  gone and the unit tests moved to Vitest next to the add-on, so nothing a site imports was removed.

## Requirements

### Backend

- [Plone](https://plone.org/download)
- [plone.restapi](https://pypi.org/project/plone.restapi/)

### Frontend

- Node.js: `>=22.0.0`

## Installation

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

1. Go to http://localhost:3000

1. Happy editing!

## License

See [LICENSE.md](LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
