import React, { useState, useEffect, useRef } from 'react';
import { Tab, Label, Menu } from 'semantic-ui-react';
import { useCopyToClipboard } from '@eeacms/volto-citation/helpers';
import { Icon } from '@plone/volto/components';
import loadable from '@loadable/component';

import copySVG from '@plone/volto/icons/copy.svg';
import checkSVG from '@plone/volto/icons/check.svg';

import './styles.less';

const CitationJS = loadable.lib(() => import('citation-js'));

const CopyUrlButton = ({ citation, className }) => {
  const [copyUrlStatus, copyUrl] = useCopyToClipboard(citation);
  const [icon, setIcon] = useState(copySVG);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (copyUrlStatus === 'copied') {
      setIcon(checkSVG);
      timeoutRef.current = setTimeout(() => {
        setIcon(copySVG);
      }, 5000);
    }
  }, [copyUrlStatus]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

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
  const [htmlCitation, setHtmlCitation] = useState('');
  const [textCitation, setTextCitation] = useState('');
  const [risCitation, setRisCitation] = useState('');
  const [bibtexCitation, setBibtexCitation] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadCitation = async () => {
      const module = await CitationJS.load();
      const { default: Cite } = module;
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

      if (isMounted) {
        setHtmlCitation(`<blockquote>
<p>(${year}).</p>
<p>${title}</p>
<p>${authors.map((author, index) => {
          const separator = index < authors.length - 1 ? ', ' : '';
          return (author || '') + separator;
        })}
</p>
<a href=${link}>${link}</a>
</blockquote>`);

        setTextCitation(
          citationObject
            .format('bibliography', {
              format: 'text',
              template: 'apa',
            })
            .replace(/(^[ \t]*\n)/gm, ''),
        );

        setRisCitation(citationObject.format('ris'));
        setBibtexCitation(citationObject.format('bibtex'));
      }
    };

    loadCitation();

    return () => {
      isMounted = false;
    };
  }, [title, authors, link, type, year]);

  const modes = [
    {
      key: 'html',
      menuItem: (
        <Menu.Item
          key="html"
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
          <div className="text">
            <div dangerouslySetInnerHTML={{ __html: htmlCitation }} />
            <CopyUrlButton citation={htmlCitation} />
          </div>
        </Tab.Pane>
      ),
    },
    {
      key: 'text',
      menuItem: (
        <Menu.Item
          key="text"
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
            <pre>{textCitation}</pre>
            <CopyUrlButton citation={textCitation} />
          </div>
        </Tab.Pane>
      ),
    },
    {
      key: 'ris',
      menuItem: (
        <Menu.Item
          key="ris"
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
            <pre>{risCitation}</pre>
            <CopyUrlButton citation={risCitation} />
          </div>
        </Tab.Pane>
      ),
    },
    {
      key: 'bibtex',
      menuItem: (
        <Menu.Item
          key="bibtex"
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
            <pre>{bibtexCitation}</pre>
            <CopyUrlButton citation={bibtexCitation} />
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
