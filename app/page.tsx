/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from "react";
import Moviecard from "./components/Moviecard";
import SkeletonLoading from "./components/SkeletonLoading";
import { useSearchParams } from "next/navigation";
import FilterMovie from "./components/FilterMovie";
import Pagination from "./components/Pagination";

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
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<any>('');
  const [languageName, setLanguageName] = useState('');

  const api_key = process.env.NEXT_PUBLIC_API_KEY;
  const api_url = process.env.NEXT_PUBLIC_API_URL;

  const fetchAllMovies = async () => {
    setLoading(true);
    try {
      let APIURL = '';
      if (search) {
        APIURL = `${api_url}/search/movie?api_key=${api_key}&query=${search}&page=${page}&language=${selectedLanguages}`;
        setLanguageName('');
      }
      else if (selectedLanguages) {
        APIURL = `${api_url}/discover/movie?api_key=${api_key}&with_original_language=${selectedLanguages}&page=${page}`;
      }
      else {
        APIURL = `${api_url}/movie/${category}?api_key=${api_key}&language=${selectedLanguages}-US&page=${page}`;
        setLanguageName('');
      }

      const res = await fetch(APIURL);
      const data = await res.json();
      setAllMovies(data);
      setTotalPage(data?.total_pages);
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
  }, [page, search, category, selectedLanguages])

  return (
    <div className="relative">
      <div className="flex justify-between items-center my-5">
        <div className="flex gap-2 items-center">
          <div className="bg-blue-800 h-6 w-[3px]"></div>
          <p className="font-bold">
            {
              search ? 'Seach results for: ' + search : category.toUpperCase()
            }
          </p>
        </div>

        <div>
          <Pagination setPage={setPage} page={page} totalPage={totalPage}></Pagination>
        </div>

        <div>
          <div className="flex gap-2 items-center">
            <p>{languageName}</p>
            <button
              onClick={() => setModalOpen(!isModalOpen)}
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
              Filter
            </button>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 z-10">
            {
              isModalOpen
              &&
              <FilterMovie
                setCategory={setCategory}
                setModalOpen={setModalOpen}
                setSelectedLanguages={setSelectedLanguages}
                selectedLanguages={selectedLanguages}
                category={category}
                setLanguageName={setLanguageName}
              ></FilterMovie>
            }
          </div>
        </div>
      </div>


      <div>
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

      <div className="flex justify-center mt-10">
        <Pagination setPage={setPage} page={page} totalPage={totalPage}></Pagination>
      </div>
    </div>
  );
}
