import './App.css'
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useEffect } from 'react';

function App() {
  useEffect(() => {
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

    echo.channel('orders').listen('OrderStatusUpdated', (e: any) => {
      console.log(e)
    });

    return () => {
      echo.leaveChannel('orders');
    }
  }, []);

  return (
    <>
      <div>hogehoge</div>
    </>
  )
}

export default App
