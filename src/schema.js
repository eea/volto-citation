import { defineMessages } from 'react-intl';

const messages = defineMessages({
  Citation: {
    id: 'Citation',
    defaultMessage: 'Citation',
  },
  CitationUrl: {
    id: 'URL',
    defaultMessage: 'URL',
  },
  Year: {
    id: 'year',
    defaultMessage: 'Year',
  },
  Title: {
    id: 'title',
    defaultMessage: 'Title',
  },
  Author: {
    id: 'author',
    defaultMessage: 'Author',
  },
  Given: {
    id: 'given',
    defaultMessage: 'Given',
  },
  Family: {
    id: 'family',
    defaultMessage: 'Family',
  },
});

export const CitationBlockSchema = (props) => {
  const authorSchema = {
    title: props.intl.formatMessage(messages.Author),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['given', 'family'],
      },
    ],
    properties: {
      given: {
        title: props.intl.formatMessage(messages.Given),
        widget: 'default',
      },
      family: {
        title: props.intl.formatMessage(messages.Family),
        widget: 'default',
      },
    },
    required: [],
  };
  return {
    title: props.intl.formatMessage(messages.Citation),
    block: 'citation',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['url', 'year', 'title', 'author'],
      },
    ],

    properties: {
      url: {
        title: props.intl.formatMessage(messages.CitationUrl),
        widget: 'url',
      },
      year: {
        title: props.intl.formatMessage(messages.Year),
        widget: 'default',
      },
      title: {
        title: props.intl.formatMessage(messages.Title),
        widget: 'default',
      },
      author: {
        title: props.intl.formatMessage(messages.Author),
        widget: 'object_list',
        schema: authorSchema,
      },
    },
    required: [],
  };
};
