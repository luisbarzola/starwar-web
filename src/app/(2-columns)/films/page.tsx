'use client'
import Card from '@/app/components/card';
import { useInfiniteQuery } from "react-query";
import { Button } from "@nextui-org/react";

const fetchData = ({ pageParam = 1 }) => fetch(`https://starwar-api-dev-hncm.1.ie-1.fl0.io/films?page=${pageParam}`).then(res => res.json())

type Film = {
	id: number
	title: string
	episode_id: number
	opening_crawl: string
	director: string
	producer: string
	release_date: string
	characters_id: number[]
	planets_id: number[]
	starships_id: number[]
}

export default function Films() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } =
  useInfiniteQuery(
    "films", 
    fetchData,
    {
      getNextPageParam: (lastPage, pages) => lastPage.next_page, 
    }
  );

   return (<>
          <div className="gap-3 grid grid-cols-12 grid-rows-3 ">
            {isSuccess &&  data.pages.map( (group: any) => 
                group.results.map((films: Film, index: number) => (
              <Card 
                key={films.id} 
                title={films.title} 
                subTitle={`Episode #${films.episode_id}`}
                description={{
                  director: films.director,
                  producer: films.producer,
                  release_date: films.release_date,
                  opening_crawl: films.opening_crawl,
                }} />
                )))
            }
          </div>
          <div className='flex items-center mt-8'>
          <Button
							onClick={() => fetchNextPage()}
							disabled={!hasNextPage || isFetchingNextPage}
              color="primary"
              className='py-6 px-8 '
              isLoading={isFetchingNextPage}
						>
							{isFetchingNextPage
								? "Loading more..."
								: hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
						</Button>
          </div>
            
          </>
    );
}
