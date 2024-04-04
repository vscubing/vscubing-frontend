import { userQuery, putChangeUsername, USER_QUERY_KEY, logout } from '@/features/auth'
import { queryClient } from '@/lib/reactQuery'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  SecondaryButton,
} from '@/components/ui'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Input } from '@/components/ui'

const formSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'It looks like you forgot to enter a nickname')
    .regex(
      /^[a-zA-Z0-9_.-]*$/,
      'Oops! Nicknames can only contain letters, numbers, underscores and hyphens. Please remove any special characters or spaces',
    )
    .min(3, "Uh-oh! Your nickname should be between 3 and 24 characters. Let's tweak it to fit the rules"),
})
type UsernameForm = z.infer<typeof formSchema>

export function PickUsernameDialog() {
  const [isPending, setIsPending] = useState(false)
  const { data: userData } = useQuery(userQuery)

  const isVisible = userData?.authCompleted === false

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<UsernameForm>({ resolver: zodResolver(formSchema) })

  async function onSubmit({ username }: UsernameForm) {
    setIsPending(true)
    try {
      await putChangeUsername(username)
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 400 /* TODO: change to 409 on backend */) {
        setError('username', {
          message: 'Sorry, that nickname is already taken! How about trying a unique variation or adding some numbers?',
        })
      }

      setIsPending(false)
      return
    }

    await queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] })
    reset()
    setIsPending(false)
  }

  return (
    <AlertDialog open={isVisible}>
      <AlertDialogContent asChild>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <AlertDialogTitle className='mb-4'>Greetings, Speed Cuber</AlertDialogTitle>
            <p className='text-center text-grey-20'>Just a quick nickname needed to personalize your experience.</p>
          </div>
          <label className='flex w-min max-w-full flex-col gap-1 sm:w-full'>
            <Input
              placeholder='Enter your nickname'
              className='block w-[20rem] max-w-full sm:w-full'
              error={!!errors.username}
              type='text'
              maxLength={32}
              {...register('username')}
            />
            <span className='caption'>{errors.username?.message}</span>
          </label>
          <AlertDialogFooter className='sm:grid sm:grid-cols-2'>
            <AlertDialogCancel onClick={logout} type='button'>
              Log out
            </AlertDialogCancel>
            <AlertDialogAction type='submit' disabled={!!errors.username || isPending}>
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
