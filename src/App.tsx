import { Route, Routes } from 'react-router-dom';
import ChatList from './pages/ChatList';
import ChatDetail from './pages/ChatDetail';

function App() {

  return (
    <>
      <Routes>
        <Route path="/rooms/:id" element={<ChatDetail />} />
        <Route path="/" element={<ChatList />} />
      </Routes>
    </>
  )
}

export default App
