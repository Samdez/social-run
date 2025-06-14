import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  MapPin,
  Users,
  Calendar,
  Mail,
  Phone,
  Globe,
  Instagram,
  Facebook,
  Star,
  UserPlus,
  MessageCircle,
} from 'lucide-react'
import { getRunClub } from '../../(server)/queries/get-run-club'
import { getClubInfo } from '@/app/utils'
import { getUser } from '../../(server)/queries/users'
import { RunCard } from '@/components/RunCard'
import { getRun } from '../../(server)/queries/get-run'

export default async function ClubDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const club = await getRunClub(id)
  const { imageUrl, imageAlt, name, description, cityName, upcomingEvents, pastEvents, members } =
    getClubInfo(club.docs[0])
  const user = await getUser()
  const [upcomingEventsInflated, pastEventsInflated] = await Promise.all([
    Promise.all(
      upcomingEvents.map(async (event) => {
        const run = await getRun(event.id)
        return run.docs[0]
      }),
    ),
    Promise.all(
      pastEvents.map(async (event) => {
        const run = await getRun(event.id)
        return run.docs[0]
      }),
    ),
  ])

  const isMember =
    user?.['run-clubs-member']?.includes(club.docs[0].id) ||
    user?.['run-clubs-member']?.includes(club.docs[0].id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[30vh] md:h-[40vh] w-full">
        <Image
          src={imageUrl || '/placeholder.svg'}
          alt={imageAlt || ''}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div className="relative -mt-20 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            <div className="relative">
              <Image
                src={imageUrl || '/placeholder.svg'}
                alt={imageAlt || ''}
                width={150}
                height={150}
                className="rounded-full border-4 border-white shadow-lg bg-white"
              />
            </div>
            <div className="flex-1 md:bg-white md:p-6 md:rounded-lg md:shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{name}</h1>
                  <div className="flex items-center gap-4 text-sm md:text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{cityName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {/* <span>Fondé en {club.founded}</span> */}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>
                        4.8 (153 avis)
                        {/* {club.rating} ({club.reviews} avis) */}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  {isMember ? (
                    <Badge className="bg-green-100 text-green-800 px-4 py-2">Membre</Badge>
                  ) : (
                    <Button
                      // onClick={handleJoinClub}
                      // disabled={isJoining}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      {/* {isJoining ? 'Adhésion...' : 'Rejoindre le club'} */}
                      Rejoindre le club
                    </Button>
                  )}
                  <Button variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contacter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="mb-6">
                <TabsTrigger value="about">À propos</TabsTrigger>
                <TabsTrigger value="events">Événements</TabsTrigger>
                {/* <TabsTrigger value="team">Équipe</TabsTrigger> */}
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Description du club</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{description}</p>
                  </CardContent>
                </Card>

                {/* <Card>
                  <CardHeader>
                    <CardTitle>Spécialités</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {club.specialties.map((specialty: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card> */}

                {/* <Card>
                  <CardHeader>
                    <CardTitle>Réalisations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {club.achievements.map((achievement: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Trophy className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card> */}

                <Card>
                  <CardHeader>
                    <CardTitle>Avantages membres</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {/* {club.membershipBenefits.map((benefit: string, index: number) => ( */}
                      {[
                        'Réductions sur tous les événements du club',
                        'Accès aux entraînements hebdomadaires',
                        'Newsletter exclusive avec conseils',
                        'Matériel technique à prix préférentiel',
                        'Participation aux événements privés',
                      ].map((benefit: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Statistiques</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-gray-500" />
                          <span>Membres</span>
                        </div>
                        <span className="font-bold text-lg">{members.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-gray-500" />
                          <span>Événements organisés</span>
                        </div>
                        <span className="font-bold text-lg">
                          {upcomingEvents.length + pastEvents.length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <span>Note moyenne</span>
                        </div>
                        <span className="font-bold text-lg">4.8/5</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Contact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-sm">{club.address}</span>
                </div> */}
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <a
                          // href={`mailto:${club.contact.email}`}
                          className="text-sm text-purple-600 hover:underline"
                        >
                          contact@socialrun.fr
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <a
                          // href={`tel:${club.contact.phone}`}
                          className="text-sm text-purple-600 hover:underline"
                        >
                          +33 6 12 34 56 78
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-500" />
                        <a
                          // href={club.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-purple-600 hover:underline"
                        >
                          Site web
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Réseaux sociaux</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Instagram className="w-5 h-5 text-pink-500" />
                        <a
                          // href={`https://instagram.com/${club.contact.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-purple-600 hover:underline"
                        >
                          @socialrun
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Facebook className="w-5 h-5 text-blue-600" />
                        <a
                          // href={`https://facebook.com/${club.contact.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-purple-600 hover:underline"
                        >
                          Social Run
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Événements à venir</h2>
                  {upcomingEventsInflated.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {upcomingEventsInflated.map((event) => (
                        <RunCard key={event.id} run={event} user={user} />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <p className="text-gray-500">Aucun événement à venir pour le moment.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {pastEventsInflated.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Événements passés</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pastEvents.map((event: any) => (
                        <Card key={event.id} className="overflow-hidden">
                          <div className="relative h-32">
                            <Image
                              src={event.image || '/placeholder.svg'}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-medium mb-1">{event.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">{event.date}</p>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Users className="w-4 h-4" />
                              <span>{event.participants} participants</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* <TabsContent value="team">
                <Card>
                  <CardHeader>
                    <CardTitle>Équipe dirigeante</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {club.organizers.map((organizer: any) => (
                        <div
                          key={organizer.id}
                          className="flex items-start gap-4 p-4 border rounded-lg"
                        >
                          <Avatar className="h-16 w-16">
                            <AvatarImage
                              src={organizer.avatar || '/placeholder.svg'}
                              alt={organizer.name}
                            />
                            <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-medium text-lg">{organizer.name}</h3>
                            <p className="text-purple-600 font-medium mb-1">{organizer.role}</p>
                            <p className="text-sm text-gray-600">{organizer.experience}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent> */}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
