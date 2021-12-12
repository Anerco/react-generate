import AbstractTemplate from './models/AbstractTemplate';

export class CssTemplate extends AbstractTemplate {
  template = `.{lowercase}-wrapper
{
    
}`;

  async create(): Promise<void> {
    const fileName = `${this.pascalCaseName}.css`;
    const content = this.template.replace(
      /{lowercase}/g,
      this.pascalCaseName.toLowerCase()
    );

    await this.createTemplate({
      fileName,
      content,
    });
  }
}
