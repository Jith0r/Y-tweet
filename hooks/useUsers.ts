import useSWR from 'swr'
import fetcher from '@/libs/fetcher'

//SWR va fetch le lien /api/users, il prend en parametre fetcher qui utilise axios


const useUsers = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/users', fetcher)
    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useUsers;