import React from 'react';
import { CitationBlockSchema } from '../../schema';
import { BlockDataForm } from '@plone/volto/components';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  Citation: {
    id: 'Citation',
    defaultMessage: 'Citation',
  },
  NoCitation: {
    id: 'No Citation selected',
    defaultMessage: 'No Citation selected',
  },
});

const CitationSidebar = (props) => {
  const { data, block, onChangeBlock } = props;
  console.log({ data }, { block }, { onChangeBlock });
  const intl = useIntl();
  const schema = CitationBlockSchema({ ...props, intl });

  return (
    <>
      <BlockDataForm
        schema={schema}
        title={intl.formatMessage(messages.Citation)}
        onChangeField={(id, value) => {
          onChangeBlock(block, {
            ...data,
            [id]: value,
          });
        }}
        onChangeBlock={onChangeBlock}
        formData={data}
        block={block}
      />
    </>
  );
};

export default CitationSidebar;
