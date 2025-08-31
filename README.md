# Availity Reactstrap Validation

[![npm version](https://badge.fury.io/js/availity-reactstrap-validation.svg)](https://badge.fury.io/js/availity-reactstrap-validation)
[![Build Status](https://github.com/Availity/availity-reactstrap-validation/workflows/CI/badge.svg)](https://github.com/Availity/availity-reactstrap-validation/actions)
[![Coverage Status](https://coveralls.io/repos/github/Availity/availity-reactstrap-validation/badge.svg?branch=master)](https://coveralls.io/github/Availity/availity-reactstrap-validation?branch=master)

Form validation helpers for Reactstrap components with React 18+ support.

## 🚀 Features

- **React 18+ Compatible**: Built with modern React patterns and hooks support
- **TypeScript Support**: Full TypeScript definitions included
- **Modern JavaScript**: ES2020+ features with proper polyfills
- **Accessibility**: Built with accessibility in mind
- **Flexible Validation**: Multiple validation strategies and custom validators
- **Bootstrap 5**: Compatible with Bootstrap 5 and Reactstrap 9+

## 📦 Installation

```bash
npm install availity-reactstrap-validation
# or
yarn add availity-reactstrap-validation
```

## 🔧 Requirements

- **Node.js**: 20.0.0 or higher
- **React**: 18.0.0 or higher
- **Reactstrap**: 9.0.0 or higher
- **Bootstrap**: 5.0.0 or higher

## 🚀 Quick Start

```jsx
import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

function MyForm() {
  const handleValidSubmit = (event, values) => {
    console.log('Form submitted successfully:', values);
  };

  const handleInvalidSubmit = (event, errors, values) => {
    console.log('Form has errors:', errors);
  };

  return (
    <AvForm onValidSubmit={handleValidSubmit} onInvalidSubmit={handleInvalidSubmit}>
      <AvField
        name="email"
        label="Email"
        type="email"
        validate={{
          required: { value: true, errorMessage: 'Email is required' },
          email: { value: true, errorMessage: 'Please enter a valid email' }
        }}
      />
      <Button type="submit">Submit</Button>
    </AvForm>
  );
}
```

## 📚 Documentation

Visit our [documentation site](https://availity.github.io/availity-reactstrap-validation/) for comprehensive examples and API reference.

## 🔄 Migration from v2

This is a major version update with breaking changes:

- **React 18+ required** (was React 16.8+)
- **Node 20+ required** (was Node 5+)
- **Bootstrap 5+ required** (was Bootstrap 4)
- **Reactstrap 9+ required** (was Reactstrap 6+)

### Key Changes

1. **Lifecycle Methods**: Replaced deprecated `componentWillMount` and `componentWillReceiveProps` with modern alternatives
2. **Modern Build System**: Updated to Webpack 5, Babel 7, and modern tooling
3. **TypeScript Support**: Added comprehensive TypeScript definitions
4. **ES Modules**: Added ES module build for tree-shaking support

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/Availity/availity-reactstrap-validation/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Availity/availity-reactstrap-validation/discussions)
- **Documentation**: [Documentation Site](https://availity.github.io/availity-reactstrap-validation/)

## 🙏 Acknowledgments

Built with ❤️ by the [Availity](https://availity.com) team.
