# :technologist: API

The **api** folder contains modular functions that are treated as na API endpoint instead of a page. Each subfolder represents a specific route to an API endpoint.

In addition, there is a function named `apiHandler` stored at `/utils/apiHandler` to handle different methods for the API endpoint. Here's an example:

Let's suppose we have a subfolder called `users`. To manage all the methods of this route, we can create separate files for each method and then join them at `index.ts` using the following script.

```typescript
import { apiHandler } from "@/utils/apiHandler";
import getUser from "./getUser";
import createUser from "./createUser";
import updateUser from "./updateUser";
import deleteUser from "./deleteUser";

const methods = {
  GET: getUser,
  POST: createUser,
  PUT: updateUser,
  DELETE: deleteUser,
};

export default apiHandler(methods);
```

In the example above, all the methods are defined and avaliable at the route `/api/users`.

---

## :motorway: Routes

### Auth

Used to manage the authentication process.

### Docker

Used to manage the status of Docker containers, including creating, starting, and stopping them. For more detailed information, please refer to the documentation provided within its respective folder.

### Write

#### Files

To write all the necessary files to run the workspace locally, there is a class called writeFiles located at `/src/utils/writeFiles`. In this class, each method is responsible for writing a specific part of the code that is necessary to build the SCIM Gateway project.

These methods are called in this endpoint, creating the necessary files to run the workspace. This endpoint is called whenever a page is refreshed or a connector is created/edited.

All the files are created dynamically based in values such as the directory, name of docker container and number of connectors and all the files are written in the file system using the package `fs`.

#### Forms

The process is analogous to writing form files, that is, there is a class called writeForm located at `/src/utils/writeForm`. Each method writes a specific part of the code to build the form page as a static website.
