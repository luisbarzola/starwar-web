'use client'
import Card from '@/app/components/card';
import { useInfiniteQuery } from "react-query";
import { Button } from "@nextui-org/react";

const fetchData = ({ pageParam = 1 }) => fetch(`https://starwar-api-dev-hncm.1.ie-1.fl0.io/planets?page=${pageParam}`).then(res => res.json())

type Planet = {
	id: number
	name: string
	rotation_period: string
	orbital_period: string
	diameter: string
	climate: string
	gravity: string
	terrain: string
	surface_water: string
	population: string
	residents_id: number[]
	films_id: number[]
}

export default function Planets() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } =
  useInfiniteQuery(
    "planets", 
    fetchData,
    {
      getNextPageParam: (lastPage, pages) => lastPage.next_page, 
    }
  );
   return (<>
          <div className="gap-3 grid grid-cols-12 grid-rows-3 ">
            {isSuccess &&  data.pages.map( (group: any) => 
                group.results.map((planet: Planet, index: number) => (
              <Card 
                key={planet.id} 
                title={planet.name} 
                subTitle={`population: ${planet.population}`}
                description={{
                  rotation_period: planet.rotation_period,
                  orbital_period: planet.orbital_period,
                  diameter: planet.diameter,
                  climate: planet.climate,
                  gravity: planet.gravity,
                  terrain: planet.terrain,
                  surface_water: planet.surface_water
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
