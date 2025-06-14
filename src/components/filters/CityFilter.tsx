'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useMediaQuery } from '@/app/(frontend)/(hooks)/use-media-query'
import { City } from '@/payload-types'
import { ChevronDown } from 'lucide-react'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { useState } from 'react'

export function CityFilter({
  cities,
  handleSearch,
  searchParams,
}: {
  cities: City[]
  handleSearch: (terms: Record<string, string>) => void
  searchParams: ReadonlyURLSearchParams
}) {
  const allCities = [
    { id: '13244', name: 'Toutes les villes', updatedAt: '', createdAt: '', slug: 'all' },
    ...cities.map((city) => city),
  ]
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const selectedCitySlug = searchParams.get('city')
  const selectedCity = allCities.find((city) => city.slug === selectedCitySlug)

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-fit justify-between">
            {selectedCity ? <>{selectedCity.name}</> : <>Ville</>}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <CitiesList setOpen={setOpen} handleSearch={handleSearch} cities={allCities} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-fit justify-start">
          {selectedCity ? <>{selectedCity.name}</> : <>Ville</>}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <CitiesList setOpen={setOpen} handleSearch={handleSearch} cities={allCities} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function CitiesList({
  setOpen,
  handleSearch,
  cities,
}: {
  setOpen: (open: boolean) => void
  handleSearch: (terms: Record<string, string>) => void
  cities: City[]
}) {
  return (
    <Command>
      <CommandInput placeholder="Ville" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {cities.map((city) => (
            <CommandItem
              key={city.id}
              value={city.name}
              onSelect={() => {
                handleSearch({ city: city.slug || '' })
                setOpen(false)
              }}
            >
              {city.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
