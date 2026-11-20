import React from 'react';
import Citation from './Citation';

function CitationBlockView({ data }) {
  return (
    <div>
      <Citation
        title={data?.title || ''}
        authors={(data?.authors || []).map((field) => field.author)}
        link={data.url || ''}
        year={data.year ?? 'n.d.'}
      />
    </div>
  );
}

export default CitationBlockView;
