import { Suspense } from 'react'

import { Skeleton } from '@/components/skeleton'
import { CurrentSearch } from './current-search'

export default function SearchLoading() {
  return (
    <div className="flex flex-col gap-4 px-8">
      <Suspense fallback={<p>loading...</p>}>
        <CurrentSearch />
      </Suspense>

      <div className="flex justify-center flex-wrap gap-5 mt-[100px]">
        <Skeleton className="h-[300px] w-[150px]" />
        <Skeleton className="h-[300px] w-[150px]" />
        <Skeleton className="h-[300px] w-[150px]" />
        <Skeleton className="h-[300px] w-[150px]" />
        <Skeleton className="h-[300px] w-[150px]" />
        <Skeleton className="h-[300px] w-[150px]" />
      </div>
    </div>
  )
}
