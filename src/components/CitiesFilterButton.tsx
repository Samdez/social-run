'use client'

import * as React from 'react'

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
import { useMediaQuery } from '@/app/(frontend)/hooks/use-media-query'
import { City } from '@/payload-types'
import { ChevronDown } from 'lucide-react'

export function CitiesFilterButton({ cities }: { cities: City[] }) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [selectedCity, setSelectedCity] = React.useState<City | null>(null)

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[100px] justify-start">
            {selectedCity ? <>{selectedCity.name}</> : <>Ville</>}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <CitiesList setOpen={setOpen} setSelectedCity={setSelectedCity} cities={cities} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[100px] justify-start">
          {selectedCity ? <>{selectedCity.name}</> : <>Ville</>}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <CitiesList setOpen={setOpen} setSelectedCity={setSelectedCity} cities={cities} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function CitiesList({
  setOpen,
  setSelectedCity,
  cities,
}: {
  setOpen: (open: boolean) => void
  setSelectedCity: (city: City | null) => void
  cities: City[]
}) {
  const allCities = [
    { id: '123', name: 'Toutes les villes', updatedAt: '', createdAt: '' },
    ...cities.map((city) => city),
  ]
  return (
    <Command>
      <CommandInput placeholder="Ville" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {allCities.map((city) => (
            <CommandItem
              key={city.id}
              value={city.id}
              onSelect={(value) => {
                setSelectedCity(allCities.find((city) => city.id === value) || null)
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
