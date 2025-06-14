import { ChevronDown } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export function DistanceFilter({
  handleSearch,
}: {
  handleSearch: (terms: Record<string, string>) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between w-[120px]">
          Distance
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleSearch({ distance: '5' })}>
          {'< 5 km'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSearch({ distance: '10' })}>
          {'< 10 km'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSearch({ distance: 'all' })}>
          {'Toutes distances'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
