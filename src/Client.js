import { TypeResolver } from 'kentico-cloud-delivery';
import { defaultProjectId } from "./Utilities/configProjectId";
import { HeroModel } from "./Models/HeroModel";
import { Article } from '../src/Models/Article';


const config = {
  projectId: defaultProjectId,
  typeResolvers: [
    new TypeResolver('home_page_hero_unit', () => new HeroModel()),
    new TypeResolver('article', () => new Article()),
  ]
};

export default config;
