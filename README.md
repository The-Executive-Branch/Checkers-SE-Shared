# Checkers Shared Data Types

This package holds the data models shared between the Electron client and the Express server to avoid drift and establish a contract between network calls. The data types are split into two modules, Auth and Game, with each containing data transfer objects for respective network requests and responses.

## Add Package as Dependency

To add this package as a dependency to the Electon client and Express server, run the following command in the terminal:

```bash
npm install -D github:The-Executive-Branch/Checkers-SE-Shared#v1.0.0
```

Verify the package is included by checking the `devDependencies` in `package.json`

```
"devDependencies": {
  "checkers-shared-types": "github:The-Executive-Branch/Checkers-SE-Shared#v1.0.0"
}
```

Finally, import the type needed into the Typescript module, like so:

```ts
import type { LoginResponse } from "checkers-shared-types";
```
