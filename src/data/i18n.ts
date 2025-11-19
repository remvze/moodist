export interface Translations {
  // Navigation & UI
  presets: string;
  share: string;
  useMoodist: string;

  // Hero section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  soundsCount: string;

  // About section
  freeAmbientSounds: {
    title: string;
    body: string;
  };
  carefullyCuratedSounds: {
    title: string;
    body: string;
  };
  createYourSoundscape: {
    title: string;
    body: string;
  };
  soundsForEveryMoment: {
    title: string;
    body: string;
  };

  // Categories
  categories: Record<string, string>;

  // Sounds
  sounds: Record<string, Record<string, string>>;

  // Common
  play: string;
  pause: string;
  favorite: string;
  volume: string;
  selected_sounds: string;

  // Support & Donate
  supportMe: string;
  helpKeepAdFree: string;
  donateToday: string;
  buyMeACoffee: string;
  createdBy: string;
  enjoyMoodist: string;
  supportWithDonation: string;

  // UI Actions
  showMore: string;
  showLess: string;

  // Settings
  globalVolume: string;
  menu: string;

  // Menu Items
  breathingExercise: string;
  countdownTimer: string;
  sleepTimer: string;
  pomodoro: string;
  notepad: string;
  todoChecklist: string;
  lofiMusicPlayer: string;
  binauralBeats: string;
  isochronicTones: string;
  shortcuts: string;
  shuffleSounds: string;
  sourceCode: string;
}

