/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState, useEffect } from 'react';
import client from '../lib/contentfulClient';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

export default function BlogEntry() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState([]);
  const [featuredImage, setFeaturedImage] = useState('');
  const [authors, setAuthors] = useState([]); // Change to an array
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [SEODescription, setSEODescription] = useState('');
  const [seoKeywords, setseoKeywords] = useState('');
  const [SEOTitle, setSEOTitle] = useState('');
useEffect(() => {
    client
      .getEntry('3mk7PGtFnTjC925diuGKYv')
      .then((entry) => {
        console.log('category Array:', entry.fields.category);
        console.log('Authors Array:', entry.fields.author);
        console.log('seoKeywords:', entry.fields.seoKeywords);
        setTitle(entry.fields.title);
        setCategory(entry.fields.category);
        setFeaturedImage(entry.fields.featuredImage.fields.file.url);
        setContent(
          documentToReactComponents(entry.fields.content, {
            renderNode: {
              [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
              [BLOCKS.OL_LIST]: (node, children) => <ol>{children} </ol>,
              [BLOCKS.UL_LIST]: (node, children) => <ul>{children} </ul>,
              [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
              [BLOCKS.EMBEDDED_ASSET]: (node) => {
                const { title, file } = node.data.target.fields;
                console.log('Embedded Asset:', title, file.url);
                return <img src={file.url} alt={title} />;
              },
              [INLINES.HYPERLINK]: (node, children) => (
                <a href={node.data.uri}>{children}</a>
              ),
            },
            renderMark: {
              [MARKS.BOLD]: (text) => <strong>{text}</strong>,
            },
          })
        );
        if (entry.fields.author) {
          Promise.all(
            entry.fields.author.map((author) => client.getEntry(author.sys.id))
          )
            .then((authors) => {
              console.log('Fetched Authors:', authors); // 
              setAuthors(authors);
            })
            .catch((error) => {
              console.error('Error fetching author entries:', error);
            });
        }
        if (entry.fields.category) {
          Promise.all(
            entry.fields.category.map((category) => client.getEntry(category.sys.id))
          )
            .then((categories) => {
              console.log('Fetched Categories:', categories);
              setCategory(categories);
            })
            .catch((error) => {
              console.error('Error fetching category entries:', error);
            });
        }

        setSlug(entry.fields.slug);
        setSEODescription(entry.fields.SEODescription);
        setseoKeywords(entry.fields.seoKeywords);
        setSEOTitle(entry.fields.SEOTitle);
      })
      .catch((error) => {
        console.error('Error fetching entry:', error);
      });
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      <p>
        Category: {category.map((cat) => cat.fields.name).join(', ')}
      </p>
      <img src={featuredImage} alt="Featured Image" />
      <p>
      Author: {authors.map((auth) => auth.fields.name).join(', ')}
      </p>
      <div className="text-center">{content}</div>
      <p>Slug: {slug}</p>
      <p>SEO Description: {SEODescription}</p>
      <p>SEO Keywords: {seoKeywords}</p>
      <p>SEO Title: {SEOTitle}</p>
    </div>
  );
}






// const GET_ARTICLES = gql `
//   query GetArticles {
//     articleCollection {
//       items {
//         title
//         content {
//           json
//           links {
//             assets {
//               block {
//                 url
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;
// const { loading, error, data } = useQuery(GET_ARTICLES, { client });

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;
  
  // const firstArticle = data.articleCollection.items[0];
  // if (!firstArticle) {
  //   return 'No articles available.'; 
  // }
// const options = {
  //   renderNode: {
  //     // Blocks
  //     [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
  //     [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
  //     [BLOCKS.HEADING_2]: (node, children) => <h2>{children}</h2>,
  //     [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,
  //     [BLOCKS.HEADING_4]: (node, children) => <h4>{children}</h4>,
  //     [BLOCKS.HEADING_5]: (node, children) => <h5>{children}</h5>,
  //     [BLOCKS.HEADING_6]: (node, children) => <h6>{children}</h6>,
  //     [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
  //     [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
  //     [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
  //     [BLOCKS.QUOTE]: (node, children) => <blockquote>{children}</blockquote>,
  //     [BLOCKS.HR]: () => <hr />,
  //     [BLOCKS.EMBEDDED_ENTRY]: (node) => {
    
  //       return <div>Embedded Entry</div>;
  //     },
  //     [BLOCKS.EMBEDDED_ASSET]: (node) => {
  //       const { title, file } = node.data.target.fields  ; 
  //       if (file && file.url) {
  //         return <img src={file.url} alt={title } />;
  //       }
  //       return null;
  //     },

  //     [INLINES.HYPERLINK]: (node, children) => <a href={node.data.uri}>{children}</a>,
  //     [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        
  //       return <span>Inline Embedded Entry: {children}</span>;
  //     },
  //     [INLINES.ASSET_HYPERLINK]: (node, children) => {
       
  //       const { title, file } = node.data.target.fields;
  //       return <a href={file.url}>{children || title}</a>;
  //     },
  //     [INLINES.ENTRY_HYPERLINK]: (node, children) => {
       
  //       return <a href={`/entry/${node.data.target.sys.id}`}>{children}</a>;
  //     },
  //   }