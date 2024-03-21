import { ArticleBlockType } from '../../model/consts/consts'
import { type TArticleBlock } from '../../model/types/article'
import { ArticleCodeBlock } from '../ArticleCodeBlock/ArticleCodeBlock'
import { ArticleImageBlock } from '../ArticleImageBlock/ArticleImageBlock'
import { ArticleTextBlock } from '../ArticleTextBlock/ArticleTextBlock'

export const renderBlock = (block: TArticleBlock) => {
  switch (block.type) {
    case ArticleBlockType.CODE:
      return <ArticleCodeBlock key={block.id} data={block} />
    case ArticleBlockType.TEXT:
      return <ArticleTextBlock key={block.id} data={block} />
    case ArticleBlockType.IMAGE:
      return <ArticleImageBlock key={block.id} data={block} />
    default:
      return null
  }
}
