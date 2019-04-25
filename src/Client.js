// kentico cloud
import { DeliveryClient, TypeResolver } from "kentico-cloud-delivery";
import { defaultProjectId } from "./Utilities/configProjectId";
// models
import { Hero } from "./Models/Hero";
import {NavigationItem} from './Models/Header'

const projectId = defaultProjectId;
const previewApiKey = "";

// configure type resolvers
let typeResolvers = [
  new TypeResolver("home_page_hero_unit", () => new Hero()),
  new TypeResolver("navigation_item", () => new NavigationItem())
];

const isPreview = () => previewApiKey !== "";

let Client = new DeliveryClient({
  projectId: projectId,
  typeResolvers: typeResolvers,
  previewApiKey: previewApiKey,
  enablePreviewMode: isPreview()
});

export { Client };
// import { TypeResolver } from 'kentico-cloud-delivery';
// import { defaultProjectId } from "./Utilities/configProjectId";
// import { Hero } from "./Models/Hero";

// const config = {
//   projectId: defaultProjectId,
//   typeResolvers: [new TypeResolver('home_page_hero_unit', () => new Hero())]
// };

// export default config;