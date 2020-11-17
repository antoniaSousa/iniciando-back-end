// import nodemailer,{Transporter} from 'nodemailer/lib/ses-transport';
import nodemailer, {Transporter} from 'nodemailer';
import mailConfig from '@config/mail';
import aws from 'aws-sdk';
import {injectable, inject} from 'tsyringe';
import IMailProvider from "@shared/container/providers/MailProvider/model/IMailProviders";
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '@shared/container/providers/MailProvider/MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider{
    private client: Transporter;

    constructor(
        @inject('SESMailProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    )
    {
        this.client = nodemailer.createTransport({
            SES: new aws.SES({
            apiVersion: '2010-12-01',
            region: 'us-east-1',
        }),
    });
    }
    public async  sendMail({
        to,
        from,
        subject,
        templateData,
     }:  ISendMailDTO): Promise<void>{
         const  { name, email} = mailConfig.defaults.from;
           await this.client.sendMail({
                 from:{
                 name: from?.name || name,
                 address: from?.email || email,
                  },
                  to: {
                      name: to.name,
                      address: to.email,
                  },
                 subject,
                 text: await this.mailTemplateProvider.parse(templateData),
             });
        }

    }

