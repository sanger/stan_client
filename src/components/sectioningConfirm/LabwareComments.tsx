import React, { ChangeEvent } from 'react';
import MutedText from '../MutedText';
import { Select } from '../forms/Select';
import { optionValues } from '../forms';
import { Comment, LabwareFieldsFragment } from '../../types/sdk';
import { LayoutPlan } from '../../lib/machines/layout/layoutContext';
import { Input } from '../forms/Input';

export enum SectionNumberSetting {
  NORMAL,
  DISABLE,
  HIDE
}
interface LabwareCommentsProps {
  slot: LabwareFieldsFragment['slots'][number];
  layoutPlan: LayoutPlan;
  comments: Array<Comment>;
  value: string | number | undefined;
  disabledComment?: boolean;
  sectionNumberDisplay?: SectionNumberSetting;
  onCommentChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onSectionNumberChange: (slotAddress: string, sectionIndex: number, sectionNumber: number) => void;
}

const LabwareComments: React.FC<LabwareCommentsProps> = ({
  slot,
  layoutPlan,
  comments,
  value,
  onCommentChange,
  disabledComment = false,
  sectionNumberDisplay = SectionNumberSetting.NORMAL,
  onSectionNumberChange
}) => {
  return (
    <div className="flex flex-row items-start justify-start gap-x-2">
      <span className="font-medium text-gray-800 tracking-wide">{slot.address}</span>
      <span className="w-30">
        {sectionNumberDisplay !== SectionNumberSetting.HIDE &&
          layoutPlan.plannedActions
            .get(slot.address)
            ?.map((source, index) => (
              <Input
                key={source.address + String(index)}
                type="number"
                value={source.newSection === 0 ? '' : String(source.newSection)}
                min={1}
                disabled={sectionNumberDisplay === SectionNumberSetting.DISABLE}
                onChange={(e) => onSectionNumberChange(slot.address, index, Number(e.target.value))}
              />
            ))}
      </span>
      <span className="flex-grow text-center">
        {!layoutPlan.plannedActions.has(slot.address) && <MutedText>Empty</MutedText>}
        {layoutPlan.plannedActions.has(slot.address) && (
          <Select
            value={value}
            disabled={disabledComment}
            style={{ width: '100%' }}
            onChange={(e) => onCommentChange(e)}
          >
            <option value="" />
            {optionValues(comments, 'text', 'id')}
          </Select>
        )}
      </span>
    </div>
  );
};

export default LabwareComments;
