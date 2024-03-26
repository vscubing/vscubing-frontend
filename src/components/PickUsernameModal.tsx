import { userQuery, putChangeUsername, USER_QUERY_KEY } from '@/features/auth'
import { queryClient } from '@/lib/reactQuery'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogFooter, AlertDialogTitle } from './AlertDialog'
import { Input } from './ui'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'

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

export function PickUsernameModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const { data: userData } = useQuery(userQuery)

  useEffect(() => {
    if (userData?.authCompleted === false) {
      setIsVisible(true)
    }
  }, [userData])

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
    setIsVisible(false)
  }

  return (
    <AlertDialog open={isVisible}>
      <AlertDialogContent asChild>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AlertDialogTitle>Choose your nickname</AlertDialogTitle>
          <label className='max-w-full'>
            <Input
              placeholder='Enter your nickname'
              className='block w-[20rem] max-w-full'
              error={!!errors.username}
              type='text'
              maxLength={32}
              {...register('username')}
            />
            <span className='caption mt-1'>{errors.username?.message}</span>
          </label>
          <AlertDialogFooter>
            <AlertDialogAction
              className='max-w-full sm:w-[20rem]'
              type='submit'
              disabled={!!errors.username || isPending}
            >
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
