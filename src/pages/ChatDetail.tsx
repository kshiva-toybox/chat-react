import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useParams } from "react-router-dom";
import useGetDetail from "../hooks/Room/useGetDetail";
import { FormEvent, useEffect } from "react";
import api from "../utils/api";
import useGetComments from "../hooks/Room/useGetComments";

const ChatDetail = () => {
  const { id } = useParams();
  const { room, isLoading: isRoomLoading, isError: isRoomError } = useGetDetail(id);
  const { comments, mutate: commentsMutate, isLoading: isCommentsLoading, isError: isCommentsError } = useGetComments(id);

  useEffect(() => {
    if (!id) {
      return;
    }

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;
    const echo = new Echo({
      broadcaster: 'pusher',
      key: 'app-key',
      wsHost: window.location.hostname,
      wsPort: 6001,
      disableStats: true,
      enabledTransports: ["ws", "wss"],
      forceTLS: false,
      cluster: 'mt1',
    });

    const channel = echo.channel(`streams.${id}`)

    channel.listen('ChatCommentSended', (e: any) => {
      console.log(e.comment)

      commentsMutate((data) => {
        return {
          ...data,
          data: [
            ...data?.data ?? [],
            e.comment
          ]
        }
      }, false);
    });

    return () => {
      channel.stopListening('ChatCommentSended');
      echo.disconnect();
    };

  }, [id, commentsMutate]);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    await api.post(`/api/streams/${id}/comments`, formData);
  }

  return (
    <div>
      <h1>ChatDetail</h1>
      {isRoomLoading && <p>Loading...</p>}
      {isRoomError && <p>Error</p>}
      {room && <h2>{room.data.name}</h2>}

      <h3>Messages</h3>
      {isCommentsLoading && <p>Loading...</p>}
      {isCommentsError && <p>Error</p>}
      {comments && comments.data.map((comment) => (
        <div key={comment.id}>
          <p>{comment.nickname}: {comment.body}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input style={{ width: '100px' }} type="text" name="nickname" id="nickname" placeholder="nickname" />
        <input type="text" name="body" id="body" placeholder="body" />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default ChatDetail
