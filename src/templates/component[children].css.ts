import path from 'path';
import AbstractTemplate from './models/AbstractTemplate';

export class ComponentWithCssAndChildrenTemplate extends AbstractTemplate {
  template = `import React from "react";
import "./{PascalCase}.css";

interface I{PascalCase}Props {}

type {PascalCase}Props = React.PropsWithChildren<I{PascalCase}Props>;

const {PascalCase} = ({ children }: {PascalCase}Props) => {
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
