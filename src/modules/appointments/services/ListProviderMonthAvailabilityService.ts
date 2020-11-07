import { injectable, inject } from 'tsyringe';
import IAppoitmentsRepository from '../repositories/IAppointmentsRepository';


interface IRequest {
   provider_id: string;
   month: number;
   year: number;
}

type IResponse = Array <{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService{
    constructor(
        @inject ('ApponitmentsRepository')
        private apponitmentsRepository: IAppoitmentsRepository

        ){}

    public async execute({ provider_id, year, month }: IRequest): Promise<IResponse>{

        const appointments =  await this.apponitmentsRepository.findAllInMonthFromProvider({
            provider_id,
            year,
            month,

        })
        console.log(appointments);
        return [{day: 1, available: false}]

    }



}
export default ListProviderMonthAvailabilityService;
