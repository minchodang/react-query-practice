import axios from 'axios';
import type { NextPage } from 'next';
import { QueryFunctionContext, useQueries, useQuery } from 'react-query';

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
}

const getPost = async (query: QueryFunctionContext) => {
  console.log(query);
  const { data } = await axios.get<Post>(
    `http://localhost:4000/posts/${query.queryKey[1]}`
  );
  return data;
};

const ParallelQueriesPage: NextPage = () => {
  useQueries([
    { queryKey: ['post', 1], queryFn: getPost },
    { queryKey: ['post', 2], queryFn: getPost },
    { queryKey: ['post', 3], queryFn: getPost },
  ]);

  return <div>Parallel Queries Page</div>;
};

export default ParallelQueriesPage;
