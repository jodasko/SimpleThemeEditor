# SIMPLE THEME EDITOR 
 

## TOOLS
React : 17.0.1
Inmutability-helpe: 3.1.1
AntD UI components: 4.8.5
Eslint airbnb: ^18.2.1,
Eslint prettier : ^7.0.0,
Prettier : ^2.2.1,


## Usage

The specificity of this editor is that variable values can:

- Either contain a final value
- Or contain one or two {depending on CSS Syntax} references to other variable values that will be concatenated.

The {variableReference} notation should be used to reference variables (this is why the
variable reference is displayed in the right column for each variable description).
When a valid value is entered, value descriptions should be updated to reflect their value's
'resolved state' (e.g. if a value B references a value A, then B description should be updated
when A value changes)

## Contributing are welcome.

## Constraint
 - This version does not valid if a Reference Name is already set 
 - Border or Font Sizes always accepts two references
 - For UX's sake, Radio Buttons was removed as it was not clear its funtionality 

## Developer:
Carlos Salazar :)
