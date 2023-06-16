export default {
  title:'my-component'
};

export const Default = () => `
  <my-component>
    <button>Tooltip button</button>
    <div slot="content">This is the content that should show inside the tooltip</div>
  </my-component>
`;
