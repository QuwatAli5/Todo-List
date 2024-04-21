import {
  mdiBallotOutline,
  mdiMonitor,
} from '@mdi/js'

export default [
  {
    to: '/',
    icon: mdiMonitor,
    label: 'All Todo List'
  },
  {
    to: '/list/create',
    icon: mdiBallotOutline,
    label: 'Create List'
  },
]
