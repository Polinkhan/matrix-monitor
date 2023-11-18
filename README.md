### Make a Script file

```bash
  nano server-monitor.sh
```

now copy and paste the following command into your script file

```
git clone https://github.com/Polinkhan/server-monitor.git
cd server-monitor
npm install
pm2 start app.js
pm2 save
```

If you don't want to run with pm2 copy this instead

```
git clone https://github.com/Polinkhan/server-monitor.git
cd server-monitor
npm install
npm start
```

### Execute the script

To make the script executable, run the following command

```bash
  sudo chmod +x server-monitor.sh
```

Now, run the following command to start application

```bash
  ./server-monitor.sh
```
