import OnboardingFeed from '../components/onboarding-feed-01'

const OnboardingFeedPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-7xl sm:px-6 lg:px-8">
        <div className='flex justify-center'>
          <OnboardingFeed />
        </div>
      </div>
    </div>
  )
}

export default OnboardingFeedPage