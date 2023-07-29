import { useParams } from "react-router-dom";
import useGetDetail from "../hooks/Room/useGetDetail";

const ChatDetail = () => {
  const { id } = useParams();
  const { room, isLoading, isError } = useGetDetail(id);

  return (
    <div>
      <h1>ChatDetail</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {room && <h2>{room.data.name}</h2>}

      <h3>Messages</h3>



      <form action="">
        <input style={{ width: '100px' }} type="text" name="nickname" id="nickname" placeholder="nickname" />
        <input type="text" name="body" id="body" placeholder="body" />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default ChatDetail
