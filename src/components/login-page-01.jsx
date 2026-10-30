import { Link } from 'react-router-dom'
import LoginForm from './login-form'

const Login = () => {
  return (
    <main className='grid h-dvh w-full overflow-hidden lg:grid-cols-[48%_52%]'>

      <section className='flex h-dvh items-center justify-center overflow-y-auto px-6 py-6 sm:px-12 lg:px-14 xl:px-20'>
        <div className='w-full max-w-md space-y-7'>
          <div className='space-y-2'>
            <p className='text-xs font-semibold tracking-[0.2em] text-muted-foreground'>
              SELAMAT DATANG KEMBALI
            </p>

            <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Masuk ke akun kamu
            </h1>

            <p className='text-sm leading-relaxed text-muted-foreground'>
              Selamat datang! Masukan informasi kredensial kamu
            </p>
          </div>

          <div className='space-y-5'>
            <LoginForm />

            <p className='text-center text-sm text-muted-foreground'>
              Belum punya akun?{' '}
              <Link
                to='/register'
                className='font-semibold text-foreground hover:underline'
              >
                Daftar di sini
              </Link>
            </p>

          </div>

          <p className='text-center text-xs text-muted-foreground'>
            © {new Date().getFullYear()} Glimmora
          </p>

        </div>
      </section>

      <aside className='relative hidden h-dvh overflow-hidden lg:block'>

        <img
          src='src\assets\illust.jpg'
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
              Atur perencanaan konten di satu tempat
            </h2>

            <p className='max-w-md text-sm leading-relaxed text-muted-foreground xl:text-base'>
              Semua yang kamu butuhkan untuk mengelola, menciptakan, dan mengembangkan 
              perjalanan kreatifmu
            </p>
          </div>

        </div>
      </aside>

    </main>
  )
}

export default Login