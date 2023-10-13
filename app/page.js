/* eslint-disable @next/next/no-img-element */
'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react';
const contentful = require('contentful');

const client = contentful.createClient({
  space: 'qnuz52e7owhg',
  environment: 'master',
  accessToken: '-MeJwDDPY251bBfYRWgaRmfG4XLYqEbm2IDqJfV66Lc',
});
export default function BlogEntry() {
   const [entry, setEntry] = useState(null);

  useEffect(() => {
    async function fetchEntry() {
      try {
        const response = await client.getEntry('2Y0hQfCK79wwpFscitFCn7');
        setEntry(response.fields);
      } catch (error) {
        console.error('Error fetching Contentful entry:', error);
      }
    }

    fetchEntry();
  }, []);
  useEffect(() => {
    async function fetchImage() {
      if (entry && entry.image) {
        try {
          const imageAsset = await client.getAsset(entry.image[0].sys.id);
          setEntry((prevEntry) => ({
            ...prevEntry,
            image: imageAsset.fields.file.url,
          }));
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
    }
  
    fetchImage();
  }, [entry])

  return (
    <div className="mt-2 flex flex-col items-center justify-center h-screen">
  <h1 className=" text-5xl text-center mb-6 font-bold text-green-600">Contentful Entry</h1>
  {entry && (
    <div className="text-center">
      <h2 className='text-2xl'>{entry.title}</h2>
      <p className='text-xl mt-4'>{entry.post}</p>
      {entry.image && (
        <img
        className='mt-4'
          src={entry.image}
          alt="Image Description"
        />
      )}
    </div>
  )}
</div>


  )
}
