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
 - Border or Font Sizes do not display on the editor the vaues set correctly, but after clicking Save Button the correct values are displayed
 - For UX's sake, Radio Buttons was removed as it was not clear its funtionality 
 
## Changes made with {variable.references} will be shown once Save button is clicked ! 

## Developer:
Carlos Salazar :)
