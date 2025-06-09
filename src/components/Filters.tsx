'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { CitiesFilterButton } from './CitiesFilterButton'
import { City } from '@/payload-types'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function Filters({ cities }: { cities: City[] }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function handleSearch(terms: Record<string, string>) {
    const params = new URLSearchParams(searchParams)
    Object.entries(terms).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    replace(`${pathname}?${params.toString()}`)
  }

  const [date, setDate] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: new Date(),
  })
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-[120px] lg:w-[100px] justify-between font-normal"
          >
            Date
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            disabled={(date) => {
              const yesterday = new Date()
              yesterday.setDate(yesterday.getDate() - 1)
              return date < yesterday
            }}
            selected={{
              from: date.from || new Date(),
              to: date.to,
            }}
            captionLayout="dropdown"
            onSelect={(date) => {
              if (date) {
                setDate({
                  from: date.from || new Date(),
                  to: date.to || new Date(),
                })
                handleSearch({
                  startDate: date.from?.toISOString() || '',
                  endDate: date.to?.toISOString() || '',
                })
              }
            }}
          />
        </PopoverContent>
      </Popover>

      <CitiesFilterButton cities={cities} handleSearch={handleSearch} searchParams={searchParams} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-between w-[120px]">
            Distance
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleSearch({ distance: '5k' })}>
            {'< 5 km'}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSearch({ distance: '10k' })}>
            {'< 10 km'}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSearch({ distance: 'all' })}>
            {'Toutes distances'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-between min-w-[160px]">
            Type
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleSearch({ type: 'road' })}>Route</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSearch({ type: 'trail' })}>Trail</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSearch({ type: 'all' })}>
            Tous les types
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
