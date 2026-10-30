'use client'

import { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Field, FieldLabel, FieldGroup } from '../../components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../../components/ui/input-group'
import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react"
import { ViewOffSlashIcon, ViewIcon } from "@hugeicons/core-free-icons"
import { toast } from 'sonner'
import api from '../services/api'

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false)

  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      const response = await api.post('/auth/login', {
        email,
        password,
      })

      const token = response.data.data.token
      localStorage.setItem('token', token)

      toast.success('Login berhasil!')
      navigate('/home')
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Email atau password salah'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <FieldGroup className='gap-4'>
        <Field className='gap-2'>
          <FieldLabel htmlFor='userEmail' className='leading-5'>
            Alamat email
          </FieldLabel>
          <Input type='email' id='userEmail' value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='johndoe@gmail.com' />
        </Field>
        <Field className='w-full gap-2'>
          <FieldLabel htmlFor='password' className='leading-5'>
            Kata sandi
          </FieldLabel>
          <InputGroup>
            <InputGroupInput id='password' type={isVisible ? 'text' : 'password'} value={password}
              onChange={(e) => setPassword(e.target.value)}
              required placeholder='••••••••••••••••' />
            <InputGroupAddon align='inline-end' className='pr-1.5'>
              <Button
                type="button"
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
        <Field>
          <Button className='w-full' type="submit" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Masuk ke Glimmora'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default LoginForm
