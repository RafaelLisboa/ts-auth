import appDataSource from '../data-source';
import  { Token }  from '../domain/Token';

export const tokenRepository = appDataSource.getRepository(Token);