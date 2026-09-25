/**
 * AddScoreModal — модальное окно для быстрого добавления балла курсанту
 */

import React, { useState } from 'react';
import { Modal, Button, Input, Select, showToast } from './ui';
import { CategoryConfig, ScoreCategory } from '../types';
import { addScore } from '../data/store';

interface AddScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  cadetId: string;
  cadetName: string;
  categories: CategoryConfig[];
  onSuccess: () => void;
}

export function AddScoreModal({ isOpen, onClose, cadetId, cadetName, categories, onSuccess }: AddScoreModalProps) {
  const [category, setCategory] = useState<ScoreCategory>(categories[0]?.id || 'classroom');
  const [points, setPoints] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedCategory = categories.find(c => c.id === category);
  const maxPoints = selectedCategory?.maxPoints || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const pointsNum = parseInt(points);
    if (isNaN(pointsNum) || pointsNum <= 0) {
      showToast('Укажите корректное количество баллов', 'error');
      return;
    }
    if (pointsNum > maxPoints) {
      showToast(`Максимум для этой категории: ${maxPoints} баллов`, 'error');
      return;
    }

    setLoading(true);
    
    // Имитация задержки
    setTimeout(() => {
      addScore({
        cadetId,
        category: category as any,
        points: pointsNum,
        description,
        date: new Date().toISOString().split('T')[0],
      });

      showToast(`Баллы начислены: ${cadetName} — ${pointsNum} баллов`, 'success');
      setLoading(false);
      setPoints('');
      setDescription('');
      onSuccess();
      onClose();
    }, 300);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Добавить баллы — ${cadetName}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Категория"
          value={category}
          onChange={(e) => setCategory(e.target.value as ScoreCategory)}
          options={categories.map(c => ({ value: c.id, label: `${c.name} (макс. ${c.maxPoints})` }))}
        />

        <Input
          label={`Баллы (макс. ${maxPoints})`}
          type="number"
          min="1"
          max={maxPoints}
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          placeholder="Введите количество баллов"
          required
        />

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="За что начислены баллы..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit" loading={loading}>
            Начислить
          </Button>
        </div>
      </form>
    </Modal>
  );
}
