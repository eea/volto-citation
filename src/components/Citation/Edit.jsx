import React from 'react';
import Citation from './Citation';
import { Icon, SidebarPortal } from '@plone/volto/components';
import CitationSidebar from './CitationSidebar';
function CitationBlockEdit(props) {
  const { data, block, onChangeBlock, selected } = props;
  return (
    <div>
      <Citation
        title={data?.title || ''}
        authors={data.author || []}
        link={data.url}
        year={data.year || 'n.d.'}
      />
      <SidebarPortal selected={selected}>
        <CitationSidebar
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </div>
  );
}

export default CitationBlockEdit;
