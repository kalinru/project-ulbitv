export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_EDIT = 'article_edit',
  ADMIN_PANEL = 'admin_panel',
  FORBIDDEN = 'forbidden',

  // last
  NOT_FOUND = 'not_found',
}

export interface RouteParams {
  main: []
  about: []
  profile: [string]
  articles: []
  article_details: [string]
  article_create: []
  article_edit: [string]
  admin_panel: []
  forbidden: []
  not_found: []
}

export type RouteFunction<Params extends any[] = any[]> = (
  ...args: Params
) => string

export type Routes = {
  [K in AppRoutes]: RouteFunction<RouteParams[K]>
}

export const RoutePath: Routes = {
  main: () => '/',
  about: () => '/about',
  article_edit: (id) => `/articles/${id}/edit`,
  article_details: (id) => `/articles/${id}`,
  article_create: () => '/articles/new',
  forbidden: () => '/forbidden',
  articles: () => '/articles',
  profile: (id) => `/profile/${id}`,
  admin_panel: () => '/admin',
  not_found: () => '*',
}
