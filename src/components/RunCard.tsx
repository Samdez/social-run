'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, Clock } from 'lucide-react'
import { Run } from '@/payload-types'
import { useRouter } from 'next/navigation'

interface RunCardProps {
  run: Run
}

export function RunCard({ run }: RunCardProps) {
  const router = useRouter()

  const typeColors = {
    road: 'bg-orange-500',
    trail: 'bg-green-500',
  }

  const typeLabels = {
    road: 'ROUTE',
    trail: 'TRAIL',
  }
  const imageUrl = typeof run.image === 'string' ? run.image : run.image?.url
  const imageAlt = typeof run.image === 'string' ? run.image : run.image?.alt
  const cityName = typeof run.city === 'string' ? run.city : run.city?.name
  const organizerName = typeof run.organizer === 'string' ? run.organizer : run.organizer?.name

  return (
    <Link href={`/runs/${run.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <Image
            src={imageUrl || '/placeholder.svg'}
            alt={imageAlt || ''}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
          <Badge className={`absolute top-3 left-3 ${typeColors[run.type]} text-white`}>
            {typeLabels[run.type]}
          </Badge>
          {run.membersOnly && (
            <Badge className="absolute top-3 right-3 bg-purple-500 text-white">
              Sur invitation
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Calendar className="w-4 h-4" />
            <span>{run.date}</span>
          </div>

          <h3 className="font-bold text-lg mb-2 line-clamp-2">{run.title}</h3>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span>{cityName}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Clock className="w-4 h-4" />
            <span>{run.distance}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Users className="w-4 h-4" />
            <span>
              {/* {event.participants} participant{event.participants > 1 ? 's' : ''} */}
              {run.maxParticipants && ` / ${run.maxParticipants}`}
            </span>
          </div>

          <div className="text-sm text-gray-500 mb-3">
            Organisé par <span className="font-medium">{organizerName}</span>
          </div>

          {run.price && <div className="text-lg font-bold text-purple-600 mb-3">{run.price}€</div>}
        </CardContent>

        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button
            className="flex-1 bg-purple-600 hover:bg-purple-700"
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/runs/${run.id}/inscription`)
            }}
          >
            S&apos;INSCRIRE
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
