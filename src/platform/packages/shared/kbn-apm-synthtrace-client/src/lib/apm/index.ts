/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { service, otelService } from './service';

import { mobileApp } from './mobile_app';
import { browser } from './browser';
import { serverlessFunction } from './serverless_function';
import { getChromeUserAgentDefaults } from './defaults/get_chrome_user_agent_defaults';

import type { ApmException } from './apm_fields';

export const apm = {
  service,
  otelService,
  mobileApp,
  browser,
  getChromeUserAgentDefaults,
  serverlessFunction,
};

export const apmOtel = {
  service: otelService,
};

export type { ApmException };
