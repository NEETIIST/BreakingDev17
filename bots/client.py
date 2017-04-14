# Import the DDP package.
import ddp

# Create a client, passing the URL of the server.
client = ddp.ConcurrentDDPClient('ws://127.0.0.1:3000/websocket')

# Once started, the client will maintain a connection to the server.
client.start()


# The method is executed asynchronously.
future = client.call('upper', 'Hello, World!')

# ... Do something else ...

# Block until the result message is received.
result_message = future.get()

# Check if an error occured else print the result.
if result_message.has_error():
  print result_message.error
else:
  print result_message.result

# Ask the client to stop and wait for it to do so.
client.stop()
client.join()