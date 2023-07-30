import useSWR from 'swr'
import api from '../../utils/api'

type Room = {
  id: number
  name: string
  like: number
}

type Data = {
  data: Room[]
}

const fetcher = (url: string): Promise<Data> => api.get(url).then(res => res.data)

const useGetList = () => {
  const { data, error } = useSWR('/api/streams', fetcher)

  return {
    rooms: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useGetList
