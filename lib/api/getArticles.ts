import instance from '.';

export type Article = {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: number;
  };
};

export type ArticlesResponse = {
  list: Article[];
  totalCount: number;
};

export type ArticlesQuery = {
  page?: number;
  pageSize?: number;
  orderBy?: 'recent' | 'like';
  keyword?: string;
};

export type ArticlesRequest = {
  query?: ArticlesQuery;
};

async function getArticles(params: ArticlesQuery): Promise<ArticlesResponse> {
  const res = await instance.get<ArticlesResponse>(`/articles`, {
    params,
  });
  const { data } = res;
  return data;
}

export default getArticles;