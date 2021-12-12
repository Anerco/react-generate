import { promises as fs } from 'fs';
import path from 'path';
import { IndexTemplate } from '../index.template';

interface ICreateTemplateParams {
  fileName: string;
  content: string;
  shouldCreateIndex?: boolean;
}
export default abstract class AbstractTemplate {
  abstract template: string;
  abstract create(): Promise<void>;

  pascalCaseName: string;
  dir: string;

  private importTemplate = new IndexTemplate();

  constructor(pascalCaseName: string, dir: string) {
    this.pascalCaseName = pascalCaseName;
    this.dir = dir;
  }

  protected async createTemplate({
    fileName,
    content,
    shouldCreateIndex = true,
  }: ICreateTemplateParams): Promise<void> {
    const filePath = path.join(this.dir, fileName);
    await fs.writeFile(filePath, content);
    if (shouldCreateIndex) {
      this.importTemplate.create(this.pascalCaseName, this.dir);
    }
  }
}
