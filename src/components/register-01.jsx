import { Link } from 'react-router-dom'
import RegisterForm from './register-form'

const Register = () => {
  return (
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
  )
}

export default Register
