import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { FormField } from '../../contexts/FormBuilderContext';

interface FieldProps {
  field: FormField;
  value?: any;
  onChange?: (value: any) => void;
}

export const TextField: React.FC<FieldProps> = ({ field, value, onChange }) => (
  <div className="space-y-2">
    <Label htmlFor={field.id}>
      {field.label} {field.required && <span className="text-red-500">*</span>}
    </Label>
    <Input
      id={field.id}
      type="text"
      value={value || ''}
      onChange={(e) => onChange?.(e.target.value)}
      required={field.required}
    />
  </div>
);

export const NumberField: React.FC<FieldProps> = ({ field, value, onChange }) => (
  <div className="space-y-2">
    <Label htmlFor={field.id}>
      {field.label} {field.required && <span className="text-red-500">*</span>}
    </Label>
    <Input
      id={field.id}
      type="number"
      value={value || ''}
      onChange={(e) => onChange?.(e.target.value)}
      required={field.required}
    />
  </div>
);

export const DateField: React.FC<FieldProps> = ({ field, value, onChange }) => (
  <div className="space-y-2">
    <Label htmlFor={field.id}>
      {field.label} {field.required && <span className="text-red-500">*</span>}
    </Label>
    <Input
      id={field.id}
      type="date"
      value={value || ''}
      onChange={(e) => onChange?.(e.target.value)}
      required={field.required}
    />
  </div>
);

export const SelectField: React.FC<FieldProps> = ({ field, value, onChange }) => (
  <div className="space-y-2">
    <Label htmlFor={field.id}>
      {field.label} {field.required && <span className="text-red-500">*</span>}
    </Label>
    <Select value={value || ''} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        {field.options?.map((option, index) => (
          <SelectItem key={index} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
