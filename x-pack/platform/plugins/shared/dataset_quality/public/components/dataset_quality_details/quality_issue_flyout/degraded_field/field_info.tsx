/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import {
  EuiBadge,
  EuiBadgeGroup,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiTitle,
  EuiToolTip,
} from '@elastic/eui';
import { useQualityIssues } from '../../../../hooks';
import {
  degradedFieldCurrentFieldLimitColumnName,
  degradedFieldMaximumCharacterLimitColumnName,
  degradedFieldPotentialCauseColumnName,
  degradedFieldValuesColumnName,
} from '../../../../../common/translations';
import { ExpandableTruncatedText } from '../expandable_truncated_text';

export const DegradedFieldInfo = () => {
  const {
    degradedFieldValues,
    isAnalysisInProgress,
    degradedFieldAnalysisFormattedResult,
    degradedFieldAnalysis,
  } = useQualityIssues();

  return (
    <>
      <EuiFlexGroup data-test-subj={`datasetQualityDetailsDegradedFieldFlyoutFieldsList-cause`}>
        <EuiFlexItem grow={1}>
          <EuiTitle size="xxs">
            <span>{degradedFieldPotentialCauseColumnName}</span>
          </EuiTitle>
        </EuiFlexItem>
        <EuiFlexItem
          data-test-subj="datasetQualityDetailsDegradedFieldFlyoutFieldValue-cause"
          grow={2}
        >
          <div>
            <EuiToolTip
              position="top"
              content={degradedFieldAnalysisFormattedResult?.tooltipContent}
            >
              <EuiBadge color="hollow">
                <strong>{degradedFieldAnalysisFormattedResult?.potentialCause}</strong>
              </EuiBadge>
            </EuiToolTip>
          </div>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiHorizontalRule margin="s" />

      {!isAnalysisInProgress && degradedFieldAnalysis?.isFieldLimitIssue && (
        <>
          <EuiFlexGroup
            data-test-subj={`datasetQualityDetailsDegradedFieldFlyoutFieldsList-mappingLimit`}
          >
            <EuiFlexItem grow={1}>
              <EuiTitle size="xxs">
                <span>{degradedFieldCurrentFieldLimitColumnName}</span>
              </EuiTitle>
            </EuiFlexItem>
            <EuiFlexItem
              data-test-subj="datasetQualityDetailsDegradedFieldFlyoutFieldValue-mappingLimit"
              grow={2}
            >
              <span>{degradedFieldAnalysis.totalFieldLimit}</span>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiHorizontalRule margin="s" />
        </>
      )}

      {!isAnalysisInProgress &&
        degradedFieldAnalysisFormattedResult?.shouldDisplayIgnoredValuesAndLimit && (
          <>
            <EuiFlexGroup
              data-test-subj={'datasetQualityDetailsDegradedFieldFlyoutFieldsList-characterLimit'}
            >
              <EuiFlexItem grow={1}>
                <EuiTitle size="xxs">
                  <span>{degradedFieldMaximumCharacterLimitColumnName}</span>
                </EuiTitle>
              </EuiFlexItem>
              <EuiFlexItem
                data-test-subj="datasetQualityDetailsDegradedFieldFlyoutFieldValue-characterLimit"
                css={{ maxWidth: '64%' }}
                grow={2}
              >
                <span>{degradedFieldAnalysis?.fieldMapping?.ignore_above}</span>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiHorizontalRule margin="s" />
            <EuiFlexGroup
              data-test-subj={`datasetQualityDetailsDegradedFieldFlyoutFieldsList-values`}
            >
              <EuiFlexItem grow={1}>
                <EuiTitle size="xxs">
                  <span>{degradedFieldValuesColumnName}</span>
                </EuiTitle>
              </EuiFlexItem>
              <EuiFlexItem
                data-test-subj="datasetQualityDetailsDegradedFieldFlyoutFieldValue-values"
                css={{ maxWidth: '64%' }}
                grow={2}
              >
                <EuiBadgeGroup gutterSize="s">
                  {degradedFieldValues?.values.map((value, idx) => {
                    return (
                      <div key={idx} css={{ lineHeight: '1.6', width: '100%' }}>
                        <ExpandableTruncatedText text={value} />
                      </div>
                    );
                  })}
                </EuiBadgeGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiHorizontalRule margin="s" />
          </>
        )}
    </>
  );
};
