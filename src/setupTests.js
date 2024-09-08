import '@testing-library/jest-dom';

// Полифилл для MutationObserver
global.MutationObserver = class {
  observe() {}
  disconnect() {}
};
