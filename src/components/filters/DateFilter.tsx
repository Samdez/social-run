import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { ChevronDownIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'

export function DateFilter({
  handleSearch,
}: {
  handleSearch: (terms: Record<string, string>) => void
}) {
  const [date, setDate] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: new Date(),
  })
  const [open, setOpen] = useState(false)
  return (
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
  )
}
