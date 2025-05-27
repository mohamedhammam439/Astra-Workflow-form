import React from 'react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
import { FormBuilderProvider, useFormBuilder } from '../../contexts/FormBuilderContext';
import { StepEditor } from './StepEditor';
import { FormPreview } from './FormPreview';

const FormBuilderContent: React.FC = () => {
  const { steps, addStep } = useFormBuilder();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Workflow Form Builder</h1>
          <p className="text-gray-600">Create custom workflow steps with dynamic form fields</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Builder Section */}
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Form Builder</CardTitle>
                <Button onClick={addStep}>Add Step</Button>
              </CardHeader>
              <CardContent>
                {steps.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No steps created yet.</p>
                    <p className="text-sm">Click "Add Step" to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {steps.map((step) => (
                      <StepEditor key={step.id} step={step} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <FormPreview />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FormBuilder: React.FC = () => {
  return (
    <FormBuilderProvider>
      <FormBuilderContent />
    </FormBuilderProvider>
  );
};
