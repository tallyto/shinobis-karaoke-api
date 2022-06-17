import { MusicController } from 'src/controller/music';
import { MusicModel } from 'src/model/music';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const music = async (event) => {

  try {
    const musicController = new MusicController(MusicModel);
    let result = null;
    switch (event.httpMethod) {
      case 'GET':
        if(event.queryStringParameters && event.queryStringParameters.played) {
          result = await musicController.getByPlayed(Number(event.queryStringParameters.played));
        } 
        else {
          result = await musicController.getAll();
        }        
        return formatJSONResponse(result);
      case 'POST':
        result = await musicController.create(event.body as any);
        return formatJSONResponse(result);
      case 'PUT':
        console.log(event.pathParameters.id);

        result = await musicController.update(event.pathParameters.id, event.body as any);
        return formatJSONResponse(result);
    }
  } catch (error) {
    return formatJSONResponse(error);
  }

};

export const main = middyfy(music);
