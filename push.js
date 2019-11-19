console.log(process.argv)
const { exec } = require('child_process');

exec(`git add . && git commit -m ${process.argv[2]} && git pull && git push`, (err, stdout, stderr) => {
    if(err) {
        console.log(err);
        return;
    }
})