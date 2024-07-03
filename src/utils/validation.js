// src/utils/validation.js
export const validate = (data, rules) => {
    let errors = {};
    let isValid = true;
  
    for (let field in rules) {
      for (let rule of rules[field]) {
        if (!rule.condition(data[field])) {
          errors[field] = rule.message;
          isValid = false;
          break;
        }
      }
    }
  
    return { isValid, errors };
  };
