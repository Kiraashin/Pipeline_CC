import { Separator } from '../../components/ui/separator'

import PersonalInfo from './personal-info'
import EmailPass from './email-password'
import ConnectAccount from './connect-account'
import SocialUrl from './social-url'
import DangerZone from './danger-zone'

const UserGeneral = () => {
  return (
    <section className='py-3'>
      <div className='mx-auto max-w-7xl'>
        <PersonalInfo />
        <Separator className='my-10' />
        <EmailPass />
        <Separator className='my-10' />
        <ConnectAccount />
        <Separator className='my-10' />
        <SocialUrl />
        <Separator className='my-10' />
        <DangerZone />
      </div>
    </section>
  )
}

export default UserGeneral
