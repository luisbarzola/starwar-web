import Details from '@/app/components/detail';

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

type PersonFull = {
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
  planet: Planet | null
	films: Film[]
	starships: Starship[]
}

function fetchPerson(id: string): Promise <PersonFull> {
  return fetch(`https://starwar-api-dev-hncm.1.ie-1.fl0.io/people/${id}/full`).then(res => res.json())
}

export default async function Person({params}: { params: { id: string } }) {
  const {id} = params;
  const person = await fetchPerson(id);

	const characteristics = {
    height: person.height,
    mass: person.mass,
    hair_color: person.hair_color,
    skin_color: person.skin_color,
    eye_color: person.eye_color,
    birth_year: person.birth_year,
    gender: person.gender,
  }
	const planet = {
		name: person.planet?.name,
    rotation_period: person.planet?.rotation_period,
    orbital_period: person.planet?.orbital_period,
    diameter: person.planet?.diameter,
    climate: person.planet?.climate,
    gravity: person.planet?.gravity,
    terrain: person.planet?.terrain,
    surface_water: person.planet?.surface_water,
    population: person.planet?.population,
	}


	const description = {
		characteristics,
		planet,
	}

  return (
    <div className="max-w-[900px] gap-2 px-8">
      <Details title={person.name} description={description}/>
    </div>
    );
}