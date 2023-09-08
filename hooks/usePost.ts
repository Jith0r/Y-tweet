import useSWR from 'swr'
import fetcher from '@/libs/fetcher'

//SWR va fetch le lien /api/users, il prend en parametre fetcher qui utilise axios


const usePost = (postId?: string) => {

    const url = postId ? `/api/posts/${postId}` : null;

    const { data, error, isLoading, mutate } = useSWR(url, fetcher)
    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default usePost;