interface ImailConfig {
    driver: 'ethereal';

    defaults:{
        from: {
            email: string;
            name: string;
        },
    },
}
export default
 {
     driver: process.env.MAIL_DRIVER ||  'ethereal',

     defaults:{
         from: {
             email: 'antonia.sousa@peleblanda.online',
             name: 'Antonia',
         },
     },

 } as ImailConfig;
