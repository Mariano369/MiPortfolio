export interface IToolsItem {
  _id?: String
  createdAt: Date

  Name: string
  upNotes: Number
  NewField: Number
}

export interface IpaginatedTools {
  docs: IToolsItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export enum ApiStatus {
  NOTLOADED = 'notloaded',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed',
}
