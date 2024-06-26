declare module '*.scss' {
  type IClassNames = Record<string, string>
  const classNames: IClassNames
  export = classNames
}

// Или еще такой вариант
// declare module "*.module.css";
// declare module "*.module.scss";

declare module '*.jpg'
declare module '*.png'
declare module '*.jpeg'
declare module '*.svg' {
  import type React from 'react'
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
  export default SVG
}

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __IS_DEV__: boolean
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __API__: string
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __PROJECT__: 'storybook' | 'frontend' | 'jest'

declare type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

declare type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T
}
