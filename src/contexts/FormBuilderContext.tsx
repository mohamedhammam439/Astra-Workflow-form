import  { createContext, useContext, useState } from 'react';
import type {ReactNode} from 'react'

export interface FormField {
  id: string;
  type: 'text' | 'number' | 'date' | 'select';
  label: string;
  required: boolean;
  options?: string[]; // for select fields
}

export interface WorkflowStep {
  id: string;
  title: string;
  fields: FormField[];
}

interface FormBuilderContextType {
  steps: WorkflowStep[];
  addStep: () => void;
  removeStep: (stepId: string) => void;
  updateStep: (stepId: string, updates: Partial<WorkflowStep>) => void;
  addField: (stepId: string, field: FormField) => void;
  updateField: (stepId: string, fieldId: string, updates: Partial<FormField>) => void;
  removeField: (stepId: string, fieldId: string) => void;
  
}

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

export const useFormBuilder = () => {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error('useFormBuilder must be used within a FormBuilderProvider');
  }
  return context;
};

export const FormBuilderProvider = ({ children }: { children: ReactNode }) => {
  const [steps, setSteps] = useState<WorkflowStep[]>([]);

  const addStep = () => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      title: 'New Step',
      fields: []
    };
    setSteps(prev => [...prev, newStep]);
  };

  const removeStep = (stepId: string) => {
    setSteps(prev => prev.filter(step => step.id !== stepId));
  };

  const updateStep = (stepId: string, updates: Partial<WorkflowStep>) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ));
  };

  const addField = (stepId: string, field: FormField) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, fields: [...step.fields, field] }
        : step
    ));
  };

  const updateField = (stepId: string, fieldId: string, updates: Partial<FormField>) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId
        ? {
            ...step,
            fields: step.fields.map(field =>
              field.id === fieldId ? { ...field, ...updates } : field
            )
          }
        : step
    ));
  };

  const removeField = (stepId: string, fieldId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId
        ? { ...step, fields: step.fields.filter(field => field.id !== fieldId) }
        : step
    ));
  };

  return (
    <FormBuilderContext.Provider value={{
      steps,
      addStep,
      removeStep,
      updateStep,
      addField,
      updateField,
      removeField
    }}>
      {children}
    </FormBuilderContext.Provider>
  );
};
