import type { NextPage } from 'next';
import axios from 'axios';
import { QueryFunctionContext, useQuery } from 'react-query';
import { Fragment } from 'react';
import { homedir } from 'os';
import Link from 'next/link';
interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
}

const getPosts = async () => {
  const { data } = await axios.get<Post[]>(`http://localhost:4000/posts`);
  return data;
};

const Home: NextPage = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<Post[], Error>('posts', getPosts, {
    staleTime: 5 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <nav>
        <Link href="/parallel">
          <a style={{ marginRight: '1rem' }}>Parallel Queries Page</a>
        </Link>

        <Link href="/dependent">
          <a style={{ marginRight: '1rem' }}>Dependent Queries Page</a>
        </Link>
      </nav>

      <br />

      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          posts?.map((post) => (
            <Fragment key={post.id}>
              <div>id: {post.id}</div>
              <div>제목: {post.title}</div>
              <div>작성자: {post.author}</div>
              <div>내용: {post.description.slice(0, 100)}...</div>
              <hr />
            </Fragment>
          ))
        )}
      </div>
    </>
  );
};

export default Home;
