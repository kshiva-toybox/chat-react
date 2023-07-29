import useGetRoomList from "../hooks/Room/useGetList"
import { Link } from "react-router-dom";

const ChatList = () => {
  const { rooms, isLoading, isError } = useGetRoomList();

  return (
    <div>
      <h1>ChatList</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {rooms && rooms.data.map((room) => (
        <Link to={`/rooms/${room.id}`} key={room.id}>
          <h2>{room.name}</h2>
        </Link>
      ))}
    </div>
  )
}

export default ChatList
