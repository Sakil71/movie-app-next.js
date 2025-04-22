/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import CastDetails from '@/app/components/CastDetails';
import Loading from '@/app/loading';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const SingleDetail = ({ params }: { params: { id: any } }) => {
  const api_key = process.env.NEXT_PUBLIC_API_KEY;
  const api_url = process.env.NEXT_PUBLIC_API_URL;  
  const [details, setDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovieDetails = async () => {
    try {
      const res = await fetch(`${api_url}/movie/${params.id}?api_key=${api_key}`);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data = await res.json();
      setDetails(data);
    }
    catch (err: any) {
      setError(err.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) fetchMovieDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id]);

  if (isLoading) return <p className='text-center'><Loading></Loading></p>;
  if (error) return <p className='text-center text-red-500'>{error}</p>;
  if (!details) return <p className='text-center text-red-500'>No movie data found</p>;

  return (
    <>
      <div className="relative bg-gray-900 text-white rounded-lg shadow-lg m-4 flex flex-col lg:flex-row">
        {/* Content on the left side */}
        <div className="relative flex flex-col justify-between w-full lg:w-1/2 p-6 border border-black/10 bg-gradient-to-br from-black via-black to-gray-900 rounded-lg shadow-lg">
          {/* Movie Poster */}
          <div className="mb-4 flex-1 justify-center">
            <Image
              src={`https://image.tmdb.org/t/p/w500${details?.poster_path}`}
              alt={details?.title}
              width={150}
              height={225}
              className="rounded-lg shadow-lg"
              priority
            />
          </div>

          {/* Movie Details */}
          <div className="mt-4">
            <h1 className="text-3xl font-bold mb-2">{details?.title}</h1>
            <div className="text-gray-300 mb-4 flex gap-2 items-center">
              <StarIcon className='w-4 text-yellow-300' />
              <span className="mr-2">
                {details?.vote_average?.toFixed(1)}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-400 mb-4">
              <span className="mr-4">{details?.runtime} min</span>
              <span>{details?.genres.map((g: any) => g.name).join(", ")}</span>
            </div>

            <div className="text-gray-400 mb-4">
              <span className="mr-2">Release Date:</span>
              {new Date(details?.release_date).toLocaleDateString("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>

            <div className="text-lg text-white mt-4">
              <h3 className="font-semibold">Overview</h3>
              <p className="text-gray-300">{details?.overview}</p>
            </div>
          </div>
        </div>

        {/* Background Image with Enhanced Black Overlay */}
        <div
          className="relative w-full lg:w-1/2 bg-cover bg-center rounded-r-lg h-[400px] lg:h-auto"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${details?.backdrop_path})`,
          }}
        ></div>
      </div>

      <div>
        <CastDetails movieId={params?.id}></CastDetails>
      </div>

    </>
  );
};

export default SingleDetail;
