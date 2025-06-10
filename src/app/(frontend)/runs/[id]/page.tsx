import { typeColors, typeLabels } from '@/app/constants'
import { Badge } from '@/components/ui/badge'
import { Calendar, Footprints, Info, Map, MapPin, Share2, Users } from 'lucide-react'
import Image from 'next/image'
import { getRun } from '../../(server)/queries/get-run'
import { formatDateToFR, getRunInfo } from '@/app/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const {
    docs: [run],
  } = await getRun(id)
  const { imageUrl, imageAlt, cityName, organizerName, organizerLogo } = getRunInfo(run)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[40vh] md:h-[80vh] w-full">
        <Image
          src={imageUrl || '/placeholder.svg'}
          alt={imageAlt || ''}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="container mx-auto px-4 py-8">
            <Badge className={`${typeColors[run.type]} text-white mb-4`}>
              {typeLabels[run.type]}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{run.title}</h1>
            <div className="flex items-center gap-2 text-white">
              <Calendar className="w-5 h-5" />
              <span className="text-lg">{formatDateToFR(run.date)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="info">
              <TabsList className="mb-6">
                <TabsTrigger value="info" className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Informations
                </TabsTrigger>
                <TabsTrigger value="map" className="flex items-center gap-2">
                  <Map className="w-4 h-4" />
                  Carte
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                    <p className="text-gray-700">{run.description}</p>
                  </CardContent>
                </Card>

                {/* <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Programme</h2>
                    <div className="space-y-3">
                      {run.schedule.map((item: any, index: number) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-purple-100 text-purple-800 font-medium px-3 py-1 rounded-md w-24 text-center">
                            {item.time}
                          </div>
                          <div className="ml-4 text-gray-700">{item.activity}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card> */}

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4">Services inclus</h2>
                      <ul className="list-disc pl-5 space-y-1">
                        {event.amenities.map((item: string, index: number) => (
                          <li key={index} className="text-gray-700">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4">Prérequis</h2>
                      <ul className="list-disc pl-5 space-y-1">
                        {event.requirements.map((item: string, index: number) => (
                          <li key={index} className="text-gray-700">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div> */}
              </TabsContent>

              <TabsContent value="map">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Point de départ</h2>
                    {/* <div className="h-[400px] w-full rounded-lg overflow-hidden">
                      <EventMap coordinates={event.coordinates} title={event.title} />
                    </div> */}
                    <div className="mt-4 text-gray-700">
                      <p className="font-medium">Adresse de départ:</p>
                      <p>{run['start address']}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Détails du run</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Lieu</p>
                      <p className="text-gray-700">{cityName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Footprints className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Distance</p>
                      <p className="text-gray-700">{run.distance} km</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Participants</p>
                      <p className="text-gray-700">
                        {run.participants?.length} / {run.maxParticipants} places
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div
                          className="bg-purple-600 h-2.5 rounded-full"
                          style={{
                            width: `${((run.participants?.length ?? 0) / run.maxParticipants) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="flex items-start gap-3">
                    <Euro className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Prix d'inscription</p>
                      <p className="text-xl font-bold text-purple-600">{event.price}€</p>
                    </div>
                  </div> */}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Organisateur</h2>
                <div className="flex items-center gap-4">
                  <Image
                    src={organizerLogo || '/placeholder.svg'}
                    alt={organizerName || ''}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{organizerName}</p>
                    <Button variant="link" className="p-0 h-auto text-purple-600">
                      Voir le profil
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Button
                className="w-fit bg-purple-600 hover:bg-purple-700 text-lg py-6"
                // onClick={handleRegistration}
                disabled={run.maxParticipants === run.participants?.length}
              >
                {run.maxParticipants === run.participants?.length ? 'Complet' : "S'inscrire"}
              </Button>

              {/* <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                Partager le run
              </Button> */}
            </div>
          </div>
        </div>
      </div>

      {/* {showRegistrationModal && <RegistrationModal event={event} onClose={() => setShowRegistrationModal(false)} />} */}
    </div>
  )
}
