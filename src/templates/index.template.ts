import path from 'path';
import { promises as fs } from 'fs';
export class IndexTemplate {
  template = `import {PascalCase} from "./{PascalCase}"

export default {PascalCase}`;

  async create(pascalCaseName: string, dir: string): Promise<void> {
    const templatePath = path.join(dir, 'index.ts');
    const templateContent = this.template.replace(
      /{PascalCase}/g,
      pascalCaseName
    );

    await fs.writeFile(templatePath, templateContent);
  }
}
