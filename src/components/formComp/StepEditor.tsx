import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { useFormBuilder } from '../../contexts/FormBuilderContext';
import type {  WorkflowStep, FormField } from '../../contexts/FormBuilderContext';
import { X } from 'lucide-react';

interface StepEditorProps {
  step: WorkflowStep;
}

export const StepEditor: React.FC<StepEditorProps> = ({ step }) => {
  const { updateStep, removeStep, addField, updateField, removeField } = useFormBuilder();
  const [newFieldType, setNewFieldType] = useState<'text' | 'number' | 'date' | 'select'>('text');

  const handleAddField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      type: newFieldType,
      label: 'New Field',
      required: false,
      options: newFieldType === 'select' ? ['Option 1', 'Option 2'] : undefined
    };
    addField(step.id, newField);
  };

  const handleUpdateFieldOptions = (fieldId: string, optionsString: string) => {
    const options = optionsString.split(',').map(opt => opt.trim()).filter(opt => opt);
    updateField(step.id, fieldId, { options });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex-1 mr-4">
          <Input
            value={step.title}
            onChange={(e) => updateStep(step.id, { title: e.target.value })}
            className="text-lg font-semibold"
          />
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => removeStep(step.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {step.fields.map((field) => (
            <div key={field.id} className="border p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <Input
                  value={field.label}
                  onChange={(e) => updateField(step.id, field.id, { label: e.target.value })}
                  className="flex-1 mr-2"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeField(step.id, field.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`required-${field.id}`}
                  checked={field.required}
                  onCheckedChange={(checked) => 
                    updateField(step.id, field.id, { required: checked as boolean })
                  }
                />
                <Label htmlFor={`required-${field.id}`}>Required</Label>
              </div>

              <div>
                <Label>Field Type: {field.type}</Label>
              </div>

              {field.type === 'select' && (
                <div>
                  <Label>Options (comma-separated)</Label>
                  <Input
                    value={field.options?.join(', ') || ''}
                    onChange={(e) => handleUpdateFieldOptions(field.id, e.target.value)}
                    placeholder="Option 1, Option 2, Option 3"
                  />
                </div>
              )}
            </div>
          ))}

          <div className="flex items-center space-x-2 pt-4 border-t">
            <Select value={newFieldType} onValueChange={(value)=> setNewFieldType(value as "number" | "text" | "date" | "select")}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="select">Select</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddField}>Add Field</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
