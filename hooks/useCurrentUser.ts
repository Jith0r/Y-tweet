import useSWR from 'swr'
import fetcher from '@/libs/fetcher'

//SWR va fetch le lien /api/current, il prend en parametre fetcher qui utilise axios

// C'est un globalstate comme Redux

const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher)
    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useCurrentUser;