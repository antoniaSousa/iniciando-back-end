import fs from 'fs';
import handlebars from 'handlebars';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTOs';
import IMailTemplateProvider from '../models/IMailTemplateProvider';
class HandlebarsMailsTemplateProvider implements IMailTemplateProvider{
    public async parse({ file, variables}: IParseMailTemplateDTO): Promise<string>{
        const templateFileContent  = await fs.promises.readFile(file,
            {encoding: 'utf-8'});

    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);

}
}
export default HandlebarsMailsTemplateProvider;

