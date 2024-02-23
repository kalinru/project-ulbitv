import { memo, type FC } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './[FTName].module.scss';

interface [FTName]Props {
  className?: string;
}

export const [FTName]: FC<[FTName]Props> = memo(({ className }) => {
  return (
    <div className={classNames(cls.[FTName], {}, [className])}>
      
    </div>
  );
})

[FTName].displayName = '[FTName]'
