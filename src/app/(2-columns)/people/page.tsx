'use client'

import Card from '@/app/components/card';
import { useInfiniteQuery } from "react-query";
import { Button } from "@nextui-org/react";

const fetchPeople = ({ pageParam = 1 }) => fetch(`https://starwar-api.onrender.com/people?page=${pageParam}`).then(res => res.json())

type Person = {
  id: number
	name: string
	height: number
	mass: string
	hair_color: string
	skin_color: string
	eye_color: string
	birth_year: string
	gender: string
	planet_id: number
	films_id: number[]
	species: any[]
	starships_id: number[]
}

export default function People() {

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } =
		useInfiniteQuery(
      "planets", 
      fetchPeople,
      {
        getNextPageParam: (lastPage, pages) => lastPage.next_page, 
      }
    );

    return (<>
          <div className="gap-3 grid grid-cols-12 grid-rows-3 ">
            { isSuccess &&  data.pages.map( (group: any) => 
                group.results.map((person: Person, index: number) => (
                  <Card 
                    key={person.id} 
                    title={person.name} 
                    subTitle={person.gender}
                    link={`/people/${person.id}`}
                    description={{
                      height: person.height,
                      mass: person.mass,
                      hair_color: person.hair_color,
                      skin_color: person.skin_color,
                      eyes_color: person.eye_color,
                      gender: person.gender,
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
