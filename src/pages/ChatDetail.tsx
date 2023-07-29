import { useParams } from "react-router-dom";
import useGetDetail from "../hooks/Room/useGetDetail";
import { FormEvent } from "react";
import api from "../utils/api";
import useGetComments from "../hooks/Room/useGetComments";

const ChatDetail = () => {
  const { id } = useParams();
  const { room, isLoading: isRoomLoading, isError: isRoomError } = useGetDetail(id);
  const { comments, mutate: commentsMutate, isLoading: isCommentsLoading, isError: isCommentsError } = useGetComments(id);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const nickname = formData.get('nickname');
    const body = formData.get('body');

    await api.post(`/streams/${id}/comments`, formData);
  }

  console.log({ comments })

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
