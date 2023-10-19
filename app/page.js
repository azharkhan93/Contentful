/* eslint-disable @next/next/no-img-element */
'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const contentful = require('contentful');

import client from '../lib/contentfulClient';

const GET_ARTICLES = gql`
  query GetArticles {
    articleCollection {
      items {
        title
      }
    }
  }
`;
export default function BlogEntry() {
  const { loading, error, data } = useQuery(GET_ARTICLES, { client });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  
  

  return (
    <div>
      {data.articleCollection.items.map((article) => (
        <div key={article.title}>
          <h2>{article.title}</h2>
          
        </div>
      ))}
    </div>


  )
}
