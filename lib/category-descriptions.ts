import type { Lang } from '@/types'

interface CategoryMeta {
  descriptions: Record<Lang, string>
  related: string[]
}

export const CATEGORY_META: Record<string, CategoryMeta> = {
  // 감정 (emotion)
  happy: {
    descriptions: {
      ko: '기쁨과 행복을 표현하는 카오모지 모음입니다. 밝고 긍정적인 감정을 전달할 때 사용해보세요.',
      en: 'A collection of kaomoji expressing joy and happiness. Perfect for sharing positive vibes and cheerful feelings.',
      ja: '喜びや幸せを表現するカオモジのコレクションです。明るくポジティブな感情を伝えるのにぴったり。',
    },
    related: ['love', 'wink', 'dance', 'fighting', 'upfeeling'],
  },
  angry: {
    descriptions: {
      ko: '분노와 짜증을 표현하는 카오모지 모음입니다. 답답하거나 화가 날 때 감정을 표현해보세요.',
      en: 'Kaomoji for expressing anger and frustration. Use these when you need to show that you\'re upset or annoyed.',
      ja: '怒りやいらいらを表現するカオモジのコレクション。腹が立ったときや不満を伝えたいときに使ってみてください。',
    },
    related: ['fighting', 'donot', 'crazy', 'confused', 'scary'],
  },
  sad: {
    descriptions: {
      ko: '슬픔과 우울함을 표현하는 카오모지 모음입니다. 마음이 힘들 때 감정을 공유해보세요.',
      en: 'Kaomoji for expressing sadness and melancholy. Share your feelings when you\'re feeling down or blue.',
      ja: '悲しさや憂うつさを表現するカオモジのコレクション。気分が落ち込んでいるときに気持ちを伝えてみてください。',
    },
    related: ['worried', 'thinking', 'shy', 'blurry', 'scared'],
  },
  love: {
    descriptions: {
      ko: '사랑과 애정을 표현하는 카오모지 모음입니다. 소중한 사람에게 따뜻한 마음을 전달해보세요.',
      en: 'Kaomoji for expressing love and affection. Send warm feelings to someone special in your life.',
      ja: '愛情や好意を表現するカオモジのコレクション。大切な人に温かい気持ちを伝えてみてください。',
    },
    related: ['happy', 'wink', 'shy', 'dance', 'hello'],
  },
  shy: {
    descriptions: {
      ko: '수줍음과 부끄러움을 표현하는 카오모지 모음입니다. 쑥스러운 감정을 귀엽게 표현해보세요.',
      en: 'Kaomoji for expressing shyness and embarrassment. Adorably show when you\'re feeling bashful or flustered.',
      ja: '恥ずかしさや照れを表現するカオモジのコレクション。恥ずかしい気持ちをかわいく表現してみてください。',
    },
    related: ['love', 'wink', 'hello', 'happy', 'blurry'],
  },
  wink: {
    descriptions: {
      ko: '윙크와 장난기 있는 표정을 담은 카오모지 모음입니다. 위트 있는 메시지에 재미를 더해보세요.',
      en: 'Kaomoji featuring winks and playful expressions. Add a dash of wit and playfulness to your messages.',
      ja: 'ウィンクや遊び心のある表情のカオモジのコレクション。機知に富んだメッセージに楽しさを添えてみてください。',
    },
    related: ['happy', 'love', 'dance', 'shy', 'hello'],
  },
  worried: {
    descriptions: {
      ko: '걱정과 불안을 표현하는 카오모지 모음입니다. 마음이 무겁거나 염려될 때 사용해보세요.',
      en: 'Kaomoji for expressing worry and anxiety. Use these when you\'re feeling anxious or concerned about something.',
      ja: '心配や不安を表現するカオモジのコレクション。気がかりなことがあるときや、不安なときに使ってみてください。',
    },
    related: ['thinking', 'confused', 'sad', 'blurry', 'ask'],
  },
  thinking: {
    descriptions: {
      ko: '생각하고 고민하는 표정을 담은 카오모지 모음입니다. 진지하게 고려 중임을 표현해보세요.',
      en: 'Kaomoji for thoughtful and contemplative expressions. Show that you\'re carefully considering something.',
      ja: '考えたり悩んだりする表情のカオモジのコレクション。真剣に考えていることを表現してみてください。',
    },
    related: ['worried', 'confused', 'ask', 'abnormal', 'blurry'],
  },
  confused: {
    descriptions: {
      ko: '혼란스럽고 어리둥절한 표정의 카오모지 모음입니다. 이해가 안 될 때 당혹감을 표현해보세요.',
      en: 'Kaomoji for confused and puzzled expressions. Perfect for when you don\'t understand something or feel bewildered.',
      ja: '混乱したり戸惑ったりする表情のカオモジのコレクション。よくわからないときや困惑しているときに使ってみてください。',
    },
    related: ['thinking', 'worried', 'abnormal', 'ask', 'blurry'],
  },
  dance: {
    descriptions: {
      ko: '신나게 춤추는 모습을 표현하는 카오모지 모음입니다. 기쁨과 흥겨움을 마음껏 표현해보세요.',
      en: 'Kaomoji featuring dancing and joyful movements. Express excitement and let loose with these energetic characters.',
      ja: '楽しく踊る様子を表現するカオモジのコレクション。喜びや楽しさを思いっきり表現してみてください。',
    },
    related: ['happy', 'fighting', 'upfeeling', 'music', 'running'],
  },
  fighting: {
    descriptions: {
      ko: '응원과 투지를 표현하는 카오모지 모음입니다. 힘내라는 격려의 마음을 전달해보세요.',
      en: 'Kaomoji for cheering and showing fighting spirit. Send encouragement and support to someone who needs motivation.',
      ja: '応援や闘志を表現するカオモジのコレクション。頑張れという励ましの気持ちを伝えてみてください。',
    },
    related: ['happy', 'dance', 'upfeeling', 'running', 'salut'],
  },
  crazy: {
    descriptions: {
      ko: '과장되고 엉뚱한 표정의 카오모지 모음입니다. 황당하거나 미칠 것 같은 상황을 표현해보세요.',
      en: 'Kaomoji for wild and exaggerated expressions. Use these when situations feel absolutely bonkers or overwhelmingly chaotic.',
      ja: '大げさで突飛な表情のカオモジのコレクション。あり得ない状況や混乱しているときに使ってみてください。',
    },
    related: ['abnormal', 'confused', 'angry', 'fighting', 'blurry'],
  },
  upfeeling: {
    descriptions: {
      ko: '기대감과 설레임을 표현하는 카오모지 모음입니다. 흥분되고 신나는 감정을 공유해보세요.',
      en: 'Kaomoji for expressing excitement and anticipation. Share that buzzing, can\'t-wait feeling with others.',
      ja: '期待感やわくわくを表現するカオモジのコレクション。興奮してドキドキする気持ちをシェアしてみてください。',
    },
    related: ['happy', 'dance', 'fighting', 'music', 'wink'],
  },
  abnormal: {
    descriptions: {
      ko: '기묘하고 독특한 표정의 카오모지 모음입니다. 일반적이지 않은 상황을 유머러스하게 표현해보세요.',
      en: 'Kaomoji for weird and quirky expressions. Humorously convey strange or unusual situations with these oddball characters.',
      ja: '奇妙でユニークな表情のカオモジのコレクション。普通じゃない状況をユーモラスに表現してみてください。',
    },
    related: ['crazy', 'confused', 'blurry', 'thinking', 'crazy'],
  },
  ask: {
    descriptions: {
      ko: '부탁과 애원하는 모습의 카오모지 모음입니다. 간절히 무언가를 요청할 때 사용해보세요.',
      en: 'Kaomoji for pleading and requesting expressions. Use these when you\'re earnestly asking for a favor or permission.',
      ja: 'お願いや懇願する様子のカオモジのコレクション。心から何かをお願いするときに使ってみてください。',
    },
    related: ['worried', 'thinking', 'sad', 'shy', 'hello'],
  },
  hello: {
    descriptions: {
      ko: '인사와 작별을 표현하는 카오모지 모음입니다. 반갑게 맞이하거나 아쉽게 작별할 때 사용해보세요.',
      en: 'Kaomoji for greetings and farewells. Use these to warmly welcome someone or bid a fond goodbye.',
      ja: 'あいさつや別れを表現するカオモジのコレクション。歓迎するときや名残惜しくお別れするときに使ってみてください。',
    },
    related: ['salut', 'wink', 'love', 'happy', 'shy'],
  },
  donot: {
    descriptions: {
      ko: '거절과 저지하는 표정의 카오모지 모음입니다. 안 된다거나 멈춰달라는 의사를 표현해보세요.',
      en: 'Kaomoji for refusal and stop expressions. Use these to clearly say no or ask someone to stop.',
      ja: '拒否や制止する表情のカオモジのコレクション。だめだとか止めてほしいという意思を表現してみてください。',
    },
    related: ['angry', 'fighting', 'ask', 'scared', 'crazy'],
  },
  salut: {
    descriptions: {
      ko: '경례와 충성을 표현하는 카오모지 모음입니다. 경의를 표하거나 유머러스하게 복종을 나타낼 때 사용해보세요.',
      en: 'Kaomoji for salutes and expressions of loyalty. Show respect or humorously pledge allegiance with these.',
      ja: '敬礼や忠誠を表現するカオモジのコレクション。敬意を表したりユーモラスに服従を示すときに使ってみてください。',
    },
    related: ['hello', 'fighting', 'ask', 'happy', 'running'],
  },
  scary: {
    descriptions: {
      ko: '공포와 두려움을 표현하는 카오모지 모음입니다. 무섭거나 놀라운 상황을 실감나게 전달해보세요.',
      en: 'Kaomoji for fear and fright expressions. Convey scary situations or jump scares with these spooky characters.',
      ja: '恐怖や怖さを表現するカオモジのコレクション。怖い状況や驚きを臨場感たっぷりに伝えてみてください。',
    },
    related: ['worried', 'crazy', 'confused', 'hiding', 'abnormal'],
  },
  blurry: {
    descriptions: {
      ko: '흐릿하고 몽롱한 느낌의 카오모지 모음입니다. 멍하거나 어지러운 상태를 재미있게 표현해보세요.',
      en: 'Kaomoji with a blurry and dazed feel. Humorously express when you\'re feeling out of it or in a foggy state.',
      ja: 'ぼんやりしたり朦朧とした感じのカオモジのコレクション。ぼーっとしているときや、ふらふらしているときをおもしろく表現してみてください。',
    },
    related: ['confused', 'thinking', 'sleeping', 'abnormal', 'crazy'],
  },

  // 동물 (animal)
  cat: {
    descriptions: {
      ko: '고양이를 모티프로 한 카오모지 모음입니다. 귀엽고 새침한 고양이 감성을 전달해보세요.',
      en: 'Cat-themed kaomoji collection. Share the adorable and aloof charm of cats in your messages.',
      ja: 'ねこをモチーフにしたカオモジのコレクション。かわいくてツンデレなねこの雰囲気を伝えてみてください。',
    },
    related: ['bear', 'puppy', 'rabbit', 'duck', 'pig'],
  },
  bear: {
    descriptions: {
      ko: '곰을 모티프로 한 카오모지 모음입니다. 포근하고 귀여운 곰돌이 감성을 메시지에 담아보세요.',
      en: 'Bear-themed kaomoji collection. Add cozy and cuddly bear vibes to your messages.',
      ja: 'クマをモチーフにしたカオモジのコレクション。ふんわりかわいいクマの雰囲気をメッセージに込めてみてください。',
    },
    related: ['cat', 'puppy', 'rabbit', 'pig', 'bird'],
  },
  puppy: {
    descriptions: {
      ko: '강아지를 모티프로 한 카오모지 모음입니다. 활발하고 사랑스러운 강아지 에너지를 전달해보세요.',
      en: 'Puppy-themed kaomoji collection. Share the lively and lovable energy of dogs in your messages.',
      ja: '犬をモチーフにしたカオモジのコレクション。元気で愛らしい犬のエネルギーを伝えてみてください。',
    },
    related: ['cat', 'bear', 'rabbit', 'duck', 'bird'],
  },
  pig: {
    descriptions: {
      ko: '돼지를 모티프로 한 카오모지 모음입니다. 통통하고 귀여운 돼지 캐릭터로 메시지를 꾸며보세요.',
      en: 'Pig-themed kaomoji collection. Decorate your messages with chubby and adorable pig characters.',
      ja: 'ブタをモチーフにしたカオモジのコレクション。ぽっちゃりかわいいブタのキャラクターでメッセージを彾ってみてください。',
    },
    related: ['cat', 'bear', 'duck', 'rabbit', 'bird'],
  },
  rabbit: {
    descriptions: {
      ko: '토끼를 모티프로 한 카오모지 모음입니다. 깡충깡충 귀여운 토끼로 메시지를 활기차게 만들어보세요.',
      en: 'Rabbit-themed kaomoji collection. Brighten up your messages with cute and bouncy bunny characters.',
      ja: 'うさぎをモチーフにしたカオモジのコレクション。ぴょんぴょんかわいいうさぎでメッセージを明るくしてみてください。',
    },
    related: ['cat', 'bear', 'puppy', 'duck', 'bird'],
  },
  duck: {
    descriptions: {
      ko: '오리를 모티프로 한 카오모지 모음입니다. 뒤뚱뒤뚱 귀여운 오리 캐릭터로 재미를 더해보세요.',
      en: 'Duck-themed kaomoji collection. Add a waddle of cuteness to your messages with adorable duck characters.',
      ja: 'アヒルをモチーフにしたカオモジのコレクション。よちよち歩くかわいいアヒルのキャラクターで楽しさを添えてみてください。',
    },
    related: ['cat', 'bear', 'rabbit', 'bird', 'fish'],
  },
  bird: {
    descriptions: {
      ko: '새를 모티프로 한 카오모지 모음입니다. 자유롭게 날아다니는 새의 감성을 메시지에 담아보세요.',
      en: 'Bird-themed kaomoji collection. Bring a free-spirited, fluttery vibe to your messages with these bird characters.',
      ja: '鳥をモチーフにしたカオモジのコレクション。自由に飛び回る鳥の雰囲気をメッセージに込めてみてください。',
    },
    related: ['duck', 'rabbit', 'cat', 'fish', 'cloud'],
  },
  fish: {
    descriptions: {
      ko: '물고기와 해양생물을 모티프로 한 카오모지 모음입니다. 바닷속 귀여운 생물들로 메시지를 장식해보세요.',
      en: 'Sea life-themed kaomoji collection. Decorate your messages with cute underwater creatures from the ocean.',
      ja: '魚や海の生き物をモチーフにしたカオモジのコレクション。海の中のかわいい生き物たちでメッセージを飾ってみてください。',
    },
    related: ['bird', 'duck', 'cat', 'cloud', 'bear'],
  },

  // 활동 (action)
  sleeping: {
    descriptions: {
      ko: '잠자는 모습을 표현하는 카오모지 모음입니다. 졸리거나 쉬고 싶을 때 피곤함을 귀엽게 전달해보세요.',
      en: 'Sleeping-themed kaomoji collection. Cutely express tiredness or let someone know you\'re off to dreamland.',
      ja: '眠っている様子を表現するカオモジのコレクション。眠いときや休みたいときに疲れをかわいく伝えてみてください。',
    },
    related: ['blurry', 'music', 'hiding', 'eating', 'studying'],
  },
  studying: {
    descriptions: {
      ko: '공부하고 학습하는 모습의 카오모지 모음입니다. 열심히 공부 중임을 재미있게 표현해보세요.',
      en: 'Study-themed kaomoji collection. Humorously show that you\'re hard at work studying or learning.',
      ja: '勉強したり学んだりする様子のカオモジのコレクション。一生懸命勉強中であることをおもしろく表現してみてください。',
    },
    related: ['thinking', 'sleeping', 'music', 'eating', 'hiding'],
  },
  eating: {
    descriptions: {
      ko: '먹는 모습을 표현하는 카오모지 모음입니다. 맛있는 음식을 즐기는 행복감을 함께 나눠보세요.',
      en: 'Eating-themed kaomoji collection. Share the joy of delicious food and the happiness of a good meal.',
      ja: '食べる様子を表現するカオモジのコレクション。おいしい食べ物を楽しむ幸せな気持ちをシェアしてみてください。',
    },
    related: ['sleeping', 'music', 'studying', 'running', 'magic'],
  },
  running: {
    descriptions: {
      ko: '달리는 모습을 표현하는 카오모지 모음입니다. 활기차게 뛰어다니는 에너지를 전달해보세요.',
      en: 'Running-themed kaomoji collection. Express lively, energetic movement and the thrill of being on the go.',
      ja: '走る様子を表現するカオモジのコレクション。元気いっぱいに駆け回るエネルギーを伝えてみてください。',
    },
    related: ['fighting', 'dance', 'hiding', 'magic', 'eating'],
  },
  hiding: {
    descriptions: {
      ko: '숨는 모습을 표현하는 카오모지 모음입니다. 부끄럽거나 피하고 싶을 때 귀엽게 숨어보세요.',
      en: 'Hiding-themed kaomoji collection. Adorably express shyness or the urge to disappear from a situation.',
      ja: '隠れる様子を表現するカオモジのコレクション。恥ずかしいときや避けたいときにかわいく隠れてみてください。',
    },
    related: ['shy', 'sleeping', 'studying', 'running', 'scared'],
  },
  music: {
    descriptions: {
      ko: '음악을 즐기는 모습의 카오모지 모음입니다. 노래하고 리듬을 타는 즐거움을 표현해보세요.',
      en: 'Music-themed kaomoji collection. Express the joy of listening to music, singing, and moving to the beat.',
      ja: '音楽を楽しむ様子のカオモジのコレクション。歌ったりリズムに乗ったりする楽しさを表現してみてください。',
    },
    related: ['dance', 'upfeeling', 'eating', 'sleeping', 'studying'],
  },
  magic: {
    descriptions: {
      ko: '마법을 부리는 모습의 카오모지 모음입니다. 신비롭고 환상적인 분위기를 연출해보세요.',
      en: 'Magic-themed kaomoji collection. Create a mystical and fantastical atmosphere in your messages.',
      ja: '魔法をかける様子のカオモジのコレクション。神秘的でファンタジックな雰囲気を演出してみてください。',
    },
    related: ['star', 'music', 'dance', 'chiikawa', 'snowman'],
  },

  // 캐릭터 (character)
  snowman: {
    descriptions: {
      ko: '눈사람 캐릭터 카오모지 모음입니다. 겨울의 포근하고 설레는 분위기를 담아보세요.',
      en: 'Snowman character kaomoji collection. Capture the cozy and exciting feeling of winter in your messages.',
      ja: '雪だるまキャラクターのカオモジのコレクション。冬のほんわかわくわくする雰囲気を込めてみてください。',
    },
    related: ['cloud', 'old', 'chiikawa', 'magic', 'combination'],
  },
  cloud: {
    descriptions: {
      ko: '구름 캐릭터 카오모지 모음입니다. 몽실몽실 가볍고 자유로운 감성을 메시지에 더해보세요.',
      en: 'Cloud character kaomoji collection. Add a fluffy, light, and carefree feeling to your messages.',
      ja: '雲キャラクターのカオモジのコレクション。もくもくと軽やかで自由な雰囲気をメッセージに加えてみてください。',
    },
    related: ['snowman', 'bird', 'old', 'chiikawa', 'combination'],
  },
  old: {
    descriptions: {
      ko: '나이 든 캐릭터를 표현하는 카오모지 모음입니다. 연륜 있는 유머와 지혜를 재미있게 전달해보세요.',
      en: 'Elderly character kaomoji collection. Share wisdom and aged humor with these charming senior-inspired characters.',
      ja: 'お年寄りキャラクターを表現するカオモジのコレクション。年の功のユーモアと知恵をおもしろく伝えてみてください。',
    },
    related: ['snowman', 'cloud', 'combination', 'chiikawa', 'returningstudent'],
  },
  chiikawa: {
    descriptions: {
      ko: '치이카와 스타일의 귀여운 카오모지 모음입니다. 작고 소중한 캐릭터의 감성을 메시지에 담아보세요.',
      en: 'Chiikawa-style cute kaomoji collection. Bring the tiny and precious character energy to your messages.',
      ja: 'ちいかわスタイルのかわいいカオモジのコレクション。小さくてかわいいキャラクターの雰囲気をメッセージに込めてみてください。',
    },
    related: ['old', 'snowman', 'cloud', 'returningstudent', 'combination'],
  },
  returningstudent: {
    descriptions: {
      ko: '복학생 감성의 카오모지 모음입니다. 오랜만에 학교로 돌아온 어색하고 새로운 느낌을 표현해보세요.',
      en: 'Returning student-themed kaomoji collection. Express the awkward yet refreshing feeling of returning to school after a long break.',
      ja: '復学生の感じのカオモジのコレクション。久しぶりに学校に戻った気まずくも新鮮な気持ちを表現してみてください。',
    },
    related: ['old', 'chiikawa', 'studying', 'combination', 'abnormal'],
  },
  weapon: {
    descriptions: {
      ko: '무기를 든 캐릭터 카오모지 모음입니다. 전투적이거나 용감한 분위기를 재미있게 표현해보세요.',
      en: 'Weapon-wielding character kaomoji collection. Humorously express a fierce or brave battle-ready attitude.',
      ja: '武器を持ったキャラクターのカオモジのコレクション。戦闘的で勇敢な雰囲気をおもしろく表現してみてください。',
    },
    related: ['fighting', 'salut', 'angry', 'crazy', 'combination'],
  },
  combination: {
    descriptions: {
      ko: '여러 요소를 조합한 창의적인 카오모지 모음입니다. 다채롭고 독특한 표현으로 개성을 나타내보세요.',
      en: 'Creative combination kaomoji collection. Show off your unique personality with these diverse and imaginative expressions.',
      ja: '複数の要素を組み合わせた創造的なカオモジのコレクション。多彩でユニークな表現で個性を出してみてください。',
    },
    related: ['old', 'chiikawa', 'snowman', 'cloud', 'weapon'],
  },

  // 특별 (special)
  pick: {
    descriptions: {
      ko: '엄선된 인기 카오모지 모음입니다. 가장 많이 사랑받는 베스트 카오모지들을 만나보세요.',
      en: 'Hand-picked popular kaomoji collection. Discover the most beloved and frequently used kaomoji expressions.',
      ja: '厳選された人気カオモジのコレクション。最もよく使われる人気のカオモジをチェックしてみてください。',
    },
    related: ['star', 'friend', 'card', 'happy', 'love'],
  },
  card: {
    descriptions: {
      ko: '카드 게임을 모티프로 한 카오모지 모음입니다. 신비롭고 재미있는 카드 감성을 메시지에 더해보세요.',
      en: 'Card game-themed kaomoji collection. Add a mysterious and fun card-playing vibe to your messages.',
      ja: 'カードゲームをモチーフにしたカオモジのコレクション。神秘的で楽しいカードの雰囲気をメッセージに加えてみてください。',
    },
    related: ['star', 'pick', 'magic', 'combination', 'friend'],
  },
  star: {
    descriptions: {
      ko: '스타와 아이돌 감성의 카오모지 모음입니다. 빛나는 존재감과 특별한 분위기를 전달해보세요.',
      en: 'Star and idol-themed kaomoji collection. Convey a sparkling presence and special aura with these characters.',
      ja: 'スターやアイドルの雰囲気のカオモジのコレクション。輝く存在感と特別な雰囲気を伝えてみてください。',
    },
    related: ['pick', 'card', 'friend', 'magic', 'upfeeling'],
  },
  friend: {
    descriptions: {
      ko: '친구와 우정을 표현하는 카오모지 모음입니다. 소중한 친구와의 따뜻한 순간을 함께 나눠보세요.',
      en: 'Friendship-themed kaomoji collection. Share warm and cherished moments with your closest friends.',
      ja: '友達や友情を表現するカオモジのコレクション。大切な友達との温かいひとときをシェアしてみてください。',
    },
    related: ['star', 'pick', 'love', 'hello', 'happy'],
  },

  // 구분선 (divider)
  divider: {
    descriptions: {
      ko: '텍스트를 깔끔하게 구분하는 기본 구분선 모음입니다. SNS나 메시지 꾸미기에 활용해보세요.',
      en: 'Basic divider collection for cleanly separating text. Use these to decorate your SNS posts and messages.',
      ja: 'テキストをすっきりと区切る基本の区切り線のコレクション。SNSやメッセージの飾りとして使ってみてください。',
    },
    related: ['div_heart', 'div_star', 'div_flower', 'div_moon', 'div_template'],
  },
  div_heart: {
    descriptions: {
      ko: '하트 모양의 구분선 모음입니다. 로맨틱하고 사랑스러운 느낌으로 텍스트를 꾸며보세요.',
      en: 'Heart-shaped divider collection. Decorate your text with a romantic and lovely feel.',
      ja: 'ハート形の区切り線のコレクション。ロマンチックで愛らしい雰囲気でテキストを飾ってみてください。',
    },
    related: ['divider', 'div_star', 'div_flower', 'cmb_heart', 'valentine'],
  },
  div_star: {
    descriptions: {
      ko: '별 모양의 구분선 모음입니다. 반짝이고 화려한 느낌으로 메시지를 돋보이게 만들어보세요.',
      en: 'Star-shaped divider collection. Make your messages shine with a sparkly and glamorous feel.',
      ja: '星形の区切り線のコレクション。キラキラと華やかな雰囲気でメッセージを際立たせてみてください。',
    },
    related: ['divider', 'div_heart', 'div_flower', 'cmb_star', 'div_moon'],
  },
  div_flower: {
    descriptions: {
      ko: '꽃 모양의 구분선 모음입니다. 화사하고 봄 느낌 가득한 꽃 장식으로 텍스트를 꾸며보세요.',
      en: 'Flower-shaped divider collection. Decorate your text with bright and spring-like floral patterns.',
      ja: '花形の区切り線のコレクション。華やかで春らしい花の飾りでテキストを飾ってみてください。',
    },
    related: ['divider', 'div_heart', 'div_star', 'cmb_flower', 'div_moon'],
  },
  div_moon: {
    descriptions: {
      ko: '달 모양의 구분선 모음입니다. 신비롭고 서정적인 달빛 감성을 텍스트 꾸미기에 활용해보세요.',
      en: 'Moon-shaped divider collection. Add a mysterious and lyrical moonlit atmosphere to your text decorations.',
      ja: '月形の区切り線のコレクション。神秘的で叙情的な月明かりの雰囲気をテキストの飾りに活かしてみてください。',
    },
    related: ['divider', 'div_star', 'div_flower', 'cmb_moon', 'div_christmas'],
  },
  div_christmas: {
    descriptions: {
      ko: '크리스마스 테마의 구분선 모음입니다. 겨울 축제 분위기를 담아 특별한 메시지를 완성해보세요.',
      en: 'Christmas-themed divider collection. Complete special holiday messages with festive winter vibes.',
      ja: 'クリスマステーマの区切り線のコレクション。冬のお祭り気分を込めて特別なメッセージを完成させてみてください。',
    },
    related: ['divider', 'div_moon', 'cmb_christmas', 'newyear', 'div_template'],
  },
  div_template: {
    descriptions: {
      ko: '텍스트 서식을 위한 다양한 구분선 템플릿 모음입니다. 자유롭게 응용하여 나만의 스타일을 만들어보세요.',
      en: 'Divider template collection for various text formatting needs. Freely adapt these to create your own unique style.',
      ja: 'テキスト書式のためのさまざまな区切り線テンプレートのコレクション。自由にアレンジして自分だけのスタイルを作ってみてください。',
    },
    related: ['divider', 'div_heart', 'div_star', 'cmb_template', 'div_christmas'],
  },
  valentine: {
    descriptions: {
      ko: '발렌타인데이 테마의 구분선 모음입니다. 사랑하는 사람에게 달콤한 메시지를 전달해보세요.',
      en: 'Valentine\'s Day-themed divider collection. Send sweet and loving messages to your special someone.',
      ja: 'バレンタインデーテーマの区切り線のコレクション。大切な人に甘いメッセージを伝えてみてください。',
    },
    related: ['div_heart', 'newyear', 'divider', 'cmb_heart', 'div_flower'],
  },
  newyear: {
    descriptions: {
      ko: '새해 테마의 구분선 모음입니다. 새해 인사와 함께 새로운 시작을 축하하는 메시지를 꾸며보세요.',
      en: 'New Year-themed divider collection. Decorate your messages celebrating fresh starts and new beginnings.',
      ja: 'お正月テーマの区切り線のコレクション。新年のあいさつとともに新しいスタートを祝うメッセージを飾ってみてください。',
    },
    related: ['valentine', 'div_christmas', 'divider', 'div_star', 'div_template'],
  },

  // 콤보 (combo)
  combo: {
    descriptions: {
      ko: '텍스트와 SNS를 꾸미는 다양한 꾸밈 조합 모음입니다. 나만의 개성 있는 프로필과 게시글을 만들어보세요.',
      en: 'Aesthetic decoration combination collection for texts and SNS. Create your own unique profile and posts.',
      ja: 'テキストやSNSを彾るさまざまなデコ組み合わせのコレクション。自分だけのおしゃれなプロフィールや投稿を作ってみてください。',
    },
    related: ['emojico', 'cmb_heart', 'cmb_star', 'cmb_flower', 'cmb_template'],
  },
  emojico: {
    descriptions: {
      ko: '이모지와 조합하는 꾸밈 모음입니다. 이모지를 활용한 감각적인 텍스트 장식을 만들어보세요.',
      en: 'Emoji combination decoration collection. Create stylish text decorations by pairing with your favorite emojis.',
      ja: '絵文字と組み合わせるデコのコレクション。絵文字を活用したおしゃれなテキスト飾りを作ってみてください。',
    },
    related: ['combo', 'cmb_heart', 'cmb_star', 'cmb_template', 'cmb_flower'],
  },
  cmb_heart: {
    descriptions: {
      ko: '하트 테마의 꾸밈 조합 모음입니다. 사랑스럽고 로맨틱한 감성으로 텍스트를 장식해보세요.',
      en: 'Heart-themed aesthetic combination collection. Decorate your text with a lovely and romantic feel.',
      ja: 'ハートテーマのデコ組み合わせのコレクション。愛らしくロマンチックな雰囲気でテキストを飾ってみてください。',
    },
    related: ['combo', 'cmb_star', 'cmb_flower', 'div_heart', 'cmb_pink'],
  },
  cmb_star: {
    descriptions: {
      ko: '별 테마의 꾸밈 조합 모음입니다. 반짝이는 별처럼 화려하게 텍스트를 꾸며보세요.',
      en: 'Star-themed aesthetic combination collection. Decorate your text as glamorously as a shining star.',
      ja: '星テーマのデコ組み合わせのコレクション。輝く星のように華やかにテキストを飾ってみてください。',
    },
    related: ['combo', 'cmb_heart', 'cmb_moon', 'div_star', 'cmb_yellow'],
  },
  cmb_flower: {
    descriptions: {
      ko: '꽃 테마의 꾸밈 조합 모음입니다. 화사하고 봄 느낌 가득한 꽃 장식으로 텍스트를 꾸며보세요.',
      en: 'Flower-themed aesthetic combination collection. Brighten your text with cheerful and spring-inspired floral decorations.',
      ja: '花テーマのデコ組み合わせのコレクション。華やかで春らしい花の飾りでテキストを彾ってみてください。',
    },
    related: ['combo', 'cmb_heart', 'cmb_star', 'div_flower', 'cmb_pink'],
  },
  cmb_moon: {
    descriptions: {
      ko: '달 테마의 꾸밈 조합 모음입니다. 신비롭고 서정적인 달빛 감성으로 텍스트를 장식해보세요.',
      en: 'Moon-themed aesthetic combination collection. Decorate your text with a mysterious and lyrical moonlit atmosphere.',
      ja: '月テーマのデコ組み合わせのコレクション。神秘的で叙情的な月明かりの雰囲気でテキストを飾ってみてください。',
    },
    related: ['combo', 'cmb_star', 'cmb_dark', 'div_moon', 'cmb_blue'],
  },
  cmb_christmas: {
    descriptions: {
      ko: '크리스마스 테마의 꾸밈 조합 모음입니다. 겨울 축제 분위기 가득한 특별한 메시지를 만들어보세요.',
      en: 'Christmas-themed aesthetic combination collection. Create special messages full of festive winter holiday cheer.',
      ja: 'クリスマステーマのデコ組み合わせのコレクション。冬のお祭り気分いっぱいの特別なメッセージを作ってみてください。',
    },
    related: ['combo', 'cmb_star', 'div_christmas', 'cmb_red', 'cmb_template'],
  },
  cmb_template: {
    descriptions: {
      ko: '다양한 텍스트 서식을 위한 꾸밈 템플릿 모음입니다. 자유롭게 응용하여 나만의 스타일을 완성해보세요.',
      en: 'Aesthetic template collection for various text formatting needs. Mix and match to create your own signature style.',
      ja: 'さまざまなテキスト書式のためのデコテンプレートのコレクション。自由にアレンジして自分だけのスタイルを完成させてみてください。',
    },
    related: ['combo', 'emojico', 'div_template', 'cmb_heart', 'cmb_star'],
  },
  cmb_pink: {
    descriptions: {
      ko: '핑크 컬러 테마의 꾸밈 조합 모음입니다. 사랑스럽고 귀여운 핑크 감성으로 텍스트를 꾸며보세요.',
      en: 'Pink color-themed aesthetic combination collection. Decorate your text with adorable and cute pink vibes.',
      ja: 'ピンクカラーテーマのデコ組み合わせのコレクション。愛らしくかわいいピンクの雰囲気でテキストを飾ってみてください。',
    },
    related: ['cmb_red', 'cmb_purple', 'cmb_heart', 'cmb_flower', 'combo'],
  },
  cmb_red: {
    descriptions: {
      ko: '레드 컬러 테마의 꾸밈 조합 모음입니다. 강렬하고 열정적인 빨간색 감성으로 텍스트를 장식해보세요.',
      en: 'Red color-themed aesthetic combination collection. Decorate your text with intense and passionate red energy.',
      ja: 'レッドカラーテーマのデコ組み合わせのコレクション。強烈で情熱的な赤の雰囲気でテキストを飾ってみてください。',
    },
    related: ['cmb_pink', 'cmb_dark', 'cmb_christmas', 'cmb_heart', 'combo'],
  },
  cmb_yellow: {
    descriptions: {
      ko: '옐로우 컬러 테마의 꾸밈 조합 모음입니다. 밝고 경쾌한 노란색 감성으로 텍스트를 꾸며보세요.',
      en: 'Yellow color-themed aesthetic combination collection. Decorate your text with bright and cheerful yellow energy.',
      ja: 'イエローカラーテーマのデコ組み合わせのコレクション。明るく軽快な黄色の雰囲気でテキストを飾ってみてください。',
    },
    related: ['cmb_white', 'cmb_green', 'cmb_star', 'cmb_flower', 'combo'],
  },
  cmb_white: {
    descriptions: {
      ko: '화이트 컬러 테마의 꾸밈 조합 모음입니다. 깨끗하고 세련된 흰색 감성으로 텍스트를 장식해보세요.',
      en: 'White color-themed aesthetic combination collection. Decorate your text with clean and sophisticated white vibes.',
      ja: 'ホワイトカラーテーマのデコ組み合わせのコレクション。清潔感があってスタイリッシュな白の雰囲気でテキストを飾ってみてください。',
    },
    related: ['cmb_yellow', 'cmb_blue', 'cmb_moon', 'cmb_star', 'combo'],
  },
  cmb_blue: {
    descriptions: {
      ko: '블루 컬러 테마의 꾸밈 조합 모음입니다. 시원하고 차분한 파란색 감성으로 텍스트를 꾸며보세요.',
      en: 'Blue color-themed aesthetic combination collection. Decorate your text with cool and calm blue energy.',
      ja: 'ブルーカラーテーマのデコ組み合わせのコレクション。涼しげで落ち着いた青の雰囲気でテキストを飾ってみてください。',
    },
    related: ['cmb_white', 'cmb_green', 'cmb_moon', 'cmb_purple', 'combo'],
  },
  cmb_green: {
    descriptions: {
      ko: '그린 컬러 테마의 꾸밈 조합 모음입니다. 싱그럽고 자연스러운 초록색 감성으로 텍스트를 장식해보세요.',
      en: 'Green color-themed aesthetic combination collection. Decorate your text with fresh and natural green vibes.',
      ja: 'グリーンカラーテーマのデコ組み合わせのコレクション。みずみずしく自然な緑の雰囲気でテキストを飾ってみてください。',
    },
    related: ['cmb_blue', 'cmb_yellow', 'cmb_flower', 'cmb_white', 'combo'],
  },
  cmb_purple: {
    descriptions: {
      ko: '퍼플 컬러 테마의 꾸밈 조합 모음입니다. 신비롭고 고급스러운 보라색 감성으로 텍스트를 꾸며보세요.',
      en: 'Purple color-themed aesthetic combination collection. Decorate your text with mysterious and luxurious purple vibes.',
      ja: 'パープルカラーテーマのデコ組み合わせのコレクション。神秘的で高級感のある紫の雰囲気でテキストを飾ってみてください。',
    },
    related: ['cmb_pink', 'cmb_blue', 'cmb_dark', 'cmb_moon', 'combo'],
  },
  cmb_dark: {
    descriptions: {
      ko: '다크 컬러 테마의 꾸밈 조합 모음입니다. 세련되고 미스터리한 고딕 감성으로 텍스트를 장식해보세요.',
      en: 'Dark color-themed aesthetic combination collection. Decorate your text with stylish and mysterious gothic vibes.',
      ja: 'ダークカラーテーマのデコ組み合わせのコレクション。スタイリッシュで謎めいたゴシックな雰囲気でテキストを飾ってみてください。',
    },
    related: ['cmb_purple', 'cmb_red', 'cmb_moon', 'cmb_blue', 'combo'],
  },
}

export function getCategoryDescription(id: string, lang: Lang): string {
  return CATEGORY_META[id]?.descriptions[lang] ?? ''
}

export function getRelatedCategories(id: string): string[] {
  return CATEGORY_META[id]?.related ?? []
}
