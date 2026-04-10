// NMTI 发疯版题目数据
// 维度: S=卷度, L=忠诚度, E=能量, P=痛苦值, D=发疯指数

export const insaneQuestions = [
  // ========== 维度 S（卷度）==========
  {
    id: 1,
    dimension: 'S',
    text: '领导在群里发了一条通知，没人回复。你：',
    options: [
      { text: '表情包秒回 +1 +1 +1！！！', scores: { S: 3, L: 2, D: 2 } },
      { text: '等...等别人先回...（然后一直盯着群）', scores: { S: 1, L: 0, D: 1 } },
      { text: '装作没看到（其实内心：呵呵）', scores: { S: 0, L: -1, D: 1 } }
    ]
  },
  {
    id: 2,
    dimension: 'S',
    text: '领导说"这个周末能不能加个班"，你内心：',
    options: [
      { text: '好嘞！！！随时call我！！！！！（已失去灵魂）', scores: { S: 3, L: 3, D: 3 } },
      { text: '行吧，得加钱（不然掀桌）', scores: { S: 1, L: 1, D: 1 } },
      { text: '不好意思，我有事（其实没事）（其实就是在床上躺着）', scores: { S: 0, L: 0, D: 2 } }
    ]
  },
  {
    id: 3,
    dimension: 'S',
    text: '年终总结，你写的字数通常是：',
    options: [
      { text: '5000字起步！！！图表齐全！！！！！（写的过程中反复质疑人生）', scores: { S: 3, D: 2 } },
      { text: '凑合1000字，能交差就行（脑子里在跑火车）', scores: { S: 1, D: 1 } },
      { text: '"今年我认真工作了。"（就这，爱咋咋地）', scores: { S: 0, D: 3 } }
    ]
  },
  {
    id: 4,
    dimension: 'S',
    text: '同事提前下班，你的想法：',
    options: [
      { text: '他工作完成得真快！！我也要努力！！！（然后还是没努力）', scores: { S: 2, D: 2 } },
      { text: '凭什么他可以凭什么凭什么凭什么', scores: { S: 0, D: 3 } },
      { text: '赶紧发群问他怎么做到的（虚心请教版）', scores: { S: 1, D: 1 } }
    ]
  },
  {
    id: 5,
    dimension: 'S',
    text: '领导布置了一个超出能力范围的任务，你：',
    options: [
      { text: '好的我试试！！！！！（然后熬夜爆肝边哭边做）', scores: { S: 3, D: 3 } },
      { text: '能不能...再考虑一下...（说完就想撤回）', scores: { S: 1, D: 1 } },
      { text: '不行，我做不了（对不起但是真的做不了）', scores: { S: 0, D: 0 } }
    ]
  },
  {
    id: 6,
    dimension: 'S',
    text: '同事加班到12点，你11点走的时候会：',
    options: [
      { text: '愧疚！！觉得自己是不是不够努力！！（虽然已经累死了）', scores: { S: 3, D: 3 } },
      { text: '心里咯噔一下，但还是走了（逃命要紧）', scores: { S: 1, D: 1 } },
      { text: '毫无波澜，这是我的下班时间（你们卷你们的我先撤）', scores: { S: 0, D: 0 } }
    ]
  },

  // ========== 维度 L（忠诚度）==========
  {
    id: 7,
    dimension: 'L',
    text: '领导在会议上明显说错了，你：',
    options: [
      { text: '默默记下，会后私聊提醒（小心翼翼版）', scores: { L: 2, E: 1, D: 1 } },
      { text: '保持沉默（内心：算了算了算了）', scores: { L: 1, D: 1 } },
      { text: '当场指出（或者至少翻个白眼）（对不起没忍住）', scores: { L: -1, E: 2, D: 2 } }
    ]
  },
  {
    id: 8,
    dimension: 'L',
    text: '领导让你"帮忙"做一件私事（比如接孩子），你：',
    options: [
      { text: '好嘞！！我马上去！！！！（已失去自我）', scores: { L: 3, S: 2, D: 3 } },
      { text: '表面答应，找理由推掉（拖延症发作）', scores: { L: 0, D: 1 } },
      { text: '抱歉啊，我当时有事（其实就是不想去）', scores: { L: -1, D: 1 } }
    ]
  },
  {
    id: 9,
    dimension: 'L',
    text: '领导朋友圈发了孩子照片，你：',
    options: [
      { text: '太可爱了！！点赞 + 评论（彩虹屁已备好）', scores: { L: 3, D: 2 } },
      { text: '点赞（敷衍式社交）', scores: { L: 1, D: 0 } },
      { text: '划走（关我什么事）', scores: { L: 0, D: 0 } }
    ]
  },
  {
    id: 10,
    dimension: 'L',
    text: '年底评优，你发现领导好像有内定，你：',
    options: [
      { text: '默默接受，明年继续（忍气吞声版）', scores: { L: 2, P: 1, D: 2 } },
      { text: '私下找领导沟通（勇敢但怂）', scores: { L: 1, E: 2, D: 1 } },
      { text: '在茶水间嘲讽，或者直接跳槽（不干了！！！！）', scores: { L: -1, P: 2, D: 3 } }
    ]
  },
  {
    id: 11,
    dimension: 'L',
    text: '领导说"我看好你"，你的感受：',
    options: [
      { text: '很开心！！我一定要努力！！（然后继续被压榨）', scores: { L: 3, S: 2, D: 2 } },
      { text: '哦，画饼呢（直接看穿）', scores: { L: 0, D: 2 } },
      { text: '我要赶紧跑了（生命诚可贵）', scores: { L: -1, D: 1 } }
    ]
  },
  {
    id: 12,
    dimension: 'L',
    text: '如果领导让你背锅，你：',
    options: [
      { text: '没关系，我理解领导的难处（我来扛！！！！）（已失去理智）', scores: { L: 3, P: 2, D: 4 } },
      { text: '心里不爽但没办法（叹气.jpg）', scores: { L: 1, P: 1, D: 2 } },
      { text: '绝对不行，凭什么！！！！', scores: { L: -1, D: 1 } }
    ]
  },

  // ========== 维度 E（能量）==========
  {
    id: 13,
    dimension: 'E',
    text: '团建聚餐，你：',
    options: [
      { text: '主动组织，安排一切！！（社牛附体）', scores: { E: 3, D: 1 } },
      { text: '勉强参加，主要是为了吃饭（饭很重要）', scores: { E: 1, D: 0 } },
      { text: '能不去就不去（求放过）', scores: { E: 0, D: 1 } }
    ]
  },
  {
    id: 14,
    dimension: 'E',
    text: '新同事入职，你：',
    options: [
      { text: '主动去打招呼，请吃饭！！（热情过度）', scores: { E: 3, D: 1 } },
      { text: '微笑点头，等对方先开口（被动社交）', scores: { E: 1, D: 0 } },
      { text: '装作很忙，祈祷别被搭话（求求了别找我）', scores: { E: 0, D: 2 } }
    ]
  },
  {
    id: 15,
    dimension: 'E',
    text: '年终会上被点名发言，你：',
    options: [
      { text: '流畅发言，顺便感谢领导和同事！！（演技派）', scores: { E: 3, L: 1, D: 1 } },
      { text: '紧张但还凑合说完（其实内心在尖叫）', scores: { E: 1, D: 2 } },
      { text: '社会性死亡现场（假装自己不存在）', scores: { E: 0, P: 2, D: 3 } }
    ]
  },
  {
    id: 16,
    dimension: 'E',
    text: '同事在群里吵架，你：',
    options: [
      { text: '主动当和事佬！！（维护世界和平）', scores: { E: 3, D: 1 } },
      { text: '吃瓜围观（有时候比电视剧好看）', scores: { E: 1, D: 1 } },
      { text: '立刻退群避祸（与我无瓜）', scores: { E: 0, D: 1 } }
    ]
  },
  {
    id: 17,
    dimension: 'E',
    text: '领导突然私聊你，你第一反应：',
    options: [
      { text: '及时回复！！（战战兢兢）', scores: { E: 2, L: 1, D: 1 } },
      { text: '纠结该秒回还是晾一晾（选择困难症）', scores: { E: 1, D: 2 } },
      { text: '救命！！！他又要干嘛！！！！！', scores: { E: 0, P: 1, D: 3 } }
    ]
  },
  {
    id: 18,
    dimension: 'E',
    text: '开会时你通常坐哪里？',
    options: [
      { text: '前排！！方便发言和被看到！！（积极分子）', scores: { E: 3, D: 1 } },
      { text: '中间，不显眼也不边缘（苟在中间）', scores: { E: 1, D: 0 } },
      { text: '角落，最好靠近门口（随时准备撤退）', scores: { E: 0, D: 1 } }
    ]
  },

  // ========== 维度 P（痛苦值）==========
  {
    id: 19,
    dimension: 'P',
    text: '周日晚上，你：',
    options: [
      { text: '充满期待，迎接周一！！（我没事真的没事）', scores: { P: 0, S: 2, D: 3 } },
      { text: '正常作息，早早上床（假装一切正常）', scores: { P: 1, D: 0 } },
      { text: '内心崩塌！！！这就是"周日焦虑症"！！！', scores: { P: 3, D: 4 } }
    ]
  },
  {
    id: 20,
    dimension: 'P',
    text: '看到"已读不回"四个字，你：',
    options: [
      { text: '没什么，大家都很忙（确实）', scores: { P: 0, D: 0 } },
      { text: '有点在意，但能接受（还是在意）', scores: { P: 1, D: 1 } },
      { text: '开始胡思乱想！！是不是我做错了什么！！（恐慌开始）', scores: { P: 3, D: 3 } }
    ]
  },
  {
    id: 21,
    dimension: 'P',
    text: '你的睡眠质量：',
    options: [
      { text: '很好，一觉到天亮（令人羡慕）', scores: { P: 0, D: 0 } },
      { text: '一般，偶尔失眠（正常打工人状态）', scores: { P: 1, D: 1 } },
      { text: '凌晨三点还在刷手机，怀疑人生！！！', scores: { P: 3, D: 4 } }
    ]
  },
  {
    id: 22,
    dimension: 'P',
    text: '最近一次发自内心的笑是什么时候？',
    options: [
      { text: '今天！！（很好！）', scores: { P: 0, D: 0 } },
      { text: '记不清了，大概这周吧（努力回想）', scores: { P: 1, D: 1 } },
      { text: '笑？？那是什么我忘了！！', scores: { P: 3, D: 3 } }
    ]
  },
  {
    id: 23,
    dimension: 'P',
    text: '凌晨2点收到工作消息，你：',
    options: [
      { text: '看到了就回，随时待命！！（我不配睡觉）', scores: { P: 0, S: 2, D: 3 } },
      { text: '假装没看到，明天再说（装死技术一流）', scores: { P: 1, D: 1 } },
      { text: '心脏骤停！！想辞职！！！！', scores: { P: 3, D: 4 } }
    ]
  },
  {
    id: 24,
    dimension: 'P',
    text: '每天早上闹钟响起时，你的心情是：',
    options: [
      { text: '新的一天，冲！！！（精神状态稳定）', scores: { P: 0, D: 1 } },
      { text: '再睡5分钟...就5分钟...', scores: { P: 1, D: 0 } },
      { text: '为什么人要工作！！我想消失！！！！！', scores: { P: 3, D: 4 } }
    ]
  },

  // ========== 娱乐题 ==========
  {
    id: 25,
    dimension: 'none',
    text: '"牛马"这个词，你：',
    options: [
      { text: '不喜欢，人和动物怎么能一样（不接受）', scores: { P: 0, D: 0 } },
      { text: '哈哈，挺贴切的（认命了）', scores: { P: 1, D: 1 } },
      { text: '我就是牛马！！！别骂了！！！！', scores: { P: 2, D: 3 } }
    ]
  }
]
