function createElement(options) {
  const {
    name,
    classes,
    text,
    attributes,
  } = options;

  const element = document.createElement(name);

  if (classes) {
    classes.forEach((className) => {
      element.classList.add(className);
    });
  }

  if (text) {
    element.textContent = text;
  }

  if (attributes) {
    attributes.forEach((attr) => {
      element.setAttribute(attr.name, attr.value);
    });
  }

  return element;
}

export default createElement;
