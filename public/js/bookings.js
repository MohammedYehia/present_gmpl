const swalLoad = (error) => {
  swal({
    text: `حدث خطأ ما اثناء تحميل ${error}، يرجى تحديث الصفحة مرة اخرى`,
    buttons: {
      cancel: {
        text: 'للخلف',
        value: null,
        visible: true,
      },
      confirm: {
        text: 'تحديث',
        value: true,
      },
    },
  }).then((value) => {
    if (value) {
      window.location.reload();
    } else {
      window.location = document.referrer;
    }
  });
};

$('#calendar').fullCalendar({
  schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
  groupByDate: true,
  firstDay: 6,
  selectable: false,
  minTime: '08:00:00',
  maxTime: '21:00:00',
  slotDuration: '00:30:00',
  locale: 'ar-kw',
  defaultView: 'month',
  header: { center: 'month,agendaWeek,agendaDay' },
  timezone: 'local',
  views: {
    agendaDay: {
      selectHelper: true,
      selectable: true,
    },
  },
  dayClick: (date, jsEvent, view) => {
    if (view.name === 'month' || view.name === 'agendaWeek') {
      $('#calendar').fullCalendar('changeView', 'agendaDay');
      $('#calendar').fullCalendar('gotoDate', date);
    }
  },
  eventClick: (event, jsEvent, view) => {
    if (view.name === 'month' || view.name === 'agendaWeek') {
      $('#calendar').fullCalendar('changeView', 'agendaDay');
      $('#calendar').fullCalendar('gotoDate', event.start);
    }
  },
  select: (start, end, jsEvent, view, resource) => {
    const duration = (end - start) / 1000;
    duration === 1800 ? end.add(0.5, 'hours') : end = end;
    if ((new Date(start)).getHours() < 8) {
      start = new Date(start);
      start.setHours(8);
      end = new Date(end);
      end.setHours(20);
    }
    if (resource) {
      verifyStart(start, end, resource, 'bookings', '');
    }
  },
  selectOverlap: false,
  resources: {
    url: '/api/v1/rooms',
    type: 'get',
    error: (error) => {
      swalLoad('قاعات');
    },
  },
  events: {
    url: '/api/v1/bookings',
    type: 'get',
    error: (error) => {
      swalLoad('حجوزات');
    },
  },
});
