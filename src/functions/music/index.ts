import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'music',
      },
    },
    {
      http: {
        method: 'get',
        path: 'music',
      },
    },
    {
      http: {
        method: 'put',
        path: 'music/{id}',
      },
    }


  ],
};
