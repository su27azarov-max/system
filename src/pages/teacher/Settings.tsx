/**
 * SettingsPage — управление категориями и лимитами баллов
 */

import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Card, Button, Input, showToast } from '../../components/ui';
import { getCategories, updateCategoryMaxPoints } from '../../data/store';
import { CategoryConfig, ScoreCategory } from '../../types';

export function SettingsPage() {
  const [categories, setCategories] = useState<CategoryConfig[]>(getCategories());
  const [editedValues, setEditedValues] = useState<Record<string, number>>({});

  const handleChange = (categoryId: string, value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 0) {
      setEditedValues(prev => ({ ...prev, [categoryId]: num }));
    }
  };

  const handleSave = () => {
    Object.entries(editedValues).forEach(([categoryId, maxPoints]) => {
      updateCategoryMaxPoints(categoryId as ScoreCategory, maxPoints);
    });
    setCategories(getCategories());
    setEditedValues({});
    showToast('Настройки сохранены', 'success');
  };

  const hasChanges = Object.keys(editedValues).length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Настройки</h1>
          <p className="text-slate-500 text-sm mt-1">Управление категориями и лимитами баллов</p>
        </div>
        {hasChanges && (
          <Button onClick={handleSave}>
            <Save size={16} className="mr-1" />
            Сохранить
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {categories.map((cat: CategoryConfig) => {
          const currentValue = editedValues[cat.id] ?? cat.maxPoints;
          return (
            <Card key={cat.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{cat.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{cat.description}</p>
                </div>
                <div className="w-32">
                  <Input
                    label="Макс. балл"
                    type="number"
                    min="0"
                    max="100"
                    value={currentValue}
                    onChange={(e) => handleChange(cat.id, e.target.value)}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Общая информация */}
      <Card className="bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Информация</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Максимальный балл ограничивает количество баллов, которое можно начислить по категории</li>
          <li>• Общий максимум: {categories.reduce((sum: number, c: CategoryConfig) => sum + (editedValues[c.id] ?? c.maxPoints), 0)} баллов</li>
          <li>• Изменения вступают в силу сразу после сохранения</li>
        </ul>
      </Card>
    </div>
  );
}
