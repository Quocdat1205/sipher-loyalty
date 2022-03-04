import Joi from 'joi';

const validation = {
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  ELASTICSEARCH_ENDPOINT: Joi.string().required(),
  TK_WEB: Joi.string().required(),
  PW_WEB: Joi.string().required(),
};

export default validation;
