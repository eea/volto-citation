import React from 'react';
import Citation from './Citation';

function CitationBlockView({ data }) {
  console.log(data);
  return (
    <div>
      <Citation
        title={data?.title || ''}
        authors={data.author || []}
        link={data.url}
        year={data.year}
      />
    </div>
  );
}

export default CitationBlockView;
