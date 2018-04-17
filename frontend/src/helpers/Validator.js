import { I18n } from 'react-i18nify';

const getTranslationLabel = (formName, fieldLabelName) => (
  I18n.t(`${formName}.${fieldLabelName.replace(/\u005b\d\u005d/gi, '')}.label`)
);

const requiredValidator = (message = null) => (value, allValues, props, name) => {
  if (value) {
    return undefined;
  }
  return message || I18n.t('validator.required', {
    label: getTranslationLabel(props.form, name),
  });
};

const getFinalValue = (object, value) => {
  let finalValue = null;
  let testObject = object;
  value.split('.').forEach((arrayValue) => {
    if (Object.prototype.hasOwnProperty.call(testObject, arrayValue)) {
      finalValue = testObject[arrayValue];
      testObject = testObject[arrayValue];
    }
  });
  return finalValue;
};

const requiredWhenValueofFieldValidator = (fieldname, fieldvalues = [], message = null) => (value, allValues, props, name) => { //eslint-disable-line
  if (!fieldvalues.includes(getFinalValue(allValues, fieldname))) {
    return undefined;
  }
  if (value) {
    return undefined;
  }
  return message || I18n.t('validator.requiredWhenValueofField', {
    requiredLabel: getTranslationLabel(props.form, name),
    label: getTranslationLabel(props.form, fieldname),
    value: fieldvalues.join(),
  });
};

const checkboxRequiredValidator = (fieldName, checkBoxArray, showErrorInName, message = null) => (value, allValues, props, name) => {// eslint-disable-line
  const values = getFinalValue(allValues, fieldName);
  if (values) {
    let trueValue = false;
    checkBoxArray.forEach((checkbox) => {
      if (Object.prototype.hasOwnProperty.call(values, checkbox.code) && values[checkbox.code]) {
        trueValue = true;
      }
    });
    if (trueValue) {
      return undefined;
    }
  }
  if (name !== showErrorInName) { // only show error in one of the checkbox - Ken
    return undefined;
  }
  return message || I18n.t('validator.required', {
    label: I18n.t(`${props.form}.${fieldName}.label`),
  });
};

const maxValidator = (max = 255, message = null) => (value, allValues, props, name) => {
  if (value && value.length > max) {
    return message || I18n.t('validator.max', {
      label: getTranslationLabel(props.form, name),
      max,
    });
  }
  return undefined;
};

const minValidator = (min = 0, message = null) => (value, allValues, props, name) => {
  if (value && value.length > min) {
    return message || I18n.t('validator.max', {
      label: getTranslationLabel(props.form, name),
      min,
    });
  }
  return undefined;
};

const booleanValidator = (message = null) => (value, allValues, props, name) => {
  if (value === 0 || value === 1) {
    return undefined;
  }
  return message || I18n.t('validator.boolean', {
    label: getTranslationLabel(props.form, name),
  });
};

const emailValidator = (message = null) => (value, allValues, props, name) => {
  if (value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return undefined;
  }
  return message || I18n.t('validator.invalidFormat', {
    label: getTranslationLabel(props.form, name),
  });
};

const fileCounterValidator = (min, max, message = null) => (value, allValues, props, name) => {
  if (min <= value.length && value.length <= max) {
    return undefined;
  }
  return message || I18n.t('validator.fileCounter', {
    label: getTranslationLabel(props.form, name),
  });
};
const isURL = (str) => {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return pattern.test(str);
};
const urlValidator = (message = null) => (value, allValues, props, name) => {
  if (isURL(value)) {
    return undefined;
  }
  return message || I18n.t('validator.invalidFormat', {
    label: getTranslationLabel(props.form, name),
  });
};

export default class Validator {
  static get requiredValidator() {
    return requiredValidator;
  }
  static get requiredWhenValueofFieldValidator() {
    return requiredWhenValueofFieldValidator;
  }
  static get maxValidator() {
    return maxValidator;
  }
  static get minValidator() {
    return minValidator;
  }
  static get booleanValidator() {
    return booleanValidator;
  }
  static get emailValidator() {
    return emailValidator;
  }
  static get fileCounterValidator() {
    return fileCounterValidator;
  }
  static get urlValidator() {
    return urlValidator;
  }
  static get checkboxRequiredValidator() {
    return checkboxRequiredValidator;
  }
}
