import AbstractTemplate from './models/AbstractTemplate';

export class ComponentWithChildrenTemplate extends AbstractTemplate {
  template = `import React from "react";

type {PascalCase}Props = React.PropsWithChildren<{}>;

const {PascalCase} = ({ children }: {PascalCase}Props) => {
  return (
    <div>
      {PascalCase} Content
    </div>
  );
};

export default {PascalCase};`;
  constructor(pascalCaseName: string, dir: string) {
    super(pascalCaseName, dir);
  }

  async create(): Promise<void> {
    const fileName = `${this.pascalCaseName}.tsx`;
    const content = this.template.replace(/{PascalCase}/g, this.pascalCaseName);

    await this.createTemplate({
      fileName,
      content,
    });
  }
}
