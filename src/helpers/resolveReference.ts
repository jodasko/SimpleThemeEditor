export const resolveReferences = (
  value: string,
  variables: Record<string, { resolvedValue: string }>
): string => {
  // Match {variableReference} patterns
  const regex = /\{([a-zA-Z0-9._]+)\}/g;

  return value.replace(regex, (_, referenceKey) => {
    const referencedVariable = variables[referenceKey];
    if (referencedVariable) {
      // Replace {variableReference} with its resolvedValue
      return referencedVariable.resolvedValue;
    }
    // If reference not found, keep it as-is
    return `{${referenceKey}}`;
  });
};
