import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

let taskPath = path.join(__dirname, '..', 'index.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tmr.setInput('key', '70d8d737-83e1-45f3-9a03-bb77826a594d');
tmr.setInput('content', '测试消息');
tmr.setInput('mentioned_mobile_list', '@all');

tmr.run();