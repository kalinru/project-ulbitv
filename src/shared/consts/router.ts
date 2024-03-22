export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  SETTINGS = 'settings',
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
  settings: []
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
  settings: () => '/settings',
  admin_panel: () => '/admin',
  not_found: () => '*',
}

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [RoutePath.main()]: AppRoutes.MAIN,
  [RoutePath.about()]: AppRoutes.ABOUT,
  [RoutePath.article_edit(':id')]: AppRoutes.ARTICLE_EDIT,
  [RoutePath.article_details(':id')]: AppRoutes.ARTICLE_DETAILS,
  [RoutePath.article_create()]: AppRoutes.ARTICLE_CREATE,
  [RoutePath.forbidden()]: AppRoutes.FORBIDDEN,
  [RoutePath.articles()]: AppRoutes.ARTICLES,
  [RoutePath.profile(':id')]: AppRoutes.PROFILE,
  [RoutePath.settings()]: AppRoutes.SETTINGS,
  [RoutePath.admin_panel()]: AppRoutes.ADMIN_PANEL,
  // [RoutePath.not_found()]: AppRoutes.NOT_FOUND,
}
