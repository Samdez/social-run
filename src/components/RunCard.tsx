import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, Footprints } from 'lucide-react'
import { Run, User } from '@/payload-types'
// import { useRouter } from 'next/navigation'
import { formatDateToFR, getRunInfo } from '@/app/utils'
import { typeLabels } from '@/app/constants'
import { SubscribeToRunButton } from './SubscribeToRunButton'

interface RunCardProps {
  run: Run
  user: User | null
}
export const typeColors = {
  road: 'bg-orange-500',
  trail: 'bg-green-500',
}

export function RunCard({ run, user }: RunCardProps) {
  const userRuns = user?.['runs-subscribed']?.docs?.map((run) =>
    typeof run === 'string' ? run : run.id,
  )
  const { imageUrl, imageAlt, cityName, organizerName } = getRunInfo(run)
  const runParticipantsNumber = run.participants?.length

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/runs/${run.id}`}>
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
              Réservé aux membres
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDateToFR(run.date)}</span>
          </div>

          <h3 className="font-bold text-lg mb-2 line-clamp-2">{run.title}</h3>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span>{cityName}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Footprints className="w-4 h-4" />
            <span>{run.distance} km</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Users className="w-4 h-4" />
            <span>
              {runParticipantsNumber || 0} / {run.maxParticipants} inscrits
            </span>
          </div>

          <div className="text-sm text-gray-500 mb-3">
            Organisé par <span className="font-medium">{organizerName}</span>
          </div>

          {/* {run.price && <div className="text-lg font-bold text-purple-600 mb-3">{run.price}€</div>} */}
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" className="flex-1" asChild>
          <Link href={`/runs/${run.id}`}>Détails</Link>
        </Button>
        {userRuns?.includes(run.id) ? (
          <Button className="flex-1" disabled>
            Déjà inscrit
          </Button>
        ) : (
          <SubscribeToRunButton runId={run.id} userId={user?.id} />
        )}
      </CardFooter>
    </Card>
  )
}
