export const business_model: Workspace.CanvasModelProps = {
  name: "business_model",
  label: "Business Model",
  description: "",
  elements: [
    {
      title: "Key partners",
      type: "board",
      step: 8,
      index: 8,
      rows: 6,
      cols: 2,
      notes: [],
      description: `
      Think about partners in this case as internal and external people outside your team. Look at the Key activities, Key resources, and all the API Consumer related fields. With whom do you need to co-operate to make these API –features alive and usable for the intended API Consumers?`,
      link: "https://www.apiopscycles.com/resources/api-business-model-canvas",
    },
    {
      title: "Cost",
      type: "board",
      step: 9,
      index: 9,
      rows: 3,
      cols: 5,
      offsetY: { after: 1 },
      notes: [],
      description: `
      You can either estimate the real costs or set maximum cost based on profit from the revenues. Figuring out real costs can be difficult before the architecture is designed. Remember the fixed monthly costs for running the architecture components. Also budget for continuous small development and maintenance. Include platform costs, licenses, and 3rd party API costs. The variable costs will usually increase to significant amounts per month when your API has over 1 million users.`,
      link: "https://www.apiopscycles.com/resources/api-business-model-canvas",
    },
    {
      title: "Key activities",
      type: "board",
      step: 6,
      index: 6,
      rows: 3,
      cols: 2,
      notes: [],
      description: `
      Look at the features in the Value proposition field. What do you need to build or create to achieve the features? Don’t forget platforms, testing environments, and other supporting elements. You might need to create also non-API things: agreement templates, marketing materials etc.`,
      link: "https://www.apiopscycles.com/resources/api-business-model-canvas",
    },
    {
      title: "Key resources",
      type: "board",
      step: 7,
      index: 7,
      rows: 3,
      cols: 2,
      notes: [],
      description: `
      Look at the field F in the AVP Canvas. Are there any existing APIs or other services that you can use to create the new API –features? What existing platforms, backend integrations, document templates etc. will you use?`,
      link: "https://www.apiopscycles.com/resources/api-business-model-canvas",
    },
    {
      title: "API value proposition",
      type: "board",
      step: 1,
      index: 1,
      rows: 6,
      cols: 2,
      offsetY: { before: 0, after: 2 },
      notes: [],
      description: `
      Write a short sentence based on the fields D and E telling the "what and why" of your API. Copy the feature fields D and E from the AVP Canvas to the Value proposition (1) field in API Canvas.`,
      link: "https://www.apiopscycles.com/resources/api-business-model-canvas",
    },
    {
      title: "Developer relations",
      type: "board",
      step: 3,
      index: 3,
      rows: 3,
      cols: 2,
      notes: [],
      description: `
      How do developers find the API? How to ensure API is usable for them, how to understand what it can be used for? How to test drive it? How is their subscription approved? Do they have to sign an agreement? How do they give feedback, see the roadmap, take part in the discussion?`,
      link: "https://www.apiopscycles.com/resources/api-business-model-canvas",
    },
    {
      title: "Channels",
      type: "board",
      step: 4,
      index: 4,
      rows: 3,
      cols: 2,
      notes: [],
      description: `
     The channels are the ways and places from which the developers find and can find, buy/request access to your API.`,
      link: "https://www.apiopscycles.com/resources/api-business-model-canvas",
    },
    {
      title: "Revenue streams",
      type: "board",
      step: 5,
      index: 5,
      rows: 3,
      cols: 5,
      offsetX: { before: -1, after: 0 },
      offsetY: { after: 1 },
      notes: [],
      description: `
  What is the API Business model of this API?

  - How does the API help you as an API Provider to create revenue (directly or indirectly)?
  - How can you reduce costs by offering an API?
  - How can the API Consumers create revenue or reduce costs by using the API?

  Revenue model is part of the business model. Revenue model, indirect or direct, only covers the way in which the company receives money or compensation from a product or service. What we need to consider is that APIs can play many roles in a company’s business model.
      
      `,
      link: "https://www.apiopscycles.com/resources/api-business-model-canvas",
    },
    {
      title: "API Consumer segments",
      type: "board",
      step: 2,
      index: 2,
      rows: 6,
      cols: 2,
      notes: [],
      description:
        "You have now looked at the problem from at least one customer segments perspective. Fill in API Consumer segments (2): what was the segment you thought about when doing the AVP Canvas? Who else could also use this API? This is a good place to talk to the people in charge of business development and partner relationships. Don’t forget also marketing and vendor management people.",
      link: "https://www.apiopscycles.com/resources/api-business-model-canvas",
    },
  ],
};
