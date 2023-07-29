import useSWR from 'swr'
import api from '../../utils/api'

type Comment = {
  id: number
  stream: {
    id: number
    name: string
  }
  nickname: string
  body: string
}

type Data = {
  data: Comment[]
}

const fetcher = (url: string): Promise<Data> => api.get(url).then(res => res.data)

const useGetComments = (id?: string) => {
  const { data, error, mutate } = useSWR(id && `/api/streams/${id}/comments`, fetcher, {
    revalidateOnFocus: false,
  })

  return {
    comments: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export default useGetComments
