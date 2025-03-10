/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import type { SpanOptions } from '@kbn/apm-utils';
import { withSpan, parseSpanOptions } from '@kbn/apm-utils';

export function withApmSpan<T>(
  optionsOrName: SpanOptions | string,
  cb: () => Promise<T>
): Promise<T> {
  const options = parseSpanOptions(optionsOrName);

  const optionsWithDefaults = {
    ...(options.intercept ? {} : { type: 'plugin:apm' }),
    ...options,
    labels: {
      plugin: 'apm',
      ...options.labels,
    },
  };

  return withSpan(optionsWithDefaults, cb);
}
