/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { Meta, StoryFn } from '@storybook/react';
import React, { useCallback, useEffect, useState } from 'react';
import type { TimeUnitChar } from '@kbn/observability-plugin/common';
import type { IErrorObject } from '@kbn/triggers-actions-ui-plugin/public';
import { COMPARATORS } from '@kbn/alerting-comparators';
import type { MetricExpressionParams } from '../../../../../common/alerting/metrics';
import { Aggregators } from '../../../../../common/alerting/metrics';
import { decorateWithGlobalStorybookThemeProviders } from '../../../../test_utils/use_global_storybook_theme';
import type { CustomEquationEditorProps } from './custom_equation_editor';
import { CustomEquationEditor } from './custom_equation_editor';
import { aggregationType } from '../expression_row';
import type { MetricExpression } from '../../types';
import { validateMetricThreshold } from '../validation';

export default {
  title: 'infra/alerting/CustomEquationEditor',
  decorators: [
    (wrappedStory) => <div style={{ width: 550 }}>{wrappedStory()}</div>,
    decorateWithGlobalStorybookThemeProviders,
  ],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
} as Meta;

const BASE_ARGS = {
  expression: {
    aggType: Aggregators.CUSTOM,
    timeSize: 1,
    timeUnit: 'm' as TimeUnitChar,
    threshold: [1],
    comparator: COMPARATORS.GREATER_THAN,
  },
  fields: [
    { name: 'system.cpu.user.pct', normalizedType: 'number' },
    { name: 'system.cpu.system.pct', normalizedType: 'number' },
    { name: 'system.cpu.cores', normalizedType: 'number' },
  ],
  aggregationTypes: aggregationType,
};

const CustomEquationEditorTemplate: StoryFn<CustomEquationEditorProps> = (args) => {
  const [expression, setExpression] = useState<MetricExpression>(args.expression);
  const [errors, setErrors] = useState<IErrorObject>(args.errors);

  const handleExpressionChange = useCallback(
    (exp: MetricExpression) => {
      setExpression(exp);
      args.onChange(exp);
      return exp;
    },
    [args]
  );

  useEffect(() => {
    const validationObject = validateMetricThreshold({
      criteria: [expression as MetricExpressionParams],
    });
    setErrors(validationObject.errors[0]);
  }, [expression]);

  return (
    <CustomEquationEditor
      {...args}
      errors={errors}
      expression={expression}
      onChange={handleExpressionChange}
    />
  );
};

export const CustomEquationEditorDefault = {
  render: CustomEquationEditorTemplate,

  args: {
    ...BASE_ARGS,
    errors: {},
  },
};

export const CustomEquationEditorWithEquationErrors = {
  render: CustomEquationEditorTemplate,

  args: {
    ...BASE_ARGS,
    expression: {
      ...BASE_ARGS.expression,
      equation: 'Math.round(A / B)',
      customMetrics: [
        { name: 'A', aggType: Aggregators.AVERAGE, field: 'system.cpu.user.pct' },
        { name: 'B', aggType: Aggregators.MAX, field: 'system.cpu.cores' },
      ],
    },
    errors: {
      equation:
        'The equation field only supports the following characters: A-Z, +, -, /, *, (, ), ?, !, &, :, |, >, <, =',
    },
  },
};
