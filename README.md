# simply-portofolio-apps
simple product simply-portofolio app with:
- ⚡️ Next.js 13
- ⚛️ React 18
- 📏 ESLint — Find and fix problems in your code, also will **auto sort** your imports
- Zustand
- and more

#### Minimum Requirements
* node `18.17.0`
* npm `9.6.7`

### Getting Started

After confirming that your [requirements](#requirements),
you can start the site by running these commands:

```bash
$ git clone {this.repo} simply-portofolio-apps
$ change .env.example to .env
$ npm i                             # with minimum requirement node
$ npm run dev                       # Running development mode
```

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`dev` |Serves your app at `localhost:3000`|
|`build`|Compiles the application to .next|
|`start` |Serves your builded app at `localhost:3000`|
|`lint`|Run javascript linter.|
