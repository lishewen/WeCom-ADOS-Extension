"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tmrm = require("azure-pipelines-task-lib/mock-run");
const path = require("path");
let taskPath = path.join(__dirname, '..', 'index.js');
let tmr = new tmrm.TaskMockRunner(taskPath);
tmr.setInput('key', '70d8d737-83e1-45f3-9a03-bb77826a594d');
tmr.setInput('content', '测试消息');
tmr.run();
