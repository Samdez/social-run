'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { CitiesFilterButton } from './CitiesFilterButton'
import { City } from '@/payload-types'

// interface EventFiltersProps {
//   filters: {
//     date: string
//     location: string
//     type: string
//     theme: string
//     distance: string
//     inviteOnly: boolean
//   }
//   handleFilterChange: (key: string, value: string | boolean) => void
// }

export function Filters({ cities }: { cities: City[] }) {
  const [filters, setFilters] = useState({
    date: 'all',
    location: 'all',
    type: 'all',
    theme: 'all',
    distance: 'all',
    inviteOnly: false,
  })

  const handleFilterChange = (key: string, value: string | boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-between min-w-[100px]">
            Date
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleFilterChange('date', 'today')}>
            Aujourd&apos;hui
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange('date', 'week')}>
            Cette semaine
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange('date', 'month')}>
            Ce mois
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange('date', 'all')}>
            Toutes les dates
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CitiesFilterButton cities={cities} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-between min-w-[140px]">
            Type de course
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleFilterChange('type', 'road')}>
            Route
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange('type', 'trail')}>
            Trail
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange('type', 'all')}>
            Tous les types
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-between min-w-[120px]">
            Thème
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleFilterChange('theme', 'nature')}>
            Nature
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange('theme', 'city')}>
            Ville
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange('theme', 'charity')}>
            Charité
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange('theme', 'all')}>
            Tous les thèmes
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-between min-w-[120px]">
            Distance
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleFilterChange('distance', '5k')}>
            5 km
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange('distance', '10k')}>
            10 km
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange('distance', '21k')}>
            Semi-marathon
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange('distance', '42k')}>
            Marathon
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterChange('distance', 'all')}>
            Toutes les distances
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant={filters.inviteOnly ? 'default' : 'outline'}
        onClick={() => handleFilterChange('inviteOnly', !filters.inviteOnly)}
      >
        Sur invitation uniquement
      </Button>
    </div>
  )
}
