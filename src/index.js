import accordionSVG from '@plone/volto/icons/list-arrows.svg';
import { CitationBlockEdit, CitationBlockView } from './components';
import rightSVG from '@plone/volto/icons/right-key.svg';
import leftSVG from '@plone/volto/icons/left-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';

const applyConfig = (config) => {
  config.blocks.blocksConfig.citation = {
    id: 'citation',
    title: 'Citation',
    icon: accordionSVG,
    group: 'common',
    titleIcons: {
      closed: { leftPosition: rightSVG, rightPosition: leftSVG },
      opened: { leftPosition: downSVG, rightPosition: downSVG },
      size: '24px',
    },
    view: CitationBlockView,
    edit: CitationBlockEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
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