export const translations: Record<string, Translations> = {
  en: {
    // Navigation & UI
    presets: 'Your Presets',
    share: 'Share',
    useMoodist: 'Use Moodist',

    // Hero section
    heroTitle: 'Ambient Sounds',
    heroSubtitle: 'For Focus and Calm',
    heroDescription: 'Free and Open-Source.',
    soundsCount: 'Sounds',

    // About section
    freeAmbientSounds: {
      title: 'Free Ambient Sounds',
      body: 'Craving a calming escape from the daily grind? Do you need the perfect soundscape to boost your focus or lull you into peaceful sleep? Look no further than Moodist, your free and open-source ambient sound generator! Ditch the subscriptions and registrations – with Moodist, you unlock a world of soothing and immersive audio experiences, entirely for free.'
    },
    carefullyCuratedSounds: {
      title: 'Carefully Curated Sounds',
      body: 'Dive into an expansive library of {{count}} carefully curated sounds. Nature lovers will find solace in the gentle murmur of streams, the rhythmic crash of waves, or the crackling warmth of a campfire. Cityscapes come alive with the soft hum of cafes, the rhythmic clatter of trains, or the calming white noise of traffic. And for those seeking deeper focus or relaxation, Moodist offers binaural beats and color noise designed to enhance your state of mind.'
    },
    createYourSoundscape: {
      title: 'Create Your Soundscape',
      body: 'The beauty of Moodist lies in its simplicity and customization. No complex menus or confusing options – just choose your desired sounds, adjust the volume balance, and hit play. Want to blend the gentle chirping of birds with the soothing sound of rain? No problem! Layer as many sounds as you like to create your personalized soundscape oasis.'
    },
    soundsForEveryMoment: {
      title: 'Sounds for Every Moment',
      body: "Whether you're looking to unwind after a long day, enhance your focus during work, or lull yourself into a peaceful sleep, Moodist has the perfect soundscape waiting for you. The best part? It's completely free and open-source, so you can enjoy its benefits without any strings attached. Start using Moodist today and discover your new haven of tranquility and focus!"
    },

    // Categories
    categories: {
      nature: 'Nature',
      rain: 'Rain',
      animals: 'Animals',
      urban: 'Urban',
      places: 'Places',
      transport: 'Transport',
      things: 'Things',
      noise: 'Noise'
    },

    // Sounds
    sounds: {
      nature: {
        river: 'River',
        waves: 'Waves',
        campfire: 'Campfire',
        wind: 'Wind',
        howlingWind: 'Howling Wind',
        windInTrees: 'Wind in Trees',
        waterfall: 'Waterfall',
        walkInSnow: 'Walk in Snow',
        walkOnLeaves: 'Walk on Leaves',
        walkOnGravel: 'Walk on Gravel',
        droplets: 'Droplets',
        jungle: 'Jungle'
      },
      rain: {
        lightRain: 'Light Rain',
        moderateRain: 'Moderate Rain',
        heavyRain: 'Heavy Rain',
        storm: 'Storm',
        thunder: 'Thunder',
        distantStorm: 'Distant Storm',
        fire: 'Fire',
        oceanWaves: 'Ocean Waves',
        rainOnLeaves: 'Rain on Leaves',
        rainOnPavement: 'Rain on Pavement',
        rainOnWindow: 'Rain on Window',
        rainOnUmbrella: 'Rain on Umbrella',
        rainOnTent: 'Rain on Tent',
        insideRain: 'Inside the Rain',
        carRain: 'Car Rain'
      },
      animals: {
        birds: 'Birds',
        seagulls: 'Seagulls',
        crickets: 'Crickets',
        wolves: 'Wolves',
        owl: 'Owl',
        frogs: 'Frogs',
        dogs: 'Dogs',
        horses: 'Horses',
        cats: 'Cats',
        crows: 'Crows',
        whale: 'Whale',
        beehive: 'Beehive',
        woodpecker: 'Woodpecker',
        chickens: 'Chickens',
        cows: 'Cows',
        sheep: 'Sheep',
        rooster: 'Rooster',
        birdsMorning: 'Birds in Morning',
        birdsEvening: 'Birds in Evening'
      },
      urban: {
        cityStreet: 'City Street',
        traffic: 'Traffic',
        highway: 'Highway',
        road: 'Road',
        ambulanceSiren: 'Ambulance Siren',
        busyStreet: 'Busy Street',
        crowd: 'Crowd',
        fireworks: 'Fireworks'
      },
      places: {
        forest: 'Forest',
        beach: 'Beach',
        park: 'Park',
        mountain: 'Mountain',
        desert: 'Desert',
        cave: 'Cave',
        meadow: 'Meadow',
        lake: 'Lake',
        campsite: 'Campsite',
        temple: 'Temple',
        airport: 'Airport',
        church: 'Church',
        underwater: 'Underwater',
        crowdedBar: 'Crowded Bar',
        nightVillage: 'Night Village',
        carousel: 'Carousel',
        laboratory: 'Laboratory',
        laundryRoom: 'Laundry Room',
        subwayStation: 'Subway Station',
        cafe: 'Cafe',
        constructionSite: 'Construction Site',
        office: 'Office',
        supermarket: 'Supermarket',
        restaurant: 'Restaurant',
        library: 'Library'
      },
      transport: {
        car: 'Car',
        bus: 'Bus',
        train: 'Train',
        subway: 'Subway',
        airplane: 'Airplane',
        boat: 'Boat',
        bicycle: 'Bicycle',
        motorcycle: 'Motorcycle',
        helicopter: 'Helicopter',
        steamTrain: 'Steam Train',
        insideTrain: 'Inside a Train',
        submarine: 'Submarine',
        sailboat: 'Sailboat',
        rowingBoat: 'Rowing Boat'
      },
      things: {
        fan: 'Fan',
        clock: 'Clock',
        typewriter: 'Typewriter',
        keyboard: 'Keyboard',
        printer: 'Printer',
        refrigerator: 'Refrigerator',
        washingMachine: 'Washing Machine',
        vacuum: 'Vacuum',
        airConditioner: 'Air Conditioner',
        microwave: 'Microwave',
        paper: 'Paper',
        windChimes: 'Wind Chimes',
        singingBowl: 'Singing Bowl',
        ceilingFan: 'Ceiling Fan',
        dryer: 'Dryer',
        slideProjector: 'Slide Projector',
        boilingWater: 'Boiling Water',
        bubbles: 'Bubbles',
        tuningRadio: 'Tuning Radio',
        morseCode: 'Morse Code',
        vinylEffect: 'Vinyl Effect',
        windshieldWipers: 'Windshield Wipers'
      },
      noise: {
        whiteNoise: 'White Noise',
        pinkNoise: 'Pink Noise',
        brownNoise: 'Brown Noise',
        blueNoise: 'Blue Noise',
        violetNoise: 'Violet Noise',
        greyNoise: 'Grey Noise'
      }
    },

    // Common
    play: 'Play',
    pause: 'Pause',
    favorite: 'Favorite',
    volume: 'Volume',
    selected_sounds: 'Current Sounds',

    // Support & Donate
    supportMe: 'Support Me',
    helpKeepAdFree: 'Help me keep Moodist ad-free.',
    donateToday: 'Donate Today',
    buyMeACoffee: 'Buy Me a Coffee',
    createdBy: 'Created by',
    enjoyMoodist: 'Enjoy Moodist?',
    supportWithDonation: 'Support with a donation!',

    // UI Actions
    showMore: 'Show More',
    showLess: 'Show Less',

    // Settings
    globalVolume: 'Global Volume',
    menu: 'Menu',

    // Menu Items
    breathingExercise: 'Breathing Exercise',
    countdownTimer: 'Countdown Timer',
    sleepTimer: 'Sleep Timer',
    pomodoro: 'Pomodoro',
    notepad: 'Notepad',
    todoChecklist: 'Todo Checklist',
    lofiMusicPlayer: 'Lofi Music Player',
    binauralBeats: 'Binaural Beats',
    isochronicTones: 'Isochronic Tones',
    shortcuts: 'Shortcuts',
    shuffleSounds: 'Shuffle Sounds',
    sourceCode: 'Source Code'
  },

  'zh-CN': {
    // Navigation & UI
    app: { language: '语言' },
    presets: '我的预设',
    share: '分享',
    useMoodist: '使用 Moodist',

    // Hero section
    heroTitle: '环境音',
    heroSubtitle: '专注与宁静',
    heroDescription: '免费开源。',
    soundsCount: '个声音',

    // About section
    freeAmbientSounds: {
      title: '免费环境音',
      body: '渴望从日常繁杂中获得片刻宁静？需要完美的声音环境来提升专注力或帮助入眠？Moodist 就是您的最佳选择——免费开源的环境音生成器！无需订阅注册，使用 Moodist，您可以免费享受舒缓沉浸的音频体验。'
    },
    carefullyCuratedSounds: {
      title: '精心挑选的声音',
      body: '探索包含 {{count}} 个精心挑选声音的庞大音库。自然爱好者可以在溪流的轻柔潺潺声中、海浪的节拍拍岸声中、或篝火的温暖噼啪声中获得慰藉。城市景观在咖啡馆的轻柔嗡嗡声、火车的节拍咔嗒声、或交通的舒缓白噪声中变得生动。对于寻求更深专注或放松的人，Moodist 提供了专门设计来增强心境的双节拍和色彩噪声。'
    },
    createYourSoundscape: {
      title: '创造您的声音景观',
      body: 'Moodist 的美妙之处在于其简洁性和自定义性。没有复杂的菜单或令人困惑的选项——只需选择您喜欢的声音，调整音量平衡，然后点击播放。想要将鸟儿的轻柔啾鸣与雨水的舒缓声音融合？没问题！随心所欲地叠加多个声音，创建个性化的声音绿洲。'
    },
    soundsForEveryMoment: {
      title: '适合每个时刻的声音',
      body: '无论您是想在漫长一天后放松身心，在工作中提升专注力，还是让自己进入宁静的睡眠，Moodist 都有完美的声音景观等着您。最棒的是什么？它完全免费开源，您可以毫无负担地享受它的好处。今天就开始使用 Moodist，发现您新的宁静和专注天堂吧！'
    },

    // Categories
    categories: {
      nature: '自然',
      rain: '雨声',
      animals: '动物',
      urban: '城市',
      places: '地点',
      transport: '交通',
      things: '物品',
      noise: '噪声'
    },

    // Sounds
    sounds: {
      nature: {
        river: '河流',
        waves: '波浪',
        campfire: '篝火',
        wind: '风声',
        howlingWind: '呼啸的风',
        windInTrees: '林中风声',
        waterfall: '瀑布',
        walkInSnow: '雪地漫步',
        walkOnLeaves: '落叶漫步',
        walkOnGravel: '碎石漫步',
        droplets: '水滴',
        jungle: '丛林'
      },
      rain: {
        lightRain: '小雨',
        moderateRain: '中雨',
        heavyRain: '大雨',
        storm: '暴风雨',
        thunder: '雷声',
        distantStorm: '远处的暴风雨',
        fire: '火焰',
        oceanWaves: '海浪',
        rainOnLeaves: '雨打叶子',
        rainOnPavement: '雨打路面',
        rainOnWindow: '雨打窗户',
        rainOnUmbrella: '雨打雨伞',
        rainOnTent: '雨打帐篷',
        insideRain: '室内雨声',
        carRain: '车中雨声'
      },
      animals: {
        birds: '鸟儿',
        seagulls: '海鸥',
        crickets: '蟋蟀',
        wolves: '狼群',
        owl: '猫头鹰',
        frogs: '青蛙',
        dogs: '狗狗',
        horses: '马儿',
        cats: '猫咪',
        crows: '乌鸦',
        whale: '鲸鱼',
        beehive: '蜂箱',
        woodpecker: '啄木鸟',
        chickens: '小鸡',
        cows: '奶牛',
        sheep: '绵羊',
        rooster: '公鸡',
        birdsMorning: '清晨鸟鸣',
        birdsEvening: '傍晚鸟鸣'
      },
      urban: {
        cityStreet: '城市街道',
        traffic: '交通',
        highway: '高速公路',
        road: '马路',
        ambulanceSiren: '救护车警报',
        busyStreet: '繁忙街道',
        crowd: '人群',
        fireworks: '烟花'
      },
      places: {
        forest: '森林',
        beach: '海滩',
        park: '公园',
        mountain: '山脉',
        desert: '沙漠',
        cave: '洞穴',
        meadow: '草原',
        lake: '湖泊',
        campsite: '露营地',
        temple: '寺庙',
        airport: '机场',
        church: '教堂',
        underwater: '水下',
        crowdedBar: '拥挤酒吧',
        nightVillage: '夜晚村庄',
        carousel: '旋转木马',
        laboratory: '实验室',
        laundryRoom: '洗衣房',
        subwayStation: '地铁站',
        cafe: '咖啡馆',
        constructionSite: '施工现场',
        office: '办公室',
        supermarket: '超市',
        restaurant: '餐厅',
        library: '图书馆'
      },
      transport: {
        car: '汽车',
        bus: '公交车',
        train: '火车',
        subway: '地铁',
        airplane: '飞机',
        boat: '小船',
        bicycle: '自行车',
        motorcycle: '摩托车',
        helicopter: '直升机',
        steamTrain: '蒸汽火车',
        insideTrain: '火车内部',
        submarine: '潜水艇',
        sailboat: '帆船',
        rowingBoat: '划船'
      },
      things: {
        fan: '风扇',
        clock: '时钟',
        typewriter: '打字机',
        keyboard: '键盘',
        printer: '打印机',
        refrigerator: '冰箱',
        washingMachine: '洗衣机',
        vacuum: '吸尘器',
        airConditioner: '空调',
        microwave: '微波炉',
        paper: '纸张',
        windChimes: '风铃',
        singingBowl: '颂钵',
        ceilingFan: '吊扇',
        dryer: '干衣机',
        slideProjector: '幻灯机',
        boilingWater: '沸腾的水',
        bubbles: '泡泡',
        tuningRadio: '调谐收音机',
        morseCode: '摩斯电码',
        vinylEffect: '黑胶唱片效果',
        windshieldWipers: '雨刮器'
      },
      noise: {
        whiteNoise: '白噪声',
        pinkNoise: '粉噪声',
        brownNoise: '棕噪声',
        blueNoise: '蓝噪声',
        violetNoise: '紫噪声',
        greyNoise: '灰噪声'
      }
    },

    // Common
    play: '播放',
    pause: '暂停',
    favorite: '收藏',
    volume: '音量',
    selected_sounds: '当前声音',

    // Support & Donate
    supportMe: '支持我',
    helpKeepAdFree: '帮助我保持 Moodist 无广告。',
    donateToday: '立即捐赠',
    buyMeACoffee: '请我喝杯咖啡',
    createdBy: '作者',
    enjoyMoodist: '喜欢 Moodist 吗？',
    supportWithDonation: '欢迎捐赠支持！',

    // UI Actions
    showMore: '更多',
    showLess: '收起',

    // Settings
    globalVolume: '全局音量',
    menu: '菜单',

    // Menu Items
    breathingExercise: '呼吸练习',
    countdownTimer: '倒计时器',
    sleepTimer: '睡眠定时器',
    pomodoro: '番茄钟',
    notepad: '记事本',
    todoChecklist: '待办清单',
    lofiMusicPlayer: 'Lofi 音乐播放器',
    binauralBeats: '双节拍',
    isochronicTones: '等时音',
    shortcuts: '快捷键',
    shuffleSounds: '随机播放',
    sourceCode: '源代码'
  }
};

export function getTranslation(lang: string = 'en'): Translations {
  return translations[lang] || translations.en;
}