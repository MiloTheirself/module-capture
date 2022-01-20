import { css, html, pattern, nothing } from '@applicdev/module-lit';

const internal: { [prop: string]: any } = {};

pattern.reference('node-wireframe:sandbox-node').create({
  styles: (host, node) => css`
    /**/
    .host-node.sandbox-checkbox {
      display: flex;
      flex-direction: row;
      flex: none;
      align-items: center;

      height: 2rem;
      margin: 0rem var(--node-gutter) 0rem calc(0rem - var(--node-gutter));
      padding: 0rem var(--node-gutter);

      cursor: pointer;
    }
    .host-node.sandbox-checkbox > *[type='checkbox'] {
      margin: 0rem var(--node-gutter-sm) 0rem 0rem;
    }
    .host-node.sandbox-checkbox > * {
      user-select: none;
      pointer-events: none;
    }
  `,
  render: (host, node) => html`
    <label class="host-node sandbox-checkbox">
      <input type="checkbox" ?checked="${node.state == 2}" />
      <span class="node-type action">${node.label}</span>
    </label>
    ${node.nodes.length
      ? html`
          <!---->
          <ul>
            ${node.nodes.map(
              (nodeChild) => html`
                <!---->
                <li>
                  ${pattern //
                    .reference('node-wireframe:sandbox-node')
                    .render(host, nodeChild)}
                </li>
                <!---->
              `
            )}
          </ul>
          <!---->
        `
      : nothing}
  `,
});

pattern.reference('node-wireframe:sandbox').create({
  styles: (host, node) => css`
    ${pattern.reference('node-wireframe:sandbox-node').styles(host, node)}

    /**/
    .host-node.sandbox {
      dispaly: flex;
      flex-direction: column;
    }

    /**/
    .host-node.sandbox-header {
      display: flex;
      flex-direction: column;
      flex: none;

      margin: 0rem 0rem var(--node-margin);
    }

    .host-node.sandbox-header ul {
      margin: 0rem 0rem;
      padding: 0rem 0rem 0rem var(--node-margin);
    }
    .host-node.sandbox-header li {
      margin: 0rem 0rem;
      padding: 0rem 0rem;
      list-style: none;
    }
  `,
  render: (host, node) => html`
    <div class="host-node sandbox">
      <!---->
      <div class="host-node sandbox-header">
        ${host.sandbox
          ? [...host.sandbox.patternRender].map(
              (nodePattern) => pattern.reference('node-wireframe:sandbox-node').render(host, nodePattern) //
            )
          : nothing}
      </div>
      <!---->
    </div>
  `,
});
