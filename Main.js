function identifyTokens(expression) {
    
    const regexPatterns = [
        { pattern: /-?\b\d+(\.\d+)?\b/g, type: 'Literal' }, 
        { pattern: /[+\-*\/\(\)]/g, type: 'Operator' },      // Add Equal Here for Operator Do Later... 
        { pattern: /\b[a-zA-Z_]\w*\b/g, type: 'Identifier' }  
    ];

    const tokens = [];


    regexPatterns.forEach(({ pattern, type }) => {
        const matches = expression.match(pattern);
        if (matches) {
            tokens.push(...matches.map(match => ({ type, value: match })));
        }
    });

    return tokens;
}

function syntaxChecker(tokens) {
    const expectedTypes = ['Identifier', 'Identifier', 'Operator', 'Operator', 'Operator', 'Operator', 'Literal', 'Literal'];
    const expectedSet = new Set(expectedTypes);
    const tokenSet = new Set(tokens.map(token => token.type));

    for (const expectedType of expectedSet) {
        if (!tokenSet.has(expectedType)) {
            return false;
        }
    }

    const identifierCount = tokens.filter(token => token.type === 'Identifier').length;
    const operatorCount = tokens.filter(token => token.type === 'Operator').length;
    const literalCount = tokens.filter(token => token.type === 'Literal').length;
    console.log(identifierCount)
    console.log(operatorCount)
    console.log(literalCount)
    // Add conditions to check the counts
    if (identifierCount !== 2 || operatorCount !== 4 || literalCount !== 2) {
        return false;
    }

    return true;
}



const expression = "number = (x + 10) * 8";
const expression1 = "thisIsValid = (x + 10) * 8";
const expression2 = "thisIsInvalid = x + 10 * 8";
const expression3 = "thisIsInvalid = x + 10 * (8 + 10)";
const tokens = identifyTokens(expression3);


console.log("############################ Identified Tokens with their Types #########################################");
console.log(tokens.map(token => `${token.type}: ${token.value}`).join('\n'));


const isSyntaxValid = syntaxChecker(tokens);
console.log("\n ########################## Syntax Check Result ########################################");
console.log(isSyntaxValid ? "Syntax is valid." : "Syntax is not valid.");

if (isSyntaxValid) {
    console.log("\n ###################################### DATA TYPES ###########################################")
    const identifierTypes = tokens
        .filter(token => token.type === 'Identifier')
        .map(token => token.value + ": " + typeof token.value);

    const literalTypes = tokens
        .filter(token => token.type === 'Literal')
        .map(token => token.value + ": " + (token.value.includes('.') ? 'int' : 'int'));

    console.log("\nIdentifier Types:");
    console.log(identifierTypes.join('\n'));

    console.log("\nLiteral Types:");
    console.log(literalTypes.join('\n'));
}