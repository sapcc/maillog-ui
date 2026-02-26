Important: This plugin was migrated to elektra https://github.com/SAP-cloud-infrastructure/elektra and is no longer maintained here. Please refer to the elektra repository for the latest updates and maintenance of this plugin.

# maillog-ui

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Built with Juno](https://cloudoperators.github.io/juno/built-with-juno.svg)](https://github.com/cloudoperators/juno)

This is the ui for the maillog client

Copy the local [secretProps.template.json](./secretProps.template.json) to `./secretProps.json` to locally inject a `props.endpoint` expecting the k8s api server running on `http://127.0.0.1:8090`.

```
cp secretProps.template.json secretProps.json
```

Spin up a local instance via:

```
npm install
npm start
```

Frontend is served on [localhost:3000](http://localhost:3000)
