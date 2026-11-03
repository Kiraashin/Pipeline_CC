<<<<<<< HEAD
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'

import Logo from '@/assets/svg/logo'
import AuthBackgroundShape from '@/assets/svg/auth-background-shape'
=======
import { Link } from 'react-router-dom'
>>>>>>> development
import RegisterForm from './register-form'

const Register = () => {
  return (
<<<<<<< HEAD
    <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <div className='absolute'>
        <AuthBackgroundShape />
      </div>

      <Card className='z-1 w-full gap-6 py-6 sm:max-w-lg'>
        <CardHeader className='gap-6 px-6'>
          <Logo className='gap-3' />

          <div>
            <CardTitle className='mb-2 text-2xl font-semibold'>Sign Up to Shadcn studio</CardTitle>
            <CardDescription className='text-base'>Ship Faster and Focus on Growth.</CardDescription>
          </div>
        </CardHeader>

        <CardContent className='px-6'>
          {/* Register Form */}
          <div className='space-y-4'>
            <RegisterForm />

            <p className='text-muted-foreground text-center'>
              Already have an account?{' '}
              <a href='#' className='text-card-foreground hover:underline'>
                Sign in instead
              </a>
            </p>

            <div className='flex items-center gap-4'>
              <Separator className='flex-1' />
              <p className='text-base'>or</p>
              <Separator className='flex-1' />
            </div>

            <Button variant='ghost' className='w-full' render={<a href='#' />} nativeButton={false}>
              Sign in with google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
=======
    <main className='grid h-dvh w-full overflow-hidden lg:grid-cols-[52%_48%]'>

      {/* Left Section - Illustration */}
      <aside className='relative hidden h-dvh overflow-hidden lg:block'>

        <img
          src='/src/assets/illust2.jpg'
          alt='Minimalist creative workspace'
          className='absolute inset-0 h-full w-full object-cover'
        />

        <div className='absolute inset-0 flex flex-col justify-between p-10 xl:p-14'>

          <div>
            <span className='inline-flex rounded-full border border-white/40 bg-background/30 px-4 py-2 text-xs font-medium tracking-widest backdrop-blur-md'>
              PIPELINE CONTENT KAMU
            </span>
          </div>

          <div className='max-w-lg space-y-3'>
            <h2 className='text-3xl font-bold tracking-tight xl:text-5xl'>
              Ruang baru untuk ide luar biasa
            </h2>

            <p className='max-w-md text-sm leading-relaxed text-muted-foreground xl:text-base'>
              Semua perjalanan kreatif punya awal. Jadikan Glimmora tempat untuk memulai milikmu</p>
          </div>

        </div>
      </aside>

      {/* Right Section - Register Form */}
      <section className='flex h-dvh items-center justify-center overflow-y-auto px-6 py-6 sm:px-12 lg:px-14 xl:px-20'>
        <div className='w-full max-w-md space-y-7'>

          <div className='space-y-2'>
            <p className='text-xs font-semibold tracking-[0.2em] text-muted-foreground'>
              MULAI PERJALANANMU
            </p>

            <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Buat akun baru
            </h1>

            <p className='text-sm leading-relaxed text-muted-foreground'>
              Daftarkan dirimu dan mulai kelola perjalanan kreatifmu bersama Glimmora.
            </p>
          </div>

          <div className='space-y-5'>
            <RegisterForm />

            <p className='text-center text-sm text-muted-foreground'>
              Sudah punya akun?{' '}
              <Link
                to='/login'
                className='font-semibold text-foreground hover:underline'
              >
                Masuk di sini
              </Link>
            </p>
          </div>

          <p className='text-center text-xs text-muted-foreground'>
            © {new Date().getFullYear()} Glimmora
          </p>

        </div>
      </section>

    </main>
>>>>>>> development
  )
}

export default Register
