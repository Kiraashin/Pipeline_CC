<<<<<<< HEAD
=======

>>>>>>> development
'use client'

import { useState } from 'react'
import { Button } from '../../components/ui/button'
<<<<<<< HEAD
import { Checkbox } from '../../components/ui/checkbox'
import { Field, FieldGroup, FieldLabel } from '../../components/ui/field'
import { Input } from '../../components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../../components/ui/input-group'
import { HugeiconsIcon } from "@hugeicons/react"
import { ViewOffSlashIcon, ViewIcon } from "@hugeicons/core-free-icons"

const RegisterForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)

  return (
    <form onSubmit={e => e.preventDefault()}>
      <FieldGroup className='gap-4'>
        {/* Username */}
        <Field className='gap-2'>
          <FieldLabel className='leading-5' htmlFor='username'>
            Username*
          </FieldLabel>
          <Input type='text' id='username' placeholder='Enter your username' />
        </Field>
        {/* Email */}
        <Field className='gap-2'>
          <FieldLabel className='leading-5' htmlFor='userEmail'>
            Email address*
          </FieldLabel>
          <Input type='email' id='userEmail' placeholder='Enter your email address' />
        </Field>
        {/* Password */}
        <Field className='w-full gap-2'>
          <FieldLabel className='leading-5' htmlFor='password'>
            Password*
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id='password'
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder='••••••••••••••••'
            />
            <InputGroupAddon align='inline-end' className='pr-1.5'>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsPasswordVisible(prevState => !prevState)}
                className='text-muted-foreground rounded-l-none hover:bg-transparent'
              >
                {isPasswordVisible ? (
                  <HugeiconsIcon icon={ViewOffSlashIcon} strokeWidth={2} />
                ) : (
                  <HugeiconsIcon icon={ViewIcon} strokeWidth={2} />
                )}
                <span className='sr-only'>{isPasswordVisible ? 'Hide password' : 'Show password'}</span>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        {/* Confirm Password */}
        <Field className='w-full gap-2'>
          <FieldLabel className='leading-5' htmlFor='confirmPassword'>
            Confirm Password*
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id='confirmPassword'
              type={isConfirmPasswordVisible ? 'text' : 'password'}
              placeholder='••••••••••••••••'
            />
            <InputGroupAddon align='inline-end' className='pr-1.5'>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsConfirmPasswordVisible(prevState => !prevState)}
                className='text-muted-foreground rounded-l-none hover:bg-transparent'
              >
                {isConfirmPasswordVisible ? (
                  <HugeiconsIcon icon={ViewOffSlashIcon} strokeWidth={2} />
                ) : (
                  <HugeiconsIcon icon={ViewIcon} strokeWidth={2} />
                )}
                <span className='sr-only'>{isConfirmPasswordVisible ? 'Hide password' : 'Show password'}</span>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        {/* Privacy policy */}
        <Field orientation='horizontal' className='flex items-center gap-2'>
          <Checkbox id='rememberMe' />
          <FieldLabel htmlFor='rememberMe'>
            <span className='text-muted-foreground'>I agree to</span> <a href='#'>privacy policy & terms</a>
          </FieldLabel>
        </Field>
        <Field>
          <Button className='w-full' type='submit'>
            Sign Up to Shadcn Studio
          </Button>
        </Field>
=======
import { Field, FieldGroup, FieldLabel } from '../../components/ui/field'
import { Input } from '../../components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../../components/ui/input-group'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import api from '../services/api'
import { HugeiconsIcon } from '@hugeicons/react'
import { ViewOffSlashIcon, ViewIcon } from '@hugeicons/core-free-icons'

const RegisterForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('creator')

  // Password validation sesuai BE
  const passwordRules = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  }

  const isPasswordValid = Object.values(passwordRules).every(Boolean)

  const isConfirmPasswordValid =
    confirmPassword.length > 0 && password === confirmPassword

  const handleRegist = async (e) => {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error('Semua kolom wajib diisi')
      return
    }

    if (name.trim().length < 3 || name.trim().length > 50) {
      toast.error('Nama harus terdiri dari 3-50 karakter')
      return
    }

    if (!isPasswordValid) {
      toast.error('Password belum memenuhi persyaratan')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Konfirmasi kata sandi tidak cocok')
      return
    }

    try {
      setIsLoading(true)

      const response = await api.post('/auth/register', {
        name: name.trim(),
        email: email.trim(),
        password,
        role,
      })

      console.log('REGISTER SUCCESS:', response.data)

      toast.success('Registrasi berhasil!')
      navigate('/login')

    } catch (error) {
      console.log('REGISTER ERROR:', error.response?.data)

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Registrasi gagal'

      toast.error(message)

    } finally {
      setIsLoading(false)
    }
  }

  // Checklist item
  const PasswordRule = ({ valid, label }) => (
    <div className={`flex items-center gap-2 text-xs ${
      valid ? 'text-emerald-600' : 'text-muted-foreground'
    }`}>
      <span className='font-bold'>
        {valid ? '✓' : '○'}
      </span>
      <span>{label}</span>
    </div>
  )

  return (
    <form onSubmit={handleRegist} autoComplete='off'>
      <FieldGroup className='gap-4'>

        {/* Nama */}
        <Field className='gap-2'>
          <FieldLabel htmlFor='username'>
            Nama
          </FieldLabel>

          <Input
            type='text'
            id='username'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={50}
            placeholder='Masukan nama kamu'
          />

          {name.length > 0 && name.trim().length < 3 && (
            <p className='text-xs text-destructive'>
              Nama minimal 3 karakter
            </p>
          )}
        </Field>

        {/* Email */}
        <Field className='gap-2'>
          <FieldLabel htmlFor='userEmail'>
            Alamat email
          </FieldLabel>

          <Input
            type='email'
            id='userEmail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Masukan alamat email kamu'
          />
        </Field>

        {/* Role */}
        <Field className='gap-2'>
          <FieldLabel>
            Pilih Role
          </FieldLabel>

          <div className='grid grid-cols-2 gap-3'>
            <Button
              type='button'
              variant={role === 'editor' ? 'default' : 'outline'}
              className='h-11'
              onClick={() => setRole('editor')}
            >
              Editor
            </Button>

            <Button
              type='button'
              variant={role === 'creator' ? 'default' : 'outline'}
              className='h-11'
              onClick={() => setRole('creator')}
            >
              Creator
            </Button>
          </div>
        </Field>

        {/* Password */}
        <Field className='w-full gap-2'>
          <FieldLabel htmlFor='password'>
            Kata sandi
          </FieldLabel>

          <InputGroup>
            <InputGroupInput
              id='password'
              type='text'
              name='register-secret'
              autoComplete='new-password'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Masukkan kata sandi'
              style={{
                WebkitTextSecurity: isPasswordVisible ? 'none' : 'disc',
              }}
            />

            <InputGroupAddon align='inline-end' className='pr-1.5'>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={() => setIsPasswordVisible(prev => !prev)}
                className='text-muted-foreground rounded-l-none hover:bg-transparent'
              >
                <HugeiconsIcon
                  icon={isPasswordVisible ? ViewOffSlashIcon : ViewIcon}
                  strokeWidth={2}
                />
              </Button>
            </InputGroupAddon>
          </InputGroup>

          {/* Password Requirements */}
          <div className='space-y-2 rounded-lg border bg-muted/30 p-3'>
            <p className='text-xs font-medium text-muted-foreground'>
              Persyaratan kata sandi:
            </p>

            <PasswordRule
              valid={passwordRules.minLength}
              label='Minimal 8 karakter'
            />

            <PasswordRule
              valid={passwordRules.uppercase}
              label='Minimal 1 huruf kapital (A-Z)'
            />

            <PasswordRule
              valid={passwordRules.number}
              label='Minimal 1 angka (0-9)'
            />
          </div>
        </Field>

        {/* Confirm Password */}
        <Field className='w-full gap-2'>
          <FieldLabel htmlFor='confirmPassword'>
            Konfirmasi kata sandi
          </FieldLabel>

          <InputGroup>
            <InputGroupInput
              id='confirmPassword'
              type='text'
              name='register-confirm-secret'
              autoComplete='new-password'
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Konfirmasi kata sandi'
              style={{
                WebkitTextSecurity: isConfirmPasswordVisible ? 'none' : 'disc',
              }}
            />

            <InputGroupAddon align='inline-end' className='pr-1.5'>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={() => setIsConfirmPasswordVisible(prev => !prev)}
                className='text-muted-foreground rounded-l-none hover:bg-transparent'
              >
                <HugeiconsIcon
                  icon={isConfirmPasswordVisible ? ViewOffSlashIcon : ViewIcon}
                  strokeWidth={2}
                />
              </Button>
            </InputGroupAddon>
          </InputGroup>

          {confirmPassword.length > 0 && (
            <p className={`text-xs ${
              isConfirmPasswordValid
                ? 'text-emerald-600'
                : 'text-destructive'
            }`}>
              {isConfirmPasswordValid
                ? '✓ Kata sandi cocok'
                : '✕ Kata sandi tidak cocok'}
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
            {isLoading ? 'Mendaftarkan...' : 'Daftar sekarang'}
          </Button>
        </Field>

>>>>>>> development
      </FieldGroup>
    </form>
  )
}

export default RegisterForm
