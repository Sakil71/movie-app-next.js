/* eslint-disable @typescript-eslint/no-explicit-any */
'se client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import fallbackImage from '@/public/user-not-found.jpg';

const CastDetails = ({ movieId }: any) => {
  const api_key = process.env.NEXT_PUBLIC_API_KEY;
  const api_url = process.env.NEXT_PUBLIC_API_URL;
    const [credits, setCredits] = useState<any>(null);


    const fetchCredits = async () => {
        try {
            const res = await fetch(`${api_url}/movie/${movieId}/credits?api_key=${api_key}&language=en-US`);
            const data = await res.json();
            setCredits(data);
        }
        catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchCredits();
    }, [movieId])


    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>Cast</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                {credits?.cast.map((actor: any) => (
                    <div
                        key={actor.id}
                        className="w-full bg-white rounded-lg overflow-hidden shadow-lg"
                    >
                        <div className="relative w-full h-64">
                            <Image
                                src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : fallbackImage}
                                alt={actor.name}
                                fill
                                className="rounded-t-lg object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{actor.name}</h3>
                            <p className="text-gray-600 text-sm">Character: {actor.character}</p>
                            <p className="text-gray-500 text-sm">Popularity: {actor.popularity.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CastDetails;