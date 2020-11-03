import { Request, Response } from "express";
import { container } from "tsyringe";
import SendForgotPasswordEmailService from '@modules/users/services/SendForgototPasswordEmailService'

export default class SessionsController {
    public async create(request: Request, response:Response): Promise<Response>{

        const { email, password } = request.body;

        const sendForgotPasswordEmail = container.resolve (SendForgotPasswordEmailService);

        await sendForgotPasswordEmail.execute({
            email,
           

        });
       return response.status(204).json();


    }
}