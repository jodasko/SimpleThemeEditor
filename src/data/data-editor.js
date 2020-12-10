  const [editor, setEditor] = useState([
    {
      id: 1,
      section: 'General colors',
      styles: [
        {
          name: 'Primary font color',
          value: '#000000',
          variableref: [],
          ref: 'colors.primary',
        },
        {
          name: 'Primary background color',
          value: '#ffffff',
          variableref: [],
          ref: 'colors.primaryBackground',
        },
        {
          name: 'Secondary font color',
          value: '#ffffff',
          variableref: [],
          ref: 'colors.secondary',
        },
        {
          name: 'Secondary background color',
          value: '#4a86e8',
          variableref: [],
          ref: 'colors.secondaryBackground',
        },
        {
          name: 'Highlight on primary background',
          value: '#4a86e8',
          variableref: [],
          ref: 'colors.highlight1',
        },
        {
          name: 'Highlight on secondary background',
          value: '#ffab40',
          variableref: [],
          ref: 'colors.highlight2',
        },
      ],
    },
    {
      id: 2,
      section: 'Global sizes',
      styles: [
        {
          name: 'Defaul text size (em)',
          value: '1.1',
          variableref: [],
          ref: 'sizes.text',
        },
        {
          name: 'Header1 text size (em)',
          value: '1.4',
          variableref: [],
          ref: 'sizes.h1',
        },
        {
          name: 'Header2 text size (em)',
          value: '1.2',
          variableref: [],
          ref: 'sizes.h2',
        },
        {
          name: 'Default border width (px)',
          value: '1',
          variableref: [],
          ref: 'sizes.borderWidth',
        },
      ],
    },
    {
      id: 3,
      section: 'Text field',
      styles: [
        {
          name: 'Text size (em)',
          value: '',
          variableref: ['sizes.text'],
          ref: 'textfield.textSize',
        },
        {
          name: 'Font color',
          value: '',
          variableref: ['colors.primary'],
          ref: 'textfield.color',
        },
        {
          name: 'Border',
          value: '',
          variableref: ['sizes.borderWidth', 'colors.primary'],
          ref: 'textfield.border',
        },
        {
          name: 'Background',
          value: '',
          variableref: ['colors.primaryBackground'],
          ref: 'textfield.background',
        },
      ],
    },
    {
      id: 4,
      section: 'Buttons',
      styles: [
        {
          name: 'Font size (rem)',
          value: '',
          variableref: ['sizes.text', 'sizes.h2'],
          ref: 'buttons.fontSize',
        },
        {
          name: 'Font color',
          value: '',
          variableref: ['colors.primary'],
          ref: 'buttons.color',
        },
        {
          name: 'Background',
          value: '',
          variableref: ['colors.primaryBackground'],
          ref: 'buttons.background',
        },
      ],
    },
  ]);