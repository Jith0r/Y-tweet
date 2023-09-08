import useSWR from 'swr'
import fetcher from '@/libs/fetcher'

//SWR va fetch le lien /api/user, il prend en parametre fetcher qui utilise axios


const useUser = (userId: string) => {
    const { data, error, isLoading, mutate } = useSWR(userId ? `/api/users/${userId}` : null, fetcher)
    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useUser;