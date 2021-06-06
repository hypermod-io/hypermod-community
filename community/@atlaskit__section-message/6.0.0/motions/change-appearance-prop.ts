import core, { JSXAttribute, Node } from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';

import {
  insertCommentBefore,
  getDefaultImportSpecifierName,
  getJSXAttributes,
} from '@codeshift/utils';

import {
  APPEARANCE_OLD_TO_NEW_MAPPING,
  APPEARANCE_PROP_NAME,
  SECTION_MESSAGE_PACKAGE_NAME,
} from '../constants';

const replaceAppearanceStringValue = (
  j: core.JSCodeshift,
  attribute: core.ASTPath<JSXAttribute>,
  propValue: string,
) => {
  const newPropValue = APPEARANCE_OLD_TO_NEW_MAPPING[propValue];

  if (newPropValue) {
    j(attribute).replaceWith(
      j.jsxAttribute(
        j.jsxIdentifier(APPEARANCE_PROP_NAME),
        j.stringLiteral(newPropValue),
      ),
    );
  }
};

const changeAppearanceProp = (
  j: core.JSCodeshift,
  source: Collection<Node>,
) => {
  const defaultSpecifier = getDefaultImportSpecifierName(
    j,
    source,
    SECTION_MESSAGE_PACKAGE_NAME,
  );

  if (!defaultSpecifier) return;

  source.findJSXElements(defaultSpecifier).forEach(element => {
    getJSXAttributes(j, element, APPEARANCE_PROP_NAME).forEach(attribute => {
      const { value } = attribute.node;
      if (!value) return;

      // appearance prop can be provided in multiple ways. Handling different cases here
      switch (value.type) {
        // case when object value is provided
        case 'JSXExpressionContainer':
          const { expression } = value;

          // case when string is provided inside JSX expression
          // e.g.: <SectionMessage appearance={"information"} />
          if (expression.type === 'StringLiteral') {
            replaceAppearanceStringValue(j, attribute, expression.value);
          }
          // case when a variable is provided as value
          // e.g.: <SectionMessage appearance={someVariable} />
          else if (expression.type !== 'JSXEmptyExpression') {
            const mappingValue = j.memberExpression(
              j.objectExpression(
                Object.entries(
                  APPEARANCE_OLD_TO_NEW_MAPPING,
                ).map(([key, value]) =>
                  j.objectProperty(j.identifier(key), j.stringLiteral(value)),
                ),
              ),
              expression,
            );
            mappingValue.computed = true;

            const propValue = j.logicalExpression(
              '||',
              mappingValue,
              expression,
            );

            j(attribute).replaceWith(
              j.jsxAttribute(
                j.jsxIdentifier(APPEARANCE_PROP_NAME),
                j.jsxExpressionContainer(propValue),
              ),
            );

            insertCommentBefore(
              j,
              j(attribute),
              `We have added this temporary appearance mapping here to make things work. Feel free to change it accordingly. We have also added @ts-ignore for typescript files.
                   @ts-ignore
                  `,
            );
          }

          break;

        // case when string value is provided
        // e.g.: <SectionMessage appearance="information" />
        case 'StringLiteral':
          replaceAppearanceStringValue(j, attribute, value.value);
      }
    });
  });
};

export default changeAppearanceProp;
