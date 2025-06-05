export const value_proposition: Workspace.CanvasModelProps = {
  name: "value_proposition",
  label: "Value Proposition",
  description: "",
  elements: [
    {
      step: "F",
      title: "API Products and Services",
      type: "board",
      index: 6,
      rows: 8,
      cols: 2,
      offsetY: { after: 2 },
      notes: [],
      description: `
  List the APIs and other services required to fulfill the feature list. Remember no API is an island. Your API will need for example:

  - Identity and authentication services
  - Other APIs
  - Back-end integrations
  - Algorithm development
  - Storage
  - API management
  - Developer portal etc.`,
      link: "https://www.apiopscycles.com/resources/api-canvas-instructions",
    },
    {
      step: "D",
      index: 4,
      title: "Gain enabling features",
      type: "board",
      rows: 4,
      cols: 2,
      notes: [],
      description: `
      Match the expected gains with the gain enabling features of the API`,
      link: "https://www.apiopscycles.com/resources/api-canvas-instructions",
    },

    {
      step: "E",
      index: 5,
      title: "Pain releaving features",
      type: "board",
      rows: 4,
      cols: 2,
      offsetY: { after: 2 },
      notes: [],
      description: `
      Match the expected pains with the pain-relieving features and resources (for example SDK, instructions…)`,
      link: "https://www.apiopscycles.com/resources/api-canvas-instructions",
    },
    {
      type: "image",
      title: "",
      rows: 2,
      cols: 2,
      offsetY: { before: 3, after: 5 },
      notes: [],
      image: "/set.png",
      subtitle: "API product Market fit",
    },
    {
      step: "B",
      index: 2,
      title: "Gains",
      type: "board",
      subtitle: "Benefits for using API",
      description:
        "Look at the task list. Analyze what are the benefits of using an API to do the tasks. Think from the API Consuming application team’s perspective. What don't they need to do themselves (assuming they even could do it)?",
      link: "https://www.apiopscycles.com/resources/api-canvas-instructions",
      rows: 4,
      cols: 2,
      notes: [],
    },
    {
      step: "C",
      index: 3,
      title: "Pains",
      type: "board",
      subtitle: "Problems using API",
      description: `
      Why would the API consumer team not use the API? What problems do they see? Examples of problems:
      - Identifying end-users
      - Data formats
      - Privacy
      - Security
      - Response times
      - Agreements
      - Costs or
      - Feature compatibility.
 `,
      rows: 4,
      link: "https://www.apiopscycles.com/resources/api-canvas-instructions",

      cols: 2,
      offsetY: { after: 2 },
      notes: [],
    },
    {
      step: "A",
      index: 1,
      title: "Tasks",
      type: "board",
      subtitle: "Step by tasks API consumer needs to achieve",
      description: `
  What does the potential API consuming application need to do? Fill in a workflow of tasks when there is no API.

  Good APIs rely on good API design. Good design starts with the right context, namely a customer journey.

  A customer journey is like a business process from a customer’s point of view. It shows how and where they interact with your business, your people, your systems. In public sector, citizen journey may be more appropriate.

  Even internal API designs should start with a customer or employee journey.`,
      link: "https://www.apiopscycles.com/resources/api-canvas-instructions",
      rows: 8,
      cols: 2,
      offsetY: { after: 2 },
      notes: [],
    },
  ],
};
