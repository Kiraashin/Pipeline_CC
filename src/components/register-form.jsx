'use client'

import { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Checkbox } from '../../components/ui/checkbox'
import { Field, FieldGroup, FieldLabel } from '../../components/ui/field'
import { Input } from '../../components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../../components/ui/input-group'
import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react"
import { ViewOffSlashIcon, ViewIcon } from "@hugeicons/core-free-icons"

const RegisterForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)

  const navigate = useNavigate();

  return (
    <form onSubmit={e => e.preventDefault()}>
      <FieldGroup className='gap-4'>
        <Field className='gap-2'>
          <FieldLabel className='leading-5' htmlFor='username'>
            Username*
          </FieldLabel>
          <Input type='text' id='username' placeholder='Enter your username' />
        </Field>
        <Field className='gap-2'>
          <FieldLabel className='leading-5' htmlFor='userEmail'>
            Email address*
          </FieldLabel>
          <Input type='email' id='userEmail' placeholder='Enter your email address' />
        </Field>
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
        <Field orientation='horizontal' className='flex items-center gap-2'>
          <Checkbox id='rememberMe' />
          <FieldLabel htmlFor='rememberMe'>
            <span className='text-muted-foreground'>I agree to</span> <a href='#'>privacy policy & terms</a>
          </FieldLabel>
        </Field>
        <Field>
          <Button className='w-full' type='submit' onClick={() => navigate("/login")}>
            Sign Up to Shadcn Studio
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default RegisterForm
