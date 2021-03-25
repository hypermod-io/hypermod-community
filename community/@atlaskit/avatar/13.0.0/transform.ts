import core, {
    API,
    ASTPath,
    FileInfo,
    ImportDeclaration,
    ImportSpecifier,
    MemberExpression,
    Options,
} from 'jscodeshift';

function getImportDeclaration(
    j: core.JSCodeshift,
    source: ReturnType<typeof j>,
    specifier: string,
) {
    return source
        .find(j.ImportDeclaration)
        .filter(
            (path: ASTPath<ImportDeclaration>) =>
                path.node.source.value === specifier,
        );
}

function getDefaultSpecifier(
    j: core.JSCodeshift,
    source: ReturnType<typeof j>,
    specifier: string,
) {
    const specifiers = source
        .find(j.ImportDeclaration)
        .filter(
            (path: ASTPath<ImportDeclaration>) =>
                path.node.source.value === specifier,
        )
        .find(j.ImportDefaultSpecifier);

    if (!specifiers.length) {
        return null;
    }
    return specifiers.nodes()[0]!.local!.name;
}

function getImportSpecifier(
    j: core.JSCodeshift,
    source: ReturnType<typeof j>,
    specifier: string,
    imported: string,
) {
    const specifiers = source
        .find(j.ImportDeclaration)
        .filter(
            (path: ASTPath<ImportDeclaration>) =>
                path.node.source.value === specifier,
        )
        .find(j.ImportSpecifier)
        .filter(
            (path: ASTPath<ImportSpecifier>) =>
                path.value.imported.name === imported,
        );

    if (!specifiers.length) {
        return null;
    }

    return specifiers.nodes()[0]!.local!.name;
}

function getJSXAttributesByName(
    j: core.JSCodeshift,
    element: ASTPath<any>,
    attributeName: string,
) {
    return j(element)
        .find(j.JSXOpeningElement)
        .find(j.JSXAttribute)
        .filter(attribute => {
            const matches = j(attribute)
                .find(j.JSXIdentifier)
                .filter(identifier => identifier.value.name === attributeName);
            return Boolean(matches.length);
        });
}

function updateAvatarProps(j: core.JSCodeshift, source: ReturnType<typeof j>) {
    const defaultSpecifier = getDefaultSpecifier(j, source, '@atlaskit/avatar');

    if (!defaultSpecifier) {
        return;
    }

    source.findJSXElements(defaultSpecifier).forEach(element => {
        getJSXAttributesByName(j, element, 'isHover').remove();
        getJSXAttributesByName(j, element, 'isActive').remove();
        getJSXAttributesByName(j, element, 'isFocus').remove();
        getJSXAttributesByName(j, element, 'isSelected').remove();
        getJSXAttributesByName(j, element, 'theme').remove();

        const nameAttributes = getJSXAttributesByName(j, element, 'name');
        const name = nameAttributes.length && nameAttributes.get();
        const enableTooltipAttributes = getJSXAttributesByName(
            j,
            element,
            'enableTooltip',
        );
        const enableTooltipValue =
            enableTooltipAttributes.length && enableTooltipAttributes;

        const hasDefaultTrue = !!enableTooltipAttributes.filter(
            attr => attr.node.value == null,
        ).length;

        const hasTruthy = !!enableTooltipAttributes
            .find(j.JSXExpressionContainer)
            .find(j.BooleanLiteral)
            .filter(literal => literal.node.value).length;

        const hasFalsy = !!enableTooltipAttributes
            .find(j.JSXExpressionContainer)
            .find(j.BooleanLiteral)
            .filter(literal => literal.node.value === false).length;

        const hasExpression = !!enableTooltipAttributes
            .find(j.JSXExpressionContainer)
            .filter(container => {
                return j(container).find(j.BooleanLiteral).length === 0;
            }).length;

        const shouldWrapAvatar =
            !hasFalsy || hasDefaultTrue || hasTruthy || hasExpression;

        if (shouldWrapAvatar && name) {
            getImportDeclaration(j, source, '@atlaskit/avatar').forEach(
                importDeclaration => {
                    j(importDeclaration).replaceWith([
                        j.importDeclaration(
                            [j.importDefaultSpecifier(j.identifier('Tooltip'))],
                            j.literal('@atlaskit/tooltip'),
                        ),
                        importDeclaration.value,
                    ]);
                },
            );

            const wrappedAvatar = j.jsxElement(
                j.jsxOpeningElement(j.jsxIdentifier('Tooltip'), [
                    j.jsxAttribute(
                        j.jsxIdentifier('content'),
                        name.value.value,
                    ),
                ]),
                j.jsxClosingElement(j.jsxIdentifier('Tooltip')),
                [
                    j.jsxElement(
                        element.value.openingElement,
                        element.value.closingElement,
                        element.value.children,
                    ),
                ],
            );

            if (hasExpression && enableTooltipValue) {
                j(element).replaceWith([
                    j.conditionalExpression(
                        enableTooltipValue.find(j.JSXExpressionContainer).get()
                            .value.expression,
                        wrappedAvatar,
                        element.value,
                    ),
                ]);
            } else {
                j(element).replaceWith([wrappedAvatar]);
            }
        }

        enableTooltipValue && enableTooltipValue.remove();
    });
}

