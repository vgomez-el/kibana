/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { SupportedAggs } from './field_stats';
import type { Percentile, SupportedFieldType, FieldVisStats } from '.';
export interface MetricFieldVisStats {
  avg?: number;
  distribution?: {
    percentiles: Percentile[];
    maxPercentile: number;
    minPercentile: 0;
  };
  max?: number;
  median?: number;
  min?: number;
}

// The internal representation of the configuration used to build the visuals
// which display the field information.
export interface FieldVisConfig {
  type: SupportedFieldType;
  fieldName: string;
  displayName?: string;
  existsInDocs: boolean;
  aggregatable: boolean;
  loading: boolean;
  secondaryType: string;
  stats?: FieldVisStats;
  fieldFormat?: any;
  isUnsupportedType?: boolean;
  deletable?: boolean;
  supportedAggs?: SupportedAggs;
}

export interface FileBasedFieldVisConfig {
  type: SupportedFieldType;
  fieldName?: string;
  displayName?: string;
  secondaryType?: string;
  stats?: FieldVisStats;
  format?: string;
}

export interface FileBasedUnknownFieldVisConfig {
  fieldName: string;
  type: 'text' | 'unknown';
  stats: { mean: number; count: number; sampleCount: number; cardinality: number };
}

export function isFileBasedFieldVisConfig(
  field: FieldVisConfig | FileBasedFieldVisConfig
): field is FileBasedFieldVisConfig {
  return !Object.hasOwn(field, 'existsInDocs');
}

export function isIndexBasedFieldVisConfig(
  field: FieldVisConfig | FileBasedFieldVisConfig
): field is FieldVisConfig {
  return Object.hasOwn(field, 'existsInDocs');
}
