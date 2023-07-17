import React from 'react';
import Citation from './Citation';

function CitationBlockView() {
  return (
    <div>
      <Citation
        title="Formatarea bernouli"
        authors={[{ given: 'Alexandru', family: 'Ardeleanu' }]}
        link="google.com"
        year={1939}
      />
    </div>
  );
}

export default CitationBlockView;
