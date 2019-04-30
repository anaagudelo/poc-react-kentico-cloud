import { DeliveryClient, TypeResolver } from "kentico-cloud-delivery";
import { defaultProjectId } from "./Utilities/configProjectId";
// models
import {Home} from './Models/Home'

const projectId = defaultProjectId;
const previewApiKey = "";

// configure type resolvers
let typeResolvers = [
    new TypeResolver('home', () => new Home()),

];

const isPreview = () => previewApiKey !== "";

let Client = new DeliveryClient({
  projectId: projectId,
  typeResolvers: typeResolvers,
  previewApiKey: previewApiKey,
  enablePreviewMode: isPreview()
});

export { Client };