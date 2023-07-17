import React, { useState } from 'react';
import './styles.less';
import { Menu, Button } from 'semantic-ui-react';
import { useCopyToClipboard } from '@eeacms/volto-citation/helpers';
import Cite from 'citation-js';

const CopyUrlButton = ({ citation, buttonText }) => {
  const [copyUrlStatus, copyUrl] = useCopyToClipboard(citation);

  if (copyUrlStatus === 'copied') {
    buttonText = 'Copied!';
  } else if (copyUrlStatus === 'failed') {
    buttonText = 'Copy failed. Please try again.';
  }

  return (
    <Button primary onClick={copyUrl} className="copy-button">
      {buttonText}
    </Button>
  );
};

function Citation({ title, author, link, type = 'article', year }) {
  const [format, setFormat] = useState('bibliography');
  const [subFormat, setSubFormat] = useState('html');
  const [citation, setCitation] = useState();

  React.useEffect(() => {
    let citation = new Cite({
      title: title,
      type: type,
      author: author,
      issued: { 'date-parts': [[year]] },
      URL: link,
    });
    let output = citation.format(format, {
      format: subFormat,
      template: 'apa',
      lang: 'en-US',
    });
    setCitation(output);
    if (subFormat === 'html')
      setCitation(
        `<blockquote> <p>(${year}).</p> <p>${title}</p>  <a href=${link}>${link}</a> </blockquote>`,
      );
  }, [author, format, year, link, subFormat, title, type]);

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
            <CopyUrlButton citation={citation} buttonText="Copy Citation" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      {subFormat === 'text' || format === 'bibtex' || format === 'ris' ? (
        <pre>{citation}</pre>
      ) : (
        <blockquote>
          <p>({year}).</p>
          <p>{title}</p>
          <a href={link}>{link}</a>
        </blockquote>
      )}
    </div>
  );
}

export default Citation;
