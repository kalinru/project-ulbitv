import { type Meta, type StoryObj } from '@storybook/react'
import { ArticleRecommendationsList } from './ArticleRecommendationsList'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

const article = {
  title: 'MOCK статья',
  subtitle: 'БиологиЯ',
  img: 'https://kartinkin.net/uploads/posts/2022-05/1652214942_9-kartinkin-net-p-biologiya-krasivie-kartinki-10.jpg',
  views: 1022,
  createdAt: '26.02.2022',
  userId: '1',
  type: [
    'SCIENCE'
  ],
  blocks: [],
  id: 'guOLlgD'
}

const meta = {
  title: 'features/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ArticleRecommendationsList>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {

  },
  decorators: [StoreDecorator({})],
  parameters: {
    mockData: [
      {
        url: __API__ + '/articles?_limit=4',
        method: 'GET',
        status: 200,
        response: [
          { ...article, id: 1 },
          { ...article, id: 2 },
          { ...article, id: 3 },
          { ...article, id: 4 }
        ]
      }
    ]
  }
}
