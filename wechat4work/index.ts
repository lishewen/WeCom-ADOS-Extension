import tl = require('azure-pipelines-task-lib/task');
import https = require('https');

async function run() {
    try {
        const key: string = tl.getInput('key', true);
        const content: string = tl.getInput('content', true);
        const mentioned_mobile_list: string = tl.getInput('mentioned_mobile_list', false);

        let data = {
            msgtype: "text",
            text: {
                content: content,
                mentioned_mobile_list: mentioned_mobile_list ? mentioned_mobile_list.split(',') : null
            }
        };

        let json = JSON.stringify(data);

        let options = {
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

        let req = https.request(options, res => {
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