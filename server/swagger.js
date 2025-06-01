import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Tasks Monitoring',
    description: 'Demo project for Kanban Styled Task Dashboard'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';

const routes = ['./server.js'];


swaggerAutogen()(outputFile, routes, doc);