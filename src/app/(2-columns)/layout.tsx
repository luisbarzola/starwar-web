'use client'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
const queryClient = new QueryClient()

export default function Section({children}: {children: React.ReactNode}) {

   return (
    <QueryClientProvider client={queryClient}>
    <div className="grid grid-cols-5 grid-rows-5 gap-2">
        <div className="col-span-5 row-span-5 px-8">
          {children}
        </div>
    </div>
    </QueryClientProvider>
    );
}
