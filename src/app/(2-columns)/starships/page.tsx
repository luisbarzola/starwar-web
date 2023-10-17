'use client'
import Card from '@/app/components/card';
import { useInfiniteQuery } from "react-query";
import { Button } from "@nextui-org/react";

const fetchData = ({ pageParam = 1 }) => fetch(`https://starwar-api.onrender.com/starships?page=${pageParam}`).then(res => res.json())

type Starship = {
	id: number
	name: string
	model: string
	manufacturer: string
	cost_in_credits: string
	length: string
	max_atmosphering_speed: string
	crew: string
	passengers: string
	cargo_capacity: string
	consumables: string
	hyperdrive_rating: string
	mglt: string
	starship_class: string
	pilots_id: number[]
	films_id: number[]
}

export default function Starship() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } =
  useInfiniteQuery(
    "starship", 
    fetchData,
    {
      getNextPageParam: (lastPage, pages) => lastPage.next_page, 
    }
  );

   return (<>
          <div className="gap-3 grid grid-cols-12 grid-rows-3 ">
            {isSuccess &&  data.pages.map( (group: any) => 
                group.results.map((starship: Starship, index: number) => (
              <Card 
                key={starship.id} 
                title={starship.name} 
                subTitle={starship.model}
                description={{
                  manufacturer: starship.manufacturer,
                  cost_in_credits: starship.cost_in_credits,
                  length: starship.length,
                  max_atmosphering_speed: starship.max_atmosphering_speed,
                  crew: starship.crew,
                  passengers: starship.passengers,
                  cargo_capacity: starship.cargo_capacity,
                  consumables: starship.consumables,
                  hyperdrive_rating: starship.hyperdrive_rating,
                  MGLT: starship.mglt,
                  starship_class: starship.starship_class,
                }}
                className='col-span-12 sm:col-span-6 h-[470px]' />
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
