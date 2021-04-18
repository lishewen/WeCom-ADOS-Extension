"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
const https = require("https");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const key = tl.getInput('key', true);
            const msgtype = tl.getInput('msgtype', true);
            const content = tl.getInput('content', true);
            const mentioned_mobile_list = tl.getInput('mentionedmobilelist', false);
            let data = {};
            switch (msgtype) {
                case 'markdown':
                    data = {
                        msgtype: msgtype,
                        markdown: {
                            content: content,
                            mentioned_mobile_list: mentioned_mobile_list ? mentioned_mobile_list.split(',') : null
                        }
                    };
                    break;
                default:
                    data = {
                        msgtype: msgtype,
                        text: {
                            content: content,
                            mentioned_mobile_list: mentioned_mobile_list ? mentioned_mobile_list.split(',') : null
                        }
                    };
                    break;
            }
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
            };
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
    });
}
run();
