/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { euiLightVars as theme } from '@kbn/ui-theme';
import { i18n } from '@kbn/i18n';
import {
  METRIC_SYSTEM_CPU_PERCENT,
  METRIC_PROCESS_CPU_PERCENT,
  METRIC_OTEL_SYSTEM_CPU_UTILIZATION,
} from '../../../../../../common/es_fields/apm';
import type { ChartBase } from '../../../types';
import { fetchAndTransformMetrics } from '../../../fetch_and_transform_metrics';
import type { APMConfig } from '../../../../..';
import type { APMEventClient } from '../../../../../lib/helpers/create_es_client/create_apm_event_client';

const series = {
  systemCPUMax: {
    title: i18n.translate('xpack.apm.chart.cpuSeries.systemMaxLabel', {
      defaultMessage: 'System max',
    }),
    color: theme.euiColorVis1,
  },
  systemCPUAverage: {
    title: i18n.translate('xpack.apm.chart.cpuSeries.systemAverageLabel', {
      defaultMessage: 'System average',
    }),
    color: theme.euiColorVis0,
  },
  processCPUMax: {
    title: i18n.translate('xpack.apm.chart.cpuSeries.processMaxLabel', {
      defaultMessage: 'Process max',
    }),
    color: theme.euiColorVis7,
  },
  processCPUAverage: {
    title: i18n.translate('xpack.apm.chart.cpuSeries.processAverageLabel', {
      defaultMessage: 'Process average',
    }),
    color: theme.euiColorVis5,
  },
};

const chartBase: ChartBase = {
  title: i18n.translate('xpack.apm.serviceDetails.metrics.cpuUsageChartTitle', {
    defaultMessage: 'CPU usage',
  }),
  key: 'cpu_usage_chart',
  type: 'linemark',
  yUnit: 'percent',
  series,
};

export function getCPUChartData({
  environment,
  kuery,
  config,
  apmEventClient,
  serviceName,
  serviceNodeName,
  start,
  end,
  isOpenTelemetry,
}: {
  environment: string;
  kuery: string;
  config: APMConfig;
  apmEventClient: APMEventClient;
  serviceName: string;
  serviceNodeName?: string;
  start: number;
  end: number;
  isOpenTelemetry?: boolean;
}) {
  const systemCpuMetric = isOpenTelemetry
    ? METRIC_OTEL_SYSTEM_CPU_UTILIZATION
    : METRIC_SYSTEM_CPU_PERCENT;

  return fetchAndTransformMetrics({
    environment,
    kuery,
    config,
    apmEventClient,
    serviceName,
    serviceNodeName,
    start,
    end,
    chartBase,
    aggs: {
      systemCPUAverage: { avg: { field: systemCpuMetric } },
      systemCPUMax: { max: { field: systemCpuMetric } },
      processCPUAverage: { avg: { field: METRIC_PROCESS_CPU_PERCENT } },
      processCPUMax: { max: { field: METRIC_PROCESS_CPU_PERCENT } },
    },
    operationName: 'get_cpu_metric_charts',
  });
}
