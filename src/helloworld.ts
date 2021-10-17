import { kebabCase } from 'lodash';

export default (whom: string = "TS"): void =>
  console.info(`HelloWorld,${kebabCase(whom)}`);