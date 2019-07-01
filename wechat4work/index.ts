import tl = require('azure-pipelines-task-lib/task');
import https = require('https');

async function run() {
    try {
        const key: string = tl.getInput('key', true);
        const content: string = tl.getInput('content', true);

        var data = {
            msgtype: "text",
            text: {
                content: content
            }
        };

        var json = JSON.stringify(data);

        var options = {
            host: 'qyapi.weixin.qq.com',
            port: 443,
            path: '/cgi-bin/webhook/send?key=' + key,
            method: 'POST',
            json: true,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(json)
            }
        }

        var req = https.request(options, res => {
            res.setEncoding('utf8');
        });

        req.on('error', e => {
            console.log('problem with request: ' + e.message);
            tl.setResult(tl.TaskResult.Failed, e.message);
        });

        req.write(json, 'utf8');
        req.end();
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();