import { Run, RunClub } from '@/payload-types'
import slugify from 'slugify'

export function slugifyString(string: string) {
  const slug = string.replace('/', '-')
  return slugify(slug, { replacement: '-', lower: true, trim: true })
}

export function getRunInfo(run: Run) {
  const imageUrl = typeof run.image === 'string' ? run.image : run.image?.url
  const imageAlt = typeof run.image === 'string' ? run.image : run.image?.alt
  const cityName = typeof run.city === 'string' ? run.city : run.city?.name
  const organizerName = typeof run.organizer === 'string' ? run.organizer : run.organizer?.name
  const organizerLogo =
    typeof run.organizer === 'string'
      ? undefined
      : typeof run.organizer?.image === 'string'
        ? run.organizer.image
        : run.organizer?.image?.url
  return { imageUrl, imageAlt, cityName, organizerName, organizerLogo }
}

export function getClubInfo(club: RunClub) {
  const imageUrl = typeof club.image === 'string' ? club.image : club.image?.url
  const imageAlt = typeof club.image === 'string' ? club.image : club.image?.alt
  const name = club.name
  const description = club.description
  const cityName = typeof club.city === 'string' ? club.city : club.city?.name
  const members = club.members?.length || 0
  const events = club.events?.docs
  if (typeof events === 'object' && events !== null) {
    const upcomingEvents = events.filter(
      (event): event is Run =>
        typeof event !== 'string' && 'date' in event && new Date(event.date) > new Date(),
    )
    const pastEvents = events.filter(
      (event): event is Run =>
        typeof event !== 'string' && 'date' in event && new Date(event.date) < new Date(),
    )
    return { imageUrl, imageAlt, name, description, cityName, members, upcomingEvents, pastEvents }
  }
  return {
    imageUrl,
    imageAlt,
    name,
    description,
    cityName,
    members,
    upcomingEvents: [],
    pastEvents: [],
  }
}

export function formatDateToFR(date: string) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
