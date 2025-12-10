import { StageId, ContentStep } from './types';

export const CONTENT_STEPS: ContentStep[] = [
  {
    id: StageId.INTRO,
    title: "多模态大模型：从像素到语义",
    subtitle: "LLM 如何学会“看见”世界？",
    description: "大模型理解图像并非一蹴而就。这是一个将光信号（像素）转化为神经信号（特征），再转化为语言信号（语义）的复杂过程。让我们一步步揭开这个黑盒。",
    details: [
      "点击“下一步”开始探索 LLM 视觉识别的全过程。",
      "核心组件：视觉编码器 (ViT) + 投影层 (Projector) + 大语言模型 (LLM)"
    ]
  },
  {
    id: StageId.PATCHING,
    title: "第一阶段：眼睛 - 视觉编码器",
    subtitle: "2.1 图像的“马赛克化”：Patching 机制",
    description: "大模型不像人类一样连续扫描图像。它将图像切割成许多固定大小的小方块（Patches），通常是 14x14 或 16x16 像素。",
    details: [
      "类似于把一封信剪成单词卡片。",
      "一张 224x224 的图片会被切成 196 个小块。",
      "每个 Patch 都会被“展平”并映射为一个向量，并加上位置编码。"
    ]
  },
  {
    id: StageId.ENCODER_CLIP,
    title: "第一阶段：眼睛 - 特征提取",
    subtitle: "2.2 CLIP：打通视觉与语言的“罗塞塔石碑”",
    description: "仅仅切块是不够的。我们使用经过数亿对（图+文）训练的 CLIP 模型作为“眼睛”。它能通过对比学习（Contrastive Learning）理解图像内容。",
    details: [
      "CLIP 阅读了 4 亿对【图像 + 文本说明】。",
      "正样本对（图文匹配）距离拉近，负样本对距离拉远。",
      "结果：视觉编码器学会了提取带有“语义”的特征（如“宇航员”、“马”）。"
    ]
  },
  {
    id: StageId.PROJECTION,
    title: "第二阶段：桥梁 - 投影层",
    subtitle: "3. 投影层与模态对齐 (Projection & Alignment)",
    description: "视觉编码器输出的向量（视觉方言）与 LLM 的向量（文本方言）维度不同。我们需要一个翻译官（Projector）来转换它们。",
    details: [
      "通常是一个简单的线性层 (Linear Layer) 或 MLP。",
      "将 1024 维的视觉向量 映射到 4096 维的 LLM 词向量空间。",
      "变换后的向量 H_v 伪装成了 LLM 熟悉的格式。"
    ]
  },
  {
    id: StageId.TOKENS,
    title: "第二阶段：视觉 Token",
    subtitle: "3.2 不是单词的“单词”",
    description: "经过投影，图像 Patch 变成了“视觉 Token”。这些 Token 在数学空间中漂浮在具体单词之间，代表中间状态的语义。",
    details: [
      "LLM 接收到的序列：[Visual_Token_1, ..., Visual_Token_196, '这', '是', '什', '么']",
      "视觉 Token 信息密度极高，压缩了纹理、形状和质感。",
      "Token_1 可能代表“蓝色纹理”，Token_50 可能代表“耳朵形状”。"
    ]
  },
  {
    id: StageId.INFERENCE,
    title: "第三阶段：大脑 - LLM 推理",
    subtitle: "4. 像阅读文章一样“阅读”图像",
    description: "LLM 利用自注意力机制（Self-Attention），在生成回答时“回看”前面的视觉 Token，从中提取线索。",
    details: [
      "用户提问：“这张图里有什么？”",
      "LLM 把视觉 Token 当作一种“外星文字”前缀。",
      "幻觉风险：如果视觉 Token 模糊，LLM 可能会根据文本上下文强行“脑补”。"
    ]
  }
];