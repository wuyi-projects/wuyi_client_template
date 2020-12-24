import Cookies from 'js-cookie'

export default function formatTableSize() {
  const globalSize = Cookies.get('size') || 'medium'
  switch (globalSize) {
    case 'default':
      return ''
    case 'medium':
      return 'medium'
    case 'small':
      return 'small'
    case 'mini':
      return 'mini'
    default:
      return 'medium'
  }
}
