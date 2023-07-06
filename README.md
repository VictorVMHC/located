# located
Proyecto Modular

# How to execute http request to interact with the server?
- you need to have your server running that means in the located.api runs this command
```powershell
     nodemon app
```
- once your server is running you need to grab your ip running this command (use the ip v4)

```powershell
    ipconfig
```
- now just copy and paste that ip in your .env file of ``locate`` (``react native app``)
```
//before
    BASE_URL=http://localHost:8080/api
// after (this is the target result this may work)
    BASE_URL=http://<PASTE_YOUR_IP>:8080/api
// example
    BASE_URL=http://172.188.98.2:8080/api
```
### Notes
If you are having, because the BASE_URL is not updating, try this

- run the follow command
```powershell
    npm run resetCache
```
- then finish that execution with ``ctrl + c``
- now you can run again the project
