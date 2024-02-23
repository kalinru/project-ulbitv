import { type ComponentStory, type ComponentMeta } from '@storybook/react'
import React from 'react'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import ArticleRating from './ArticleRating'

export default {
  title: 'features/ArticleRating',
  component: ArticleRating,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ArticleRating>

const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />

export const Normal = Template.bind({})
Normal.args = {
  articleId: '1'
}
Normal.decorators = [StoreDecorator({})]
Normal.parameters = {
  mockData: [
    {
      url: __API__ + '/article-ratings?userId=1&articleId=1',
      method: 'GET',
      status: 200,
      response: [
        { rate: 3 }
      ]
    }
  ]
}

export const Empty = Template.bind({})
Empty.args = {
  articleId: '1'
}
Empty.decorators = [StoreDecorator({})]
Empty.parameters = {
  mockData: [
    {
      url: __API__ + '/article-ratings?userId=1&articleId=1',
      method: 'GET',
      status: 200,
      response: []
    }
  ]
}
