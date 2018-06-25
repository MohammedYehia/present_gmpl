import models from '../models/index';

models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

models.sequelize.sync({ force: true }).then(() => {
  models.Staff.create({
    username: 'hassan',
    role: 'admin',
    password: '123',
  });

  models.Rooms.bulkCreate([{
    room_name: 'قاعة تورينو',
    capacity: 20,
    lcd: true,
  },
  {
    room_name: 'قاعة المركز الثقافي التركي',
    capacity: 25,
    lcd: true,
  },
  {
    room_name: 'قاعة الانشطة',
    capacity: 30,
    lcd: true,
  },
  ]);

  models.EventCourses.bulkCreate([{
    title: 'دورة اللغة التركية',
    image: 'https://bit.ly/2yBsMlk',
    description: 'تعلن مكتبة بلدية غزة العامة عن عقد دورة في اللغة التركية بالتعاون مع الحكومة التركية ومن خلال توفير مدرس تركي بالمكتبة واللتي ستتناول اساسيات اللغة التركية (كتابة، محادثة ،قراءة)',
    fees: 25,
  },
  {
    title: 'دورة اللغة الانجليزية',
    image: 'https://bit.ly/2yBsMlk',
    description: 'تعلن مكتبة بلدية غزة العامة عن عقد دورة في اللغة الانجليزية بالتعاون مع الحكومة البريطانية ومن خلال توفير مدرس بريطاني بالمكتبة واللتي ستتناول اساسيات اللغة الانجليزية (كتابة، محادثة ،قراءة',
    fees: 20,
  },
  {
    title: 'دورة اللغة التركية',
    image: 'https://bit.ly/2yBsMlk',
    description: 'تعلن مكتبة بلدية غزة العامة عن عقد دورة في اللغة التركية بالتعاون مع الحكومة التركية ومن خلال توفير مدرس تركي بالمكتبة واللتي ستتناول اساسيات اللغة التركية (كتابة، محادثة ،قراءة)',
    fees: 25,

  },
  {
    title: 'ندوة شعرية بعنوان الارض',
    image: 'https://bit.ly/2yBsMlk',
    description: 'تعلن مكتبة بلدية غزة العامة عن عقد ندوة شعرية بعنوان الارض والشهداء والتي سيلقيها الاستاذ الشاعر / محمود حسن احمد',
    fees: null,
    event_time: '2018-07-19T15:25:00',
  },
  {
    title: 'لقاء ثقافي بعنوان القراءة والحاضر',
    image: 'https://bit.ly/2yBsMlk',
    description: 'تعلن مكتبة بلدية غزة العامة عن عقد لقاء ثقافي  بعنوان القراءة والحاضر والتي ينظمها مركز هوليست الثقافي بالتعاون مع مكتبة بلدية غزة العامة حيث سيحضر اللقاء وزير الثقافة الاستاذ/محمد الحيلة',
    fees: null,
    event_time: '2018-06-20T14:21:00',
  },
  {
    title: 'ندوة شعرية بعنوان الارض',
    image: 'https://bit.ly/2yBsMlk',
    description: 'تعلن مكتبة بلدية غزة العامة عن عقد ندوة شعرية بعنوان الارض والشهداء والتي سيلقيها الاستاذ الشاعر / محمود حسن احمد',
    fees: null,
    event_time: '2018-06-21T11:21:00',
  },
  {
    title: 'دورة اللغة التركية',
    image: 'https://bit.ly/2yBsMlk',
    description: 'تعلن مكتبة بلدية غزة العامة عن عقد دورة في اللغة التركية بالتعاون مع الحكومة التركية ومن خلال توفير مدرس تركي بالمكتبة واللتي ستتناول اساسيات اللغة التركية (كتابة، محادثة ،قراءة)',
    fees: 1000,
  },
  {
    title: 'دورة اللغة الانجليزية',
    image: 'https://bit.ly/2yBsMlk',
    description: 'تعلن مكتبة بلدية غزة العامة عن عقد دورة في اللغة الانجليزية بالتعاون مع الحكومة البريطانية ومن خلال توفير مدرس بريطاني بالمكتبة واللتي ستتناول اساسيات اللغة الانجليزية (كتابة، محادثة ،قراءة',
    fees: 40,
  },
  {
    title: 'دورة اللغة التركية',
    image: 'https://bit.ly/2yBsMlk',
    description: 'تعلن مكتبة بلدية غزة العامة عن عقد دورة في اللغة التركية بالتعاون مع الحكومة التركية ومن خلال توفير مدرس تركي بالمكتبة واللتي ستتناول اساسيات اللغة التركية (كتابة، محادثة ،قراءة)',
    fees: 30,
  },
  {
    title: 'ندوة شعرية بعنوان الارض',
    image: 'https://bit.ly/2yBsMlk',
    description: 'تعلن مكتبة بلدية غزة العامة عن عقد ندوة شعرية بعنوان الارض والشهداء والتي سيلقيها الاستاذ الشاعر / محمود حسن احمد',
    fees: null,
    event_time: '2018-08-21T19:21:00',

  },
  {
    title: 'ندوة شعرية بعنوان الارض',
    image: 'https://bit.ly/2yBsMlk',
    description: 'تعلن مكتبة بلدية غزة العامة عن عقد ندوة شعرية بعنوان الارض والشهداء والتي سيلقيها الاستاذ الشاعر / محمود حسن احمد',
    fees: null,
    event_time: '2018-06-21T11:21:00',

  },

  ]);

  models.Clients.bulkCreate([{
    name: 'ramy',
    phone: '0599447989',
    email: 'ramy@hotmail.com',
  },
  {
    name: 'ahmed',
    phone: '0599946544',
    email: 'a.shatat@hotmail.com',
  },
  {
    name: 'mohammed',
    phone: '05999955552',
    email: 'mohammed@hotmail.com',
  },
  {
    name: 'abdalsamad',
    phone: '0599194310',
    email: 'abdalsamad.y.m@gmail.com',
  },
  ]);
});
