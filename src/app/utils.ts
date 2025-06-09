import { Run } from '@/payload-types'
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

export function formatDateToFR(date: string) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
