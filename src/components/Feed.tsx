import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import './../style/feed.css'

const GET_POSTS = gql`
  query {
    posts {
      data {
        id
        attributes {
          title
          content
        }
      }
    }
  }
`;

const Feed = () => {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) return <p>Chargement des posts...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div className="feed-container">
      <h1>Feed des posts</h1>
      <div className="posts-grid">
        {data && data.posts && data.posts.data.map(post => (
          <div key={post.id} className="post-card">
            <h2>{post.attributes.title}</h2>
            <p>{post.attributes.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
