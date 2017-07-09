import React from 'react';

export default props => {
  const columnClassNames = `library-list-column
    ${props.isWide ? 'library-list-column--wide' : undefined}
    ${props.isBodyTextStyled ? 'library-list-column--body' : undefined}`;

  return (
    <div className={columnClassNames}>
      <style jsx>{`
        .library-list-column {
          flex-basis: 30%;
          padding: 0 24px 0 0;
          overflow-wrap: break-word;
          word-break: break-word;

          @media (max-width: 600px) {
            flex-basis: 100%;
            padding: 0 0 0 0;
            margin: 0 0 16px 0;
          }
        }

        .library-list-column--wide {
          flex-basis: 40%;

          @media (max-width: 600px) {
            flex-basis: 100%;
          }
        }

        .library-list-column--body {
          font-size: 0.9rem;
          line-height: 1.3rem;
          color: #24292e;
        }
      `}</style>
      {props.children}
    </div>
  );
};
