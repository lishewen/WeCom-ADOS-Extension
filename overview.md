# WeCom
通过Webhook机器人往企业微信群发送消息

# YAML Config
```YAML
steps:

- task: lishewen.wecom.custom-wecom-task.往企业微信发送消息@0

  displayName: '通过Bot往企业微信群发送 Test Pass'

  inputs:

    key: '[Your Key]'

    content: 'Test Pass'

```