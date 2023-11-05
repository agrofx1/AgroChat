import asyncio
import websockets
connected_clients = []
async def handle_connection(websocket, path):
   connected_clients.append(websocket)
   try:
      while True:
         message = await websocket.recv()
         for client in connected_clients:
            await client.send(message)
   finally:
      connected_clients.remove(websocket)

# Start the WebSocket server
start_server = websockets.serve(handle_connection, 'localhost', 8000)
# Run the server indefinitely
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()