import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'music',
        cors: true,
      },
    },
    {
      http: {
        method: 'get',
        path: 'music',
        cors: true,
      },
    },
    {
      http: {
        method: 'put',
        path: 'music/{id}',
        cors: true,
      },
    }


  ],
};
