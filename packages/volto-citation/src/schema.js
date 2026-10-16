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
  CitationUrlDescription: {
    id: 'URLDescription',
    defaultMessage: 'The url where the article can be found',
  },
  YearDescription: {
    id: 'YearDescription',
    defaultMessage: 'The year when the article was published',
  },
  TitleDescription: {
    id: 'TitleDescription',
    defaultMessage: 'The title of the article',
  },
  AuthorsDescription: {
    id: 'AauthorsDescription',
    defaultMessage: 'The authors that have contributed to the article',
  },
  AuthorDescription: {
    id: 'AuthorDescription',
    defaultMessage: 'One of the authors',
  },
  Year: {
    id: 'year',
    defaultMessage: 'Year',
  },
  Title: {
    id: 'title',
    defaultMessage: 'Title',
  },
  Authors: {
    id: 'authors',
    defaultMessage: 'Authors',
  },
  Author: {
    id: 'author',
    defaultMessage: 'Author',
  },
});

export const CitationBlockSchema = (props) => {
  const authorSchema = {
    title: props.intl.formatMessage(messages.Author),

    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['author'],
      },
    ],
    properties: {
      author: {
        title: props.intl.formatMessage(messages.Author),
        a: 'default',
        description: props.intl.formatMessage(messages.AuthorDescription),
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
        fields: ['title', 'year', 'authors', 'url'],
      },
    ],

    properties: {
      url: {
        title: props.intl.formatMessage(messages.CitationUrl),
        widget: 'url',
        description: props.intl.formatMessage(messages.CitationUrlDescription),
      },
      year: {
        title: props.intl.formatMessage(messages.Year),
        widget: 'default',
        description: props.intl.formatMessage(messages.YearDescription),
      },
      title: {
        title: props.intl.formatMessage(messages.Title),
        widget: 'default',
        description: props.intl.formatMessage(messages.TitleDescription),
      },
      authors: {
        title: props.intl.formatMessage(messages.Authors),
        widget: 'object_list',
        schema: authorSchema,
        description: props.intl.formatMessage(messages.AuthorsDescription),
      },
    },
    required: [],
  };
};
