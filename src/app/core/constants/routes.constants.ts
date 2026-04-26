export const APP_ROUTES = {
  HOME: '',
  DASHBOARD: 'dashboard',
  LABS: {
    BASE: 'labs',

    LINKS:{
      BASE: '/labs',
    }
  },
  MATERIALS: {
    BASE: 'materiais',

    LINKS:{
      BASE: '/materiais',
    }
  },
  FAQ: {
    BASE: 'faq',

    LINKS:{
      BASE: '/faq',
    }
  },
  ERROR_COMING_SOON: '**',

  TUTORIALS: {
    BASE: 'tutoriais',

    PATHS: {
      EVENT_DRIVEN_ARCH: 'aws-eda',
      ENV_VARS: 'env-vars',
      CONSUMER_SQS: 'consumer-sqs',
    },

    LINKS: {
      BASE: '/tutoriais',
      EVENT_DRIVEN_ARCH: '/tutoriais/aws-eda',
      ENV_VARS: '/tutoriais/env-vars',
      CONSUMER_SQS: '/tutoriais/consumer-sqs',
    }
  },

};
