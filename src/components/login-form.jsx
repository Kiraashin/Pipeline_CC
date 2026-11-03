<<<<<<< HEAD
=======

>>>>>>> development
'use client'

import { useState } from 'react'
import { Button } from '../../components/ui/button'
<<<<<<< HEAD
import { Checkbox } from '../../components/ui/checkbox'
import { Input } from '../../components/ui/input'
import { Field, FieldLabel, FieldGroup } from '../../components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../../components/ui/input-group'
import { HugeiconsIcon } from "@hugeicons/react"
import { ViewOffSlashIcon, ViewIcon } from "@hugeicons/core-free-icons"

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <form onSubmit={e => e.preventDefault()}>
      <FieldGroup className='gap-4'>
        {/* Email */}
        <Field className='gap-2'>
          <FieldLabel htmlFor='userEmail' className='leading-5'>
            Email address*
          </FieldLabel>
          <Input type='email' id='userEmail' placeholder='Enter your email address' />
        </Field>
        {/* Password */}
        <Field className='w-full gap-2'>
          <FieldLabel htmlFor='password' className='leading-5'>
            Password*
          </FieldLabel>
          <InputGroup>
            <InputGroupInput id='password' type={isVisible ? 'text' : 'password'} placeholder='••••••••••••••••' />
            <InputGroupAddon align='inline-end' className='pr-1.5'>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsVisible(prevState => !prevState)}
                className='text-muted-foreground rounded-l-none hover:bg-transparent'
              >
                {isVisible ? (
                  <HugeiconsIcon icon={ViewOffSlashIcon} strokeWidth={2} />
                ) : (
                  <HugeiconsIcon icon={ViewIcon} strokeWidth={2} />
                )}
                <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        {/* Remember Me and Forgot Password */}
        <div className='flex items-center justify-between gap-y-2'>
          <Field orientation='horizontal' className='flex items-center gap-2'>
            <Checkbox id='rememberMe' />
            <FieldLabel htmlFor='rememberMe' className='text-muted-foreground'>
              {' '}
              Remember Me
            </FieldLabel>
          </Field>
          <a href='#' className='text-base text-nowrap hover:underline'>
            Forgot Password?
          </a>
        </div>
        <Field>
          <Button className='w-full' type='submit'>
            Sign in to Shadcn Studio
          </Button>
        </Field>
=======
import { Input } from '../../components/ui/input'
import { Field, FieldLabel, FieldGroup } from '../../components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../../components/ui/input-group'
import { useNavigate } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import { ViewOffSlashIcon, ViewIcon } from '@hugeicons/core-free-icons'
import { toast } from 'sonner'
import api from '../services/api'

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  // Validasi email sesuai BE
  const validateEmail = (value) => {
    if (!value.trim()) {
      return 'Email wajib diisi'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(value.trim())) {
      return 'Format email tidak valid'
    }

    return ''
  }

  // Validasi password sesuai BE
  const validatePassword = (value) => {
    if (!value) {
      return 'Password wajib diisi'
    }

    return ''
  }

  const handleEmailChange = (e) => {
    const value = e.target.value

    setEmail(value)
    setErrors(prev => ({
      ...prev,
      email: validateEmail(value),
    }))
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value

    setPassword(value)
    setErrors(prev => ({
      ...prev,
      password: validatePassword(value),
    }))
  }

  const handleLogin = async (e) => {
  e.preventDefault()

  const emailError = !email.trim()
    ? 'Email wajib diisi'
    : validateEmail(email)

  const passwordError = !password
    ? 'Password wajib diisi'
    : ''

  setErrors({
    email: emailError,
    password: passwordError,
  })

  if (emailError || passwordError) {
    return
  }

  try {
    setIsLoading(true)

    const response = await api.post('/auth/login', {
      email: email.trim(),
      password,
    })

    const { token, user } = response.data.data

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    toast.success('Login berhasil!')
    navigate('/dashboard')

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      'Email atau password salah'
    )

  } finally {
    setIsLoading(false)
  }
}

  return (
    <form onSubmit={handleLogin} noValidate>
      <FieldGroup className='gap-4'>

        {/* Email */}
        <Field className='gap-2'>
          <FieldLabel htmlFor='userEmail' className='leading-5'>
            Alamat email
          </FieldLabel>

          <Input
            type='email'
            id='userEmail'
            value={email}
            onChange={handleEmailChange}
            placeholder='johndoe@gmail.com'
            autoComplete='email'
            className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
          />

          {errors.email && (
            <p className='text-xs text-destructive'>
              {errors.email}
            </p>
          )}
        </Field>

        {/* Password */}
        <Field className='w-full gap-2'>
          <FieldLabel htmlFor='password' className='leading-5'>
            Kata sandi
          </FieldLabel>

          <InputGroup>
            <InputGroupInput
              id='password'
              type={isVisible ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              placeholder='••••••••••••••••'
              autoComplete='current-password'
              className={errors.password ? 'border-destructive' : ''}
            />

            <InputGroupAddon align='inline-end' className='pr-1.5'>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={() => setIsVisible(prev => !prev)}
                className='text-muted-foreground rounded-l-none hover:bg-transparent'
              >
                <HugeiconsIcon
                  icon={isVisible ? ViewOffSlashIcon : ViewIcon}
                  strokeWidth={2}
                />

                <span className='sr-only'>
                  {isVisible ? 'Hide password' : 'Show password'}
                </span>
              </Button>
            </InputGroupAddon>
          </InputGroup>

          {errors.password && (
            <p className='text-xs text-destructive'>
              {errors.password}
            </p>
          )}
        </Field>

        {/* Submit */}
        <Field>
          <Button
            className='w-full'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Memproses...' : 'Masuk ke Glimmora'}
          </Button>
        </Field>

>>>>>>> development
      </FieldGroup>
    </form>
  )
}

export default LoginForm
