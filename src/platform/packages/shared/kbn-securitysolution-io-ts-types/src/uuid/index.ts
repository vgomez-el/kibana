/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import * as t from 'io-ts';
import { Either } from 'fp-ts/Either';

const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Types the risk score as:
 *   - Natural Number (positive integer and not a float),
 *   - Between the values [0 and 100] inclusive.
 */
export const UUID = new t.Type<string, string, unknown>(
  'UUID',
  t.string.is,
  (input, context): Either<t.Errors, string> => {
    return typeof input === 'string' && regex.test(input)
      ? t.success(input)
      : t.failure(input, context);
  },
  t.identity
);

export type UUIDC = typeof UUID;
