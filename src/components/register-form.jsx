
'use client'

import { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Checkbox } from '../../components/ui/checkbox'
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

  const handleRegist = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Konfirmasi kata sandi tidak cocok')
      return
    }

    try {
      setIsLoading(true)

      await api.post('/auth/register', {
        name,
        email: email.trim(),
        password,
      })

      toast.success('Registrasi berhasil!')
      navigate('/login')

    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Registrasi gagal'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleRegist} autoComplete='off'>
      <FieldGroup className='gap-4'>

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
            placeholder='Masukan nama kamu'
          />
        </Field>

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

        {/* Password */}
        <Field className='w-full gap-2'>
          <FieldLabel htmlFor='password'>
            Kata sandi
          </FieldLabel>

          <InputGroup>
            <InputGroupInput
              type="text"
              name="register-secret"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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
        </Field>

        {/* Confirm Password */}
        <Field className='w-full gap-2'>
          <FieldLabel htmlFor='confirmPassword'>
            Konfirmasi kata sandi
          </FieldLabel>

          <InputGroup>
            <InputGroupInput
              type="text"
              name="register-confirm-secret"
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
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
        </Field>

        <Field>
          <Button
            className='w-full'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Mendaftarkan...' : 'Daftar sekarang'}
          </Button>
        </Field>

      </FieldGroup>
    </form>
  )
}

export default RegisterForm
