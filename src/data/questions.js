// NMTI 题目数据
// 维度: S=卷度, L=忠诚度, E=能量, P=痛苦值

export const questions = [
  // ========== 维度 S（卷度）==========
  {
    id: 1,
    dimension: 'S',
    text: '领导在群里发了一条通知，没人回复。你：',
    options: [
      { text: '表情包秒回 +1', scores: { S: 3, L: 2 } },
      { text: '等，等别人先回', scores: { S: 1, L: 0 } },
      { text: '装作没看到', scores: { S: 0, L: -1 } }
    ]
  },
  {
    id: 2,
    dimension: 'S',
    text: '领导说"这个周末能不能加个班"，你内心：',
    options: [
      { text: '好嘞，随时call我', scores: { S: 3, L: 3 } },
      { text: '行吧，得加钱', scores: { S: 1, L: 1 } },
      { text: '不好意思，我有事（其实没事）', scores: { S: 0, L: 0 } }
    ]
  },
  {
    id: 3,
    dimension: 'S',
    text: '年终总结，你写的字数通常是：',
    options: [
      { text: '5000字起步，图表齐全', scores: { S: 3 } },
      { text: '凑合1000字，能交差就行', scores: { S: 1 } },
      { text: '"今年我认真工作了。"', scores: { S: 0 } }
    ]
  },
  {
    id: 4,
    dimension: 'S',
    text: '同事提前下班，你的想法：',
    options: [
      { text: '他工作完成得真快，我也要努力', scores: { S: 2 } },
      { text: '凭什么他可以', scores: { S: 0 } },
      { text: '赶紧发群问他怎么做到的', scores: { S: 1 } }
    ]
  },
  {
    id: 5,
    dimension: 'S',
    text: '领导布置了一个超出能力范围的任务，你：',
    options: [
      { text: '好的我试试！（然后熬夜爆肝）', scores: { S: 3 } },
      { text: '能不能...再考虑一下...', scores: { S: 1 } },
      { text: '不行，我做不了', scores: { S: 0 } }
    ]
  },
  {
    id: 6,
    dimension: 'S',
    text: '你手机里有几个工作群？',
    options: [
      { text: '10个以上，基本都设置了特别关注', scores: { S: 3, L: 2 } },
      { text: '5-10个，选择性回复', scores: { S: 1 } },
      { text: '5个以下，能退的都退了', scores: { S: 0 } }
    ]
  },
  {
    id: 7,
    dimension: 'S',
    text: '同事加班到12点，你11点走的时候会：',
    options: [
      { text: '愧疚，觉得自己是不是不够努力', scores: { S: 3 } },
      { text: '心里咯噔一下，但还是走了', scores: { S: 1 } },
      { text: '毫无波澜，这是我的下班时间', scores: { S: 0 } }
    ]
  },
  {
    id: 8,
    dimension: 'S',
    text: '周末加班，你会发朋友圈吗？',
    options: [
      { text: '会，配个定位，让领导看到', scores: { S: 3, L: 2 } },
      { text: '仅同事分组可见', scores: { S: 1 } },
      { text: '不发，谁加班谁傻', scores: { S: 0 } }
    ]
  },
  {
    id: 35,
    dimension: 'S',
    text: '你的工位上贴了几张便利贴？',
    options: [
      { text: '贴满，全是待办事项', scores: { S: 3 } },
      { text: '几张，都是重要的事', scores: { S: 1 } },
      { text: '没有，我已经摆烂了', scores: { S: 0 } }
    ]
  },
  {
    id: 36,
    dimension: 'S',
    text: '周一早上7点，领导在群里发消息，你：',
    options: [
      { text: '秒回，随时在线', scores: { S: 3, L: 2 } },
      { text: '看到了，等会儿再回', scores: { S: 1 } },
      { text: '继续睡，非工作时间勿扰', scores: { S: 0 } }
    ]
  },
  {
    id: 37,
    dimension: 'S',
    text: '领导表扬了同事，你的想法：',
    options: [
      { text: '我也要加油，下次让我被表扬', scores: { S: 3 } },
      { text: '挺好的，他确实做得不错', scores: { S: 1 } },
      { text: '呵呵，又画饼', scores: { S: 0, L: -1 } }
    ]
  },
  {
    id: 50,
    dimension: 'S',
    text: '你有一个可以显示努力的技能，你会：',
    options: [
      { text: '抓紧提升，能加薪就行', scores: { S: 3 } },
      { text: '有空就学学', scores: { S: 1 } },
      { text: '不学，下班不工作', scores: { S: 0 } }
    ]
  },
  {
    id: 51,
    dimension: 'S',
    text: '下班后看到同事还在加班，你：',
    options: [
      { text: '问问他要不要帮忙', scores: { S: 3, E: 1 } },
      { text: '心里默默感谢不是自己', scores: { S: 1 } },
      { text: '赶紧走，别被缠上', scores: { S: 0 } }
    ]
  },
  {
    id: 52,
    dimension: 'S',
    text: '公司组织培训，你：',
    options: [
      { text: '认真做笔记，主动提问', scores: { S: 3 } },
      { text: '听听就行，主打一个到场', scores: { S: 1 } },
      { text: '能逃则逃', scores: { S: 0 } }
    ]
  },
  {
    id: 53,
    dimension: 'S',
    text: '同事问你怎么做到这么快，你会：',
    options: [
      { text: '详细分享我的秘诀', scores: { S: 2, E: 1 } },
      { text: '随便说两句应付一下', scores: { S: 1 } },
      { text: '嗯...就是随便做做', scores: { S: 0 } }
    ]
  },

  // ========== 维度 L（忠诚度）==========
  {
    id: 9,
    dimension: 'L',
    text: '领导在会议上明显说错了，你：',
    options: [
      { text: '默默记下，会后私聊提醒', scores: { L: 2, E: 1 } },
      { text: '保持沉默', scores: { L: 1 } },
      { text: '当场指出（或者至少翻个白眼）', scores: { L: -1, E: 2 } }
    ]
  },
  {
    id: 10,
    dimension: 'L',
    text: '领导让你"帮忙"做一件私事（比如接孩子），你：',
    options: [
      { text: '好嘞！我马上去！', scores: { L: 3, S: 2 } },
      { text: '表面答应，找理由推掉', scores: { L: 0 } },
      { text: '抱歉啊，我当时有事', scores: { L: -1 } }
    ]
  },
  {
    id: 11,
    dimension: 'L',
    text: '领导朋友圈发了孩子照片，你：',
    options: [
      { text: '太可爱了！点赞 + 评论', scores: { L: 3 } },
      { text: '点赞', scores: { L: 1 } },
      { text: '划走', scores: { L: 0 } }
    ]
  },
  {
    id: 12,
    dimension: 'L',
    text: '年底评优，你发现领导好像有内定，你：',
    options: [
      { text: '默默接受，明年继续', scores: { L: 2, P: 1 } },
      { text: '私下找领导沟通', scores: { L: 1, E: 2 } },
      { text: '在茶水间嘲讽，或者直接跳槽', scores: { L: -1, P: 2 } }
    ]
  },
  {
    id: 13,
    dimension: 'L',
    text: '领导说"我看好你"，你的感受：',
    options: [
      { text: '很开心，我一定要努力', scores: { L: 3, S: 2 } },
      { text: '哦，画饼呢', scores: { L: 0 } },
      { text: '我要赶紧跑了', scores: { L: -1 } }
    ]
  },
  {
    id: 14,
    dimension: 'L',
    text: '如果领导让你背锅，你：',
    options: [
      { text: '没关系，我理解领导的难处', scores: { L: 3, P: 2 } },
      { text: '心里不爽但没办法', scores: { L: 1, P: 1 } },
      { text: '绝对不行，凭什么', scores: { L: -1 } }
    ]
  },
  {
    id: 15,
    dimension: 'L',
    text: '公司被收购了，领导跳槽邀请你同行，你：',
    options: [
      { text: '领导去哪我去哪', scores: { L: 3 } },
      { text: '看待遇再说', scores: { L: 1 } },
      { text: '终于摆脱了', scores: { L: -1 } }
    ]
  },
  {
    id: 16,
    dimension: 'L',
    text: '领导离职那天，你会：',
    options: [
      { text: '聚餐、欢送、保持联系', scores: { L: 3, E: 1 } },
      { text: '礼貌告别，然后翻篇', scores: { L: 1 } },
      { text: '松了一口气', scores: { L: -1, P: 1 } }
    ]
  },
  {
    id: 38,
    dimension: 'L',
    text: '领导让你评价他的方案，你觉得有問題，你：',
    options: [
      { text: '委婉提出建议，顾及领导面子', scores: { L: 2, E: 1 } },
      { text: '说挺好的，反正又不是我的责任', scores: { L: 1 } },
      { text: '直接说问题在哪', scores: { L: -1 } }
    ]
  },
  {
    id: 39,
    dimension: 'L',
    text: '公司要裁员，领导让你推荐一个人，你：',
    options: [
      { text: '尽量帮他争取留下', scores: { L: -2 } },
      { text: '按客观情况推荐', scores: { L: 0 } },
      { text: '谁影响领导就推谁', scores: { L: 2, S: 1 } }
    ]
  },
  {
    id: 40,
    dimension: 'L',
    text: '领导的微信你设置的是：',
    options: [
      { text: '置顶 + 强提醒', scores: { L: 3, S: 1 } },
      { text: '备注了，方便辨认', scores: { L: 1 } },
      { text: '没设，跟其他人一样', scores: { L: 0 } }
    ]
  },
  {
    id: 54,
    dimension: 'L',
    text: '领导生日，你会：',
    options: [
      { text: '准备礼物，主动庆祝', scores: { L: 3 } },
      { text: '跟着大家随个份子', scores: { L: 1 } },
      { text: '装作不知道', scores: { L: 0 } }
    ]
  },
  {
    id: 55,
    dimension: 'L',
    text: '领导调任，接任的领导不喜欢你，你会：',
    options: [
      { text: '联系老领导，看能不能跟他走', scores: { L: 3 } },
      { text: '适应新领导，重新建立关系', scores: { L: 1 } },
      { text: '趁机考虑跳槽', scores: { L: -1 } }
    ]
  },
  {
    id: 56,
    dimension: 'L',
    text: '你们公司出了丑闻，有人来问你，你会：',
    options: [
      { text: '维护公司，说媒体报道不实', scores: { L: 3 } },
      { text: '不太清楚，不方便说', scores: { L: 1 } },
      { text: '确实有问题，我作证', scores: { L: -1 } }
    ]
  },
  {
    id: 57,
    dimension: 'L',
    text: '家属抱怨你工作太忙，你会：',
    options: [
      { text: '解释这是为了团队和领导', scores: { L: 2, S: 1 } },
      { text: '会注意平衡，但有时候没办法', scores: { L: 1 } },
      { text: '你说得对，我考虑换工作', scores: { L: -1 } }
    ]
  },

  // ========== 维度 E（能量）==========
  {
    id: 17,
    dimension: 'E',
    text: '团建聚餐，你：',
    options: [
      { text: '主动组织，安排一切', scores: { E: 3 } },
      { text: '勉强参加，主要是为了吃饭', scores: { E: 1 } },
      { text: '能不去就不去', scores: { E: 0 } }
    ]
  },
  {
    id: 18,
    dimension: 'E',
    text: '新同事入职，你：',
    options: [
      { text: '主动去打招呼，请吃饭', scores: { E: 3 } },
      { text: '微笑点头，等对方先开口', scores: { E: 1 } },
      { text: '装作很忙，祈祷别被搭话', scores: { E: 0 } }
    ]
  },
  {
    id: 19,
    dimension: 'E',
    text: '年终会上被点名发言，你：',
    options: [
      { text: '流畅发言，顺便感谢领导和同事', scores: { E: 3, L: 1 } },
      { text: '紧张但还凑合说完', scores: { E: 1 } },
      { text: '社会性死亡现场', scores: { E: 0, P: 2 } }
    ]
  },
  {
    id: 20,
    dimension: 'E',
    text: '同事在群里吵架，你：',
    options: [
      { text: '主动当和事佬', scores: { E: 3 } },
      { text: '吃瓜围观', scores: { E: 1 } },
      { text: '立刻退群避祸', scores: { E: 0 } }
    ]
  },
  {
    id: 21,
    dimension: 'E',
    text: '你的微信好友列表里，有多少是"同事"？',
    options: [
      { text: '大部分都是，经常互动', scores: { E: 3 } },
      { text: '差不多一半吧', scores: { E: 1 } },
      { text: '尽量不加，加了的也是"仅聊天"', scores: { E: 0 } }
    ]
  },
  {
    id: 22,
    dimension: 'E',
    text: '领导突然私聊你，你第一反应：',
    options: [
      { text: '及时回复', scores: { E: 2, L: 1 } },
      { text: '纠结该秒回还是晾一晾', scores: { E: 1 } },
      { text: '救命，他又要干嘛', scores: { E: 0, P: 1 } }
    ]
  },
  {
    id: 23,
    dimension: 'E',
    text: '办公室有人分享零食，你：',
    options: [
      { text: '冲过去拿，顺便聊几句', scores: { E: 3 } },
      { text: '等别人拿完再去', scores: { E: 1 } },
      { text: '假装没看到', scores: { E: 0 } }
    ]
  },
  {
    id: 24,
    dimension: 'E',
    text: '开会时你通常坐哪里？',
    options: [
      { text: '前排，方便发言和被看到', scores: { E: 3 } },
      { text: '中间，不显眼也不边缘', scores: { E: 1 } },
      { text: '角落，最好靠近门口', scores: { E: 0 } }
    ]
  },
  {
    id: 41,
    dimension: 'E',
    text: '茶水间遇到不熟的同事，你会：',
    options: [
      { text: '主动打招呼，聊聊近况', scores: { E: 3 } },
      { text: '点个头，然后各忙各的', scores: { E: 1 } },
      { text: '假装看手机，赶紧走', scores: { E: 0 } }
    ]
  },
  {
    id: 42,
    dimension: 'E',
    text: '公司年会，有表演环节，你：',
    options: [
      { text: '报名！我要展示才艺', scores: { E: 3 } },
      { text: '被拉去凑数也没办法', scores: { E: 1 } },
      { text: '打死不上台', scores: { E: 0 } }
    ]
  },
  {
    id: 43,
    dimension: 'E',
    text: '有同事过生日，邀请大家聚餐，你：',
    options: [
      { text: '去！顺便准备礼物', scores: { E: 3 } },
      { text: '去，但想早点回', scores: { E: 1 } },
      { text: '找个借口不去', scores: { E: 0 } }
    ]
  },
  {
    id: 58,
    dimension: 'E',
    text: '公司组织运动会，你：',
    options: [
      { text: '报三个项目，为部门争光', scores: { E: 3 } },
      { text: '报一个凑数的', scores: { E: 1 } },
      { text: '那天正好有事', scores: { E: 0 } }
    ]
  },
  {
    id: 59,
    dimension: 'E',
    text: '电梯里遇到同层不同部门的同事，你：',
    options: [
      { text: '主动聊几句最近的工作', scores: { E: 3 } },
      { text: '点个头示意', scores: { E: 1 } },
      { text: '假装看手机', scores: { E: 0 } }
    ]
  },
  {
    id: 60,
    dimension: 'E',
    text: '你通常多久参加一次同事组织的活动？',
    options: [
      { text: '一周几次，来者不拒', scores: { E: 3 } },
      { text: '有空的就去', scores: { E: 1 } },
      { text: '基本不参加', scores: { E: 0 } }
    ]
  },
  {
    id: 61,
    dimension: 'E',
    text: '新项目启动，需要组建跨部门小组，你：',
    options: [
      { text: '主动报名，正好认识新人', scores: { E: 3 } },
      { text: '如果领导安排就去', scores: { E: 1 } },
      { text: '尽量避免', scores: { E: 0 } }
    ]
  },

  // ========== 维度 P（痛苦值）==========
  {
    id: 25,
    dimension: 'P',
    text: '周日晚上，你：',
    options: [
      { text: '充满期待，迎接周一', scores: { P: 0, S: 2 } },
      { text: '正常作息，早早上床', scores: { P: 1 } },
      { text: '内心崩塌，这就是"周日焦虑症"', scores: { P: 3 } }
    ]
  },
  {
    id: 26,
    dimension: 'P',
    text: '看到"已读不回"四个字，你：',
    options: [
      { text: '没什么，大家都很忙', scores: { P: 0 } },
      { text: '有点在意，但能接受', scores: { P: 1 } },
      { text: '开始胡思乱想，是不是我做错了什么', scores: { P: 3 } }
    ]
  },
  {
    id: 27,
    dimension: 'P',
    text: '你的睡眠质量：',
    options: [
      { text: '很好，一觉到天亮', scores: { P: 0 } },
      { text: '一般，偶尔失眠', scores: { P: 1 } },
      { text: '凌晨三点还在刷题，怀疑人生', scores: { P: 3 } }
    ]
  },
  {
    id: 28,
    dimension: 'P',
    text: '最近一次发自内心的笑是什么时候？',
    options: [
      { text: '今天', scores: { P: 0 } },
      { text: '记不清了，大概这周吧', scores: { P: 1 } },
      { text: '笑？那是什么', scores: { P: 3 } }
    ]
  },
  {
    id: 29,
    dimension: 'P',
    text: '"人生的意义是什么"，你怎么看：',
    options: [
      { text: '好好活着，努力奋斗', scores: { P: 0, S: 1 } },
      { text: '不清楚，但先活着看看', scores: { P: 1 } },
      { text: '啥意义，苟且而已', scores: { P: 3 } }
    ]
  },
  {
    id: 30,
    dimension: 'P',
    text: '凌晨2点收到工作消息，你：',
    options: [
      { text: '看到了就回，随时待命', scores: { P: 0, S: 2 } },
      { text: '假装没看到，明天再说', scores: { P: 1 } },
      { text: '心脏骤停，想辞职', scores: { P: 3 } }
    ]
  },
  {
    id: 31,
    dimension: 'P',
    text: '每天早上闹钟响起时，你的心情是：',
    options: [
      { text: '新的一天，冲！', scores: { P: 0 } },
      { text: '再睡5分钟...', scores: { P: 1 } },
      { text: '为什么人要工作，我想消失', scores: { P: 3 } }
    ]
  },
  {
    id: 44,
    dimension: 'P',
    text: '看到朋友圈同事晒升职加薪，你的感想：',
    options: [
      { text: '替他开心！我也要努力', scores: { P: 0, S: 1 } },
      { text: '跟我无关，划走', scores: { P: 1 } },
      { text: '凭什么不是我', scores: { P: 2 } }
    ]
  },
  {
    id: 45,
    dimension: 'P',
    text: '你的体检报告上有几项异常？',
    options: [
      { text: '一切正常，养生达人', scores: { P: 0 } },
      { text: '两三项，问题不大', scores: { P: 1 } },
      { text: '不敢看体检报告', scores: { P: 3 } }
    ]
  },
  {
    id: 46,
    dimension: 'P',
    text: '你对未来的态度：',
    options: [
      { text: '充满希望，未来可期', scores: { P: 0 } },
      { text: '走一步看一步吧', scores: { P: 1 } },
      { text: '别跟我谈未来，先让我活过本周', scores: { P: 3 } }
    ]
  },
  {
    id: 47,
    dimension: 'P',
    text: '领导说"下周开始..."，你的第一反应：',
    options: [
      { text: '什么事？我准备好了', scores: { P: 0 } },
      { text: '估计又有新活儿了', scores: { P: 1 } },
      { text: '完了，要出事', scores: { P: 2 } }
    ]
  },
  {
    id: 62,
    dimension: 'P',
    text: '听到"我们聊聊"这四个字时：',
    options: [
      { text: '好的，什么事？', scores: { P: 0 } },
      { text: '心里咯噔一下', scores: { P: 1 } },
      { text: '心跳加速，开始回忆自己做错了什么', scores: { P: 3 } }
    ]
  },
  {
    id: 63,
    dimension: 'P',
    text: '工作日晚上，你通常怎么过？',
    options: [
      { text: '继续学习/复盘今天的工作', scores: { P: 0, S: 1 } },
      { text: '就休息，看看剧刷刷手机', scores: { P: 1 } },
      { text: '发呆，什么都不想干', scores: { P: 2 } }
    ]
  },
  {
    id: 64,
    dimension: 'P',
    text: '你的工资到账后：',
    options: [
      { text: '规划好每分钱，理财目标明确', scores: { P: 0, S: 1 } },
      { text: '够花就行，存点钱', scores: { P: 1 } },
      { text: '先还花呗/信用卡，然后又没了', scores: { P: 2 } }
    ]
  },
  {
    id: 65,
    dimension: 'P',
    text: '最近一次焦虑是什么时候？',
    options: [
      { text: '很久没有了', scores: { P: 0 } },
      { text: '这周吧', scores: { P: 1 } },
      { text: '就是现在', scores: { P: 3 } }
    ]
  },

  // ========== 娱乐/补充题 ==========
  {
    id: 32,
    dimension: 'none',
    text: '你的梦想是：',
    options: [
      { text: '当上CEO，迎娶白富美/高富帅', scores: { S: 2 } },
      { text: '财务自由，环游世界', scores: {} },
      { text: '退休，立刻，马上', scores: { P: 1 } }
    ]
  },
  {
    id: 33,
    dimension: 'none',
    text: '"牛马"这个词，你：',
    options: [
      { text: '不喜欢，人和动物怎么能一样', scores: { P: 0 } },
      { text: '哈哈，挺贴切的', scores: { P: 1 } },
      { text: '我就是牛马，别骂了', scores: { P: 2 } }
    ]
  },
  {
    id: 34,
    dimension: 'none',
    text: '如果中了彩票头奖，你第一时间会：',
    options: [
      { text: '辞职，我来当老板', scores: { S: 1 } },
      { text: '先把房贷还了，继续上班', scores: { L: 1 } },
      { text: '躺平，从此再不上班', scores: { P: 2 } }
    ]
  },
  {
    id: 48,
    dimension: 'none',
    text: '如果必须给新同事起个外号，你会选：',
    options: [
      { text: '大佬（先捧起来）', scores: { E: 1, L: 1 } },
      { text: '小李/小王（正常叫）', scores: {} },
      { text: '喂（省事）', scores: { E: 0 } }
    ]
  },
  {
    id: 49,
    dimension: 'none',
    text: '同事问你对公司有什么建议，你会说：',
    options: [
      { text: '加班补贴！', scores: { S: 1 } },
      { text: '团建不要选周末', scores: { P: 1 } },
      { text: '没有建议，谢谢', scores: { L: 1 } }
    ]
  }
]
