import AbstractTemplate from './models/AbstractTemplate';

export class ComponentWithCssTemplate extends AbstractTemplate {
  template = `import React from "react";
import "./{PascalCase}.css";

type {PascalCase}Props = {};

const {PascalCase} = ({ }: {PascalCase}Props) => {
  return (
    <div className="{lowercase}-wrapper">
      {PascalCase} Content
    </div>
  );
};

export default {PascalCase};`;

  async create(): Promise<void> {
    const fileName = `${this.pascalCaseName}.tsx`;
    const content = this.template
      .replace(/{PascalCase}/g, this.pascalCaseName)
      .replace(/{lowercase}/g, this.pascalCaseName.toLowerCase());

    await this.createTemplate({
      fileName,
      content,
    });
  }
}
