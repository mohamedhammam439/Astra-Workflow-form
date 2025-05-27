import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
import { useFormBuilder } from '../../contexts/FormBuilderContext';
import { TextField, NumberField, DateField, SelectField } from './FormFields';

export const FormPreview: React.FC = () => {
  const { steps } = useFormBuilder();
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const renderField = (field: any) => {
    const fieldProps = {
      field,
      value: formData[field.id],
      onChange: (value: any) => handleFieldChange(field.id, value)
    };

    switch (field.type) {
      case 'text':
        return <TextField {...fieldProps} />;
      case 'number':
        return <NumberField {...fieldProps} />;
      case 'date':
        return <DateField {...fieldProps} />;
      case 'select':
        return <SelectField {...fieldProps} />;
      default:
        return null;
    }
  };

  if (steps.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-gray-500">
          <p>No steps created yet. Add a step to see the preview.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Form Preview</h3>
      {steps.map((step, stepIndex) => (
        <Card key={step.id}>
          <CardHeader>
            <CardTitle>
              Step {stepIndex + 1}: {step.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {step.fields.map((field) => (
                <div key={field.id}>
                  {renderField(field)}
                </div>
              ))}
              {step.fields.length === 0 && (
                <p className="text-gray-500 italic">No fields in this step</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
     
    </div>
  );
};
