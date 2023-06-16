import { newSpecPage } from '@stencil/core/testing';
import { MyComponent } from './my-component';

describe('my-component', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [MyComponent],
      html: '<my-component></my-component>',
    });
    expect(root).toEqualHtml(`
      <my-component>
        <mock:shadow-root>
          <button>Tooltip button</button>
          <div slot="content">This is the content that should show inside the tooltip</div>
        </mock:shadow-root>
      </my-component>
    `);
  });
});
