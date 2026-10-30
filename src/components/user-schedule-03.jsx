// Component Imports
import ProfilePanel from './profile-panel'
import ServiceStepCard from './service-step-card'

const UserSchedule03 = () => {
  return (
    <div className='mx-auto grid w-full max-w-245 gap-8 sm:grid-cols-2'>
      <ProfilePanel />
      <ServiceStepCard />
    </div>
  )
}

export default UserSchedule03
