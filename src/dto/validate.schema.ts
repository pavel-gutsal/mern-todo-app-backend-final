/* eslint-disable prettier/prettier */
import * as yup from 'yup';

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

export const userValidation = yup.object().shape({
  email: yup
    .string()
    .required('enter an email')
    .email('invalid email'),
  password: yup
    .string()
    .required('enter a password')
    .min(6, 'password too short')
    .matches(passwordRegex, 'invalid charackters in password')
});

export const postValidation = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required('enter title')
    .min(3, 'title too short')
    .max(200,'title too long'),
  text: yup
    .string()
    .trim()
    .required('enter text')
    .min(3, 'text too short')
    .max(2000,'text too long'),
  completed: yup
    .boolean()
    .required('is it completed?')
});

export const editValidation = yup.object().shape({
  title: yup
    .string()
    .trim()
    .optional()
    .min(3, 'title too short')
    .max(200,'title too long'),
  text: yup
    .string()
    .trim()
    .optional()
    .min(3, 'text too short')
    .max(2000,'text too long'),
  completed: yup
    .boolean()
    .optional()
});