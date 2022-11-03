import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { AccountGroupOutline, AccountOutline, ArchiveOutline, MusicBoxMultipleOutline, MusicBoxOutline } from 'mdi-material-ui'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'Artists'
    },
    {
      title: 'Artists',
      icon: AccountOutline,
      path: '/artists'
    },
    {
      title: 'Sources',
      icon: MusicBoxOutline,
      path: '/source-artists'
    },
    {
      sectionTitle: 'Artist Groups'
    },
    {
      title: 'Artist Groups',
      icon: AccountGroupOutline,
      path: '/artist-groups'
    },
    {
      title: 'Source Artist Groups',
      icon: MusicBoxMultipleOutline,
      path: '/source-artist-groups'
    },
    {
      sectionTitle: 'Live Music Archive'
    },
    {
      title: 'Creators',
      icon: ArchiveOutline,
      path: '/creators'
    },
  ]
}

export default navigation