function updateAvatarItemProps(
    j: core.JSCodeshift,
    source: ReturnType<typeof j>,
) {
    const importSpecifier = getImportSpecifier(
        j,
        source,
        '@atlaskit/avatar',
        'AvatarItem',
    );

    if (!importSpecifier) {
        return;
    }

    source.findJSXElements(importSpecifier).forEach(element => {
        getJSXAttributesByName(j, element, 'isHover').remove();
        getJSXAttributesByName(j, element, 'isActive').remove();
        getJSXAttributesByName(j, element, 'isFocus').remove();
        getJSXAttributesByName(j, element, 'isSelected').remove();
        getJSXAttributesByName(j, element, 'theme').remove();
        getJSXAttributesByName(j, element, 'enableTextTruncate').forEach(
            attribute => {
                // Change the prop name to isTruncationDisabled
                j(attribute)
                    .find(j.JSXIdentifier)
                    .replaceWith(j.jsxIdentifier('isTruncationDisabled'));

                // Remove if enableTextTruncate was true or given no value (ie true)
                j(attribute)
                    .filter(attr => attr.node.value == null)
                    .remove();

                j(attribute)
                    .filter(attr => {
                        return !!j(attr)
                            .find(j.JSXExpressionContainer)
                            .find(j.BooleanLiteral)
                            .filter(literal => literal.node.value).length;
                    })
                    .remove();

                // if `enableTextTruncate` value is negative we can change it to 'true'
                j(attribute)
                    .filter(
                        attr =>
                            !!j(attr)
                                .find(j.JSXExpressionContainer)
                                .filter(
                                    expression =>
                                        j(expression)
                                            .find(j.BooleanLiteral)
                                            .filter(
                                                literal => !literal.node.value,
                                            ).length > 0,
                                ).length,
                    )
                    .replaceWith(
                        j.jsxAttribute(j.jsxIdentifier('isTruncationDisabled')),
                    );

                // if `enableTextTruncate` was an expression, negate it
                j(attribute)
                    .find(j.JSXExpressionContainer)
                    .filter(container => {
                        return j(container).find(j.BooleanLiteral).length === 0;
                    })
                    .forEach(container => {
                        j(container).replaceWith(
                            j.jsxExpressionContainer(
                                j.unaryExpression(
                                    '!',
                                    container.node.expression,
                                ),
                            ),
                        );
                    });
            },
        );
    });
}

function updateBorderWidthUsage(
    j: core.JSCodeshift,
    source: ReturnType<typeof j>,
) {
    source
        .find(j.MemberExpression)
        .filter(
            (memberExpression: ASTPath<MemberExpression>) =>
                // @ts-ignore
                memberExpression.value.object.name === 'BORDER_WIDTH',
        )
        .forEach((memberExpression: ASTPath<MemberExpression>) => {
            if (memberExpression.value.property) {
                j(memberExpression).replaceWith(
                    // @ts-ignore
                    j.identifier(memberExpression.value.object.name),
                );
            }
        });
}

function hasImportDeclaration(
    j: core.JSCodeshift,
    source: ReturnType<typeof j>,
    importPath: string,
) {
    return !!source
        .find(j.ImportDeclaration)
        .filter(path => path.node.source.value === importPath).length;
}

export default function transformer(
    fileInfo: FileInfo,
    { jscodeshift: j }: API,
    options: Options,
) {
    const source = j(fileInfo.source);

    if (hasImportDeclaration(j, source, '@atlaskit/avatar')) {
        updateBorderWidthUsage(j, source);
        updateAvatarProps(j, source);
        updateAvatarItemProps(j, source);

        return source.toSource(options.printOptions || { quote: 'single' });
    }

    return fileInfo.source;
}
