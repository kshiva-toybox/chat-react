import useSWR from 'swr'
import api from '../../utils/api'

type Room = {
  id: number
  name: string
  like: number
}

type Data = {
  data: Room
}

const fetcher = (url: string): Promise<Data> => api.get(url).then(res => res.data)

const useGetDetail = (id?: string) => {
  const { data, error, mutate } = useSWR(id && `/api/streams/${id}`, fetcher)

  return {
    room: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export default useGetDetail
