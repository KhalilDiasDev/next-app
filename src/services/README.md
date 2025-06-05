# :computer: Services 

The **Services** folder contains functions for making requests to both internal (_SSR_ functions) and external (external URLs) APIs. All the requests are made using the `axios` package.

---

## :thinking: Understanding structure

In the `index.ts` file, an API instance is created, where the base URL, timeout, and authentication parameters are set.

Once the API instance is created, it will be utilized in another file specifically created to group requests for a particular service, such as requests related to workspaces, connectors, etc.

The individual services are created using the concept of classes, where each request is implemented as a static method. Here's an example:

```typescript
// service related to form requests
export class FormService {
  /**
   * @name createForm
   * @function
   * @description creates a new workspace in the database
   * @param data the workspace data
   */
  static createForm(data: Workspace.FormProps) {
    return api.request({
      url: "/forms",
      method: "POST",
      data,
    });
  }

...
}
```
