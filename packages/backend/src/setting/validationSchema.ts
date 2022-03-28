import Joi from "joi";

const validation = {
  PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  ELASTICSEARCH_ENDPOINT: Joi.string().required(),
};

export default validation;
