import React from 'react';

import { t } from '@lingui/macro';
import { Formik } from 'formik';

import {
  Form,
  FormGroup,
  Modal,
  TextInput,
  TextArea,
  Select,
  SelectOption,
  SelectVariant,
} from '@patternfly/react-core';
import { PasswordField } from 'components/FormField';

function SurveyPreviewModal({
  questions,
  isPreviewModalOpen,
  onToggleModalOpen,
}) {
  const initialValues = {};
  questions.forEach((q) => {
    initialValues[q.variable] = q.default;
    return initialValues;
  });

  return (
    <Modal
      title={t`Survey Preview`}
      aria-label={t`Survey preview modal`}
      isOpen={isPreviewModalOpen}
      onClose={() => onToggleModalOpen(false)}
      variant="small"
    >
      <Formik initialValues={initialValues}>
        {() => (
          <Form>
            {questions.map((q) => (
              <div key={q.variable}>
                {['text', 'integer', 'float'].includes(q.type) && (
                  <FormGroup
                    fieldId={`survey-preview-text-${q.variable}`}
                    label={q.question_name}
                    isRequired={q.required}
                  >
                    <TextInput
                      id={`survey-preview-text-${q.variable}`}
                      value={q.default}
                      isDisabled
                      aria-label={t`Text`}
                    />
                  </FormGroup>
                )}
                {['textarea'].includes(q.type) && (
                  <FormGroup
                    fieldId={`survey-preview-textArea-${q.variable}`}
                    label={q.question_name}
                    isRequired={q.required}
                  >
                    <TextArea
                      id={`survey-preview-textArea-${q.variable}`}
                      type={`survey-preview-textArea-${q.variable}`}
                      value={q.default}
                      aria-label={t`Text Area`}
                      isDisabled
                    />
                  </FormGroup>
                )}
                {['password'].includes(q.type) && (
                  <PasswordField
                    id={`survey-preview-password-${q.variable}`}
                    label={q.question_name}
                    name={q.variable}
                    isDisabled
                    isRequired={q.required}
                  />
                )}
                {['multiplechoice'].includes(q.type) && (
                  <FormGroup
                    fieldId={`survey-preview-multipleChoice-${q.variable}`}
                    label={q.question_name}
                    isRequired={q.required}
                  >
                    <Select
                      id={`survey-preview-multipleChoice-${q.variable}`}
                      isDisabled
                      aria-label={t`Multiple Choice`}
                      typeAheadAriaLabel={t`Multiple Choice`}
                      placeholderText={q.default}
                      onToggle={() => {}}
                    />
                  </FormGroup>
                )}
                {['multiselect'].includes(q.type) && (
                  <FormGroup
                    fieldId={`survey-preview-multiSelect-${q.variable}`}
                    label={q.question_name}
                    isRequired={q.required}
                  >
                    <Select
                      isDisabled
                      isReadOnly
                      variant={SelectVariant.typeaheadMulti}
                      isOpen={false}
                      selections={
                        q.default.length > 0 ? q.default.split('\n') : []
                      }
                      onToggle={() => {}}
                      aria-label={t`Multi-Select`}
                      typeAheadAriaLabel={t`Multi-Select`}
                      id={`survey-preview-multiSelect-${q.variable}`}
                    >
                      {q.choices.length > 0 &&
                        q.choices
                          .split('\n')
                          .map((option) => (
                            <SelectOption key={option} value={option} />
                          ))}
                    </Select>
                  </FormGroup>
                )}
              </div>
            ))}
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
export default SurveyPreviewModal;
