import AbstractTemplate from './models/AbstractTemplate';

export class ComponentTemplate extends AbstractTemplate {
  template = `import React from "react";

type {PascalCase}Props = {};

const {PascalCase} = ({ }: {PascalCase}Props) => {
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
