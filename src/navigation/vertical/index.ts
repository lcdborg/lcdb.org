import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { AccountOutline } from 'mdi-material-ui'

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
      icon: AccountOutline,
      path: '/source-artists'
    },
    {
      sectionTitle: 'Artist Groups'
    },
    {
      title: 'Artist Groups',
      icon: AccountOutline,
      path: '/artist-groups'
    },
    {
      title: 'Artist Group Sources',
      icon: AccountOutline,
      path: '/source-artist-groups'
    }
  ]
}

export default navigation
