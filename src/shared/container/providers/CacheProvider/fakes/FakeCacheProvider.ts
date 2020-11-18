import ICacheProvider from "../models/ICacheProvider";

interface ICacheDate
{
    [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
private cache: ICacheDate = {};

   public async save(key: string, value: any): Promise<void> {
       this.cache[key]=value;
    }

  public async  recover<T>(key: string):Promise<T | null> {
      const data =  this.cache[key];

      if (!data){
          return null;
      }
     const parseData = JSON.parse(data) as T;
     return parseData;
  }

  public async  invalidate(key: string): Promise<void> {
      delete this.cache[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void>{
  const key = Object.keys(this.cache).filter(key => key.startsWith (`${prefix}:`),
  );
  key.forEach(key => {
  delete this.cache[key]
  });
  }

}
