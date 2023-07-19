import accordionSVG from '@plone/volto/icons/list-arrows.svg';
import { CitationBlockEdit, CitationBlockView } from './components';
import { CitationBlockSchema } from './schema';

const applyConfig = (config) => {
  config.blocks.blocksConfig.citation = {
    ...config.blocks.blocksConfig.citation,
    id: 'citation',
    title: 'Citation',
    icon: accordionSVG,
    view: CitationBlockView,
    edit: CitationBlockEdit,
    schema: CitationBlockSchema,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: false,
    sidebarTab: 1,
    options: {
      styled: true,
      fluid: true,
    },
    defaults: {},
    security: {
      addPermission: [],
      view: [],
    },
  };

  return config;
};

export default applyConfig;
