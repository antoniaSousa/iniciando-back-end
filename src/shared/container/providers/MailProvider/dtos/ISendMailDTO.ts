import IParseMailTemplateDTO from '@shared/container/providers/MailProvider/MailTemplateProvider/dtos/IParseMailTemplateDTOs';

interface IMailContact {
    name: string;
    email: string;
}

export default interface ISendMailDTO {
to: IMailContact;
from?: IMailContact;
subject: string;
templateData: IParseMailTemplateDTO;
 }
