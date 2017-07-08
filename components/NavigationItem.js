import React from 'react';

export default props => {
  const parentClassNames = `navigation-item
        ${props.data.active ? 'navigation-item--active' : undefined}
        ${!props.data.active ? 'navigation-item--interactable' : undefined}`;

  const childClassNames = `navigation-item-text
        ${props.data.active ? 'navigation-item-text--active' : undefined}`;

  return (
    <span className={parentClassNames} onClick={props.data.onClick}>
      <style jsx>{`
        .navigation-item {
          font-family: 'office-code', monospace;
          display: inline-flex;
          align-items: flex-end;
          flex-direction: column;
          margin: 0 24px 0 0;
          padding: 0 0 8px 0;
          height: 32px;
        }

        .navigation-item--interactable {
          cursor: pointer;
          opacity: 1;
          transition: 200ms all ease;
          transition-property: opacity, transform;
          opacity: 0.6;

          &:hover {
            opacity: 0.8;
          }
        }
        .navigation-item--active {
          box-shadow: 0 1px 0 rgba(65, 160, 248, 1);
        }

        .navigation-item-text {
          font-size: 0.8rem;
          margin: auto 0 0 0;
        }

        .navigation-item-text--active {
          color: rgba(65, 160, 248, 1);
        }
      `}</style>
      <span className={childClassNames}>
        {props.data.text}
      </span>
    </span>
  );
};
