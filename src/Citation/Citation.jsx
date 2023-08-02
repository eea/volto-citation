import React, { useState, useEffect } from 'react';
import { Tab, Label, Menu } from 'semantic-ui-react';
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
    <Label
      floating
      basic
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') copyUrl();
      }}
    >
      <Icon
        name={icon}
        onClick={copyUrl}
        className="citation-copy"
        tabIndex={0}
      />
    </Label>
  );
};

function Citation({ title, authors, link, type = 'article', year, mode }) {
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
      return citationObject
        .format(format, {
          format: subFormat,
          template: 'apa',
        })
        .replace(/(^[ \t]*\n)/gm, '');
  };

  const modes = [
    {
      menuItem: (
        <Menu.Item
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.target.click();
          }}
        >
          Html
        </Menu.Item>
      ),
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

            <CopyUrlButton citation={cite('html')} />
          </blockquote>
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.target.click();
          }}
        >
          Text
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane attached={false}>
          <div className="text">
            <pre>{cite('bibliography', 'text')}</pre>

            <CopyUrlButton citation={cite('bibliography', 'text')} />
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.target.click();
          }}
        >
          Ris
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane attached={false}>
          <div className="text">
            <pre>{cite('ris')}</pre>

            <CopyUrlButton citation={cite('ris')} />
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.target.click();
          }}
        >
          BibTex
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane attached={false}>
          <div className="text">
            <pre>{cite('bibtex')}</pre>

            <CopyUrlButton citation={cite('bibtex')} />
          </div>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="citation-block tabs-block">
      <Tab
        panes={modes}
        menu={{ className: 'ui green fluid pointing secondary menu' }}
      />
    </div>
  );
}

export default Citation;
