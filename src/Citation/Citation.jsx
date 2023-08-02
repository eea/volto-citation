import React, { useState, useEffect } from 'react';
import { Tab, Button, Label } from 'semantic-ui-react';
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

  return <Icon name={icon} onClick={copyUrl} className="citation-copy" />;
};

function Citation({ title, authors, link, type = 'article', year, mode }) {
  const [format, setFormat] = useState('bibliography');
  const [subFormat, setSubFormat] = useState('html');
  const [citation, setCitation] = useState();

  const cite = (format, subFormat) => {
    const citationObject = new Cite({
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

    if (format === 'html')
      return `<blockquote>
                <p>(${year}).</p>
                <p>${title}</p>
                <p>${authors.map((author, index) => {
                  const separator = index < authors.length - 1 ? ', ' : '';
                  return (author || '') + separator;
                })}
                </p>
                <a href=${link}>${link}</a>
              </blockquote>`;
    else
      return citationObject.format(format, {
        format: subFormat,
        template: 'apa',
      });
  };

  const modes = [
    {
      menuItem: 'Html',
      render: () => (
        <Tab.Pane attached={false}>
          <blockquote className="text">
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
            <Label floating basic>
              <CopyUrlButton citation={cite('html')} />
            </Label>
          </blockquote>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Text',
      render: () => (
        <Tab.Pane attached={false}>
          <div className="text">
            <pre>{cite('bibliography', 'text')}</pre>
            <Label floating basic>
              <CopyUrlButton citation={cite('bibliography', 'text')} />
            </Label>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'RIS',
      render: () => (
        <Tab.Pane attached={false}>
          <div className="text">
            <pre>{cite('ris')}</pre>
            <Label floating basic>
              <CopyUrlButton citation={cite('ris')} />
            </Label>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'BibTex',
      render: () => (
        <Tab.Pane attached={false}>
          <div className="text">
            <pre>{cite('bibtex')}</pre>
            <Label floating basic>
              <CopyUrlButton citation={cite('bibtex')} />
            </Label>
          </div>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="citation-block tabs-block">
      <Tab
        panes={modes}
        onTabChange={(e, data) => {
          console.log(data);
        }}
        menu={{ className: 'ui green fluid pointing secondary menu' }}
      />
    </div>
  );
}

export default Citation;
