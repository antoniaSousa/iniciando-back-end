import ListProviderDayAvailabilityService
from '@modules/appointments/services/ListProviderDayAvailabilityService';
import {Request, Response} from 'express';
import { container } from 'tsyringe';

export default class ProviderDayAvailabilityController{
    public async index(request: Request, response: Response): Promise<Response>{

        const {provider_id} = request.params;
        const {day, month, year} = request.body;

        const listProvidersDayAvailability = container.resolve(
            ListProviderDayAvailabilityService
            );

        const availabity = await listProvidersDayAvailability.execute({
          provider_id,
          day,
          month,
          year,
        });
        return response.json(availabity);

    }
}