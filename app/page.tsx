/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from "react";
import Moviecard from "./components/Moviecard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import SkeletonLoading from "./components/SkeletonLoading";
import { useSearchParams } from "next/navigation";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}


export default function Home() {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [allMovies, setAllMovies] = useState<MovieResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [category, setCategory] = useState('popular');


  const api_key = process.env.NEXT_PUBLIC_API_KEY;
  const api_url = process.env.NEXT_PUBLIC_API_URL;

  const fetchAllMovies = async () => {
    try {
      let APIURL = '';
      if (search) {
        APIURL = `${api_url}/search/movie?api_key=${api_key}&query=${search}&page=${page}`;
      }
      else {
        APIURL = `${api_url}/movie/${category}?api_key=${api_key}&language=en-US&page=${page}`;
      }

      const res = await fetch(APIURL);
      const data = await res.json();
      setAllMovies(data);
      setTotalPage(data?.total_pages);
      setLoading(true);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllMovies();
  }, [page, search, category])

  return (
    <div>
      <div className="flex justify-between mb-5">
        <div>
          <p className="font-bold">
            {
              search ? 'Seach results for: ' + search : category.toUpperCase()
            }
          </p>
        </div>
        <div className="flex justify-center">
          <div className="flex mb-4 items-center">
            <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} className="cursor-pointer bg-gray-300 text-gray-700 px-4 py-1 rounded-s-sm disabled:opacity-50 disabled:cursor-default" disabled={page === 1}>
              <ChevronLeftIcon className="w-8 h-6" />
            </button>

            <p className="bg-gray-200 text-gray-800 px-4 py-1 font-medium">{page}/{totalPage}</p>


            <button onClick={() => setPage(previosPage => Math.min(previosPage + 1, totalPage))} className="cursor-pointer bg-gray-300 text-gray-700 px-4 py-1 rounded-e-sm disabled:opacity-50 disabled:cursor-default" disabled={page === totalPage || totalPage === 0}>
              <ChevronRightIcon className="w-8 h-6" />
            </button>
          </div>
        </div>
        <div>
          <select onChange={(e) => setCategory(e.target.value)} name="" id="" className="border rounded-md px-4 py-1">
            <option className="text-black" value="popular">Popular</option>
            <option className="text-black" value="top_rated">Top rated</option>
            <option className="text-black" value="upcoming">Upcoming</option>
          </select>
        </div>
      </div>


      {
        loading ? <SkeletonLoading></SkeletonLoading>
          :
          <div>
            {
              !allMovies?.results?.length
                ?
                <div className="flex justify-center items-center text-red-500">
                  <p>No movie found</p>
                </div>
                :
                <Moviecard allMovies={allMovies}></Moviecard>
            }
          </div>
      }
    </div>
  );
}
