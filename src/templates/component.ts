import AbstractTemplate from './models/AbstractTemplate';

export class ComponentTemplate extends AbstractTemplate {
  template = `import React from "react";

interface I{PascalCase}Props {}

type {PascalCase} = I{PascalCase}Props;

const {PascalCase}Props = ({ }: {PascalCase}Props) => {
  return (
    <div>
      {PascalCase} Content
    </div>
  );
};

export default {PascalCase};`;

  async create(): Promise<void> {
    const fileName = `${this.pascalCaseName}.tsx`;
    const content = this.template.replace(/{PascalCase}/g, this.pascalCaseName);

    await this.createTemplate({
      fileName,
      content,
    });
  }
}
