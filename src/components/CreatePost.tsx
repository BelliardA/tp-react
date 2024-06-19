import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import './../style/addPost.css'

const CREATE_POST_MUTATION = gql`
 mutation CreatePost($data: PostInput!) {
    createPost(data: $data) {
     	data{
        id 
        attributes 
        {
          title 
          content
        }
      }
    }
  }
`;

const Createpost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION);

  const handleCreatePost = async () => {
    try {
      const { data } = await createPost({
        variables: {
          data: { title, content }
        },
      });
      console.log('Post créé avec succès :', data.createPost.post);
    } catch (err) {
      console.error('Erreur lors de la création du post :', err.message);
    }
  };

  return (
    <div className="create-post-container">
      <h1>Création d'un nouveau poste</h1>
      <input
        className="create-post-input"
        type="text"
        placeholder="Titre du poste"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="create-post-textarea"
        placeholder="Contenu du poste"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="create-post-button" onClick={handleCreatePost} disabled={loading}>
        Créer le poste
      </button>
      {loading && <p className="loading-message">Envoi en cours...</p>}
      {error && <p className="error-message">Erreur : {error.message}</p>}
    </div>
  );
};

export default Createpost;
