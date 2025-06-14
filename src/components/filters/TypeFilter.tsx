import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

import { ChevronDown } from 'lucide-react'

export function TypeFilter({
  handleSearch,
}: {
  handleSearch: (terms: Record<string, string>) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between w-fit">
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
  )
}
