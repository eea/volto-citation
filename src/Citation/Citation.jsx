import React, { useState, useEffect } from 'react';
import './styles.less';
import { Menu } from 'semantic-ui-react';
import { useCopyToClipboard } from '@eeacms/volto-citation/helpers';
import copySVG from '@plone/volto/icons/copy.svg';
import checkSVG from '@plone/volto/icons/check.svg';
import { Icon } from '@plone/volto/components';

import Cite from 'citation-js';

const CopyUrlButton = ({ citation }) => {
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

  return <Icon className="citation-copy" name={icon} onClick={copyUrl} />;
};

function Citation({ title, authors, link, type = 'article', year, mode }) {
  const [format, setFormat] = useState('bibliography');
  const [subFormat, setSubFormat] = useState('html');
  const [citation, setCitation] = useState();

  React.useEffect(() => {
    let citation = new Cite({
      title: title,
      type: type,
      author: authors,
      issued: { 'date-parts': [[year]] },
      URL: link,
    });
    let output = citation.format(format, {
      format: subFormat,
      template: 'apa',
    });
    setCitation(output);
    if (subFormat === 'html')
      setCitation(
        `<blockquote> <p>(${year}).</p> <p>${title}</p>  <p>
        ${authors.map((author, index) => {
          let separator = '';
          if (index < authors.length - 1) separator = ' , ';
          return (
            author?.family + ' ' + author.given?.charAt(0) + '.' + separator
          );
        })}
      </p>  <a href=${link}>${link}</a> </blockquote>`,
      );
  }, [authors, format, year, link, subFormat, title, type]);

  const handleChangeFormat = (format, subformat) => {
    setFormat(format);
    setSubFormat(subformat);
  };
  return (
    <div className="citation-block">
      <Menu pointing>
        <Menu.Item
          name="html"
          as="a"
          active={subFormat === 'html'}
          onClick={() => {
            handleChangeFormat('bibliography', 'html');
          }}
        >
          HTML
        </Menu.Item>

        <Menu.Item
          name="text"
          active={subFormat === 'text'}
          onClick={() => {
            handleChangeFormat('bibliography', 'text');
          }}
        >
          Text
        </Menu.Item>

        <Menu.Item
          name="ris"
          active={format === 'ris'}
          onClick={() => {
            handleChangeFormat('ris', '');
          }}
        >
          RIS
        </Menu.Item>
        <Menu.Item
          name="BibTex"
          active={format === 'bibtex'}
          onClick={() => {
            handleChangeFormat('bibtex');
          }}
        >
          BibTex
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <CopyUrlButton citation={citation} />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      {subFormat === 'text' || format === 'bibtex' || format === 'ris' ? (
        <pre>{citation}</pre>
      ) : (
        <blockquote>
          <p>({year}).</p>
          <p>{title}</p>
          <p>
            {authors.map((author, index) => {
              let separator = '';
              if (index < authors.length - 1) separator = ' , ';
              return (
                (author?.family || '') +
                ' ' +
                (author.given?.charAt(0) || '') +
                '.' +
                separator
              );
            })}
          </p>
          {mode === 'edit' ? <p>{link}</p> : <a href={link}>{link}</a>}
        </blockquote>
      )}
    </div>
  );
}

export default Citation;
