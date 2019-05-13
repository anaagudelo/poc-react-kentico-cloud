import { DeliveryClient, TypeResolver } from "kentico-cloud-delivery";
import { defaultProjectId } from "./Utilities/configProjectId";
// models
import {Home} from './Models/Home'

const projectId = defaultProjectId;
const previewApiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyOGZjY2ViNmY5M2Q0YTNhOTllNGEwNjY5MjA5YzQ1MSIsImlhdCI6IjE1NTYwMjIxOTMiLCJleHAiOiIxOTAxNjIyMTkzIiwicHJvamVjdF9pZCI6IjM3OWE1NzBhNjRiNzAwMDNhZmIwMGUzYzMyZTk0MDQ0IiwidmVyIjoiMS4wLjAiLCJhdWQiOiJwcmV2aWV3LmRlbGl2ZXIua2VudGljb2Nsb3VkLmNvbSJ9._hxnysTB2wb5gzNgzlITSzqpyHWW4E8ZfItjmzHRNQs";

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