import useSWR from 'swr'
import fetcher from '@/libs/fetcher'

//SWR va fetch le lien /api/users, il prend en parametre fetcher qui utilise axios


const usePosts = (userId?: string) => {

    const url = userId ? `/api/posts?userId=${userId}` : '/api/posts';

    const { data, error, isLoading, mutate } = useSWR(url, fetcher)
    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default usePosts;