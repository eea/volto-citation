import React, { useState, useEffect } from 'react';
import { Tab, Button } from 'semantic-ui-react';
import { useCopyToClipboard } from '@eeacms/volto-citation/helpers';
import { Icon } from '@plone/volto/components';

import Cite from 'citation-js';

import copySVG from '@plone/volto/icons/copy.svg';
import checkSVG from '@plone/volto/icons/check.svg';

import './styles.less';

const CopyUrlButton = ({ citation, className }) => {
  const [copyUrlStatus, copyUrl] = useCopyToClipboard(citation);
  const [icon, setIcon] = useState(copySVG);

  useEffect(() => {
    if (copyUrlStatus === 'copied') {
      setIcon(checkSVG);
      setTimeout(() => {
        setIcon(copySVG);
      }, [5000]);
    }
  }, [copyUrlStatus]);

  return (
    <Button className="citation-copy item" onClick={copyUrl}>
      <Icon name={icon} />
    </Button>
  );
};

function Citation({ title, authors, link, type = 'article', year, mode }) {
  const [format, setFormat] = useState('bibliography');
  const [subFormat, setSubFormat] = useState('html');
  const [citation, setCitation] = useState();

  const changeFormat = {
    0: () => {
      setFormat('bibliography');
      setSubFormat('html');
    },
    1: () => {
      setFormat('bibliography');
      setSubFormat('text');
    },
    2: () => {
      setFormat('ris');
      setSubFormat(' ');
    },
    3: () => {
      setFormat('bibtex');
      setSubFormat();
    },
  };

  React.useEffect(() => {
    const citation = new Cite({
      title: title,
      type: type,
      author: authors.map((author) => {
        return {
          literal: author,
        };
      }),

      issued: { 'date-parts': [[year]] },
      URL: link,
    });

    const output = citation.format(format, {
      format: subFormat,
      template: 'apa',
    });
    setCitation(output);

    if (subFormat === 'html')
      setCitation(
        `<blockquote>
  <p>(${year}).</p>
  <p>${title}</p>
  <p>${authors.map((author, index) => {
    const separator = index < authors.length - 1 ? ', ' : '';
    return (author || '') + separator;
  })}
  </p>
  <a href=${link}>${link}</a>
</blockquote>`,
      );
  }, [authors, format, year, link, subFormat, title, type]);

  const modes = [
    {
      menuItem: 'Html',
      render: () => (
        <Tab.Pane attached={false}>
          <blockquote>
            <p>({year}).</p>
            <p>{title}</p>
            <p>
              {authors.map((author, index) => {
                let separator = '';
                if (index < authors.length - 1) separator = ', ';
                return (author || '') + separator;
              })}
            </p>
            {mode === 'edit' ? <p>{link}</p> : <a href={link}>{link}</a>}
          </blockquote>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Text',
      render: () => (
        <Tab.Pane attached={false}>
          <pre>{citation}</pre>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'RIS',
      render: () => (
        <Tab.Pane attached={false}>
          <pre>{citation}</pre>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'BibTex',
      render: () => (
        <Tab.Pane attached={false}>
          <pre>{citation}</pre>
        </Tab.Pane>
      ),
    },
    {
      menuItem: <CopyUrlButton citation={citation} />,
    },
  ];

  return (
    <div className="citation-block">
      <Tab
        panes={modes}
        onTabChange={(e, data) => {
          changeFormat[data.activeIndex]();
        }}
      />
    </div>
  );
}

export default Citation;
